<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">客户列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="请输入客户姓名 : ">
          <el-input icon="search" v-model="easyForm.memberName">
          </el-input>
        </el-form-item>

        <el-form-item label="请输入客户账号 : ">
          <el-input icon="search" v-model="easyForm.loginId">
          </el-input>
        </el-form-item>
        <el-form-item label="请输入门店名称 : ">
          <el-input icon="search" v-model="easyForm.storeName">
          </el-input>
        </el-form-item>
        <el-form-item label="入驻时间">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="easyForm.dateRange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="客户地址 : ">
          <el-cascader
            :options="addressData"
            v-model="selectedOptions2"
            :change-on-select="true"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input icon="search" v-model="easyForm.address" placeholder="请输入详细地址">
          </el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <!--<el-button @click="brandAdd">新增</el-button>-->
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
        <el-table-column prop="memberName" label="客户姓名">

        </el-table-column>
        <el-table-column prop="mobile" label="手机">

        </el-table-column>

        <el-table-column prop="loginId" label="账号">

        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="门店名称">

        </el-table-column>
        <el-table-column  label="收货地址">
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
                <!--<el-dropdown-item @click.native="update(scope.row.brandDealerId)">修改</el-dropdown-item>-->
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
  export default {
    data() {
      return {
        regionList:[],
        tableData: [],
        selectedOptions2: [],
        addressData: [],
        easyForm: {//简单查询
          loginId: '',//客户账号,
          memberName: '',//客户名称,
          address: '',//客户地址,
          storeName: '',//门店名称
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
        self.httpApi.stock.selectRegionTree(requestData, function (data) {
          self.addressData = data.data.regionTrees;
        })
      },
      handleChange(value) {//三级联动选择框点击函数
        this.easyForm.provinceId = value[0]
        this.easyForm.cityId = value[1]
        this.easyForm.areaId = value[2]
      },
      brandAdd() {//品牌商新增
        this.$router.push('/stock/inoutdetail/add');
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
        };
        self.httpApi.vip.selectStoreMemberList(self.easyForm, function (data) {
          console.log('stock',data)
          self.tableData = data.data.pageInfo.list;
          console.log('rrr',self.tableData)
          self.totalPage = data.data.pageInfo.total;
          for(let i = 0;i < self.tableData.length;i++){
            self.tableData[i].addressName = self.getAddressName(self.tableData[i].provinceId,self.tableData[i].cityId,self.tableData[i].areaId,self.tableData[i].streetId)
          }
        });
      },
      seeDetail(id) {
        let url = '/stock/inoutdetail/detail/' + id;
        this.$router.push(url);
      },
      update(id){
        let url = '/stock/inoutdetail/update/' + id;
        this.$router.push(url);
      }
    }
  }
</script>
