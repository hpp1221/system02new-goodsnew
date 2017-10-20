<template>
  <div class="container">
    <div class="wrapper">
      <div class="goodsinout-detail-top">
        <div class="left">
          <p><span v-for="o in totalOrderStatus" v-if="form.orderStatus == o.id">{{o.name}}</span></p>
          <p>退货单号: <span>{{form.orderNumber}}</span></p>
          <p>供应商名称: <span>{{form.partnerName}}</span></p>
        </div>
      </div>
      <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="80px">
        <el-table :data="form.orderDetails" border>
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
          <el-table-column label="审批价" prop="approvePrice">

          </el-table-column>
          <el-table-column label="备注" prop="remark">

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
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
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
        form: {
          partnerId: '',
          partnerName: '',
          type: 1,//1是采购退货，2是销售退货
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
          depositBank: '',//开户行
          depositBankName: '',//开户名称
          depositBankAccount: '',//开户账号
          postcode: '',//邮编
          remark: '',//备注
          att: '',//附近
//          deliveryInfo:''
        },
        editDeliveryForm: {
          customer: '',
          userName: '',
          userPhone: '',
          userAddress: ''
        },
        rules: {},
        listIndex: '',//现在正在添加的某个list的下标
        goodsInfoList: [],
        editDeliveryVisible: false,
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
        });
      },
      editDelivery(){//显示修改模态框
        this.editDeliveryVisible = true;
        this.editDeliveryForm = this.formPass(this.editDeliveryForm, this.form.orderShipment);
      },
      sureEdit(){//确认修改
        this.editDeliveryVisible = false;
        this.form.orderShipment = this.formPass(this.form.orderShipment, this.editDeliveryForm);
      },
      querySearchAsync(queryString, cb){//商品关键字查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          keyword: queryString,
        };
        self.httpApi.stock.goodsInfo(requestData, function (data) {
          let list = data.data;
          for (let i = 0, listLength = list.length; i < listLength; i++) {
            list[i].combination = list[i].goodsNo + list[i].goodsName;
            list[i].subtotal = '';
            list[i].num = '';
          }
          self.goodsInfoList = list;
          // 调用 callback 返回建议列表的数据
          cb(self.goodsInfoList);
        });
      },
      handleSelect(item){//判断是否已选该商品
        let list = this.form.orderDetails;
        for (let i = 0; i < list.length; i++) {
          if (item.goodsNo === list[i].goodsNo) {
            this.$message.error('已有此类商品');
            this.form.orderDetails[this.listIndex].combination = ''
            return
          }
        }
        this.form.orderDetails[this.listIndex] = item
      },
      handleClick(index){//存商品index
        this.listIndex = index
      },
      submit(){//提交订单
        let self = this;
        let requestData = {token: window.localStorage.getItem('token'), order: JSON.stringify(self.form)};
        self.httpApi.order.create(requestData, function (data) {
          self.$router.push('/order/orderlist');
        });
      },
    }
  }
</script>
