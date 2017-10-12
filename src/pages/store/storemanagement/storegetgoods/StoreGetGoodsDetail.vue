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
          <el-button @click="getGoodsExaminePass">通过</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" :rules="rules" class="request-form storegetgoods-nav" label-width="80px"
               inline>
        <el-form-item label="单据编码">
          {{form.tradeNumber}}
        </el-form-item>
        <el-form-item label="要货门店">
          {{form.storeName}}
        </el-form-item>
        <el-form-item label="要货人">
          {{form.createUserName}}
        </el-form-item>
        <el-table :data="form.getGoodsRecordDetails" border>
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
          <el-table-column label="主图" width="80" props="img">
            <template scope="scope">
              <img :src="scope.row.img" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>
            </template>
          </el-table-column>
          <el-table-column label="商品编码  商品名称" width="180">
            <template scope="scope">
              <el-autocomplete v-model="scope.row.combination"
                               :props="{value:'combination',label:'combination'}">
              </el-autocomplete>
            </template>
          </el-table-column>
          <el-table-column label="商品编码" props="goodsNumber">

          </el-table-column>
          <el-table-column label="商品名称" props="goodsName">

          </el-table-column>
          <el-table-column label="规格" prop="goodsSpec">

          </el-table-column>
          <el-table-column label="要货仓库" prop="storeHouseName">

          </el-table-column>
          <el-table-column label="门店库存" prop="count">

          </el-table-column>
          <el-table-column label="仓库库存" prop="count">

          </el-table-column>
          <el-table-column label="要货数量" props="count">
            <template scope="scope">
              <el-input v-model="scope.row.count"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="unit">

          </el-table-column>
          <el-table-column label="单价" prop="price">

          </el-table-column>
          <el-table-column label="金额" prop="sum">

          </el-table-column>
          <el-table-column label="备注" prop="remark">
          </el-table-column>
        </el-table>
      </el-form>
      <h4 class="el-icon-arrow-down" style="margin-top: 30px">操作日志</h4>
      <el-table :data="tableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="操作时间">

        </el-table-column>

        <el-table-column prop="number" label="操作人">

        </el-table-column>
        <el-table-column prop="tel" label="状态">

        </el-table-column>
        <el-table-column prop="address" label="备注">

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          tradeNumber: '',
          storeId: '',
          storeName: '',
          createUseraName: '',
          getGoodsRecordDetails: [{
            combination:''
          }]
        },
        rules: {},
        listIndex: '',//现在正在添加的某个list的下标
        goodsInfoList: [],
        editDeliveryVisible: false,
      }
    },
    created() {
      this.$route.query.id ? this.select(this.$route.query.id) : this.$router.push('/error');
    },
    methods: {
      select(id) {//详情列表
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          id: id,
        }
        self.$http.post('/ui/getGoodsRecordDetail', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('detail', response);
          if (data.code == 10000) {
            self.form = data.data
            self.form.getGoodsRecordDetails = data.data.list
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getGoodsExaminePass() {
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          type: 2,
          tradeId: tradeId
        }
        self.$http.post('/ui/examine', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('examine', response);
          if (data.code == 10000) {
//            self.form = self.formPass(self.form, data.data);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>
