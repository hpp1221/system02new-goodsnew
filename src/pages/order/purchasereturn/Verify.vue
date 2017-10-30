<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">采购退货单审批</h3>
      <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="80px">
        <el-form-item label="供应商">
          {{form.partnerName}}
        </el-form-item>
        <el-form-item v-for="(r,rindex) in form.returnOrderSupplierVOS" :key="r.partnerId" v-if="r.partnerId">
          <el-table :data="r.orderDetails" border>
            <el-table-column
              type="index"
              width="70">
            </el-table-column>
            <el-table-column width="70">
              <template slot-scope="scope">
                <i class="el-icon-minus" @click="deleteLine(rindex,scope.$index)"></i>
              </template>
            </el-table-column>
            <el-table-column label="主图" width="80">
              <template slot-scope="scope">
                <img v-lazy="scope.row.url" alt="" style="width: 40px;height: 40px;margin-top: 7px;"
                     v-if="scope.row.url"/>
              </template>
            </el-table-column>
            <el-table-column label="商品编码" width="80" prop="goodsNo">

            </el-table-column>
            <el-table-column label="商品名称" width="80" prop="goodsName">

            </el-table-column>

            <el-table-column label="规格" prop="goodsSpec">

            </el-table-column>
            <el-table-column label="数量" prop="num">

            </el-table-column>
            <el-table-column label="单位" prop="goodsUnit">

            </el-table-column>
            <el-table-column label="单价" prop="price">

            </el-table-column>
            <el-table-column label="小计" prop="subtotal">

            </el-table-column>
            <el-table-column label="审批价" prop="approvePrice">

            </el-table-column>
            <el-table-column label="备注" prop="remark">

            </el-table-column>
          </el-table>
          <el-form-item label="退款信息" style="float: left;">
            <p>
              <i class="el-icon-edit"
                 @click="editDelivery(rindex)"
                 style="cursor: pointer">

              </i>
              <span v-if="r.contacts">联系人：{{r.contacts}}</span>
              <span v-if="r.cel">联系电话：{{r.cel}}</span>
              <span v-if="r.address">退货地址：{{r.address}}</span>
              <!--<span v-if="form.depositBank">开户行：{{form.depositBank}}</span>-->
              <!--<span v-if="form.depositBankName">开户名称：{{form.depositBankName}}</span>-->
              <!--<span v-if="form.depositBankAccount">开户账号 {{form.depositBankAccount}}</span>-->
              <!--<span v-if="form.postcode">邮编：{{form.postcode}}</span>-->
            </p>
          </el-form-item>
          <el-form-item label="运单号" style="float: left;">
            {{r.trackingNo}}
          </el-form-item>
          <el-form-item label="备注说明" style="float: left;">
            {{r.remark}}
          </el-form-item>
        </el-form-item>
        <div class="order-table-total" v-if="form.orderAmount">
          <!--<div class="top">-->
          <!--<el-checkbox class="checkbox"></el-checkbox>-->
          <!--<p class="checkbox">已经申请退货，请输入获批退款金额：</p>-->
          <!--<el-input class="input"></el-input>-->
          <!--</div>-->
          <div class="bottom">
            <p class="first-p">审批价格：</p>
            <p class="second-p">{{form.orderAmount}}</p>
          </div>
        </div>
        <el-form-item label="附件信息" style="margin-top: 20px;clear:both" v-if="form.att.length > 0">
          <uploadfiles
            :fileList="form.att"
            :token="imgToken"
            v-if="imgToken"
            :disabled="true">
          </uploadfiles>
        </el-form-item>
        <el-form-item label="操作日志" style="clear: both">
          <el-switch
            v-model="operationLogVisible"
            on-text=""
            off-text="">
          </el-switch>
        </el-form-item>
        <el-table v-if="operationLogVisible" :data="operationList">
          <el-table-column label="操作人" prop="operator">

          </el-table-column>
          <el-table-column label="时间" prop="operateTime">

          </el-table-column>
          <el-table-column label="操作类别" prop="operateType">

          </el-table-column>
          <el-table-column label="操作日志" prop="operateLog">

          </el-table-column>
        </el-table>
        <el-button @click="verifyOrder(1)">通过</el-button>
        <el-button @click="writeFailReason = true">作废</el-button>
        <el-dialog title="提示" :visible.sync="writeFailReason" width="600px">
          <el-form :model="reasonForm" label-width="70px">
            <el-form-item label="作废原因">
              <el-input v-model="reasonForm.reason"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="verifyOrder(2)" type="primary">确定</el-button>
            <el-button @click="writeFailReason = false">取消</el-button>
          </div>
        </el-dialog>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        form: {

          returnOrderSupplierVOS: [
//            {
//              orderDetails: [
//                {
//                  goodsNo: '',//商品编号
//                  goodsName: '',//商品名
//                  goodsSpec: '',//规格
//                  goodsUnit: '',
//                  num: '',
//                  subtotal: '',//小计
//                  price: '',//价格
//                  combination: '',//编号和名称组合
//                  goodsSkuId: '',//规格id
//                  approvePrice: '',//审批价格
//                  remark: '',//备注
//                }
//              ],
//              trackingNo: '',
//              partnerId: '',
//              partnerName: '',
//              cel: '',
//              contacts: '',
//              address: ''
//            }
          ],
          type: 1,//1是采购退货，2是销售退货
          partnerId: '',
          partnerName: '',
          orderAmount: '',
          att: []
        },
        operationLogVisible: false,
        writeFailReason: false,
        reasonForm: {
          reason: ''
        },
        editDeliveryForm: {
          index: '',
          contacts: '',//联系人
          cel: '',//手机号
          address: '',//地址
//          depositBank:'',//开户行
//          depositBankName:'',//开户名称
//          depositBankAccount:'',//开户账号
//          postcode:'',//邮编
        },
        rules: {},
        goodsInfoList: [],
        editDeliveryVisible: false,
        supplierListVisible: false,//供应商modal
        addGoodsVisible: false,
        supplierList: [],
        orderDetailsDialog: [{
          goodsNo: '',//商品编号
          goodsName: '',//商品名
          goodsSpec: '',//规格
          goodsUnit: '',
          num: '',
          subtotal: '',//小计
          price: '',//价格
          combination: '',//编号和名称组合
          goodsSkuId: '',//规格id
          approvePrice: '',//审批价格
          remark: '',//备注
          supplierId: '',
          supplierName: ''
        }],
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        imgToken: ''
      }
    },
    created(){
      let self = this;
      self.getImgAccess(function (data) {
        self.imgToken = data;
      })
    },
    watch: {
      'orderDetailsDialog': {
        handler: function (val, oldVal) {
          for (let i = 0; i < val.length; i++) {
            this.orderDetailsDialog[i].subtotal = this.accMul(parseInt(val[i].num), val[i].price);
          }
        },
        // 深度观察
        deep: true
      },
      'form.returnOrderSupplierVOS': {
        handler: function (val, oldVal) {
          let amount = 0;
          for (let i = 0; i < val.length; i++) {
            for (let j = 0; j < val[i].orderDetails.length; j++) {
              amount += parseInt(val[i].orderDetails[j].approvePrice);
            }
          }
          this.form.orderAmount = amount;
        },
        // 深度观察
        deep: true
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    components: {
      'pagination': require('../../../components/pagination'),
      'uploadfiles': require('../../../components/uploadfiles'),
    },
    methods: {
      select(id){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          returnOrderId: id,
        };
        self.httpApi.returnOrder.selectReturnOrderById(requestData, function (data) {
          self.form = self.formPass(self.form, data.data);
          self.form.att = JSON.parse(self.form.att);
        });
      },
      verifyOrder(status){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          returnOrderId: id,
          orderStatus: status
        };
        self.httpApi.returnOrder.updateReturnOrderStatusById(requestData, function (data) {
          self.$router.push('/order/purchasereturn/list');
        });
      }
    }
  }
</script>
