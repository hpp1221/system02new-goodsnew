<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品出库</h3>
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
          <el-select placeholder="全部出库类型" v-model="form.type">
            <el-option label="全部出库类型" :value="-1"></el-option>
            <el-option label="销售出库" :value="6"></el-option>
            <el-option label="盘亏" :value="8"></el-option>
            <el-option label="采购退回" :value="9"></el-option>
            <el-option label="其他出库" :value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围"
            v-model="form.dateRange">
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
        <el-table-column prop="createTime" label="出库日期">
          <template slot-scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="selfAddress" label="所属仓库">

        </el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 6">销售出库</span>
            <span v-if="scope.row.type == 8">盘亏</span>
            <span v-if="scope.row.type == 9">采购退回</span>
            <span v-if="scope.row.type == 10">其他出库</span>
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="制单人">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
          status: -1,//-1代表出库
          dateRange: [null,null],
          startDate: '',
          endDate: ''
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        totalStores: [],
        loading: false,
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
        self.httpApi.stock.recordList(requestData, function (data) {
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
          self.loading = false;
        });
      },

      seeDetail(id){
        let url = '/stock/goodsout/detail/' + id;
        this.$router.push(url);
      },

      jumpToAdd(){
        this.$router.push('/stock/goodsout/add');
      }
    }
  }
</script>

<style>
</style>
