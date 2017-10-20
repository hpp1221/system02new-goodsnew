<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">采购订单详情</h3>
      <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="80px">
        <el-form-item label="订单状态">
          <span v-for="t in totalOrderStatus" v-if="form.orderStatus == t.id">{{t.name}}</span>
        </el-form-item>
        <el-form-item label="订单号">
          <span>{{form.orderNumber}}</span>
        </el-form-item>
        <el-form-item label="业务员">
          <span>{{form.creater}}</span>
        </el-form-item>
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
          <p><i class="el-icon-edit" @click="editDelivery"
                style="cursor: pointer"></i>客户名称：{{form.customer}} 收货人：{{form.contacts}} 联系电话：{{form.cel}} 收货地址：{{form.address}}
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
      <el-dialog title="修改收货信息" :visible.sync="editDeliveryVisible" size="tiny">
        <el-form :model="editDeliveryForm" label-width="70px">
          <el-form-item label="客户名称">
            <el-input v-model="editDeliveryForm.customer"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="editDeliveryForm.contacts"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="editDeliveryForm.cel"></el-input>
          </el-form-item>
          <el-form-item label="仓库地址">
            <el-input v-model="editDeliveryForm.address"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="sureEdit" type="primary">确定</el-button>
          <el-button @click="editDeliveryVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        form: {
          creater: '',
          orderStatus: '',
          orderNumber: '',
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
          }],
          customer: '',//客户名称
          contacts: '',//收货人
          cel: '',//联系方式
          address: '',//收货地址
          deliveryTime: '',//交货日期
          invoiceType: '',//发票信息
          remark: '',//备注
          att: []
//          deliveryInfo:''
        },
        editDeliveryForm: {
          customer: '',
          contacts: '',
          cel: '',
          address: ''
        },
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
        rules: {},
        listIndex: '',//现在正在添加的某个list的下标
        goodsInfoList: [],
        editDeliveryVisible: false,
        operationLogVisible: false,
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
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
      let self = this;
      let requestData = {
        token: window.localStorage.getItem('token'),
        bucketName: 'sass'
      };
      self.httpApi.aliyun.imgSignature(requestData, function (data) {
        self.imgToken = data.data;
      });
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
      getOperationList(){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          orderId: this.$route.params.id,
        }
        self.httpApi.order.log(requestData, function (data) {
          self.operationList = data.data;
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
