<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="品牌商名称">
          <el-input v-model="form.name" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="品牌商logo">
          <uploadoneimg
            :fileList="form.logoUrl"
            @getFileList="getFileLogo">
          </uploadoneimg>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.mobile" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="品牌商地址 : ">
          <el-cascader
            :options="addressData"
            v-model="selectedOptions2"
            :change-on-select="true"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
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
          <div v-for="(u,index) in form.brandDealerVoucherList" :key="index" style="float: left;margin-right: 100px;text-align: center">
            <uploadoneimg
              :fileList="u.url"
              @getFileList="getFileList"
              @click.native="clickIndex = index"
              :title="u.name"
              >
            </uploadoneimg>
            <span>{{u.name}}</span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="BrandAddCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    data() {
      return {
        addressData: [],//所有省市区数据
        selectedOptions2:[],//地址
        form: {
          name: '',
          bankName: '',
          bankBranch: '',
          contacts: '',
          mobile: '',
          address: '',
          bankAccount: '',
          logoUrl:'',
          provinceId:'',
          cityId:'',
          areaId:'',
          brandDealerVoucherList: [],
        },
      }
    },
    created() {
      this.getImgUploadType()//凭证上传
      this.getPrivence();
    },
    components: {
      ElInput,
      ElButton,
      'uploadoneimg': require('../../../components/uploadoneimg'),
    },
    methods: {
      getPrivence() {//所有省市区
        let self = this
        let requestData = {}
        self.httpApi.stock.selectRegionTree(requestData, function (data) {
          self.addressData = data.data.regionTrees;
        })
      },
      handleChange(value) {
        this.form.provinceId = value[0]
        this.form.cityId = value[1]
        this.form.areaId = value[2]
      },
      getImgUploadType(){//凭证上传
        let self = this;
        self.httpApi.stock.selectDictByType({type: 'brand_dealer_voucher'}, function (data) {
          let types = data.data.list;
          for (let i = 0; i < types.length; i++) {
            self.form.brandDealerVoucherList.push({type: types[i].value, url: '', name: types[i].name});
          }
        })
      },
      getFileList(file){//凭证上传图片
        this.form.brandDealerVoucherList[this.clickIndex].url = file.url;
      },
      getFileLogo(file){//品牌商logo
        this.form.logoUrl = file.url;
      },

      onSubmit() {//新增接口
        let self = this
        self.httpApi.stock.addBrandDealer(self.form, function (data) {
          self.$router.push('/stock/inoutdetail/list')
        });
      },
      BrandAddCancel(){
        this.$router.push('/stock/inoutdetail/list')
      }
    }
  }
</script>
