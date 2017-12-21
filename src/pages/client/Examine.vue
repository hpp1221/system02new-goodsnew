<template>
  <div class="container">
    <div class="wrapper">
      <div style="overflow: hidden">
        <!--<el-button style="float: right;margin: 20px">审核</el-button>-->
        <!--<el-button v-model="form.sysMember.authentication" v-if="item.value == form.sysMember.authentication" @click="getGoodsExaminePass" v-for="item in totalOrderStatus"-->
                   <!--:label="item.name" :key="item.name" style="float: right;margin: 20px">-->
          <!--{{item.name}}-->
        <!--</el-button>-->
        <!--<el-button type="text" @click="returnBrandList" style="float: right;margin: 20px;color: #000;font-size: 16px">返回</el-button>-->
        <el-button type="text" @click="returnBrandList" v-model="form.sysMember.authentication"  v-if="form.sysMember.authentication == 2" style="float: right;margin: 20px;font-size: 15px;color: #000">
          返回
        </el-button>
        <el-button type="text" @click="getClientExamineCancel" v-model="form.sysMember.authentication"  v-if="form.sysMember.authentication == 2" style="float: right;margin: 20px;font-size: 16px;color: #000">
          认证驳回
        </el-button>
        <el-button type="text" @click="getClientExaminePass" v-model="form.sysMember.authentication"  v-if="form.sysMember.authentication == 2" style="float: right;margin: 20px;font-size: 17px;">
          认证通过
        </el-button>

      </div>
      <el-form ref="form" :model="form" inline style="padding:30px 0px 0px 123px">
        <el-form-item label="客户姓名">
          <el-input v-model="form.sysMember.memberName" style="width:366px;margin-right: 200px"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户手机">
          <el-input v-model="form.sysMember.mobile" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <!--<el-cascader-->
          <!--:options="addressName"-->
          <!--:change-on-select="true"-->
          <!--@change="addressName">-->
          <el-input style="width:366px;margin-right: 200px" v-model="addressNameDetail + form.store.address"
                    :disabled="true"></el-input>
          <!--</el-cascader>-->
        </el-form-item>
        <el-form-item label="认证状态" v-model="form.sysMember.authentication">
          <el-input :label="t.name" :key="t.value" :value="t.name" v-for="t in totalOrderStatus"
                    v-if="form.sysMember.authentication == t.value" style="width:366px;margin-right: 200px"
                    :disabled="true">{{t.name}}
          </el-input>
        </el-form-item>
        <el-form-item label="法人代表">
          <el-input v-model="form.store.legalName" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-input v-model="form.store.businessLicenseNo" style="width:366px;margin-right: 200px"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户账号">
          <el-input v-model="form.sysMember.loginId" style="width:366px;margin-right: 200px"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="门店名称">
          <el-input v-model="form.store.name" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="门店面积">
          <el-input v-model="form.store.sellingArea" style="width:366px;margin-right: 200px"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户积分">
          <el-input v-model="form.points" style="width:366px;margin-right: 200px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="凭证上传">
          <!--<div v-for="u in form.brandDealerVoucherList"-->
          <!--style="float: left;margin:20px 153px 50px 66px;text-align: center">-->
          <!--<img v-lazy="u.url" style="border:1px dashed #d8dce5;width:265px">-->
          <!--<p>{{u.name}}</p>-->
          <!--</div>-->
          <div v-for="(u,index) in form.brandDealerVoucherList" :key="index"
               style="float: left;margin:20px 280px 50px 66px;width: 18%;text-align: center">
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
        <!--<el-form-item>-->
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
        types: [],//凭证上传
//        examineType:[],//认证状态
        addressNameDetail: '',
        form: {
          store: {
            storeId:'',
            legalName: '',
            memberName: '',
            name: '',
            sellingArea: '',
            address: '',
            businessLicenseNo: '',
            provinceId: '',
            cityId: '',
            areaId: '',
            streetId: '',
            num: '',

          },
          sysMember: {
            id:'',
            authentication: '',
            loginId: '',
            memberName: '',
            memberId:'',
            mobile: '',
            status: '',

          },
          brandDealerVoucherList: [],
        },
        totalOrderStatus: [
          {
            name: '全部',
          },
          {
            name: '未认证',
            value: 0
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
//      this.getExamineType();//认证状态
    },
    components: {
      ElInput,
      ElButton,
      'uploadoneimg': require('../../components/uploadoneimg'),
    },
    methods: {
//      addressNameDetail(provinceId,cityId,areaId,streetId) {//列表中地址显示
//        return this.getAddressName(provinceId,cityId,areaId,streetId);
//      },
      getClientExaminePass(){//认证通过
        let self = this
        let requestData = {
          authentication:1,
          id:self.form.sysMember.id
        }
        self.httpApi.vip.doAuthentication(requestData, function (data) {
          self.$router.push('/client/clientmanagement')
        })
      },
      getClientExamineCancel(){//认证驳回
        let self = this
        let requestData = {
          authentication:-1,
          id:self.form.sysMember.id
        }
        self.httpApi.vip.doAuthentication(requestData, function (data) {
          self.$router.push('/client/clientmanagement')
        })
      },
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
//      getExamineType(){//认证状态
//        let self = this
//        self.httpApi.stock.selectDictByType({type: 'authentication_status'}, function (data) {
//          self.examineType = data.data.list;
//        })
//      },
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
          self.form.store = data.data.store;
          self.form.sysMember = data.data.sysMember;
          self.form.brandDealerVoucherList = data.data.storeVouchers
          self.addressNameDetail = self.getAddressName(self.form.store.provinceId, self.form.store.cityId, self.form.store.areaId, self.form.store.streetId)
//          let brandDealerVoucherList = self.form.brandDealerVoucherList;
//          let brandDealerVouchers =[];
//          for(let i = 0 ; i<brandDealerVoucherList.length;i++){
//            for(let j = 0 ; j<self.types.length;j++){
//              if(brandDealerVoucherList[i].type == self.types[j].value){
//                brandDealerVouchers.push({type: self.types[j].value, url: brandDealerVoucherList[i].url, name: self.types[j].name})
//              }
//            }
//          }
//          self.form.brandDealerVoucherList = brandDealerVouchers;
//          self.httpApi.vip.selectDictByTypeAndValue({
//            type: 'store_area',
//            value: self.form.store.sellingArea
//          }, function (data) {
//            self.form.store.sellingArea = data.data.dict.name
//          })
        });

      },

      returnBrandList() {//返回列表主页
        this.$router.push('/client/clientmanagement')
      },

    }
  }
</script>
