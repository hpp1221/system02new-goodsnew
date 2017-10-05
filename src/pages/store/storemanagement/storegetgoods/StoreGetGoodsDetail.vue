<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="titleForm" :model="titleForm" class="storegetgoods-nav storegetgoodsdetail-title">
        <el-form-item class="storegetgoodsdetail-title-left">
          <h3>门店要货详情</h3>
        </el-form-item>
        <el-form-item class="storegetgoodsdetail-title-right">
          <el-button type="text" @click="leadInSupplier" class="iconfont icon-erp-dayin storegetgoodsdetail-titleoperation">打印</el-button>
          <el-button type="text" @click="outputSupplier" class="iconfont icon-erp-daochu storegetgoodsdetail-titleoperation">导出</el-button>
          <el-button type="text" @click="createSupplier" class="iconfont icon-erp-yizuofeiicon storegetgoodsdetail-titleoperation">作废</el-button>
          <el-button @click="createSupplier">通过</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" :rules="rules" class="request-form storegetgoods-nav" label-width="80px">

        <el-form-item label="单据编码" class="createstoregetgoods-number">
          <el-input v-model="form.keyword">
          </el-input>
        </el-form-item>
        <el-form-item label="要货门店" class="createstoregetgoods-number">
          <el-select placeholder="滨江店" v-model="form.type">
            <el-option label="滨江店" value="-1"></el-option>
            <el-option label="江干店" value="1"></el-option>
            <el-option label="全部门店" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="要货人" class="createstoregetgoods-number">
          <el-input v-model="form.person">
          </el-input>
        </el-form-item>
        <el-table :data="form.orderDetails" border>
          <!--<el-table-column type="selection" width="55" prop="supplierId">-->
          <!--</el-table-column>-->
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <el-table-column width="70">
            <template scope="scope">
              <i class="el-icon-plus" @click="addLine"></i>
              <i class="el-icon-minus" @click="deleteLine(scope.$index)"></i>
            </template>
          </el-table-column>
          <el-table-column label="主图" width="80">
            <template scope="scope">
              <img :src="scope.row.url" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>
            </template>
          </el-table-column>
          <el-table-column label="商品编码  商品名称">
            <template scope="scope">
              <el-autocomplete v-on:click.native="handleClick(scope.$index)" v-model="scope.row.combination"
                               :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select="handleSelect"
                               :props="{value:'combination',label:'combination'}">
              </el-autocomplete>
            </template>
          </el-table-column>

          <el-table-column label="规格" prop="goodsSpec">

          </el-table-column>
          <el-table-column label="要货仓库" prop="goodsSpec">

          </el-table-column>
          <el-table-column label="门店库存" prop="goodsSpec">

          </el-table-column>
          <el-table-column label="仓库库存" prop="goodsSpec">

          </el-table-column>
          <el-table-column label="要货数量">
            <template scope="scope">
              <el-input v-model="scope.row.num" @keyup.native="judgeNum(scope.row.num,scope.$index)"
                        @afterpaste.native="judgeNum(scope.row.num,scope.$index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="goodsUnit">

          </el-table-column>
          <el-table-column label="单价" prop="price">

          </el-table-column>
          <el-table-column label="金额" prop="price">

          </el-table-column>
          <el-table-column label="备注" prop="subtotal">
            <template scope="scope">
              <i class="el-icon-plus" @click="addLine"></i>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item class="createstoregetgoods-operation">
          <el-button @click="sureEdit">确定</el-button>
          <el-button @click="editDeliveryVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          type: '',
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
          orderShipment: {
            customer: '',//客户名称
            userName: '',//收货人
            userPhone: '',//联系方式
            userAddress: '',//收货地址
          },
          deliveryTime: '',//交货日期
          invoiceType: '',//发票信息
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
    watch: {
      'form.orderDetails': {
        handler: function (val, oldVal) {
          for (let i = 0; i < val.length; i++) {
            this.form.orderDetails[i].subtotal = this.accMul(parseInt(val[i].num), val[i].price);
          }
        },
        // 深度观察
        deep: true
      }

    },
    created() {
      if (window.localStorage.getItem('userinfo')) {
        console.log('userinfo', JSON.parse(window.localStorage.getItem('userinfo')))
        let userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
        this.form.orderShipment.customer = userinfo.companyName;
        this.form.orderShipment.userName = userinfo.name;
        this.form.orderShipment.userPhone = userinfo.cel;
        this.form.orderShipment.userAddress = userinfo.companyName;

      }

    },
    methods: {
      leadInSupplier(){

      },
      judgeNum(value, index) {//判断数量是否为整数
        this.form.orderDetails[index].num = value.replace(/\D/g, '');
      },
      editDelivery() {//显示修改模态框
        this.editDeliveryVisible = true;
        this.editDeliveryForm = this.formPass(this.editDeliveryForm, this.form.orderShipment);
      },
      sureEdit() {//确认修改
        this.editDeliveryVisible = false;
        this.form.orderShipment = this.formPass(this.form.orderShipment, this.editDeliveryForm);
      },
      querySearchAsync(queryString, cb) {//商品关键字查询
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
      handleSelect(item) {//判断是否已选该商品
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
      handleClick(index) {//存商品index
        this.listIndex = index
      },
      submit() {//提交订单
        let self = this;
        let requestData = {token: window.localStorage.getItem('token')};
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
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
      addLine() {//添加一行
        this.form.orderDetails.push({
          goodsNo: '',//商品编号
          goodsName: '',//商品名
          goodsSpec: '',//规格
          goodsUnit: '',
          price: '',//价格
          num: '',
          subtotal: '',//小计
          combination: '',//编号和名称组合
          goodsSkuId: '',//规格id
        })
      },
      deleteLine(index) {
        this.form.orderDetails.length === 1 ? this.$message('请至少选择一个商品') : this.form.orderDetails.splice(index, 1);
      },
    }
  }
</script>
