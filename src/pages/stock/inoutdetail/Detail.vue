<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="品牌商名称">
          <el-input v-model="form.name" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="品牌商logo">
          <img v-lazy="form.logoUrl" style="border:1px dashed #d8dce5">
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.mobile" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <!--<el-cascader-->
            <!--:options="addressName"-->
            <!--:change-on-select="true"-->
            <!--@change="addressName">-->
          <el-input style="width:25%" v-model="addressNameDetail + form.address"></el-input>
          <!--</el-cascader>-->
        </el-form-item>
        <!--<el-form-item label="详细地址">-->
          <!--<el-input v-model="form.address" style="width:25%"></el-input>-->
        <!--</el-form-item>-->
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
          <div v-for="u in form.brandDealerVoucherList"
               style="float: left;text-align: center;margin-right: 50px">
            <img v-lazy="u.url" style="border:1px dashed #d8dce5">
            <p>{{u.name}}</p>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="returnBrandList">返回</el-button>
          <!--<el-button @click="BrandAddCancel">取消</el-button>-->
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
        types:[],
        addressNameDetail:'',
        form: {
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
          streetId:'',
          brandDealerVoucherList: [],
        },
      }
    },
    created() {
      this.getImgUploadType()//凭证上传
      this.getPrivence();
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    components: {
      ElInput,
      ElButton,
      'uploadoneimg': require('../../../components/uploadoneimg'),
    },
    methods: {
//      addressNameDetail(provinceId,cityId,areaId,streetId) {//列表中地址显示
//        return this.getAddressName(provinceId,cityId,areaId,streetId);
//      },
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
          self.form = data.data.brandDealer
          console.log('ddd',self.form)
            self.addressNameDetail = self.getAddressName(self.form.provinceId,self.form.cityId,self.form.areaId,self.form.streetId)
          let brandDealerVoucherList = self.form.brandDealerVoucherList;
          let brandDealerVouchers =[];
          for(let i = 0 ; i<brandDealerVoucherList.length;i++){
            for(let j = 0 ; j<self.types.length;j++){
              if(brandDealerVoucherList[i].type == self.types[j].value){
                brandDealerVouchers.push({type: self.types[j].value, url: brandDealerVoucherList[i].url, name: self.types[j].name})
              }
            }
          }
          self.form.brandDealerVoucherList = brandDealerVouchers;
        });
      },
      returnBrandList(){//返回列表主页
        this.$router.push('/stock/brand/list')
      },

    }
  }
</script>
