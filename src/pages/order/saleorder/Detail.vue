<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">订单详情</h3>
      <el-form ref="form" :model="form" class="request-form" label-width="80px">
        <el-form-item label="订单信息" style="margin-top: 20px;">
          <span v-for="item in totalOrderStatus" v-if="item.id == form.orderStatus" style="color: #4dc44b;font-size: 20px;font-weight: 600;padding:0px 16px">{{item.name}}</span>
          订单号：{{form.orderNumber}} &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 品牌商：{{form.sellerName}} &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;客户名称：{{form.memberName}}
          <el-button style="float: right" @click="returnOrderList">返回</el-button>
        </el-form-item>
        <!--<el-form-item style="float: right">-->
          <!--<el-button>返回</el-button>-->
        <!--</el-form-item>-->
        <el-table :data="form.orderItemList" border>
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <!--<el-table-column label="主图" width="80" prop="goodsImg">-->
          <!--<template slot-scope="scope">-->
          <!--<img v-lazy="scope.row.goodsImg" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="商品编码" prop="goodsSkuNumber">

          </el-table-column>
          <el-table-column label="商品名称" prop="goodsTitle">

          </el-table-column>
          <el-table-column label="规格" prop="goodsSku">

          </el-table-column>
          <el-table-column label="数量" prop="number">

          </el-table-column>
          <el-table-column label="单位" prop="goodsSkuUnit">

          </el-table-column>
          <el-table-column label="单价" prop="putPrice">

          </el-table-column>
          <el-table-column label="小计" prop="subTotalPrice">

          </el-table-column>
        </el-table>
        <div style="overflow: hidden">
          <p style="float: right;padding:30px 50px;">应付金额 : {{form.priceTotal}}</p>
        </div>

        <el-form-item label="备注说明" style="margin-top: 20px">
          {{form.orderDetail.note}}
        </el-form-item>
        <!--<div class="order-table-total">
                    <div class="top">
                        <el-checkbox class="checkbox"></el-checkbox>
                        <p class="checkbox">已申请特价，请输入获批订单金额</p>
                        <el-input class="input"></el-input>
                    </div>
                    <div class="bottom">
                        <p class="first-p">应付金额：</p>
                        <p class="second-p">86.40</p>
                    </div>
                </div>-->
        <!--<el-form-item label="收货信息" style="margin-top: 20px;">-->
        <!--<p>客户名称：{{form.customer}} 收货人：{{form.contacts}} 联系电话：{{form.cel}} 收货地址：{{form.address}}-->
        <!--</p>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="交货日期">-->
        <!--{{moment(form.deliveryTime).format('YYYY-MM-DD HH:mm:ss')}}-->
        <!--</el-form-item>-->
        <!--<el-form-item label="发票信息">-->
        <!--<span v-for="i in invoiceTypes" v-if="form.invoiceType == i.id">{{i.name}}</span>-->
        <!--</el-form-item>-->
        <!--<el-form-item style="margin-top: 20px;">-->
          <!--<p>-->
            <!--备注：<span>{{form.orderDetail.note}}</span>-->
          <!--</p>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="附件信息">-->
        <!--<uploadfiles-->
        <!--:fileList="form.att"-->
        <!--:disabled="true">-->
        <!--</uploadfiles>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="操作日志" style="clear: both">-->
          <!--<el-switch-->
            <!--v-model="operationLogVisible"-->
            <!--active-text=""-->
            <!--inactive-text="">-->
          <!--</el-switch>-->
        <!--</el-form-item>-->
        <!--<el-table v-if="operationLogVisible" :data="operationList">-->
          <!--<el-table-column label="操作时间" prop="operateTime">-->
            <!--<template slot-scope="scope">-->
              <!--{{moment(scope.row.operateTime).format('YYYY-MM-DD HH:mm:ss')}}-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="操作人" prop="operaterName">-->

          <!--</el-table-column>-->
          <!--<el-table-column label="订单状态" prop="orderStatusAfter">-->
            <!--<template slot-scope="scope">-->
              <!--<span v-for="t in totalOrderStatus" v-if="t.id==scope.row.orderStatusAfter">{{t.name}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="备注" prop="operateLog">-->

          <!--</el-table-column>-->
        <!--</el-table>-->
        <el-form-item label="物流信息">

        </el-form-item>
        <!--<el-form-item>-->
          <i class="el-icon-plus" style="margin:0px 20px 0px 50px;font-weight: 700;font-size: 18px;"></i>
          <el-button style="color: #000;margin-bottom: 10px" @click="addLogistics">添加物流信息</el-button>
        <!--</el-form-item>-->
        <el-form-item v-for="item in form.deliveryInfoList" :key="item">
          <p style="color: #9599a0;">
            <span>{{moment(item.operateTime ).format('YYYY-MM-DD HH:mm:ss')}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{item.info}}</span>
          </p>
        </el-form-item>

      </el-form>
      <!--添加物流信息弹框-->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="addForm">
          <el-form-item label="选择时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="addForm.operateTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              style="width: 80%;"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="快递状态" :label-width="formLabelWidth">
            <el-input v-model="addForm.info" style="width: 80%;"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addLogisticsSure">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

        addForm:{//添加物流信息弹框form
          info: '',//信息
          operateTime: '',//时间
        },
        dialogFormVisible:false,
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },//时间日期选择器快捷项
        form: {
          priceTotal:'',
          deliveryInfoList:[],//物流列表
          orderId:'',
          orderNumber: '',
          sellerName: '',
          memberName: '',
          createTime: '',
          orderDetail: {
            note: '',

          },
          orderItemList: [{
            goodsSkuNumber: '',//商品编号
            goodsTitle: '',//商品名
            goodsSku: '',//规格
            goodsSkuUnit: '',
            catName: '',
            catId: '',
            number: '',
            subtotal: '',//小计
            putPrice: '',//价格
            combination: '',//编号和名称组合
            goodsSkuId: '',//规格id
          }],
          //customer: '',//客户名称
          contacts: '',//收货人
          cel: '',//联系方式
          orderType: 2,//1是采购订单，2是销售订单
          address: '',//收货地址
          deliveryTime: '',//交货日期
          invoiceType: '',//发票信息
          remark: '',//备注
          att: [],//附件
//          deliveryInfo:''
        },
        formLabelWidth: '120px',
//        operationLogVisible: false,//操作日志按钮
//        operationList: [],
        totalOrderStatus: [
          {
            name: '全部状态',
//            id:1
          },
          {
            name: '待付款订单',
            id:1
          },
          {
            name: '待确认收货订单',
            id: 2
          },
          {
            name: '待发货订单',
            id: 3
          },
          {
            name: '待评价订单',
            id: 4
          },
          {
            name: '已完成',
            id: 5
          },
          {
            name: '取消订单',
            id:6
          },
        ],
      }
    },
    components: {
      'uploadfiles': require('../../../components/uploadfiles'),
    },
//    watch: {
//      operationLogVisible: function (newVal, oldVal) {
//        if (newVal && this.operationList.length === 0) {
//          this.getOperationList();
//        }
//      }
//    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    methods: {
      returnOrderList(){
        this.$router.push('/order/saleorder/list')
      },
      addLogistics(){//点击添加物流信息弹框
        this.dialogFormVisible = true;
      },
      addLogisticsSure(){//弹框确定
        let self = this;
        self.dialogFormVisible = false;
        let requestData = {
          info: self.addForm.info,
          operateTime:self.addForm.operateTime,
          orderId:self.form.orderId,
          orderNumber:self.form.orderNumber
        };
        self.httpApi.order.addDeliveryInfo(requestData, function (data) {
        });
        setTimeout(function () {
          self.$router.go(0);
        }, 500);
      },
      select(id) {
        let self = this;
        let requestData = {
          orderId: id,
        };
        self.httpApi.order.viewOrderInfo(requestData, function (data) {
          self.form = data.data;
          let moneytotal = 0;
          for(let i = 0 ; i < self.form.orderItemList.length;i++){
            moneytotal += parseInt(self.form.orderItemList[i].subTotalPrice)
           self.form.priceTotal = moneytotal

          }
          console.log('tot',self.form.priceTotal)
        });
      },
//      getOperationList() {
//        let self = this;
//        let requestData = {
//          orderId: self.form.orderId,
//        };
//        self.httpApi.order.viewOrderLogList(requestData, function (data) {
//          self.operationList = data.data;
//        });
//      },
    }
  }
</script>
