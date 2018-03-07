<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="form" :model="form" inline style="padding:30px 0px 0px 123px;">
        <el-form-item label="客户姓名">
          <el-input v-model="form.sysMember.memberName" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="客户手机">
          <el-input v-model="form.sysMember.mobile" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="客户地址">
          <el-cascader
            style="width:366px;margin-right: 200px"
            :options="addressData"
            v-if="selectedOptions2"
            v-model="selectedOptions2"
            :change-on-select="true"
            @change="handleChange">
          </el-cascader>

          <!--<el-input style="width:25%" v-model="addressNameDetail + form.address"></el-input>-->
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.store.address" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <!--<el-form-item label="收货地址">-->
        <!--&lt;!&ndash;<el-cascader&ndash;&gt;-->
        <!--&lt;!&ndash;:options="addressName"&ndash;&gt;-->
        <!--&lt;!&ndash;:change-on-select="true"&ndash;&gt;-->
        <!--&lt;!&ndash;@change="addressName">&ndash;&gt;-->
        <!--<el-input style="width:366px;margin-right: 200px" v-model="addressNameDetail + form.store.address"></el-input>-->
        <!--&lt;!&ndash;</el-cascader>&ndash;&gt;-->
        <!--</el-form-item>-->
        <el-form-item label="认证状态" v-model="form.sysMember.authentication">
          <el-input :label="t.name" :key="t.value" :value="t.name" v-for="t in totalOrderStatus"
                    v-if="form.sysMember.authentication == t.value" style="width:366px;margin-right: 200px"
                    :disabled="true">{{t.name}}
          </el-input>
        </el-form-item>
        <el-form-item label="法人代表">
          <el-input v-model="form.store.legalName" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-input v-model="form.store.businessLicenseNo" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="客户账号">
          <el-input v-model="form.sysMember.loginId" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="门店名称">
          <el-input v-model="form.store.name" style="width:366px;margin-right: 200px" ></el-input>
        </el-form-item>
        <el-form-item label="经营规模">
          <el-select v-model="form.store.num" style="width:366px;margin-right: 200px" placeholder="请选择">
            <el-option
              v-for="item in storeNum"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店面积">
          <el-select v-model="form.store.sellingArea" style="width:366px;margin-right: 200px" placeholder="请选择">
            <el-option
              v-for="item in storeArea"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店类型">
          <el-select v-model="form.store.type" style="width:366px;margin-right: 200px" placeholder="请选择">
            <el-option
              v-for="item in storeType"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="客户积分">
          <el-input v-model="form.points" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="凭证上传">
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

      </el-form>
      <div style="float: right;margin: 10px 30px 0px 0px;">
        <el-button @click="returnBrandList">返回</el-button>
        <el-button @click="sureBrandList">确定</el-button>
      </div>
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
        storeNameNew:'',
        form: {
          store: {
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
            type:'',

          },
          sysMember: {
            authentication: '',
            loginId: '',
            memberName: '',
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
        ],//认证状态,
        storeArea: [],//门店面积
        storeNum: [],//门店经营规模
        storeType: [],//门店类型
      }
    },
    created() {

      this.getImgUploadType();//凭证上传
      this.getAllAddress();//所有省市区
      this.getStoreArea();//门店面积
      this.getStoreNum();//门店经营规模
      this.getStoreType();//门店类型
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
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
      getStoreNum() {//门店经营规模
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'store_num'}, function (data) {
          self.storeNum= data.data.list;
        })
      },
      getStoreArea() {//门店面积
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'store_area'}, function (data) {
          self.storeArea = data.data.list;
        })
      },
      getStoreType() {//门店类型
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'store_type'}, function (data) {
          self.storeType= data.data.list;
        })
      },
      getImgUploadType() {//凭证上传
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'brand_dealer_voucher'}, function (data) {
          self.types = data.data.list;
        })
      },
      getAllAddress() {//所有省市区
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
          self.form.store = data.data.store;
          self.form.sysMember = data.data.sysMember;
          self.form.brandDealerVoucherList = data.data.storeVouchers
          self.selectedOptions2.push('' + self.form.store.provinceId, '' + self.form.store.cityId, '' + self.form.store.areaId)
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
//          self.addressNameDetail = self.getAddressName(self.form.store.provinceId,self.form.store.cityId,self.form.store.areaId,self.form.store.streetId)
//            self.httpApi.dict.selectDictByTypeAndValue({type:'store_area',value:self.form.store.sellingArea},function (data) {
//              self.form.store.sellingArea = data.data.dict
//            })
        });

      },
      sureBrandList(id) {//修改确认
        let self = this
        let requestData = {
          store: self.form.store,
          storeVouchers: self.form.brandDealerVoucherList,
          sysMember: self.form.sysMember
        }
        self.httpApi.vip.updateStoreMemberById(requestData, function (data) {
          self.$router.push('/client/clientmanagement')
        })
      },
      returnBrandList() {//返回列表主页
        this.$router.push('/client/clientmanagement')
      },

    }
  }
</script>
