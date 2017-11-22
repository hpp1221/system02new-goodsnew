<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="品牌商名称">
          <el-input v-model="form.name" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.mobile" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="银行名称">
          <el-input v-model="form.bankName" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="银行支行">
          <el-input v-model="form.bankBranch" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="收款账号">
          <el-input v-model="form.bankAccount" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="凭证上传">
          <el-upload
            action="http://upload.qiniu.com/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        form: {
          name: '',
          bankName:'',
          bankBranch:'',
          contacts: '',
          mobile: '',
          address: '',
          bankAccount: '',
          brandDealerVoucherList:[
//            brandDealerVoucher:{
//           type
//        url
//      }

          ],
          brandType:'brand_dealer_voucher'
        },
      }
    },
    created(){
      this.getType()
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getType() {//获取凭证数据字典
        let self = this
        let requestData = {
          type:self.form.brandType
        };
        self.httpApi.stock.selectDictByType(requestData, function (data) {
          self.form.brandDealerVoucherList = data.data.list;
        });
      },
      getFileList(file) {//商品图片
        console.log('file', file)
        this.form.img = file.url;
      },
      onSubmit() {
        let self = this
        let requestData = {
          name: self.form.name,
          contacts: self.form.contacts,
          mobile: self.form.mobile,
          address: self.form.address,
          bankAccount: self.form.bankAccount,
          bankName:self.form.bankName,
          bankBranch:self.form.bankBranch,

        };
        self.httpApi.stock.addBrandDealer(requestData, function (data) {
          self.$router.push('/stock/inoutdetail/list')
        });
      }
    }
  }
</script>
