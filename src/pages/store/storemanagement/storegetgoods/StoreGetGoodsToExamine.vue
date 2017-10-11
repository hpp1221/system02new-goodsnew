<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="titleForm" :model="titleForm" class="storegetgoods-nav storegetgoodsdetail-title">
        <el-form-item class="storegetgoodsdetail-title-left">
          <h3>门店要货详情</h3>
        </el-form-item>
        <el-form-item class="storegetgoodsdetail-title-right">
          <el-button type="text" @click="leadInSupplier"
                     class="iconfont icon-erp-dayin storegetgoodsdetail-titleoperation">打印
          </el-button>
          <el-button type="text" @click="outputSupplier"
                     class="iconfont icon-erp-daochu storegetgoodsdetail-titleoperation">导出
          </el-button>
          <el-button type="text" @click="createSupplier"
                     class="iconfont icon-erp-yizuofeiicon storegetgoodsdetail-titleoperation">作废
          </el-button>
          <el-button @click="createSupplier">通过</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" :rules="rules" class="request-form storegetgoods-nav" label-width="80px">

        <el-form-item label="单据编码" class="createstoregetgoods-number">
          <el-input v-model="form.tradeNumber">
          </el-input>
        </el-form-item>
        <el-form-item label="要货门店" class="createstoregetgoods-number">
          <el-select placeholder="滨江店" v-model="form.storeId">
          </el-select>
        </el-form-item>
        <el-form-item label="要货人" class="createstoregetgoods-number">
          <el-input v-model="form.storeName">
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
          tradeNumber: '',
          storeId:'',
          storeName:''
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
    watch: {},
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
    created(){
      this.$route.query.id ?　this.select(this.$route.query.id) : this.$router.push('/error');
    },
    methods: {
      select(id) {
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          id: id,
        }
        self.$http.post('/ui/getGoodsRecordDetail', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('detail', response);
          if (data.code == 10000) {
            self.form = self.formPass(self.form, data.data);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>
