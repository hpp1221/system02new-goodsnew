<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">销售订单审批</h3>
      <el-form ref="form" :model="form" class="request-form" label-width="80px">
        <el-table :data="form.orderDetails" border>
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <el-table-column label="主图" width="80">
            <template slot-scope="scope">
              <img v-lazy="scope.row.url" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>
            </template>
          </el-table-column>
          <el-table-column label="商品编码" prop="goodsNo">

          </el-table-column>
          <el-table-column label="商品名称" prop="goodsName">

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
        </el-table>
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
        <el-form-item label="收货信息" style="margin-top: 20px;">
          <p>客户名称：{{form.customer}} 收货人：{{form.contacts}} 联系电话：{{form.cel}} 收货地址：{{form.address}}
          </p>
        </el-form-item>
        <el-form-item label="交货日期">
          {{moment(form.deliveryTime).format('YYYY-MM-DD HH:mm:ss')}}
        </el-form-item>
        <el-form-item label="发票信息">
          <span v-for="i in invoiceTypes" v-if="form.invoiceType == i.id">{{i.name}}</span>
        </el-form-item>
        <el-form-item label="备注说明">
          {{form.remark}}
        </el-form-item>
        <el-form-item label="附件信息">
          <uploadfiles
            :fileList="form.annex"
            :disabled="true"
            :token="imgToken"
            v-if="imgToken">
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
          orderDetails: [{
            goodsNo: '',//商品编号
            goodsName: '',//商品名
            goodsSpec: '',//规格
            goodsUnit: '',
            catName: '',
            catId: '',
            num: '',
            subtotal: '',//小计
            price: '',//价格
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
          orderStatus: '',
          orderId: '',
          att: [],//附件
//          deliveryInfo:''
        },
        reasonForm: {
          reason: ''
        },
        operationLogVisible: false,
        operationList: [],
        writeFailReason: false,
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
    components: {
      'uploadfiles': require('../../../components/uploadfiles'),
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
      let self = this;
      self.getImgAccess(function (data) {
        self.imgToken = data;
      })
    },
    methods: {
      select(id){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          orderId: id,
        };
        self.httpApi.order.detail(requestData, function (data) {
          self.form = self.formPass(self.form, data.data);
        });
      },
      verifyOrder(status){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          orderId: self.form.orderId,
          orderStatus: self.form.orderStatus,
          verifyType: status,
          type: 2,//采购订单1，销售订单2
          reason: self.reasonForm.reason
        };
        self.httpApi.order.verify(requestData, function (data) {
          self.writeFailReason = false;
          self.$message.success('操作成功');
          setTimeout(function () {
            self.$router.push('/order/saleorder/list');
          }, 500);
        });
      }
    }
  }
</script>
