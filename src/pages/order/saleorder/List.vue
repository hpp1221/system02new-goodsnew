<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">销售订单列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item label="订单状态">
          <el-select placeholder="全部订单" v-model="easyForm.orderStatus" multiple>
            <el-option :label="t.name" :key="t.id" :value="t.name" v-for="t in totalOrderStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="easyForm.contacts" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-button @click="select">导入</el-button>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button @click="addOrder">新增</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="orderNumber" label="销售订单号">

        </el-table-column>
        <el-table-column label="下单时间" sortable>
          <template slot-scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contacts" label="客户名称">

        </el-table-column>
        <el-table-column prop="payAmount" label="金额">

        </el-table-column>
        <el-table-column prop="createUserName" label="状态">
          <template slot-scope="scope">
            <span v-for="t in totalOrderStatus" v-if="scope.row.orderStatus == t.id">{{t.name}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="createUserName" label="付款状态">-->

        <!--</el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeDetail(scope.row.orderId)">订单详情</el-dropdown-item>
                <el-dropdown-item @click.native="verify(scope.row.orderId)">审核</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage"></pagination>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form">
          <el-form-item label="订单号">
            <el-input placeholder="请输入订单号" v-model="form.orderNumber" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker
              v-model="form.dateRange"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="收货信息">
            <el-input placeholder="收货人/收货电话/经销商" v-model="form.deliveryInfo" class="form-input">

            </el-input>
          </el-form-item>
          <el-form-item label="商品信息">
            <el-input placeholder="输入商品名称/编码/条形码/关键字" v-model="form.goodsInfo" class="form-input">

            </el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <getcheckbox
              @getCheckList="getCheckList"
              :dataList="totalOrderStatus">
            </getcheckbox>
          </el-form-item>
          <!--<el-form-item label="付款状态">-->
          <!--<el-checkbox-group v-model="form.payType">-->
          <!--<el-checkbox v-for="t in totalPaymentStatus" :key="t.name" :label="t.name"></el-checkbox>-->
          <!--</el-checkbox-group>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="订单标签">-->
          <!--<el-checkbox-group v-model="form.storeStatus">-->
          <!--<el-checkbox v-for="t in totalOrderTags" :key="t.name" :label="t.name"></el-checkbox>-->
          <!--</el-checkbox-group>-->
          <!--</el-form-item>-->
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
          payStatus: [],//付款状态
          orderNumber: '',//订单编号
          orderStatus: [],//订单状态
          dateRange: [null, null],
          deliveryInfo: '',//收货信息
          goodsInfo: '',//商品信息
          startTime: '',
          endTime: ''
        },
        easyForm: {//简单查询
          orderStatus: [],
          contacts: ''
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        totalStores: [],
        totalOrderStatus: [
          {
            name: '作废',
            id: 8
          },
          {
            name: '待确认审核',
            id: 9
          },
          {
            name: '待收款确认',
            id: 10
          },
          {
            name: '待出库确认',
            id: 11
          },
          {
            name: '已完成',
            id: 12
          },
        ],//订单状态
        totalPayStatus: [
          {
            name: '未付款',
            id: 1
          },
          {
            name: '付款待审核',
            id: 2
          },
          {
            name: '部分付款',
            id: 3
          },
          {
            name: '已付款',
            id: 4
          },
        ],//付款状态
        totalOrderTags: [
          {
            name: '特价单'
          },
          {
            name: '非特价单'
          },
          {
            name: '秒杀订单'
          },
        ],//订单标签
        advanceSearch: false,
        searchType: 1
      }
    },
    components: {
      'pagination': require('../../../components/pagination'),
      'getcheckbox': require('../../../components/getcheckbox'),
    },
    methods: {
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.searchType === 1 ? this.select(page.size, page.num) : this.advanceSelect(page.size, page.num);
      },
      getCheckList(e){
        this.form.orderStatus = e;
      },
      addOrder(){
        this.$router.push('/order/saleorder/add');
      },
      verify(id){
        let url = '/order/saleorder/verify/' + id;
        this.$router.push(url);
      },
      select(size, num){//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num,
          orderType: 2
        };

        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        self.httpApi.order.list(requestData, function (data) {
          self.searchType = 1;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      advanceSelect(size, num){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num,
          orderType: 2
        };
        self.form.startDate = self.form.dateRange[0] === null ? '' : self.form.dateRange[0];
        self.form.endDate = self.form.dateRange[1] === null ? '' : self.form.dateRange[1];
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.order.list(requestData, function (data) {
          self.searchType = 2;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },

      seeDetail(id){
        let url = '/order/saleorder/detail/' + id;
        this.$router.push(url);
      },
    }
  }
</script>
