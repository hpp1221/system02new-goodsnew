<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">销售退货单详情</h3>
      <el-form ref="form" :model="form" class="request-form" label-width="80px">
        <el-form-item label="客户">
          {{form.partnerName}}
        </el-form-item>
        <el-table :data="form.orderDetails" border>
          <el-table-column
            type="index"
            width="70">
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
        <div class="order-table-total">
          <!--<div class="top">-->
          <!--<el-checkbox class="checkbox"></el-checkbox>-->
          <!--<p class="checkbox">已经申请退货，请输入获批退款金额：</p>-->
          <!--<el-input class="input"></el-input>-->
          <!--</div>-->
          <div class="bottom">
            <p class="first-p">审批价格：</p>
            <p class="second-p">{{form.payAmount}}</p>
          </div>
        </div>
        <el-form-item label="退款信息" style="margin-top: 20px;clear:both">
          <p>
            <span v-if="form.contacts">联系人：{{form.contacts}}</span>
            <span v-if="form.cel">联系电话：{{form.cel}}</span>
            <span v-if="form.address">退货地址：{{form.address}}</span>
            <!--<span v-if="form.depositBank">开户行：{{form.depositBank}}</span>-->
            <!--<span v-if="form.depositBankName">开户名称：{{form.depositBankName}}</span>-->
            <!--<span v-if="form.depositBankAccount">开户账号 {{form.depositBankAccount}}</span>-->
            <!--<span v-if="form.postcode">邮编：{{form.postcode}}</span>-->
          </p>
        </el-form-item>
        <el-form-item label="备注说明" v-if="form.remark">
          {{form.remark}}
        </el-form-item>
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
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        form: {
          partnerId: '',
          partnerName: '',
          type: 2,//1是采购退货，2是销售退货
          orderDetails: [{
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
          }],
          contacts: '',//联系人
          cel: '',//手机号
          address: '',//退货地址
          orderAmount: '',
          payAmount:'',
//          depositBank: '',//开户行
//          depositBankName: '',//开户名称
//          depositBankAccount: '',//开户账号
//          postcode: '',//邮编
          remark: '',//备注
          att: [],//附件
//          deliveryInfo:''
        },
        operationLogVisible: false,
        operationList: [],
        imgToken: '',
        invoiceTypes: [
          {
            id: 0,
            name: '不开发票'
          },
          {
            id: 1,
            name: '电子发票'
          },
          {
            id: 2,
            name: '普通发票'
          }
        ]
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
      let self = this;
      self.getImgAccess(function (data) {
        self.imgToken = data;
      })
    },
    components: {
      'uploadfiles': require('../../../components/uploadfiles'),
    },
    methods: {
      select(id){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          returnOrderId: id,
        };
        self.httpApi.returnOrder.selectSaleReturnOrderById(requestData, function (data) {
          self.form = self.formPass(self.form, data.data);
          self.form.att = JSON.parse(self.form.att);
        });
      },
    }
  }
</script>
