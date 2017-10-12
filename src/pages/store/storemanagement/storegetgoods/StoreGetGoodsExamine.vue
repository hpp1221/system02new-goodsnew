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
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        titleForm: {
        },
        form:{
          tradeNumber:'',
          storeId:'',
          storeName:''
        }
      }
    },
    created(){
      this.$route.query.tradeId ? this.getGoodsExamine(this.$route.query.tradeId) : this.$router.push('/error');
    },
    methods: {
      getGoodsExamine(tradeId) {
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          type: 2,
          tradeId:tradeId
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
      },
      getGoodsExaminePass(){
//        let self = this;
//        let requestData = {
//          token: window.localStorage.getItem('token'),
//          type: 2,
//          tradeId:tradeId
//        }
//        self.$http.post('/ui/examine', self.qs.stringify(requestData)).then(function (response) {
//          let data = response.data;
//          console.log('examine', response);
//          if (data.code == 10000) {
            this.$router.push('/store/storemanagement/storegetgoods/storegetgoodslist');
////            self.form = self.formPass(self.form, data.data);
//          }
//        }).catch(function (error) {
//          console.log(error);
//        });
//
      }
    },

  }
</script>
