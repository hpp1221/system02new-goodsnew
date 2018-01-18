<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">品牌商</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="请输入品牌商名称 : ">
          <el-input icon="search" v-model.trim="easyForm.name">
          </el-input>
        </el-form-item>

        <el-form-item label="品牌商收款账号 : ">
          <el-input icon="search" v-model.trim="easyForm.bankAccount">
          </el-input>
        </el-form-item>
        <el-form-item label="品牌商联系人 : ">
          <el-input icon="search" v-model.trim="easyForm.contacts">
          </el-input>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-date-picker
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="easyForm.dateRange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="品牌商地址 : ">
          <el-cascader
            :options="addressData"
            v-model="selectedOptions2"
            :change-on-select="true"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input icon="search" v-model.trim="easyForm.address" placeholder="请输入详细地址">
          </el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <el-button @click="brandAdd">新增</el-button>
        </el-form-item>
        <el-form-item>
          <!--<el-button @click="brandAdd">新增</el-button>-->
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="name" label="品牌商名称">

        </el-table-column>
        <el-table-column prop="contacts" label="联系人">

        </el-table-column>
        <el-table-column prop="mobile" label="联系电话">

        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column  label="地址">
          <template slot-scope="scope">
            <span>{{scope.row.addressName + scope.row.address}}</span>
            <!--<AddressAll v-if="regionList.length > 0"  :cityId ="scope.row.cityId" :provinceId="scope.row.provinceId" :streetId="scope.row.streetId" :areaId="scope.row.areaId" :address="scope.row.address" :data="regionList" ></AddressAll>-->
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row.brandDealerId)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="seeDetail(scope.row.brandDealerId)">详情</el-dropdown-item>
                <!--<el-dropdown-item>删除</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right"></pagination>
    </div>
  </div>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    data() {
      return {
        regionList:[],
        tableData: [],
        selectedOptions2: [],
        addressData: [],
        easyForm: {//简单查询
          bankAccount: '',//收款账号,
          name: '',//品牌商名称,
          address: '',//品牌商地址,
          contacts: '',//品牌商联系人
          dateRange: null,
          startTime: '',//开始日期
          endTime: '',//结束日期,
          provinceId: '',//省id
          cityId: '',//市id
          areaId: '',//地域id
        },
        province:'',
        city:'',
        area:'',
        address:'',
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        valueBrand: [],

      }
    },
    created() {
      this.getPrivence()//所有省市区
    },
    components: {
      'pagination': require('../../components/pagination'),
    },
    methods: {
      addressName(provinceId,cityId,areaId,streetId) {//列表中地址显示
        return this.getAddressName(provinceId,cityId,areaId,streetId);
      },
      getPrivence() {//所有省市区
        let self = this
        let requestData = {}
        self.httpApi.dict.selectRegionTree(requestData, function (data) {
          self.addressData = data.data.regionTrees;
        })
      },
      handleChange(value) {//三级联动选择框点击函数
        this.easyForm.provinceId = value[0]
        this.easyForm.cityId = value[1]
        this.easyForm.areaId = value[2]
      },
      brandAdd() {//品牌商新增
        this.$router.push('/brand/add');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      pageChanged(page) {//页码
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num)
      },
      select(size, num) {//查询
        let self = this;
        self.easyForm.startTime = self.easyForm.dateRange === null ? '' : self.easyForm.dateRange[0];
        self.easyForm.endTime = self.easyForm.dateRange === null ? '' : self.easyForm.dateRange[1];
        let requestData = {
          pageSize: size,
          pageNo: num,
          bankAccount: self.easyForm.bankAccount,//收款账号,
          name: self.easyForm.name,//品牌商名称,
          address: self.easyForm.address,//品牌商地址,
          contacts: self.easyForm.contacts,//品牌商联系人
          dateRange: null,
          startTime: self.easyForm.startTime,//开始日期
          endTime: self.easyForm.endTime,//结束日期,
          provinceId: self.easyForm.provinceId,//省id
          cityId: self.easyForm.cityId,//市id
          areaId: self.easyForm.areaId,//地域id
        };
//        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.httpApi.brand.recordListBySku(requestData, function (data) {
          self.tableData = data.data.pageInfo.list;
          self.totalPage = data.data.pageInfo.total;
          for(let i = 0;i < self.tableData.length;i++){
            self.tableData[i].addressName = self.getAddressName(self.tableData[i].provinceId,self.tableData[i].cityId,self.tableData[i].areaId,self.tableData[i].streetId)
          }
        });
      },
      seeDetail(id) {
        let url = '/brand/detail/' + id;
        this.$router.push(url);
      },
      update(id){
        let url = '/brand/update/' + id;
        this.$router.push(url);
      }
    }
  }
</script>
