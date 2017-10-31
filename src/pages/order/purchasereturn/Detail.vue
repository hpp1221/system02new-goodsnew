<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">采购退货单详情</h3>
      <el-form ref="form" :model="form" class="request-form" label-width="80px">
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
            <template slot-scope="scope">
              {{moment(scope.row.operateTime).format('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column label="操作类别" prop="operateType">
            <template slot-scope="scope">
              <span v-for="t in totalOrderStatus" v-if="t.id==scope.row.operateType">{{t.name}}</span>
            </template>
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
          returnOrderSupplierVOS: [],
          type: 1,//1是采购退货，2是销售退货
          partnerId: '',
          partnerName: '',
          orderAmount: '',
          att: []
        },
        operationList: [],
        operationLogVisible: false,
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        imgToken: '',
        totalOrderStatus: [
          {
            name: '已作废',
            id: 1
          },
          {
            name: '待退单审核',
            id: 2
          },
          {
            name: '待退款确认',
            id: 3
          },
          {
            name: '已完成',
            id: 4
          },
        ],//订单状态
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    watch: {
      operationLogVisible: function (newVal, oldVal) {
        if (newVal && this.operationList.length === 0) {
          this.getOperationList();
        }
      }
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
        self.httpApi.returnOrder.selectReturnOrderById(requestData, function (data) {
          self.form = self.formPass(self.form, data.data);
          self.form.att = JSON.parse(self.form.att);
        });
      },
      getOperationList(){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          orderId: this.$route.params.id,
        };
        self.httpApi.order.log(requestData, function (data) {
          self.operationList = data.data;
        });
      },
    }
  }
</script>
