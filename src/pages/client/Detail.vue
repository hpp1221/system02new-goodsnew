<template>
  <div class="container">
    <div class="wrapper">
     <div style="overflow: hidden">
       <el-button @click="returnBrandList" style="float: right;margin-right: 100px">返回</el-button>
     </div>
      <el-form ref="form" :model="form" inline style="padding:30px 0px 0px 123px">
        <el-form-item label="客户姓名">
          <el-input v-model="form.sysMember.memberName" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户手机">
          <el-input v-model="form.sysMember.mobile" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <!--<el-cascader-->
          <!--:options="addressName"-->
          <!--:change-on-select="true"-->
          <!--@change="addressName">-->
          <el-input style="width:366px;margin-right: 200px" v-model="addressNameDetail + form.store.address" :disabled="true"></el-input>
          <!--</el-cascader>-->
        </el-form-item>
        <el-form-item label="认证状态" v-model="form.sysMember.authentication">
          <el-input  :label="t.name" :key="t.value" :value="t.name" v-for="t in totalOrderStatus" v-if="form.sysMember.authentication == t.value" style="width:366px;margin-right: 200px" :disabled="true">{{t.name}}</el-input>
        </el-form-item>
        <el-form-item label="法人代表">
          <el-input v-model="form.store.legalName" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-input v-model="form.store.businessLicenseNo" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户账号">
          <el-input v-model="form.sysMember.loginId" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="门店名称">
          <el-input v-model="form.store.name" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="门店面积">
          <el-input v-model="form.store.sellingArea" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户积分">
          <el-input v-model="form.points" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="凭证上传">
          <div v-for="(u,index) in form.brandDealerVoucherList" :key="index" style="float: left;margin:20px 280px 50px 66px;width: 18%;text-align: center">
            <uploadoneimg
              style="width:265px"
              :fileList="u.url"
              @getFileList="getFileList"
              @click.native="clickIndex = index"
              :title="u.name"
            >
            </uploadoneimg>
            <span>{{u.name}}</span>
          </div>
        </el-form-item>
        <!--<el-form-item style="float: right;margin-right: 100px">-->
          <!--<el-button @click="returnBrandList">返回</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </div>
  </div>
</template>
<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    data() {
      return {
        addressData: [],//所有省市区数据
        selectedOptions2: [],//地址
        types:[],
        addressNameDetail:'',
        form: {
          store:{
            legalName:'',
            memberName:'',
            name:'',
            sellingArea:'',
            address:'',
            businessLicenseNo:'',
            provinceId: '',
            cityId: '',
            areaId: '',
            streetId:'',
            num:'',

          },
          sysMember:{
            authentication:'',
            loginId:'',
            memberName:'',
            mobile:'',
            status:'',

          },
          brandDealerVoucherList: [],
        },
        totalOrderStatus: [
          {
            name: '全部',
          },
          {
            name: '未认证',
            value:0
          },
          {
            name: '待审核',
            value: 2
          },
          {
            name: '已认证',
            value: 1
          },
          {
            name: '认证驳回',
            value: -1
          },
        ],//认证状态
      }
    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
      this.getImgUploadType();//凭证上传
      this.getPrivence();//所有省市区
    },
    components: {
      ElInput,
      ElButton,
      'uploadoneimg': require('../../components/uploadoneimg'),
    },
    methods: {
      getFileList(file) {//凭证上传图片
        this.form.brandDealerVoucherList[this.clickIndex].url = file.url;
      },
      getImgUploadType() {//凭证上传
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'brand_dealer_voucher'}, function (data) {
          self.types = data.data.list;
        })
      },
      getPrivence() {//所有省市区
        let self = this
        let requestData = {}
        self.httpApi.dict.selectRegionTree(requestData, function (data) {
          self.addressData = data.data.regionTrees;
        })
      },
      handleChange(value) {
        this.form.provinceId = value[0]
        this.form.cityId = value[1]
        this.form.areaId = value[2]
      },
      select(id) {//详情接口
        let self = this
        let requestData = {
          memberId: id
        }
        self.httpApi.vip.selectStoreMemberInfoById(requestData, function (data) {
          self.form.store= data.data.store;
          self.form.sysMember = data.data.sysMember;
          self.form.brandDealerVoucherList= data.data.storeVouchers
          self.addressNameDetail = self.getAddressName(self.form.store.provinceId,self.form.store.cityId,self.form.store.areaId,self.form.store.streetId)
        });

      },

      returnBrandList(){//返回列表主页
        this.$router.push('/client/clientmanagement')
      },

    }
  }
</script>
