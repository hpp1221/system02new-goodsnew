<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品入库</h3>
      <el-form ref="form" :model="form" inline>
        <el-form-item>
          <el-select
            v-model="form.addressId"
            filterable
            :loading="addressLoading"
            @visible-change="getAddress"
            value-key="id">
            <el-option label="全部仓库" :value="-1"></el-option>
            <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="全部入库类型" v-model="form.type">
            <el-option label="全部入库类型" :value="-1"></el-option>
            <el-option label="其他入库" :value="1"></el-option>
            <el-option label="采购入库" :value="2"></el-option>
            <el-option label="销售退货" :value="3"></el-option>
            <el-option label="盘盈" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="daterange"
            start-placeholder="请选择"
            end-placeholder="请选择"
            v-model="form.dateRange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <el-button @click="jumpToAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" v-loading.body="loading">
        <el-table-column prop="tradeNo" label="单号">

        </el-table-column>
        <el-table-column prop="createTime" label="入库日期" sortable>
          <template scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="selfAddress" label="所属仓库">

        </el-table-column>
        <el-table-column prop="type" label="类型">
          <template scope="scope">
            <span v-if="scope.row.type == 1">其他入库</span>
            <span v-if="scope.row.type == 2">采购入库</span>
            <span v-if="scope.row.type == 3">销售退货</span>
            <span v-if="scope.row.type == 5">盘盈</span>
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="制单人">

        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" @click="seeDetail(scope.row.id)">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage"></pagination>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tableData: [],
        form: {
          type: -1,
          addressId: -1,
          status: 1,//1代表入库
          dateRange: [null,null],
          startDate: '',
          endDate: ''
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        totalStores: [],
        loading: false,//table加载图片
        addressLoading: false,//仓库列表加载图片
      }
    },
    components: {
      'pagination': require('../../../components/pagination')
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
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
      select(size, num){//查询
        let self = this;
        self.loading = true;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        self.form.startDate = self.form.dateRange[0] === null ? '' : self.form.dateRange[0];
        self.form.endDate = self.form.dateRange[1] === null ? '' : self.form.dateRange[1];
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.$http.post('/ui/recordList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          if (data.code === 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
            self.loading = false;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },

      seeDetail(id){
        let url = '/stock/goodsin/detail/' + id;
        this.$router.push(url);
      },

      jumpToAdd(){//跳到增加入库页面
        this.$router.push('/stock/goodsin/add');
      }
    }
  }
</script>

<style>
</style>
