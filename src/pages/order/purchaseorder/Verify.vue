<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">采购订单审核</h3>
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="订单详情" name="first">
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
              <span v-for="i in invoiceTypes" v-if="form.invoiceType == i.id">{{i.name}}</span>
            </el-form-item>
            <el-form-item label="备注说明">
              {{form.remark}}
            </el-form-item>
            <el-form-item label="附件信息">
              <uploadfiles
                :fileList="form.att"
                :disabled="true"
                :token="imgToken"
                v-if="imgToken">
              </uploadfiles>
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
        </el-tab-pane>
        <el-tab-pane label="出库发货记录" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="收款记录" name="third">角色管理</el-tab-pane>
      </el-tabs>
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
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        activeName: 'first',
        writeFailReason: false,//填写作废原因
        reasonForm: {
          reason: ''
        },
        form: {
          orderId: '',
          orderStatus: '',
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
        operationLogVisible: false,
        operationList: [],
        imgToken: ''
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
      let self = this;
      self.getImgAccess(function (data) {
        self.imgToken = data;
      });
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
          orderId: id,
        };
        self.httpApi.order.detail(requestData, function (data) {
          self.form = self.formPass(self.form, data.data);
        });
      },
      tabClick(){

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
      verifyOrder(type){//通过还是作废
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          orderId: self.form.orderId,
          orderStatus: self.form.orderStatus,
          verifyType: type,
          reason: self.reasonForm.reason
        };
        self.httpApi.order.verify(requestData, function (data) {
          self.writeFailReason = false;
          self.$message.success('操作成功');
          setTimeout(function () {
            self.$router.push('/order/purchaseorder/list');
          }, 500);
        });
      }
    }
  }
</script>
