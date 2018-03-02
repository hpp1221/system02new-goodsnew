<template>
  <div class="container">
    <div class="wrapper">

      <el-form ref="form" :model="form" inline style="padding:30px 0px 0px 123px">
        <el-form-item label="客户姓名">
          <el-input v-model="form.memberName" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="客户手机">
          <el-input v-model="form.mobile" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="客户地址">
          <el-cascader
            style="width:366px;margin-right: 200px"
            :options="addressData"
            v-model="selectedOptions2"
            :change-on-select="true"
            @change="handleChange">
          </el-cascader>

          <!--<el-input style="width:25%" v-model="addressNameDetail + form.address"></el-input>-->
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.address" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="法人代表">
          <el-input v-model="form.legalName" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-input v-model="form.businessLicenseNo" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="门店名称">
          <el-input v-model="form.name" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="门店数量">
          <el-input v-model="form.num" style="width:366px;margin-right: 200px"></el-input>
        </el-form-item>
        <el-form-item label="门店面积">
          <el-select v-model="form.sellingArea" placeholder="请选择" style="width:366px;margin-right: 200px">
            <el-option
              v-for="item in storeArea"
              :key="item.value"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="凭证上传">
          <div v-for="(u,index) in form.brandDealerVoucherList" :key="index" style="float: left;margin-right: 100px;text-align: center">
            <uploadoneimg
              :fileList="u.url"
              @getFileList="getFileListImg"
              @click.native="clickIndex = index"
              :title="u.name"
            >
            </uploadoneimg>
            <span>{{u.name}}</span>
          </div>
        </el-form-item>
        <br>
        <el-form-item style="float: right">
            <el-button @click="returnClientList">返回</el-button>
            <el-button @click="sureCreateClient">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5';
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
            legalName: '',
            memberName: '',
            memberId:'',
            name: '',
            sellingArea: '',
            address: '',
            businessLicenseNo: '',
            provinceId: '',
            cityId: '',
            areaId: '',
            streetId: '',
            num: '',
            pwd:'a123456',
          storeVoucherList: [],
          brandDealerVoucherList: [],
        },
        storeArea: [],//门店面积
      }
    },
    created() {
      this.getImgUploadType();//凭证上传
      this.getAllAddress();//所有省市区
      this.getStoreArea();//门店面积
    },
    components: {
      ElInput,
      ElButton,
      md5,
      'uploadoneimg': require('../../components/uploadoneimg'),
    },
    methods: {
      getFileListImg(file){//凭证上传图片
        this.form.brandDealerVoucherList[this.clickIndex].url = file.url;
        // let self = this;
        // this.form.storeVoucherList.push(file);
        // console.log('self.form.storeVoucherList',

        // self.form.storeVoucherList);
        // this.form.storeVoucherList[this.clickIndex].url = file.url;

      },
      getStoreArea() {//门店面积
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'store_area'}, function (data) {
          self.storeArea = data.data.list;
          console.log('sdddd', self.storeArea)
        })
      },
      getImgUploadType() {//凭证上传
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'store_voucher'}, function (data) {
          let types = data.data.list;
          for (let i = 0; i < types.length; i++) {
            self.form.brandDealerVoucherList.push({type: types[i].value, url: '', name: types[i].name});
          }
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
      returnClientList() {//返回列表主页
        this.$router.push('/client/clientmanagement')
      },
      sureCreateClient(){//新增确定
        let self = this
        let requestData = {
          address:self.form.address,
          areaId:self.form.areaId,
          businessLicenseNo:self.form.businessLicenseNo,
          cityId:self.form.cityId,
          legalName:self.form.legalName,
          memberName:self.form.memberName,
          mobile:self.form.mobile,
          name:self.form.name,
          provinceId:self.form.provinceId,
          num:self.form.num,
          sellingArea:self.form.sellingArea,
          storeVoucherList:self.form.brandDealerVoucherList,
          pwd:md5(self.form.pwd),
          creater:window.localStorage.getItem('memberId')
        }
        self.httpApi.customer.addStoreMember(requestData, function (data) {
          self.$router.push('/client/clientmanagement')
        })
      },
    }
  }
</script>
