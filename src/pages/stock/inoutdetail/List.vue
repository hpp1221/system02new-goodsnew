<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">出入库明细</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item>
          <el-select placeholder="全部仓库"
                     v-model="easyForm.addressName"
                     multiple
                     filterable
                     :loading="addressLoading"
                     @visible-change="getAddress">
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
          <el-button @click="select">查询</el-button>
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
        <el-table-column prop="addressName" label="所属仓库">

        </el-table-column>
        <el-table-column label="类型">
          <template scope="scope">
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
          <template scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="出入库数量">

        </el-table-column>
        <el-table-column prop="currentInventory" label="库存量">

        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" @click="seeDetail(scope.row.id)">查看明细</el-button>
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
              <el-option label="其他入库" :value="1"></el-option>
              <el-option label="采购入库" :value="2"></el-option>
              <el-option label="销售退货" :value="3"></el-option>
              <el-option label="调拨入库" :value="4"></el-option>
              <el-option label="盘盈" :value="5"></el-option>
              <el-option label="销售出库" :value="6"></el-option>
              <el-option label="调拨出库" :value="7"></el-option>
              <el-option label="盘亏" :value="8"></el-option>
              <el-option label="采购退回" :value="9"></el-option>
              <el-option label="其他出库" :value="10"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.goodsSeriesId">
              <el-option label="全部分类" :value="-1"></el-option>
              <el-option :label="t.name" :value="t.id" :key="t.id" v-for="t in totalSeries"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品品牌">
            <el-select v-model="form.goodsBrandId">
              <el-option label="全部分类" :value="-1"></el-option>
              <el-option :label="t.name" :value="t.id" :key="t.id" v-for="t in totalSeries"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出入库时间">
            <el-date-picker
              type="daterange"
              placeholder="选择日期范围"
              v-model="form.dateRange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所属仓库">
            <el-checkbox-group v-model="form.addressName">
              <el-checkbox v-for="t in totalStores" :label="t.address" :key="t.address"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品标签">
            <el-checkbox-group v-model="form.tags">
              <el-checkbox :label="t.id" :key="t.id" v-for="t in totalSeries">{{t.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
        <el-button @click="advanceSearch = false">取消</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tableData: [],
        form: {
          keyword: '',
          type: -1,
          goodsSeriesId: '',
          goodsBrandId: '',
          dateRange: '',
          addressName: [],
          tags: [],
          createTime: '',
          endTime: ''
        },
        easyForm: {//简单查询
          addressName: [],//仓库名
          keyword: '',//关键词
          dateRange: '',
          createTime: '',
          endTime: ''
        },
        advanceSearch: false,//高级搜索
        totalStores: [],
        goodsTags: [],
        totalCategories: [],
        addressLoading: false,//仓库列表加载图片
      }
    },
    created(){
      let self = this;
      self.select();
      self.getAddressList(function (data) {
        self.totalAddressList = data.data;
      });
      self.getTagList(function (data) {
        self.goodsTags = data;
      });//获取标签列表
      self.getCatList();//获取分类列表
    },
    methods: {
      getAddress(type){
        if (type && this.totalStores.length === 0) {
          this.addressLoading = true;
          let self = this;
          self.getAddressList(function (data) {
            self.totalStores = data;
            self.addressLoading = false;
          });
        }
      },
      select(){//查询
        let self = this
        let requestData = {token: window.localStorage.getItem('token')}


        if (self.easyForm.dateRange instanceof Array) {
          self.easyForm.createTime = self.easyForm.dateRange[0]
          self.easyForm.endTime = self.easyForm.dateRange[1]
        }
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))

        self.$http.post('/ui/recordListBySku', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('出入库明细', response)
          if (data.code == 10000) {
            self.tableData = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      advanceSelect(){
        let self = this
        let requestData = {token: window.localStorage.getItem('token')}

        if (self.form.dateRange instanceof Array) {
          self.form.createTime = self.form.dateRange[0]
          self.form.endTime = self.form.dateRange[1]
        }
        requestData = Object.assign(requestData, self.shallowCopy(self.form))

        self.$http.post('/ui/recordListBySku', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('出入库明细', response)
          if (data.code == 10000) {
            self.tableData = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCatList(val){
        let self = this;
        var requestData;
        if (val === undefined) {
          requestData = {params: {token: window.localStorage.getItem('token')}};
        } else {
          requestData = {params: {token: window.localStorage.getItem('token'), catId: val[val.length - 1].id}};
        }
        self.$http.get('/ui/catList', requestData).then(function (response) {
          let data = response.data;
          console.log('catList', response)
          if (data.code == 10000) {
            for (let i = 0; i < data.data.length; i++) {
              data.data[i].res = JSON.parse(data.data[i].res);
              if (parseInt(data.data[i].hasChild) > 0) {
                data.data[i].children = [];
              }
            }
            if (val === undefined) {
              self.totalCategories = data.data;
            } else {
              self.insertCat(self.totalCategories, val, data.data, 0);
            }

          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      insertCat(arr, val, data, level){//val:所有父级的数组,data:当前获取到的数据
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === val[level].id) {
            if (val.length === level + 1) {
              arr[i].children = data;
            } else {
              level++;
              this.insertCat(arr[i].children, val, data, level);
            }
          }
        }
      },
    }
  }
</script>

<style>
</style>
