<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">售后订单详情</h3>
      <el-form ref="easyForm" :model="easyForm" inline style="overflow: hidden">
        <el-form-item label="订单号 :">
{{easyForm.orderNumber}}
        </el-form-item>

        <el-form-item label="下单时间 :">
          {{moment(easyForm.order.createTime).format('YYYY-MM-DD HH:mm:ss')}}
        </el-form-item>

        <el-table :data="easyForm.order.orderItemList" border>
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
        </el-table>
        <br>
        <el-form-item>
          <div>
            <p>总金额 : {{easyForm.order.totalPrice}}</p>
          </div>
          <div>
            <p>优惠金额 : {{totalReducePrice}}</p>
          </div>
          <div>
            <p>应付金额 : {{easyForm.order.paymentPrice}}</p>
          </div>
        </el-form-item>
        <br>
        <el-form-item label="退款金额">
          <el-input v-model="easyForm.refundPrice"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="售后原因">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="多行输入"
            v-model="easyForm.comment"
          style="width:500px;">
          </el-input>
        </el-form-item>
        <br>
        <!--<el-form-item label="上传凭证">
          <div v-for="(u,index) in easyForm.orderAftersalesVoucherList" :key="index"
               style="float: left;margin-right: 100px;text-align: center">
            <uploadoneimg
              v-if="easyForm.orderAftersalesVoucherList.length > 0"
              :fileList="u.url"
              :disabled="true"
            >
            </uploadoneimg>
          </div>
        </el-form-item>
        <br>-->
        <el-form-item label="处理结果">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="多行输入"
            v-model="easyForm.response"
            style="width:650px;">
          </el-input>
        </el-form-item>
        <br>
        <el-form-item style="float: right">
          <el-button @click="returnAfterList">取消</el-button>
          <el-button @click="closeAfter">关闭售后</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    data() {
      return {
        totalReducePrice:'',
        easyForm:{
          orderId:'',//订单id
          orderAftersalesId:'',//售后订单号id
          orderNumber:'',//订单号
          orderAftersalesVoucherList:[],
          tableData: [],
          comment:'',//售后原因
          response:'',//售后处理
          refundPrice:'',//退款金额
          order:{
            memberId:'',
            memberName:'',
            paymentPrice: '',//所有商品加的应付总额
            totalPrice:'',//总金额

            orderNumber: '',
            sellerName: '',
            createTime: '',
            orderDetail:{
              contacts: '',
              address:'',
              mobile:''
            },
            orderItemList: [{
              itemId:'',//订单项id
              goodsSkuNumber: '',//商品编号
              goodsTitle: '',//商品名
              goodsSku: '',//规格
              goodsSkuUnit: '',
              catName: '',
              catId: '',
              number: '',
              subtotal: '',//小计
              putPrice: '',//价格
              reducePrice:'',//优惠
              combination: '',//编号和名称组合
              goodsSkuId: '',//规格id
            }],
          }
        },
        feedbackStatus: [
          {
            id: 1,
            name: '未关闭售后'
          },
          {
            id:2,
            name:'已关闭售后'
          }
        ],//状态
      }
    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    components: {
      ElInput,
      ElButton,
      'uploadoneimg': require('../../components/uploadoneimg'),
    },
    methods: {
      select(id) {//查询
        let self = this;
        let requestData = {
          orderAftersalesId:id,
        };
//        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.httpApi.aftersale.selectOrderAftersalesById(requestData, function (data) {
          console.log('drtasi',data);
          self.easyForm = data.data;
          self.totalReducePrice = self.easyForm.order.totalPrice - self.easyForm.order.paymentPrice;
          self.totalReducePrice = self.totalReducePrice.toFixed(2);
        });
      },
      returnAfterList(){
          this.$router.push('/aftersale/list')
      },
      closeAfter(){
        let self = this;
        let requestData = {
          orderId:self.easyForm.orderId,
          orderAftersalesId:self.easyForm.orderAftersalesId,
          orderAftersalesStatus:2,
          comment:self.easyForm.comment,
          response:self.easyForm.response,
          refundPrice:self.easyForm.refundPrice
        };
//        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.httpApi.aftersale.updateOrderAftersalesStatus(requestData, function (data) {
          self.$router.push('/aftersale/list')
        });
      },
    }
  }
</script>
