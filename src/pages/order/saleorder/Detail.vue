<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">销售订单详情</h3>
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
            :fileList="form.att"
            :disabled="true">
          </uploadfiles>
        </el-form-item>
        <el-form-item label="操作日志" style="clear: both">
          <el-switch
            v-model="operationLogVisible"
            active-text=""
            inactive-text="">
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
          att: [],//附件
//          deliveryInfo:''
        },

        operationLogVisible: false,
        operationList: [],
        totalOrderStatus: [
          {
            name: '作废',
            id: 8
          },
          {
            name: '待确认审核',
            id: 9
          },
          {
            name: '待收款确认',
            id: 10
          },
          {
            name: '待出库确认',
            id: 11
          },
          {
            name: '已完成',
            id: 12
          },
        ],//订单状态
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
    watch: {
      operationLogVisible: function (newVal, oldVal) {
        if (newVal && this.operationList.length === 0) {
          this.getOperationList();
        }
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
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
