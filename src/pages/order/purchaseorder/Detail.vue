<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">采购订单详情</h3>
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
          <p><i class="el-icon-edit" @click="editDelivery" style="cursor: pointer"></i>客户名称：{{form.customer}} 收货人：{{form.contacts}} 联系电话：{{form.cel}} 收货地址：{{form.address}}
          </p>
        </el-form-item>
        <el-form-item label="交货日期">
          <el-date-picker
            v-model="form.deliveryTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发票信息">
          <el-select v-model="form.invoiceType">
            <el-option v-for="i in invoiceTypes" :key="i.id" :value="i.id" :label="i.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input type="textarea" v-model="form.remark" class="form-input" autosize resize="none"></el-input>
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
          orderDetails: [{
            goodsNo: '123',//商品编号
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
//          deliveryInfo:''
        },
        editDeliveryForm: {
          customer: '',
          contacts: '',
          cel: '',
          address: ''
        },
        rules: {},
        listIndex: '',//现在正在添加的某个list的下标
        goodsInfoList: [],
        editDeliveryVisible: false,
        operationLogVisible:false,
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
        operationList:[],
      }
    },
    created(){
      this.$route.params.id ?　this.select(this.$route.params.id) : this.$router.push('/error');
    },
    watch:{
      operationLogVisible:function (newVal,oldVal) {
        if(newVal && this.operationList.length === 0){
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
        }
        self.$http.post('/ui/order/detail', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('detail',response);
          if (data.code == 10000) {
            self.form = self.formPass(self.form,data.data);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getOperationList(){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          orderId: this.$route.params.id,
        }
        self.$http.post('/ui/order/log', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('detail',response);
          if (data.code == 10000) {
            self.operationList = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      editDelivery(){//显示修改模态框
        this.editDeliveryVisible = true;
        this.editDeliveryForm = this.formPass(this.editDeliveryForm,this.form.orderShipment);
      },
      sureEdit(){//确认修改
        this.editDeliveryVisible = false;
        this.form.orderShipment = this.formPass(this.form.orderShipment,this.editDeliveryForm);
      },
      querySearchAsync(queryString, cb){//商品关键字查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          keyword: queryString,
          companyId: 1
        }
        self.$http.post('/ui/goodsInfo', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log(response.data);
          if (data.code == 10000) {
            let list = data.data;
            for (let i = 0, listLength = list.length; i < listLength; i++) {
              list[i].combination = list[i].goodsNo + list[i].goodsName;
              list[i].subtotal = '';
              list[i].num = '';
            }
            self.goodsInfoList = list;
            // 调用 callback 返回建议列表的数据
            cb(self.goodsInfoList);
          }
        }).catch(function (error) {
          console.log(error);
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

        self.$http.post('/ui/order/create', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('order/create', response)
          if (data.code == 10000) {
            self.$router.push('/order/orderlist');
            //self.tableData = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>
