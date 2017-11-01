<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">门店出入库明细</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item>
          <el-select
            placeholder="全部门店"
            v-model="easyForm.addressName"
            multiple
            filterable>
            <el-option :label="t.name" :key="t.id" :value="t.name" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围"
            v-model="easyForm.dateRange">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="输入关键字" icon="search" v-model="easyForm.keyword" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData">
        <el-table-column prop="number" label="编码">

        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称">

        </el-table-column>
        <el-table-column prop="sku" label="规格">

        </el-table-column>
        <el-table-column prop="unit" label="单位">

        </el-table-column>
        <el-table-column prop="addressName" label="所属门店">

        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">其他入库</span>
            <span v-if="scope.row.type == 2">采购入库</span>
            <span v-if="scope.row.type == 3">销售退货</span>
            <span v-if="scope.row.type == 4">调拨入库</span>
            <span v-if="scope.row.type == 5">盘盈</span>
            <span v-if="scope.row.type == 6">销售出库</span>
            <span v-if="scope.row.type == 7">调拨出库</span>
            <span v-if="scope.row.type == 8">盘亏</span>
            <span v-if="scope.row.type == 9">采购退回</span>
            <span v-if="scope.row.type == 10">其他出库</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeNo" label="单号">

        </el-table-column>
        <el-table-column prop="createTime" label="出入库日期" width="200">
          <template slot-scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="出入库数量">

        </el-table-column>
        <el-table-column prop="currentInventory" label="库存量">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="seeDetail(scope.row.type,scope.row.recordId)">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form" label-width="100px">
          <el-form-item label="商品信息">
            <el-input placeholder="请输入商品名称/编码/按商品合并/关键字/条形码" v-model="form.keyword" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="出入库类型">
            <el-select v-model="form.type">
              <el-option label="全部" :value="-1"></el-option>
              <el-option v-for="t in typeList" :key="t.id" :value="t.id" :label="t.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品分类">
            <catselect @getCatSelect="getCatSelect"></catselect>
          </el-form-item>
          <el-form-item label="商品品牌">
            <brandselect @getBrandSelect="getBrandSelect"></brandselect>
          </el-form-item>
          <el-form-item label="出入库时间">
            <el-date-picker
              type="daterange"
              placeholder="选择日期范围"
              v-model="form.dateRange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所属门店">
            <getcheckbox :dataList="totalStores" @getCheckList="getAddressCheckList"></getcheckbox>
          </el-form-item>
          <el-form-item label="商品标签">
            <getcheckbox :dataList="goodsTags" @getCheckList="getTagCheckList"></getcheckbox>
          </el-form-item>
        </el-form>
        <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
        <el-button @click="advanceSearch = false">取消</el-button>
      </el-dialog>
      <pagination @setChanged="pageChanged" :totalPage="totalPage"></pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        form: {
          keyword: '',
          type: -1,
          goodsSeriesId: '',
          goodsBrandId: '',
          dateRange: [null, null],
          addressName: '',
          tags: [],
          createTime: '',
          endTime: '',
          storeType: 2,//1是仓库，2是门店
        },
        easyForm: {//简单查询
          addressName: '',//仓库名
          keyword: '',//关键词
          dateRange: [null, null],
          createTime: '',
          endTime: '',
          storeType: 2,//1是仓库，2是门店
        },
        advanceSearch: false,//高级搜索
        searchType: 1,
        totalStores: [],
        goodsTags: [],
        addressLoading: false,//仓库列表加载图片
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        typeList: [
          {
            id: 1,
            name: '其他入库'
          },
          {
            id: 2,
            name: '采购入库'
          },
          {
            id: 3,
            name: '销售退货'
          },
          {
            id: 4,
            name: '调拨入库'
          },
          {
            id: 5,
            name: '盘盈'
          },
          {
            id: 6,
            name: '销售出库'
          },
          {
            id: 7,
            name: '调拨出库'
          },
          {
            id: 8,
            name: '盘亏'
          },
          {
            id: 9,
            name: '采购退回'
          },
          {
            id: 10,
            name: '其他出库'
          },
        ]
      }
    },
    created() {
      let self = this;
      self.$route.params.goodsSkuId ? self.select(self.$route.params.goodsSkuId) : self.$router.push('/error');
      self.getStoreList()
      self.getTagList(function (data) {
        self.goodsTags = data;
      });//获取标签列表
    },
    components: {
      'pagination': require('../../../../components/pagination'),
      'brandselect': require('../../../../components/getbrandselect'),
      'catselect': require('../../../../components/getcatselect'),
      'getcheckbox': require('../../../../components/getcheckbox')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
//        this.searchType === 1 ? this.select(page.size, page.num) : this.advanceSelect(page.size, page.num);
      },
//      getAddressCheckList(e) {
//        this.form.addressName = e;
//      },
      getTagCheckList(e) {
        this.form.tags = e;
      },
      getCatSelect(e) {
        this.form.goodsSeriesId = e.catId;
      },
      getBrandSelect(e) {
        this.form.goodsBrandId = e.brandId;
      },
      getStoreList() {
          let self = this;
          let requestData = {
            token: window.localStorage.getItem('token'),
          }
          self.httpApi.store.storeList(requestData, function (data) {
            self.totalStores = data.data
          })

      },
      select(goodsSkuId) {//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: self.pageSize,
          pageNo: self.pageNum,
          goodsSkuId: goodsSkuId
        };
        self.easyForm.createTime = self.easyForm.dateRange[0] === null ? '' : self.easyForm.dateRange[0];
        self.easyForm.endTime = self.easyForm.dateRange[1] === null ? '' : self.easyForm.dateRange[1];
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.httpApi.stock.recordListBySku(requestData, function (data) {
          self.searchType = 1;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      advanceSelect(goodsSkuId) {
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: self.pageSize,
          pageNo: self.pageNum
        };

        self.form.createTime = self.form.dateRange[0] === null ? '' : self.form.dateRange[0];
        self.form.endTime = self.form.dateRange[1] === null ? '' : self.form.dateRange[1];
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.stock.recordListBySku(requestData, function (data) {
          self.advanceSearch = false;
          self.searchType = 2;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },

      seeDetail(type, id) {
        let inStore = [1, 2, 3, 5];
        let outStore = [6, 8, 9, 10];
        let allocationStore = [4, 7];
        let url = '/error';
        if (inStore.indexOf(parseInt(type)) > -1) {
          url = '/stock/goodsin/detail/' + id;
        } else if (outStore.indexOf(parseInt(type)) > -1) {
          url = '/stock/goodsout/detail/' + id;
        } else if (allocationStore.indexOf(parseInt(type)) > -1) {
          url = '/stock/stockallocation/detail/' + id;
        }
        this.$router.push(url);
      }
    }
  }
</script>
