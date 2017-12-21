<template>
  <div class="container">
    <div class="wrapper">
      <!--<div class="index-top-icon-div">-->
        <!--<p class="icon-p">-->
          <!--<i class="el-icon-question"></i>-->
          <!--<span>帮助</span>-->
        <!--</p>-->
        <!--<p class="icon-p">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span>配置</span>-->
        <!--</p>-->
      <!--</div>-->
      <el-row :gutter="10" style="width: 100%;margin-top: 50px">
        <el-col :span="8">
          <el-card class="card-body">
            <div slot="header">
              <span>通知公告</span>
              <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <div v-for="n in noticeList" :key="n.id" class="data-div">
              <p>{{n.name}}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card-body">
            <div slot="header">
              <span>库存提醒</span>
              <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <div v-for="s in stockRemindList" :key="s.storeHouseId" class="data-div">
              <p>仓库:{{s.storeHouseName}},商品:{{s.goodsName}},库存即将达到库存下限</p>
              <p>{{s.storeHouseName}}库存总数：{{s.inStoreHouse + s.onTheWay}}</p>
              <p>{{s.storeHouseName}}库存下限值：{{s.downLimit}}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card class="card-body">
            <div slot="header">
              <span>待处理任务</span>
              <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <div v-for="p in pendingTaskList" :key="p.id" class="data-div">
              <p style="float: left;"><span v-for="t in totalOrderStatus" v-if="p.orderStatus == t.id">{{t.name}}</span></p>
              <p style="float: left;"><span v-for="o in orderTypeList" v-if="p.orderType == o.type">{{o.name}}</span></p>
              <p style="float: right">{{p.count}}笔</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <chart></chart>

    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        noticeList: [{
          name: '商品管理版本更新V1.0',
          id: 1
        }],
        pendingTaskList: [{
          name: '商品管理版本更新V1.0',
          id: 1
        }],
        stockRemindList: [],
        orderTypeList: [
          {
            type: 1,
            name: '采购订单'
          },
          {
            type: 2,
            name: '销售订单'
          },
          {
            type: 3,
            name: '采购退单'
          },
          {
            type: 4,
            name: '销售退单'
          },
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
      }
    },
    created(){
//      this.getStockRemind();
//      this.getPendingTask();

    },
    components: {
      'chart': require('../components/indexcharts')
    },
    methods: {
//      getStockRemind(){//首页库存信息
//        let self = this;
//        let requestData = {
//          ratio: 30
//        };
//        self.httpApi.stock.storeHouseRemind(requestData, function (data) {
//          self.stockRemindList = data.data;
//        })
//      },
//      getPendingTask(){//首页待处理任务信息
//        let self = this;
//        let requestData = {};
//        self.httpApi.order.pendingTask(requestData, function (data) {
//          console.log(data)
//          self.pendingTaskList = data.data;
//        })
//      },

      getShortCut(){//获取快捷菜单
//				let self = this
//				let requestData = {
//				}
//				self.$http.get('/admin/user.js/shortcut',requestData).then(function (response) {
//				    let data = response.data;
//				    console.log('shortcut',response)
//					if(data.code == 10000){
//						self.shortCut = data.data
//					}
//			    }).catch(function (error) {
//			    	console.log(error);
//			    });
      }
    }
  }
</script>

<style>
  .card-body {
    height: 300px;
  }

  .data-div {
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0;
    overflow: hidden;
  }

  .data-div:first-child {
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    padding-top: 0;
    padding-bottom: 10px;
  }

  .index-top-icon-div {
    overflow: hidden;
  }
</style>
