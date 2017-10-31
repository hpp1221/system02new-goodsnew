<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">新增采购退货单</h3>
      <el-dialog title="添加退货商品" :visible.sync="addGoodsVisible" width="1000px" style="z-index:9 !important;">
        <el-table :data="orderDetailsDialog" border :span-method="arraySpanDialogMethod"
        >
          <el-table-column label="主图" width="80">
            <template slot-scope="scope">
              <img v-lazy="scope.row.url" alt="" style="width: 40px;height: 40px;margin-top: 7px;"
                   v-if="scope.row.url"/>
            </template>
          </el-table-column>
          <el-table-column label="商品编码" width="80">
            <template slot-scope="scope">
              <el-autocomplete
                v-model="scope.row.combination"
                :trigger-on-focus="false"
                :fetch-suggestions="querySearchAsync"
                @select="handleSelect"
                value-key="combination"
                icon="el-icon-more"
                popper-class="purchase-return-autocomplete">
              </el-autocomplete>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" width="80">

          </el-table-column>

          <el-table-column label="规格" prop="goodsSpec">

          </el-table-column>
          <el-table-column label="数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.num" @keyup.native="judgeNum(scope.row.num,scope.$index)"
                        @afterpaste.native="judgeNum(scope.row.num,scope.$index)"></el-input>
            </template>
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
          <el-table-column label="审批价">
            <template slot-scope="scope">
              <el-input v-model="scope.row.approvePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer">
          <el-button @click="sureAddGoods" type="primary">确定</el-button>
          <el-button @click="cancelAddGoods">取消</el-button>
        </div>
      </el-dialog>
      <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="80px">
        <el-form-item label="供应商">
          <el-input
            v-model="form.partnerName"
            class="form-input"
            placeholder="请选择供应商">
            <i slot="suffix" class="iconfont icon-more" @click="iconClick" style="cursor:pointer;line-height: 40px"></i>
          </el-input>
          <el-button @click="openGoodsDialog">添加退货商品</el-button>
        </el-form-item>
        <el-form-item v-for="(r,rindex) in form.returnOrderSupplierVOS" :key="r.partnerId" v-if="r.partnerId">
          <el-table :data="r.orderDetails" border :span-method="arraySpanMethod"
          >
            <el-table-column
              type="index"
              width="70">
            </el-table-column>
            <el-table-column width="70">
              <template slot-scope="scope">
                <i class="el-icon-minus" @click="deleteLine(rindex,scope.$index)"></i>
              </template>
            </el-table-column>
            <el-table-column label="主图" width="80">
              <template slot-scope="scope">
                <img v-lazy="scope.row.url" alt="" style="width: 40px;height: 40px;margin-top: 7px;"
                     v-if="scope.row.url"/>
              </template>
            </el-table-column>
            <el-table-column label="商品编码" width="80" prop="combination">

            </el-table-column>
            <el-table-column label="商品名称" width="80">

            </el-table-column>

            <el-table-column label="规格" prop="goodsSpec">

            </el-table-column>
            <el-table-column label="数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.num" @keyup.native="judgeNum(scope.row.num,scope.$index)"
                          @afterpaste.native="judgeNum(scope.row.num,scope.$index)"></el-input>
              </template>
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
            <el-table-column label="审批价">
              <template slot-scope="scope">
                <el-input v-model="scope.row.approvePrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item label="退款信息" style="float: left;">
            <p>
              <i class="el-icon-edit"
                 @click="editDelivery(rindex)"
                 style="cursor: pointer">

              </i>
              <span v-if="r.contacts">联系人：{{r.contacts}}</span>
              <span v-if="r.cel">联系电话：{{r.cel}}</span>
              <span v-if="r.address">退货地址：{{r.address}}</span>
              <!--<span v-if="form.depositBank">开户行：{{form.depositBank}}</span>-->
              <!--<span v-if="form.depositBankName">开户名称：{{form.depositBankName}}</span>-->
              <!--<span v-if="form.depositBankAccount">开户账号 {{form.depositBankAccount}}</span>-->
              <!--<span v-if="form.postcode">邮编：{{form.postcode}}</span>-->
            </p>
          </el-form-item>
          <el-form-item label="运单号" style="float: left;">
            <el-input v-model="r.trackingNo" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="备注说明" style="float: left;">
            <el-input type="textarea" v-model="r.remark" class="form-input" autosize resize="none"></el-input>
          </el-form-item>
        </el-form-item>
        <div class="order-table-total" v-if="form.orderAmount">
          <!--<div class="top">-->
          <!--<el-checkbox class="checkbox"></el-checkbox>-->
          <!--<p class="checkbox">已经申请退货，请输入获批退款金额：</p>-->
          <!--<el-input class="input"></el-input>-->
          <!--</div>-->
          <div class="bottom">
            <p class="first-p">审批价格：</p>
            <p class="second-p">{{form.orderAmount}}</p>
          </div>
        </div>


        <el-form-item label="附件信息" style="margin-top: 20px;clear:both" v-if="form.orderAmount">
          <uploadfiles
            :fileList="form.att"
            :token="imgToken"
            v-if="imgToken">
          </uploadfiles>
        </el-form-item>
        <el-form-item v-if="form.orderAmount">
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="修改退货信息" :visible.sync="editDeliveryVisible" width="350px">
        <el-form :model="editDeliveryForm" label-width="90px" class="request-form">
          <el-form-item label="联系人">
            <el-input v-model="editDeliveryForm.contacts" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="editDeliveryForm.cel" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="退货地址">
            <el-input v-model="editDeliveryForm.address" class="form-input"></el-input>
          </el-form-item>
          <!--<el-form-item label="仓库地址">-->
          <!--<el-input v-model="editDeliveryForm.userAddress"></el-input>-->
          <!--</el-form-item>-->
        </el-form>
        <div slot="footer">
          <el-button @click="sureEdit(editDeliveryForm.index)" type="primary">确定</el-button>
          <el-button @click="editDeliveryVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="选择供应商" :visible.sync="supplierListVisible">
        <el-table :data="supplierList" @row-click="selectSupplier">
          <el-table-column label="供应商名称" prop="name">

          </el-table-column>
          <el-table-column label="供应商编码" prop="number">

          </el-table-column>
          <el-table-column label="电话" prop="tel">

          </el-table-column>
        </el-table>
        <pagination @setChanged="pageChanged" :totalPage="totalPage"></pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        form: {
          returnOrderSupplierVOS: [
//            {
//              orderDetails: [
//                {
//                  goodsNo: '',//商品编号
//                  goodsName: '',//商品名
//                  goodsSpec: '',//规格
//                  goodsUnit: '',
//                  num: '',
//                  subtotal: '',//小计
//                  price: '',//价格
//                  combination: '',//编号和名称组合
//                  goodsSkuId: '',//规格id
//                  approvePrice: '',//审批价格
//                  remark: '',//备注
//                }
//              ],
//              trackingNo: '',
//              partnerId: '',
//              partnerName: '',
//              cel: '',
//              contacts: '',
//              address: ''
//            }
          ],
          type: 1,//1是采购退货，2是销售退货
          partnerId: '',
          partnerName: '',
          orderAmount: '',
          att: []
        },
        editDeliveryForm: {
          index: '',
          contacts: '',//联系人
          cel: '',//手机号
          address: '',//地址
//          depositBank:'',//开户行
//          depositBankName:'',//开户名称
//          depositBankAccount:'',//开户账号
//          postcode:'',//邮编
        },
        rules: {},
        goodsInfoList: [],
        editDeliveryVisible: false,
        supplierListVisible: false,//供应商modal
        addGoodsVisible: false,
        supplierList: [],
        orderDetailsDialog: [{
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
          supplierId: '',
          supplierName: ''
        }],
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        imgToken: ''
      }
    },
    created(){
      let self = this;
      self.getImgAccess(function (data) {
        self.imgToken = data;
      })
    },
    watch: {
      'orderDetailsDialog': {
        handler: function (val, oldVal) {
          for (let i = 0; i < val.length; i++) {
            this.orderDetailsDialog[i].subtotal = this.accMul(parseInt(val[i].num), val[i].price);
          }
        },
        // 深度观察
        deep: true
      },
      'form.returnOrderSupplierVOS': {
        handler: function (val, oldVal) {
          let amount = 0;
          for (let i = 0; i < val.length; i++) {
            for (let j = 0; j < val[i].orderDetails.length; j++) {
              amount += parseInt(val[i].orderDetails[j].approvePrice);
            }
          }
          this.form.orderAmount = amount;
        },
        // 深度观察
        deep: true
      }
    },
    components: {
      'pagination': require('../../../components/pagination'),
      'uploadfiles':require('../../../components/uploadfiles'),
    },
    methods: {
      openGoodsDialog(){//打开添加退货商品model
        if (!this.form.partnerId) {
          this.$message.error('请先选择供应商');
        } else {
          this.addGoodsVisible = true;
        }
      },
      sureAddGoods(){
        let vos = this.form.returnOrderSupplierVOS;
        for (let i = 0; i < vos.length; i++) {
          if (vos[i].partnerId === this.orderDetailsDialog[0].supplierId) {
            vos[i].orderDetails.push(this.orderDetailsDialog[0]);
            this.clearOrderDetailDialog();
            this.addGoodsVisible = false;
            return
          }
        }
        let self = this;
        let requestData = {
          token: localStorage.getItem('token'),
          supplierId: this.orderDetailsDialog[0].supplierId
        };
        self.httpApi.supplier.getPlatformAndChannelSupplierById(requestData, function (data) {
          let obj = {};
          obj.orderDetails = self.orderDetailsDialog;
          obj.trackingNo = '';
          obj.partnerId = self.orderDetailsDialog[0].supplierId;
          obj.partnerName = self.orderDetailsDialog[0].supplierName;
          obj.cel = data.data.cel;
          obj.contacts = data.data.contacts;
          obj.address = data.data.address;
          vos.push(obj);
          self.clearOrderDetailDialog();
          self.addGoodsVisible = false;
        });
      },
      cancelAddGoods(){
        this.clearOrderDetailDialog();
        this.addGoodsVisible = false;
      },
      clearOrderDetailDialog(){
        this.orderDetailsDialog = [{
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
          supplierId: '',
          supplierName: ''
        }];
      },
      arraySpanDialogMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 1) {
          return [1, 2];
        } else if (columnIndex === 2) {
          return [0, 0];
        }
      },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 3) {
          return [1, 2];
        } else if (columnIndex === 4) {
          return [0, 0];
        }
      },
      selectSupplier(row, event, column){
        this.form.partnerId = row.supplierId;
        this.form.partnerName = row.name;
        this.form.platform = row.platform;
        this.supplierListVisible = false;
      },
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.selectSupplierList(page.size,page.num);
      },
      iconClick(){//输入框icon点击事件
        this.supplierListVisible = true;
      },
      selectSupplierList(size,num){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        self.httpApi.supplier.listByPage(requestData, function (data) {
          self.supplierList = data.data;
          let requestData = {
            token: window.localStorage.getItem('token'),
          };
          self.httpApi.supplier.getSupplierCountByQuery(requestData, function (data) {
            self.totalPage = data.data;
          });
        });
      },
      judgeNum(value, index){//判断数量是否为整数
        this.orderDetailsDialog[index].num = value.replace(/\D/g, '');
      },
      editDelivery(index){//显示修改模态框
        this.editDeliveryVisible = true;
        this.editDeliveryForm = this.formPass(this.editDeliveryForm, this.form.returnOrderSupplierVOS[index]);
        this.editDeliveryForm.index = index;
      },
      sureEdit(index){//确认修改
        this.editDeliveryVisible = false;
        this.form.returnOrderSupplierVOS[index].contacts = this.editDeliveryForm.contacts;
        this.form.returnOrderSupplierVOS[index].cel = this.editDeliveryForm.cel;
        this.form.returnOrderSupplierVOS[index].address = this.editDeliveryForm.address;
      },
      querySearchAsync(queryString, cb){//商品关键字查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          supplierId: self.form.partnerId,
          keyword: queryString,
          type: self.form.platform
        };
        self.httpApi.goods.orderGoodsInfo(requestData, function (data) {
          let list = data.data;
          for (let i = 0, listLength = list.length; i < listLength; i++) {
            list[i].combination = list[i].goodsNo + list[i].goodsName;
            list[i].subtotal = '';
            list[i].num = '';
            list[i].approvePrice = '';
          }
          self.goodsInfoList = list;
          // 调用 callback 返回建议列表的数据
          cb(self.goodsInfoList);
        });
      },
      handleSelect(item){//判断是否已选该商品
        let list = this.form.returnOrderSupplierVOS;
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < list[i].orderDetails.length; j++) {
            if (item.goodsNo === list[i].orderDetails[j].goodsNo) {
              this.$message.error('已有此类商品');
              this.orderDetailsDialog[0].combination = '';
              return
            }
          }
        }
        this.orderDetailsDialog[0] = item;
      },

      submit(){//提交订单
        let self = this;
        let requestData = {token: window.localStorage.getItem('token'),returnOrderVO:JSON.stringify(self.form)};
       //requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.returnOrder.insertReturnOrder(requestData, function (data) {
          self.$router.push('/order/purchasereturn/list');
        });
      },
      deleteLine(outIndex, innerIndex){
        this.form.returnOrderSupplierVOS[outIndex].orderDetails.splice(innerIndex, 1);
        if (this.form.returnOrderSupplierVOS[outIndex].orderDetails.length === 0) {
          this.form.returnOrderSupplierVOS.splice(outIndex, 1);
        }
      },
    }
  }
</script>
<style>
  .purchase-return-autocomplete {
    z-index: 9999999999 !important;
  }
</style>
