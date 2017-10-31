<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">库存调拨</h3>
      <el-form ref="form" :model="form" inline>
        <el-form-item label="调出仓">
          <addressselect @getAddressSelect="getFromAddressSelect"></addressselect>
        </el-form-item>
        <el-form-item label="调入仓">
          <addressselect @getAddressSelect="getSelfAddressSelect"></addressselect>
        </el-form-item>

        <el-form-item label="创建时间">
          <el-date-picker
            type="daterange"
            start-placeholder="请选择"
            end-placeholder="请选择"
            v-model="easyForm.dateRange">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <el-button @click="add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form" label-width="80px">
          <el-form-item label="调拨单号">
            <el-input placeholder="请输入调拨单号" v-model="form.tradeNo" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="制单人">
            <el-input placeholder="请输入制单人名称" v-model="form.createUserName" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="调出仓">
            <addressselect @getAddressSelect="getFormFromAddressSelect"></addressselect>
          </el-form-item>
          <el-form-item label="调入仓">
            <addressselect @getAddressSelect="getFormSelfAddressSelect"></addressselect>
          </el-form-item>
          <!--<el-form-item label="商品信息">-->
          <!--<el-input placeholder="请输入商品信息" class="form-input" v-model="form.keyword"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
            <el-button @click="advanceSearch = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-table :data="tableData">
        <el-table-column prop="tradeNo" label="调拨单号">

        </el-table-column>
        <el-table-column prop="outPutAddress" label="调出仓库">

        </el-table-column>
        <el-table-column prop="inPutAddress" label="调入仓库">

        </el-table-column>
        <el-table-column label="调出时间">
          <template slot-scope="scope">
            {{moment(scope.row.outPutTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column label="调入时间">
          <template slot-scope="scope">
            {{moment(scope.row.inPutTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="制单人">

        </el-table-column>

        <!--<el-table-column prop="" label="状态">-->

        <!--</el-table-column>-->
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
        easyForm: {//简单查询
          to: '',
          from: '',
          dateRange: [null, null],
          startDate: '',
          endDate: '',
          storeType: 1//1是仓库，2是门店
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        form: {
          tradeNo: '',
          createUserName: '',
          from: '',
          to: '',
          storeType: 1//1是仓库，2是门店
//          keyword: ''
        },
        advanceSearch: false,
        searchType: 1,
      }
    },
    components: {
      'pagination': require('../../../components/pagination'),
      'addressselect': require('../../../components/getaddressselect')
    },
    methods: {
      getFromAddressSelect(e){
        this.easyForm.from = e.address;
      },
      getSelfAddressSelect(e){
        this.easyForm.to = e.address;
      },
      getFormFromAddressSelect(e){
        this.form.from = e.address;
      },
      getFormSelfAddressSelect(e){
        this.form.to = e.address;
      },
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.searchType === 1 ? this.select(page.size, page.num) : this.advanceSelect(page.size, page.num);
      },
      select(size, num){//查询

        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        self.easyForm.startDate = self.easyForm.dateRange[0] === null ? '' : self.easyForm.dateRange[0];
        self.easyForm.endDate = self.easyForm.dateRange[1] === null ? '' : self.easyForm.dateRange[1];
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        self.httpApi.stock.allocationRecordList(requestData, function (data) {
          self.searchType = 1;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      advanceSelect(size, num){//高级搜索
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.stock.allocationRecordList(requestData, function (data) {
          self.advanceSearch = false;
          self.searchType = 2;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      add(){
        this.$router.push('/stock/stockallocation/add');
      },
      seeDetail(id){
        let url = '/stock/stockallocation/detail/' + id;
        this.$router.push(url);
      }
    }
  }
</script>

<style>
</style>
