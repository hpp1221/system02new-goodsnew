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
            <el-table-column prop="productSpecNumber" label="商品编码">

            </el-table-column>
            <el-table-column prop="productSpecName" label="商品名称">

            </el-table-column>
            <el-table-column prop="specification" label="规格">

            </el-table-column>
            <el-table-column prop="buyNumber" label="数量">

            </el-table-column>
            <el-table-column prop="unit" label="单位">

            </el-table-column>

            <el-table-column prop="subtotal" label="小计金额">

            </el-table-column>
          </el-table>
          <pagination @getPageSize="getPageSize1" @getPageNum="getPageNum1" :totalPage="totalPage1"></pagination>
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
          <pagination @getPageSize="getPageSize2" @getPageNum="getPageNum2" :totalPage="totalPage2"></pagination>
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
        orderData:[],
        statisticsType: '1',
        countAmount: '',
        countOrder: '',
        countGoods: '',
        dateRange: '',
        startTime:'',
        endTime:'',
        pageSize1: 5,//商品统计
        pageNum1: 1,
        totalPage1: 10,
        pageSize2: 5,//订单统计
        pageNum2: 1,
        totalPage2: 10,
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
      this.selectGoodsList();
    },
    watch: {
      statisticsType:function(newVal,oldVal){//改变统计方式
        newVal === '1'?this.selectGoodsList():this.selectOrdersList();
      },
      dateRange:function(){//改变日期范围，重新查总数和列表
        this.selectCount();
        this.statisticsType === '1'?this.selectGoodsList():this.selectOrdersList();
      },
      pageSize2:function () {//改变一页显示的数量
        this.selectOrdersList();
      },
      pageNum2:function () {//改变页码
        this.selectOrdersList();
      }
    },
    methods: {
      getPageSize1(val){
          this.statisticsType === '1'?this.pageSize1 = val : this.pageSize1 = val;
      },
      getPageNum1(val){
        this.statisticsType === '1'?this.pageNum1 = val : this.pageNum1 = val;
      },
      getPageSize2(val){
        this.statisticsType === '1'?this.pageSize2 = val : this.pageSize2 = val;
      },
      getPageNum2(val){
        this.statisticsType === '1'?this.pageNum2 = val : this.pageNum2 = val;
      },
      selectCount(){
        let self = this;
        if(self.dateRange instanceof Array){
          self.startTime = self.dateRange[0];
          self.endTime = self.dateRange[1];
        }
        let requestData = {
          token: window.localStorage.getItem('token'),
          startTime: self.startTime,
          endTime: self.endTime
        };
        self.$http.post('/ui/order/statistics', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('statistics', data)
          if (data.code == 10000) {
            self.countAmount = data.data.countAmount;
            self.countOrder = data.data.countOrder;
            self.countGoods = data.data.countGoods;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      selectGoodsList(){
        let self = this;
        if(self.dateRange instanceof Array){
          self.startTime = self.dateRange[0];
          self.endTime = self.dateRange[1];
        }
        let requestData = {
          token: window.localStorage.getItem('token'),
          startTime: self.startTime,
          endTime: self.endTime,
          pageSize:self.pageSize1,
          pageNo:self.pageNum1
        };
        self.$http.post('/ui/order/goods/details', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('goodsdetail', data)
          if (data.code == 10000) {
            self.goodsData = data.data.list;
            self.totalPage1 = data.data.total;
//            self.countAmount = data.data.countAmount;
//            self.countOrder = data.data.countOrder;
//            self.countGoods = data.data.countGoods;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      selectOrdersList(){
        let self = this;
        if(self.dateRange instanceof Array){
          self.startTime = self.dateRange[0];
          self.endTime = self.dateRange[1];
        }
        let requestData = {
          token: window.localStorage.getItem('token'),
          startTime: self.startTime,
          endTime: self.endTime,
          pageSize:self.pageSize2,
          pageNo:self.pageNum2
        };
        self.$http.post('/ui/order/details', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('detail', data)
          if (data.code == 10000) {
            self.orderData = data.data.list;
            self.totalPage2 = data.data.total;
//            self.countAmount = data.data.countAmount;
//            self.countOrder = data.data.countOrder;
//            self.countGoods = data.data.countGoods;
          }
        }).catch(function (error) {
          console.log(error);
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
