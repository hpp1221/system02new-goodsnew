<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">订单审核</h3>
      <el-form ref="form" :model="form" class="request-form" label-width="80px">
        <el-table :data="form.orderDetails">
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <el-table-column label="主图" width="80">
            <template slot-scope="scope">
              <img :src="scope.row.url" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>
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
            <template slot-scope="scope">
              <span v-if="scope.row.subtotal">{{scope.row.subtotal}}</span>
              <span v-else></span>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item label="收货信息" style="margin-top: 20px;">
          <p v-if="form">客户名称：{{form.customer}} 收货人：{{form.contacts}} 联系电话：{{form.cel}} 收货地址：{{form.address}}
          </p>
        </el-form-item>
        <el-form-item label="交货日期">
          {{form.deliveryTime}}
        </el-form-item>
        <el-form-item label="发票信息">
          <el-select v-model="form.invoiceType">
            <el-option v-for="i in invoiceTypes" :key="i.id" :value="i.id" :label="i.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明">
          {{form.remark}}
        </el-form-item>
        <el-form-item label="附件信息">
          <!--<uploadfiles-->
          <!--:fileList="form.annex"-->
          <!--:disabled="true"-->
          <!--:token="imgToken"-->
          <!--v-if="imgToken">-->
          <!--</uploadfiles>-->
        </el-form-item>
        <el-form-item label="操作日志">
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

      <el-button @click="verifyOrder(1)">通过</el-button>
      <el-button @click="verifyOrder(2)">作废</el-button>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        activeName: 'first',
        form: {
          orderDetails: [],
          customer: '',//客户名称
          contacts: '',//收货人
          cel: '',//联系方式
          address: '',//收货地址
          deliveryTime: '',//交货日期
          invoiceType: '',//发票信息
          remark: '',//备注
//          deliveryInfo:''
        },
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
        ],
        operationList: [],
        operationLogVisible: false
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
    methods: {
      select(id){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          orderId: id,
        };
        self.httpApi.order.detail(requestData, function (data) {
          self.form = self.formPass(self.form, data.data);
          console.log(self.form)
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
      tabClick(){

      },
      verifyOrder(type){//通过还是作废
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          orderId: this.$route.params.id,
          orderStatus: this.$route.params.status,
          verifyType: type
        };
        self.httpApi.order.verify(requestData, function (data) {
          self.form = self.formPass(self.form, data.data);
          console.log(self.form)
        });
      }
    }
  }
</script>
