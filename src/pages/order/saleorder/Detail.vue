<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">订单详情</h3>
      <el-form ref="form" :model="form" class="request-form" label-width="80px">
        <el-form-item label="订单信息" style="margin-top: 20px;">
          <span v-for="item in totalOrderStatus" v-if="item.id == form.orderStatus"
                style="color: #4dc44b;font-size: 20px;font-weight: 600;padding:0px 16px">{{item.name}}</span>
          订单号：{{form.orderNumber}} &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 品牌商：{{form.sellerName}} &nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;客户名称：{{form.memberName}}&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;收货人姓名：{{form.orderDetail.contacts}}
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 收货人手机号：{{form.orderDetail.mobile}} &nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;收货人地址：{{form.orderDetail.address}}

          <el-button  v-if="tradeType ==2 || tradeType ==3" @click="selectRealInfo" style="margin-left: 10px;">查看实名信息</el-button>
          <el-button style="float: right" @click="returnOrderList">返回</el-button>
        </el-form-item>
        <!--<el-form-item style="float: right">-->
        <!--<el-button>返回</el-button>
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
          <el-table-column label="物流运费" prop="transportationFee">

          </el-table-column>
          <el-table-column label="小计" prop="subTotalPrice">

          </el-table-column>
          <el-table-column label="添加优惠">
            <template slot-scope="scope">
              <i class="el-icon-plus" style="cursor: pointer" @click="openPriceModel(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item style="padding:15px 15px">

          <div style="overflow: hidden">
            <p style="float: right;">总金额 : {{form.totalPrice}}</p>
          </div>
          <div style="overflow: hidden">
            <p style="float: right;">优惠金额 : {{totalReducePrice}}</p>
          </div>
          <div style="overflow: hidden">
            <p style="float: right;">应付金额 : {{form.paymentPrice}}</p>
          </div>
        </el-form-item>
        <!-- 之前物流信息-->
        <el-form-item label="之前物流">
          <!--<i class="el-icon-plus" style="margin:0px 20px 0px 50px;font-weight: 700;font-size: 18px;"></i>-->
          <el-button v-if="form.orderStatus === 2 || form.orderStatus === 3" style="margin-bottom: 10px"
                     @click="addLogisticsOld">添加物流信息
          </el-button>
          <el-button v-else style="margin-bottom: 10px" @click="addLogisticsOld" :disabled="true">添加物流信息</el-button>

        </el-form-item>
        <!--</el-form-item>-->
        <el-form-item v-for="item in form.deliveryInfoList" :key="item.deliveryInfoId">
          <p style="color: #9599a0;">
            <span>{{moment(item.operateTime).format('YYYY-MM-DD HH:mm:ss')}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{item.info}}</span>
            <i class="el-icon-close" @click="deleteLogistics(item.deliveryInfoId)"></i>
          </p>
        </el-form-item>
        <!-- 之前物流信息-->

        <el-form-item label="物流信息">
          <el-button @click="addLogesticsFormNow" v-if="form.orderStatus === 2 || form.orderStatus === 3">添加物流信息
          </el-button>
          <el-button @click="addLogesticsFormNow" v-else :disabled="true">添加物流信息</el-button>

        </el-form-item>

        <el-form-item>
          <div style="color: #9599a0;" v-for="item in deliveryInfoListNow" :key="item.id">
            物流公司 ： <span>{{item.logisticsName}}</span> &nbsp; &nbsp; &nbsp; &nbsp;
            运单编号 ： <span>{{item.logsiticsNumber}}</span>
            <span @click="seeDevList(item)" style="margin-left: 20px;color: #6dbfff">查看详情</span>
          </div>
        </el-form-item>
      </el-form>
      <!--修改价格弹框-->
      <el-dialog title="修改单价 ( 两种优惠方式只能选择一种 )" :visible.sync="openPriceModelVisable">
        <el-form :model="priceForm">

          <el-form-item label="是否折扣" :label-width="formLabelWidth">
            <el-input v-model="priceForm.discount" style="width: 80%;" @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"></el-input> &nbsp;&nbsp;<span>%</span>

          </el-form-item>

          <el-form-item label="现金优惠" :label-width="formLabelWidth">
            <el-input v-model="priceForm.reducePrice" style="width: 80%;" @keyup.enter.native="handleInputConfirm1"
                      @blur="handleInputConfirm1"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="openPriceModelVisable = false">取 消</el-button>
          <el-button type="primary" @click="addPriceModelSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--添加物流信息弹框-->
      <el-dialog title="物流信息" :visible.sync="dialogFormVisible">
        <el-form :model="addForm">
          <el-form-item label="运单编号" :label-width="formLabelWidth">
            <el-input v-model="addForm.logsiticsNumber" style="width: 60%;"></el-input>
          </el-form-item>
          <el-form-item label="物流公司" :label-width="formLabelWidth">
            <el-select v-model="addForm.companyName" filterable placeholder="请选择物流公司" @change="LogisticsListChange"
                       style="width: 60%;">
              <el-option
                v-for="item in LogisticsList"
                :key="item.id"
                :label="item.companyName"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addLogisticsSure">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="快递信息" :visible.sync="NumDisable" style="width: 100%;">
        <div v-for="item in deliveryList.orderDetail" :key="item.Time">
          <span style="margin:10px 30px 30px 10px;">{{item.Time}}</span><span>{{item.Context}}</span>
        </div>
      </el-dialog>

      <!--之前物流信息添加弹框-->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisibleOld">
        <el-form :model="addFormOld">
          <el-form-item label="选择时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="addFormOld.operateTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              style="width: 80%;"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="快递状态" :label-width="formLabelWidth">
            <el-input v-model="addFormOld.info" style="width: 80%;"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleOld = false">取 消</el-button>
          <el-button type="primary" @click="addLogisticsSureOld">确 定</el-button>
        </div>
      </el-dialog>
      <!--查看实名信息弹框-->
      <el-dialog title="实名信息" :visible.sync="selectRealInfoDisable">
        <el-form :model="addFormReal">
          <el-form-item label="用户姓名" :label-width="formLabelWidth">
            <span>{{addFormReal.contacts}}</span>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <span>{{addFormReal.idCard}}</span>
          </el-form-item>
          <el-form-item label="身份证正面照" :label-width="formLabelWidth">
            <img :src="addFormReal.idCardImg" alt="">
          </el-form-item>
          <el-form-item label="身份证反面照" :label-width="formLabelWidth">
            <img :src="addFormReal.idCardImg" alt="">
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        LogisticsList: [],//物流列表
        // logsiticsNumber:'',//运单编号
        logsiticsId: '',//该订单的物流单id
        deliveryInfoListNow: [],//现在物流列表
        deliveryInfoList: [],//之前物流列表
        deliveryList: [],//物流列表中单条数据详情
        NumDisable: false,
        priceForm: {//修改价格form
          reducePrice: '',//优惠价格
          discount: '',//折扣
//          radio:1,
        },
        totalReducePrice: '',
        itemId: '',//点击+号的itemid
        putPrice: '',//点击+号的putPrice
        addFormOld: {//之前添加物流信息弹框form
          info: '',//信息
          operateTime: '',//时间
        },
        addForm: {//添加物流信息弹框form
          // logisticsCode: '',//运单编号
          companyCode: '',//物流公司代码
          companyName: '',//选择物流后该公司名称
          logsiticsNumber: '',
          logsiticsId: ''
        },
        dialogFormVisible: false,//物流弹框
        dialogFormVisibleOld: false,//物流弹框
        openPriceModelVisable: false,//修改价格弹框
        selectRealInfoDisable: false,//查看实名信息弹框
        addFormReal: {//查看实名信息form
          contacts:'',
          idCard:'',
          idCardImg:'',
          idCardBgImg:'',
        },
        tradeType:'',//贸易形态
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
          paymentPrice: '',//所有商品加的应付总额
          totalPrice: '',//总金额

          orderId: '',//订单id
          orderNumber: '',
          sellerName: '',
          memberName: '',
          createTime: '',
          companyCode: '',//物流公司代码

          orderDetail: {
            contacts: '',
            address: '',
            mobile: ''

          },
          orderItemList: [{
            itemId: '',//订单项id
            goodsSkuNumber: '',//商品编号
            goodsTitle: '',//商品名
            goodsSku: '',//规格
            goodsSkuUnit: '',
            catName: '',
            catId: '',
            number: '',
            subtotal: '',//小计
            putPrice: '',//价格
            reducePrice: '',//优惠
            combination: '',//编号和名称组合
            goodsSkuId: '',//规格id
          }],
          remark: '',//备注
          att: [],//附件
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
            id: 1
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
            id: 6
          },
        ],
      }
    },
    components: {
      'uploadfiles': require('../../../components/uploadfiles'),
      'uploadoneimg': require('../../../components/uploadoneimg'),
    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
      this.getLogisticsList();
    },
    methods: {
      selectRealInfo() {//查看实名信息
        this.selectRealInfoDisable = true;

      },
      seeDevList(val) {//现在物流信息的详情
        let self = this;
        this.NumDisable = true;
        let requestData12 = {
          id: val.id
        };
        self.httpApi.order.searchLogisticsOrder(requestData12, function (data) {
          console.log('deliveryList', data);
          self.deliveryList = data.data;
          let arr = [];
          self.deliveryList.orderDetail.map(value => {
            arr.push(JSON.parse(value))
          })
          self.deliveryList.orderDetail = arr;
        });
      },
      select(id) {
        let self = this;
        let requestData = {
          orderId: id,
        };
        self.httpApi.order.viewOrderInfo(requestData, function (data) {
          self.form = data.data;
          self.addFormReal = data.data.orderDetail;
          self.tradeType = data.data.tradeType;
          console.log('self.addFormReal',self.addFormReal);
          console.log('self.tradeType',self.tradeType);
          self.form.deliveryInfoList = data.data.deliveryInfoList;
          self.totalReducePrice = self.form.totalPrice - self.form.paymentPrice;
          self.totalReducePrice = self.totalReducePrice.toFixed(2);
        });
        self.httpApi.order.selectLogisticsByOrderId(requestData, function (data) {
          self.deliveryInfoListNow = data.data;
        });

      },
      //新版物流模块 start
      addLogesticsFormNow() {//添加物流
        this.dialogFormVisible = true;
      },
      getLogisticsList() {//物流列表
        let self = this;
        let requestData = {};
        self.httpApi.dict.selectLogistics(requestData, function (data) {
          console.log('wuli', data);
          self.LogisticsList = data.data;
        })

      },
      LogisticsListChange(val) {
        this.addForm.companyCode = val.companyCode;
        this.addForm.companyName = val.companyName;
      },
      //新版物流模块 end
      returnOrderList() {
        this.$router.push('/order/saleorder/list')
      },
      handleInputConfirm() {//输入折扣
        this.priceForm.reducePrice = ""
      },
      handleInputConfirm1() {
        this.priceForm.discount = ""
      },
      openPriceModel(row) {//打开修改价格弹框
        console.log('row', row)
        this.itemId = row.itemId
        this.putPrice = row.putPrice
        this.openPriceModelVisable = true;
        this.priceForm.discount = row.discount;
        this.priceForm.reducePrice = row.reducePrice;
        console.log('this.priceForm.discount', this.priceForm.discount)
        if (this.priceForm.discount == 100 || this.priceForm.discount == 0) {
          this.priceForm.discount = ""
        }
        if (this.priceForm.reducePrice == "0") {
          this.priceForm.reducePrice = ""
        }

      },
      addPriceModelSure() {//修改价格确定
        let self = this;
        self.openPriceModelVisable = false;
        let requestData = {
          orderId: self.form.orderId,
          orderItem: self.itemId,
          discount: self.priceForm.discount,
          reducePrice: self.priceForm.reducePrice
        };

        self.httpApi.order.updateOrderItemPrice(requestData, function (data) {
        });
        setTimeout(function () {
          self.$router.go(0);
        }, 500);
      },

      addLogisticsSure() {//弹框确定
        let self = this;
        self.dialogFormVisible = false;
        let requestData = {
          companyCode: self.addForm.companyCode,
          companyName: self.addForm.companyName,
          orderId: self.form.orderId,
          number: self.addForm.logsiticsNumber
        };
        self.httpApi.order.searchLogisticsOrder(requestData, function (data) {;
          self.httpApi.order.selectLogisticsByOrderId(requestData, function (data) {
            console.log('data-----deliveryInfoListNow', data);
            self.deliveryInfoListNow = data.data;
          });
        });

      },
      addLogisticsOld() {
        this.dialogFormVisibleOld = true;
        this.addFormOld = {operateTime: '', info: ''};
      },
      addLogisticsSureOld() {//之前添加物流弹窗确定
        let self = this;
        self.dialogFormVisibleOld = false;
        let requestData = {
          info: self.addFormOld.info,
          operateTime: self.addFormOld.operateTime,
          orderId: self.form.orderId,
          orderNumber: self.form.orderNumber
        };
        self.httpApi.order.addDeliveryInfo(requestData, function (data) {
          let requestDataOld = {
            orderId: self.form.orderId,
          };
          self.httpApi.order.viewOrderInfo(requestDataOld, function (data) {
            self.form.deliveryInfoList = data.data.deliveryInfoList;
          });
        });
      },
      deleteLogistics(id) {//删除物流
        let self = this;
        let requestData = {
          deliveryInfoId: id,
        };
        self.httpApi.order.deleteDeliveryInfo(requestData, function (data) {
          self.$message.success('删除成功');
          let requestDataOld = {
            orderId: self.form.orderId,
          };
          self.httpApi.order.viewOrderInfo(requestDataOld, function (data) {
            self.form = data.data;
          });
        });
      },
    }
  }
</script>
