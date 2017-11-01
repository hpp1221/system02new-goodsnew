<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">本人处理订单</h3>
      <el-table :data="tableData">
        <el-table-column prop="orderNumber" label="订单号">

        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" sortable>
          <template slot-scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payAmount" label="金额">

        </el-table-column>
        <!--<el-table-column prop="orderStatus" label="出库/发货">-->
        <!--<template slot-scope="scope">-->
        <!--<span v-if="scope.row.orderStatus == 1">其他入库</span>-->
        <!--<span v-if="scope.row.orderStatus == 2">采购入库</span>-->
        <!--<span v-if="scope.row.orderStatus == 3">销售退货</span>-->
        <!--<span v-if="scope.row.orderStatus == 4">调拨入库</span>-->
        <!--<span v-if="scope.row.orderStatus == 5">盘盈</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="t.id == scope.row.orderStatus" v-for="t in totalOrderStatus">{{t.name}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="createUserName" label="付款状态">-->

        <!--</el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeDetail(scope.row.orderId,scope.row.orderStatus)">订单详情
                </el-dropdown-item>
                <el-dropdown-item @click.native="verify(scope.row.orderId)">审核</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
          payType: '',//付款状态
          orderNumber: '',//订单编号
          orderStatus: '',//订单状态
        },
        easyForm: {//简单查询

        },
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
            name: '待订单审核',
            id: 1
          },
          {
            name: '待财务审核',
            id: 2
          },
          {
            name: '待出库审核',
            id: 3
          },
          {
            name: '待发货确认',
            id: 4
          },
          {
            name: '待收货确认',
            id: 5
          },
          {
            name: '已完成',
            id: 6
          },
          {
            name: '已作废',
            id: 7
          },
        ],//订单状态
        totalPaymentStatus: [
          {
            name: '全选'
          },
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
            name: '不限'
          },
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
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
      }
    },
    components: {
      'pagination': require('../../components/pagination')
    },
    methods: {
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
      select(size, num){//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        self.httpApi.order.listSelf(requestData, function (data) {
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      seeDetail(id, status){
        let url = '';
        if (status === 1) {
          url = '/order/purchaseorder/detail/' + id;
        } else {
          url = '/order/saleorder/detail/' + id;
        }
        this.$router.push(url);
      },
      verify(id){
        let url = '/order/verifypersonalorder/' + id;
        this.$router.push(url);
      }
    }
  }
</script>
