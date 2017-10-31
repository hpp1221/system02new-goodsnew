<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">订单统计</h3>
      <el-tabs v-model="statisticsType">
        <el-tab-pane label="商品明细统计" name="1">
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围"
            :picker-options="pickerOptions"
            v-model="dateRange">
          </el-date-picker>
          <el-row :gutter="0" style="margin: 20px 0;">
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <div class="goodssummary first">
                <p class="first-p">{{countOrder}}</p>
                <p class="second-p">订单总数</p>
              </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <div class="goodssummary second">
                <p class="first-p">{{countGoods}}</p>
                <p class="second-p">商品总数</p>
              </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <div class="goodssummary third">
                <p class="first-p">{{countAmount}}</p>
                <p class="second-p">总金额</p>
              </div>
            </el-col>
          </el-row>
          <el-table :data="goodsData" border>
            <el-table-column prop="goodsNo" label="商品编码">

            </el-table-column>
            <el-table-column prop="goodsName" label="商品名称">

            </el-table-column>
            <el-table-column prop="goodsSpec" label="规格">

            </el-table-column>
            <el-table-column prop="num" label="数量">

            </el-table-column>
            <el-table-column prop="goodsUnit" label="单位">

            </el-table-column>

            <el-table-column prop="subtotal" label="小计金额">

            </el-table-column>
          </el-table>
          <pagination @setChanged="pageChanged1" :totalPage="totalPage1"></pagination>
        </el-tab-pane>
        <el-tab-pane label="订单明细统计" name="2">
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围"
            v-model="dateRange">
          </el-date-picker>
          <el-row :gutter="0" style="margin: 20px 0;">
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <div class="goodssummary first">
                <p class="first-p">{{countOrder}}</p>
                <p class="second-p">订单总数</p>
              </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <div class="goodssummary second">
                <p class="first-p">{{countGoods}}</p>
                <p class="second-p">商品总数</p>
              </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <div class="goodssummary third">
                <p class="first-p">{{countAmount}}</p>
                <p class="second-p">总金额</p>
              </div>
            </el-col>
          </el-row>
          <el-table :data="orderData" border>
            <el-table-column prop="orderNumber" label="订单号">

            </el-table-column>
            <el-table-column prop="orderStatus" label="状态">
              <template slot-scope="scope">
                <span v-for="t in totalOrderStatus" v-if="scope.row.orderStatus == t.id">{{t.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="下单日期">

            </el-table-column>
            <!--<el-table-column prop="unit" label="商品编码">-->

            <!--</el-table-column>-->
            <!--<el-table-column prop="unit" label="商品名称">-->

            <!--</el-table-column>-->

            <!--<el-table-column prop="createUserName" label="规格">-->

            <!--</el-table-column>-->

            <!--<el-table-column prop="createUserName" label="数量">-->

            <!--</el-table-column>-->
            <!--<el-table-column prop="createUserName" label="单位">-->

            <!--</el-table-column>-->
            <!--<el-table-column prop="createUserName" label="单价">-->

            <!--</el-table-column>-->
            <el-table-column prop="total" label="小计金额">

            </el-table-column>
            <!--<el-table-column prop="createUserName" label="是否赠品">-->

            <!--</el-table-column>-->
          </el-table>
          <pagination @setChanged="pageChanged2" :totalPage="totalPage2"></pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        goodsData: [],
        orderData: [],
        statisticsType: '1',
        countAmount: '',
        countOrder: '',
        countGoods: '',
        dateRange: '',
        startTime: '',
        endTime: '',
        pageSize1: 5,//商品统计
        pageNum1: 1,
        totalPage1: 10,
        pageSize2: 5,//订单统计
        pageNum2: 1,
        totalPage2: 10,
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
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    components: {
      'pagination': require('../../components/pagination')
    },
    created(){
      this.selectCount();
    },
    watch: {
      statisticsType: function (newVal, oldVal) {//改变统计方式
        newVal === '1' ? this.selectGoodsList(this.pageSize1, this.pageNum1) : this.selectOrdersList(this.pageSize2, this.pageNum2);
      },
      dateRange: function () {//改变日期范围，重新查总数和列表
        this.selectCount();
        this.selectGoodsList(this.pageSize1, this.pageNum1);
        this.selectOrdersList(this.pageSize2, this.pageNum2);
      },

    },
    methods: {
      pageChanged1(page){
        this.pageSize1 = page.size;
        this.pageNum1 = page.num;
        this.selectGoodsList(page.size, page.num);
      },
      pageChanged2(page){
        this.pageSize2 = page.size;
        this.pageNum2 = page.num;
        this.selectOrdersList(page.size, page.num);
      },
      selectCount(){
        let self = this;
        if (self.dateRange instanceof Array) {
          self.startTime = self.dateRange[0].pattern('yyyy-MM-dd HH:mm:ss');
          self.endTime = self.dateRange[1].pattern('yyyy-MM-dd HH:mm:ss');
        }
        let requestData = {
          token: window.localStorage.getItem('token'),
          startTime: self.startTime,
          endTime: self.endTime,
        };
        self.httpApi.order.statistics(requestData, function (data) {
          self.countAmount = data.data.countAmount;
          self.countOrder = data.data.countOrder;
          self.countGoods = data.data.countGoods;
        });
      },
      selectGoodsList(size, num){
        let self = this;
        if (self.dateRange instanceof Array) {
          self.startTime = self.dateRange[0].pattern('yyyy-MM-dd HH:mm:ss');
          self.endTime = self.dateRange[1].pattern('yyyy-MM-dd HH:mm:ss');
        }
        let requestData = {
          token: window.localStorage.getItem('token'),
          startTime: self.startTime,
          endTime: self.endTime,
          pageSize: size,
          pageNo: num
        };
        self.httpApi.order.goodsDetails(requestData, function (data) {
          self.goodsData = data.data.list;
          self.totalPage1 = data.data.total;
        });
      },
      selectOrdersList(size, num){
        let self = this;
        if (self.dateRange instanceof Array) {
          self.startTime = self.dateRange[0].pattern('yyyy-MM-dd HH:mm:ss');
          self.endTime = self.dateRange[1].pattern('yyyy-MM-dd HH:mm:ss');
        }
        let requestData = {
          token: window.localStorage.getItem('token'),
          startTime: self.startTime,
          endTime: self.endTime,
          pageSize: size,
          pageNo: num
        };
        self.httpApi.order.details(requestData, function (data) {
          self.orderData = data.data.list;
          self.totalPage2 = data.data.total;
//            self.countAmount = data.data.countAmount;
//            self.countOrder = data.data.countOrder;
//            self.countGoods = data.data.countGoods;
        });
      }
    }
  }
</script>
<style scoped="scoped">
  .goodssummary {
    height: 100px;
    text-align: center;
    color: white;
    padding-top: 24px;
  }

  .first {
    background-color: #f77686;
  }

  .second {
    background-color: #2da9f1;
  }

  .third {
    background-color: #9674cc;
  }

  .fourth {
    background-color: #f9a38b;
  }

  .first-p {
    font-size: 24px;
  }

  .second-p {

  }
</style>
