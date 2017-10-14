<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">采购订单列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item>
          <el-select placeholder="全部订单" v-model="easyForm.orderStatus">
            <el-option :label="t.address" :key="t.id" :value="t.address" v-for="t in totalOrderStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addOrder">新增</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="orderNumber" label="订单号">

        </el-table-column>
        <el-table-column label="下单时间" sortable>
          <template scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payAmount" label="金额">

        </el-table-column>
        <el-table-column prop="orderStatus" label="出库/发货">
          <template scope="scope">
            <span v-if="scope.row.orderStatus == 1">其他入库</span>
            <span v-if="scope.row.orderStatus == 2">采购入库</span>
            <span v-if="scope.row.orderStatus == 3">销售退货</span>
            <span v-if="scope.row.orderStatus == 4">调拨入库</span>
            <span v-if="scope.row.orderStatus == 5">盘盈</span>
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="状态">

        </el-table-column>
        <el-table-column prop="createUserName" label="付款状态">

        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeDetail(scope.row.orderId)">退单详情</el-dropdown-item>
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
            <el-checkbox-group v-model="form.orderStatus">
              <el-checkbox v-for="t in totalOrderStatus" :key="t.name" :label="t.name"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="付款状态">
            <el-checkbox-group v-model="form.payType">
              <el-checkbox v-for="t in totalPaymentStatus" :key="t.name" :label="t.name"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="订单标签">
            <el-checkbox-group v-model="form.storeStatus">
              <el-checkbox v-for="t in totalOrderTags" :key="t.name" :label="t.name"></el-checkbox>
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
//          payType: '',//付款状态
          orderNumber: '',//订单编号
//          orderStatus: '',//订单状态
          dateRange: '',
          deliveryInfo: '',//收货信息
          goodsInfo: '',//商品信息
          startTime: '',
          endTime: ''
        },
        easyForm: {//简单查询

        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        totalStores: [
          {
            name: '仓库1',
            id: 1
          },
          {
            name: '仓库2',
            id: 2
          },
          {
            name: '仓库3',
            id: 3
          }
        ],
        totalOrderStatus: [
          {
            name: '待订单审核'
          },
          {
            name: '待财务审核'
          },
          {
            name: '待出库审核'
          },
          {
            name: '待发货确认'
          },
          {
            name: '待收货确认'
          },
          {
            name: '已完成'
          },
          {
            name: '已作废'
          },
        ],//订单状态
        totalPaymentStatus: [
          {
            name: '未付款'
          },
          {
            name: '付款待审核'
          },
          {
            name: '部分付款'
          },
          {
            name: '已付款'
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
      }
    },
    created(){
      this.getAddressList()
    },
    watch: {
      advanceSearch: function () {//点击高级搜索和取消时重新查询
        this.select();
      },
    },
    components: {
      'pagination': require('../../../components/pagination')
    },
    methods: {
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
      addOrder(){
        this.$router.push('/order/purchaseorder/add');
      },
      verify(id){
        let url = '/order/purchaseorder/verify/' + id;
        this.$router.push(url);
      },
      select(size, num){//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num,
          orderType:1
        };

        if (self.easyForm.dateRange instanceof Array) {
          self.easyForm.startTime = self.easyForm.dateRange[0]
          self.easyForm.endTime = self.easyForm.dateRange[1]
        }
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))

        self.$http.post('/ui/order/list', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;

          if (data.code == 10000) {
            self.tableData = data.data.list;
            console.log('list', self.tableData)
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getAddressList(){
        let self = this
        let requestData = {token: window.localStorage.getItem('token')}
        self.$http.post('/ui/addressList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('addressList', response)
          if (data.code == 10000) {
            //self.totalStores = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      seeDetail(id){
        let url = '/order/purchaseorder/detail/' + id;
        this.$router.push(url);
      }
    }
  }
</script>

<style>
</style>
