<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">门店要货</h3>
      <el-form ref="easyForm" :model="easyForm" inline v-if="!advanceSearch" class="request-form storegetgoods-nav">
        <el-form-item label="单据状态">
          <el-select v-model="easyForm.region" placeholder="全部">
            <el-option label="全部" value="shanghai"></el-option>
            <el-option label="已完成" value="beijing"></el-option>
            <el-option label="待审核通过" value="beijing"></el-option>
            <el-option label="待退款确认" value="beijing"></el-option>
            <el-option label="已作废" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="要货门店">
          <el-select placeholder="滨江店" v-model="easyForm.type">
            <el-option label="滨江店" value="-1"></el-option>
            <el-option label="江干店" value="1"></el-option>
            <el-option label="全部门店" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item class="storegoodslist-create">
          <el-button @click="createGoods">新增</el-button>
        </el-form-item>
      </el-form>
      <!--高级搜索列表-->
      <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form storegoods-bettersearchlist">
        <el-form-item>
          <p class="storegetgoodssearchlist-title">高级搜索</p>
        </el-form-item>
        <el-form-item label="单据编码" class="storenumber">
          <el-input placeholder="请输入单据编码" v-model="form.keyword" class="long-input">
          </el-input>
        </el-form-item>
        <el-form-item label="要货时间" class="storetime">
          <el-date-picker
            v-model="value3"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="要货门店">
          <el-input placeholder="请输入供应商名称" class="form-input" v-model="form.supplierName"></el-input>
        </el-form-item>
        <!--<el-form-item label="库存状态">-->
        <!--<el-checkbox label="高于库存上限值" v-model="form.upLimit" :true-label="1" :false-label="0"></el-checkbox>-->
        <!--<el-checkbox label="低于库存下限值" v-model="form.downLimit" :true-label="1" :false-label="0"></el-checkbox>-->
        <!--<el-checkbox label="库存<=0商品" v-model="form.zero" :true-label="1" :false-label="0"></el-checkbox>-->
        <!--</el-form-item>-->
        <el-form-item label="单据状态">
          <el-checkbox v-model="form.type0" :label="-1">全选</el-checkbox>
          <el-checkbox v-model="form.type1" :label="1">作废</el-checkbox>
          <el-checkbox v-model="form.type2" :label="0">待确认审核</el-checkbox>
          <el-checkbox v-model="form.type3" :label="-1">待发货审核</el-checkbox>
          <el-checkbox v-model="form.type" :label="1">已完成</el-checkbox>
          <el-checkbox v-model="form.type" :label="0">待收货确认</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <el-button @click="advanceSearch = false">取消高级搜索</el-button>
          <el-button @click="select(pageSize,pageNum)">清空</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable"
                class="storegetgoodstable">
        <el-table-column prop="tradeNumber" label="单据编号">
        </el-table-column>
        <el-table-column prop="stratTime" label="要货时间">

        </el-table-column>
        <el-table-column prop="storeId" label="要货门店">
        </el-table-column>
        <el-table-column prop="companyId" label="要货人">
        </el-table-column>
        <el-table-column prop="type" label="单据状态">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-dropdown trigger="click">
              <el-button type="text" icon="more"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="updateSupplier(scope.row.supplierId)">单据详情</el-dropdown-item>
                <el-dropdown-item @click.native="deleteSupplier(scope.row)">审核</el-dropdown-item>
                <el-dropdown-item @click.native="deleteSupplier(scope.row)">作废</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right"></pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        advanceSearch: false,
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        form: {
          storeHouseAddress: '',//所属仓库
          tagId: '',//商品标签
          storeStatus: '',//库存状态
          keyword: '',//关键词
          series: '',//商品分类
          cat: [],
          supplierName: '',//供应商名称
          tags: [],//标签
          source: -1,//商品来源,全部是-1，手动新增0，批量导入1
          type: -1,//商品状态
          upLimit: 1,
          downLimit: 1,
          zero: 1,
          addressList: [],//所属仓库
        },
        easyForm: {//简单查询
          cat: [],//所属仓库
          type: '',//1是上架，0是下架
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        multipleSelection: [],//选中项
        dialogTableVisible: false,//设置标签表格是否可见
        totalCategories: [],//分类列表
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        totalBrandList: [],
        totalAddressList: []

      }
    },
    watch: {
      advanceSearch: function () {//点击高级搜索和取消时重新查询
        this.select();
      },

    },
    created() {
      let self = this;
      // self.select(this.pageSize,this.pageNum);
      self.getBrandList(function (data) {
        self.totalBrandList = data;
      });//获取品牌列表
      self.getTagList(function (data) {
        self.goodsTags = data;
        self.form.tags = data;
      });//获取标签列表
      self.getAddressList(function (data) {
        self.totalAddressList = data.data;
        self.form.addressList = data.data;
      });
      self.getCatList();//获取分类列表
    },
    components: {
      'pagination': require('../../../../components/pagination')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },

      select(size, num) {//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };

        if (self.advanceSearch) {//高级搜索
          if (self.form.cat.length > 0) {
            self.form.cat = [self.form.cat[self.form.cat.length - 1]];
          }
          requestData = Object.assign(requestData, self.shallowCopy(self.form));
        } else {//简单搜索
          if (self.easyForm.cat.length > 0) {
            self.easyForm.cat = [self.easyForm.cat[self.easyForm.cat.length - 1]];
          }
          requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        }

        self.$http.post('/ui/skuList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('skuList', response)
          if (data.code == 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCatList(val) {
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
      insertCat(arr, val, data, level) {//val:所有父级的数组,data:当前获取到的数据
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
      sureSetTags() {//确定设置标签

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('10101', val);
      },
      updateSupplier(id) {//要货单详情
        this.$router.push({path: '/store/storemanagement/storegetgoods/storegetgoodsdetail', query: {id: id}});
      },
      createGoods() {
        this.$router.push('/goods/createGoods');
      },
      outputFile() {//导出

      },
      multipleInputGoods() {
        this.$router.push('/goods/multipleInputGoods');
      },
      multipleInputImgs() {
        this.$router.push('/goods/multipleInputImgs');
      },
      putOnSale() {//上架
        let self = this;
        self.$confirm('请确认是否批量上架？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('123')
          let requestData = {
            token: window.localStorage.getItem('token'),
            skuList: JSON.stringify(self.multipleSelection),
            type: 1
          };
          self.$http.post('/ui/upOrDownGoods', self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            console.log(data);
            if (data.code == 10000) {
              self.$router.go(0);
            }
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '您已取消上架'
          });
        });
      },
      downSale() {//下架
        let self = this;
        self.$confirm('请确认是否批量下架？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            token: window.localStorage.getItem('token'),
            skuList: JSON.stringify(self.multipleSelection),
            type: 0
          };
          self.$http.post('/ui/upOrDownGoods', self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            console.log(data);
            if (data.code == 10000) {
              self.$router.go(0);
            }
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消下架'
          });
        });
      },
      deleteGoods() {//删除商品
        this.$confirm('请确认是否批量删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '您已成功删除!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消删除'
          });
        });
      },
      setTags() {//设置标签
        this.dialogTableVisible = true;
      },
      cancelSelect() {//取消选中
        this.$refs.multipleTable.clearSelection();
      }

    }
  }
</script>

<style>
</style>
