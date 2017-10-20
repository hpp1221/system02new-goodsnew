<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">订单审核</h3>
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="订单详情" name="first">
          <el-form ref="form" :model="form" class="request-form" label-width="80px">
            <el-table :data="form.orderDetails">
              <el-table-column
                type="index"
                width="70">
              </el-table-column>
              <el-table-column label="主图" width="80">
                <template scope="scope">
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
                <template scope="scope">
                  <span v-if="scope.row.subtotal">{{scope.row.subtotal}}</span>
                  <span v-else></span>
                </template>
              </el-table-column>
            </el-table>
            <el-form-item label="收货信息" style="margin-top: 20px;">
              <p v-if="form.orderShipment">客户名称：{{form.orderShipment.customer}} 收货人：{{form.orderShipment.userName}} 联系电话：{{form.orderShipment.userPhone}} 收货地址：{{form.orderShipment.userAddress}}
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
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="出库发货记录" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="收款记录" name="third">角色管理</el-tab-pane>
      </el-tabs>
      <el-button @click="verifyOrder">通过</el-button>
      <el-button @click="verifyOrder">作废</el-button>
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
          orderShipment: {
            customer: '',//客户名称
            userName: '',//收货人
            userPhone: '',//联系方式
            userAddress: '',//收货地址
          },
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
        ]
      }
    },
    created(){
      this.$route.params.id ?　this.select(this.$route.params.id) : this.$router.push('/error');
    },
    methods: {
      select(id){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          orderId: id,
        };
        self.$http.post('/ui/order/detail', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('订单详情',response);
          if (data.code === 10000) {
            self.form = self.formPass(self.form,data.data);
            console.log(self.form)
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      tabClick(){

      },
      verifyOrder(){//通过还是作废
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          orderId: id,
        };
        self.httpApi.order.detail(requestData, function (data) {
          self.form = self.formPass(self.form,data.data);
        });
      }
    }
  }
</script>
