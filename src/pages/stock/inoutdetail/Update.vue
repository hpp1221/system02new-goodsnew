<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="品牌商名称">
          <el-input v-model="form.name" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="品牌商logo" v-if="form.logoUrl.length > 0">
          <uploadoneimg
            :fileList="form.logoUrl"
            @getFileList="getFileLogo">
          </uploadoneimg>
          <!--<img v-lazy="form.logoUrl" style="border:1px dashed #d8dce5">-->
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.mobile" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="品牌商地址">
          <el-cascader
            :options="addressData"
            v-if="selectedOptions2"
            v-model="selectedOptions2"
            :change-on-select="true"
            @change="handleChange">
          </el-cascader>

          <!--<el-input style="width:25%" v-model="addressNameDetail + form.address"></el-input>-->
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
          <div v-for="(u,index) in form.brandDealerVoucherList" :key="index"
               style="float: left;margin-right: 100px;text-align: center">
            <uploadoneimg
              :fileList="u.url"
              @getFileList="getFileList"
              @click.native="clickIndex = index"
              :title="u.name"
            >
            </uploadoneimg>
            <span>{{u.name}}</span>
          </div>
          <!--<div v-for="u in form.brandDealerVoucherList"-->
          <!--style="float: left;text-align: center;margin-right: 50px">-->
          <!--<img v-lazy="u.url" style="border:1px dashed #d8dce5">-->
          <!--<p>{{u.name}}</p>-->
          <!--</div>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sureUpdate">确认</el-button>
          <el-button type="primary" @click="cancelUpdate">取消</el-button>
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
        selectedOptions2: [],//地址
        types: [],
        addressNameDetail: '',
        form: {
          brandDealerId:'',
          name: '',
          bankName: '',
          bankBranch: '',
          contacts: '',
          mobile: '',
          address: '',
          bankAccount: '',
          logoUrl: '',
          provinceId: '',
          cityId: '',
          areaId: '',
          streetId: '',
          brandDealerVoucherList: [],

        },
      }
    },
    created() {
      this.getImgUploadType()//凭证上传
      this.getPrivence();
      if (!this.$route.params.id) {
        this.$router.push('/error');
      }
    },
    components: {
      ElInput,
      ElButton,
      'uploadoneimg': require('../../../components/uploadoneimg'),
    },
    methods: {
      getFileLogo(file) {//品牌商logo
        console.log('file', file)
        this.form.logoUrl = file.url;
      },
      getFileList(file) {//凭证上传图片
        this.form.brandDealerVoucherList[this.clickIndex].url = file.url;
      },
      getPrivence() {//所有省市区
        let self = this
        let requestData = {}
        self.httpApi.stock.selectRegionTree(requestData, function (data) {
          self.addressData = data.data.regionTrees;
          self.select(self.$route.params.id)
        })
      },
      handleChange(value) {
        this.form.provinceId = value[0]
        this.form.cityId = value[1]
        this.form.areaId = value[2]
      },
      getImgUploadType() {//凭证上传
        let self = this;
        self.httpApi.stock.selectDictByType({type: 'brand_dealer_voucher'}, function (data) {
          self.types = data.data.list;

        })
      },
      select(id) {//详情接口
        let self = this
        let requestData = {
          brandDealerId: id
        }
        self.httpApi.stock.selectBrandDealerById(requestData, function (data) {
          self.form = self.formPass(self.form, data.data.brandDealer);
          self.selectedOptions2.push('' + self.form.provinceId, '' + self.form.cityId, '' + self.form.areaId)
          let brandDealerVoucherList = self.form.brandDealerVoucherList;
          let brandDealerVouchers = [];
          for (let i = 0; i < brandDealerVoucherList.length; i++) {
            for (let j = 0; j < self.types.length; j++) {
              if (brandDealerVoucherList[i].type == self.types[j].value) {
                brandDealerVouchers.push({
                  type: self.types[j].value,
                  url: brandDealerVoucherList[i].url,
                  name: self.types[j].name
                })
              }
            }
          }
          self.form.brandDealerVoucherList = brandDealerVouchers;
        });
      },
      sureUpdate() {//修改确认
        let self = this
        self.httpApi.stock.updateBrandDealerById(self.form, function (data) {
          self.$router.push('/stock/inoutdetail/list')
        });
      },
      cancelUpdate() {//修改取消
        this.$router.push('/stock/inoutdetail/list')
      },
    }
  }
</script>
