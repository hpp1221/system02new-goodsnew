<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">新增退货单</h3>
      <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="80px">
        <el-form-item label="供应商">
          <el-input
            v-model="form.supplier"
            class="form-input"
            placeholder="请选择供应商">
            <i slot="suffix" class="iconfont icon-more" @click="iconClick" style="cursor:pointer;line-height: 40px"></i>
          </el-input>
        </el-form-item>
        <el-table :data="form.orderDetails">
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
              <el-autocomplete
                @click.native="handleClick(scope.$index)"
                v-model="scope.row.combination"
                :trigger-on-focus="false"
                :fetch-suggestions="querySearchAsync"
                @select="handleSelect"
                :props="{value:'combination',label:'combination'}"
                icon="el-icon-more">
              </el-autocomplete>
            </template>
          </el-table-column>

          <el-table-column label="规格" prop="goodsSpec">

          </el-table-column>
          <el-table-column label="数量">
            <template scope="scope">
              <el-input v-model="scope.row.num" @keyup.native="judgeNum(scope.row.num,scope.$index)"
                        @afterpaste.native="judgeNum(scope.row.num,scope.$index)"></el-input>
            </template>
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
        <div class="order-table-total">
          <div class="top">
            <el-checkbox class="checkbox"></el-checkbox>
            <p class="checkbox">已经申请退货，请输入获批退款金额：</p>
            <el-input class="input"></el-input>
          </div>
          <div class="bottom">
            <p class="first-p">审批价格：</p>
            <p class="second-p">86.40</p>
          </div>
        </div>
        <el-form-item label="退款信息" style="margin-top: 20px;clear:both">
          <p><i class="el-icon-edit" @click="editDelivery"
                style="cursor: pointer"></i>客户名称：{{form.orderShipment.customer}} 收货人：{{form.orderShipment.userName}} 联系电话：{{form.orderShipment.userPhone}} 收货地址：{{form.orderShipment.userAddress}}
          </p>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input type="textarea"v-model="form.remark" class="form-input" autosize resize="none"></el-input>
        </el-form-item>
        <el-form-item label="附件信息">
          <!--<uploadfiles-->
          <!--:fileList="form.annex"-->
          <!--:disabled="true"-->
          <!--:token="imgToken"-->
          <!--v-if="imgToken">-->
          <!--</uploadfiles>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="修改收货信息" :visible.sync="editDeliveryVisible" size="tiny">
        <el-form :model="editDeliveryForm" label-width="70px">
          <el-form-item label="客户名称">
            <el-input v-model="editDeliveryForm.customer"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="editDeliveryForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="editDeliveryForm.userPhone"></el-input>
          </el-form-item>
          <el-form-item label="仓库地址">
            <el-input v-model="editDeliveryForm.userAddress"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="sureEdit" type="primary">确定</el-button>
          <el-button @click="editDeliveryVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="选择供应商" :visible.sync="supplierListVisible" size="tiny">
        <el-table :data="supplierList">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="供应商名称" prop="name">

          </el-table-column>
          <el-table-column label="供应商编码" prop="brandName">

          </el-table-column>
          <el-table-column label="联系人" prop="catName">

          </el-table-column>
          <el-table-column label="电话" prop="unit">

          </el-table-column>
        </el-table>
        <pagination @setChanged="pageChanged" :totalPage="totalPage"></pagination>
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
          supplier: '',
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
        supplierListVisible: false,//供应商modal
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
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
    components: {
      'pagination': require('../../../components/pagination')
    },
    created(){
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
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
      iconClick(){//输入框icon点击事件
        this.supplierListVisible = true;
      },
      judgeNum(value, index){//判断数量是否为整数
        this.form.orderDetails[index].num = value.replace(/\D/g, '');
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
      addLine(){//添加一行
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
      deleteLine(index){
        this.form.orderDetails.length === 1 ? this.$message('请至少选择一个商品') : this.form.orderDetails.splice(index, 1);
      },
    }
  }
</script>
