<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">客户列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="请输入客户姓名 : ">
          <el-input icon="search" v-model.trim="easyForm.memberName">
          </el-input>
        </el-form-item>

        <el-form-item label="客户账号 : ">
          <el-input icon="search" v-model.trim="easyForm.loginId">
          </el-input>
        </el-form-item>
        <el-form-item label="门店名称 : ">
          <el-input icon="search" v-model.trim="easyForm.storeName">
          </el-input>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-select placeholder="全部状态" v-model="easyForm.authentication">
            <el-option :label="t.name" :key="t.value" :value="t.value" v-for="t in totalOrderStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入驻时间:">
          <el-date-picker
            type="datetimerange"
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
          <el-input icon="search" v-model.trim="easyForm.address" placeholder="请输入详细地址">
          </el-input>
        </el-form-item>

        <el-form-item style="float: right">
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <el-button @click="outCoupon">发放</el-button>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        :row-key="getRowKeys"
        >
        <el-table-column
          type="selection"
          width="55"
          prop="memberId"
        :reserve-selection="true">

        </el-table-column>
        <el-table-column
          prop="memberName"
          label="客户姓名">

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
        <el-table-column label="门店地址">
          <template slot-scope="scope">
            <span>{{scope.row.addressName + scope.row.address}}</span>
            <!--<AddressAll v-if="regionList.length > 0"  :cityId ="scope.row.cityId" :provinceId="scope.row.provinceId" :streetId="scope.row.streetId" :areaId="scope.row.areaId" :address="scope.row.address" :data="regionList" ></AddressAll>-->
          </template>
        </el-table-column>
        <el-table-column prop="authentication" label="认证状态">
          <template slot-scope="scope" :label="t.name">
            <span :key="t.value" :value="t.value" v-for="t in totalOrderStatus"
                  v-if="scope.row.authentication == t.value">{{t.name}}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeDetail(scope.row.memberId)">详情</el-dropdown-item>
                <el-dropdown-item @click.native="update(scope.row.memberId)">修改</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.authentication == 2" @click.native="examine(scope.row.memberId)">审核
                </el-dropdown-item>
                <!--<el-dropdown-item>删除</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="发放优惠券信息" :visible.sync="dialogTableVisibleOut">
        <el-form :model="outForm">
          <el-form-item label="发放给" :label-width="formLabelWidth">
            <span v-for="(item,index) in selectedDataName" :key="item.id" style="color: #3a8ee6">{{item.memberName}}&nbsp; &nbsp;&nbsp;</span>
          </el-form-item>
          <el-form-item label="每人发放券数" :label-width="formLabelWidth">
            <el-input v-model="outForm.num" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisibleOut = false">取 消</el-button>
          <el-button type="primary" @click="couponOutSure">确 定</el-button>
        </div>
      </el-dialog>
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
        obj:{},
        regionList: [],
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
          authentication: '',//认证状态
        },
        province: '',
        city: '',
        area: '',
        address: '',
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        valueBrand: [],
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
        selectedData: [],
        selectedDataName: [],
        loading: false,
        dialogTableVisibleOut: false,//发放弹框
        formLabelWidth: '120px',
        outForm: {
          num: ''
        },//发放form
        getRowKeys(row) {
          return row.memberId;
        },
      }
    },
    created() {
      this.getPrivence()//所有省市区
    },
    components: {
      ElButton,
      ElInput,
      'pagination': require('../../components/pagination'),
    },
    activated() {
      this.select(localStorage.getItem('pageSizeList'), localStorage.getItem('pageNumList'))
    },
    methods: {
      addressName(provinceId, cityId, areaId, streetId) {//列表中地址显示
        return this.getAddressName(provinceId, cityId, areaId, streetId);
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
        this.$router.push('/stock/brand/add');
      },
      handleSelectionChange(rows) {
        this.selectedData = [];
        if (rows) {
          rows.forEach(row => {
            if (row) {
              this.selectedData.push(row.memberId);
            }
          })
        }
      },
      pageChanged(page) {//页码
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
        localStorage.setItem('pageSizeList', page.size);
        localStorage.setItem('pageNumList', page.num);
      },
      select(size, num) {//查询
        let self = this;
        self.easyForm.startTime = self.easyForm.dateRange === null ? '' : self.easyForm.dateRange[0];
        self.easyForm.endTime = self.easyForm.dateRange === null ? '' : self.easyForm.dateRange[1];
        let requestData = {
          pageSize: size,
          pageNo: num,
          loginId: self.easyForm.loginId,//客户账号,
          memberName: self.easyForm.memberName,//客户名称,
          address: self.easyForm.address,//客户地址,
          storeName: self.easyForm.storeName,//门店名称
          dateRange: null,
          startTime: self.easyForm.startTime,//开始日期
          endTime: self.easyForm.endTime,//结束日期,
          provinceId: self.easyForm.provinceId,//省id
          cityId: self.easyForm.cityId,//市id
          areaId: self.easyForm.areaId,//地域id
          authentication: self.easyForm.authentication
        };
        self.httpApi.vip.selectStoreMemberList(requestData, function (data) {
          self.tableData = data.data.pageInfo.list;
          self.totalPage = data.data.pageInfo.total;
          for (let i = 0; i < self.tableData.length; i++) {
            self.tableData[i].addressName = self.getAddressName(self.tableData[i].provinceId, self.tableData[i].cityId, self.tableData[i].areaId, self.tableData[i].streetId)
          }
        });
      },
      seeDetail(id) {
        let url = '/client/detail/' + id;
        this.$router.push(url);
      },
      update(id) {
        let url = '/client/update/' + id;
        this.$router.push(url);
      },
      examine(id) {
        let url = '/client/examine/' + id;
        this.$router.push(url);
      },
      addClinet() {//新增
        this.$router.push('/client/create');
      },
      getMemberNameById(){
        let self = this;
        self.httpApi.customer.selectMemberListByIds(self.selectedData,function (data) {
          self.selectedDataName = data.data;
        })

      },//根据选中的id数组查找对应发用户名称
      outCoupon() {
        if(this.selectedData.length <=0){
          this.$message.info('请选择要发放的用户');
          this.dialogTableVisibleOut = false;
        }else{
          this.dialogTableVisibleOut = true;
          this.getMemberNameById();
        }
      },//发放弹框
      couponOutSure() {
        let self = this;
        let idName = localStorage.getItem('memberNameNew') + '('+localStorage.getItem('memberId') + ')';
        let requestData = {
          couponId: localStorage.getItem('seeClientId'),
          creater:idName,
          memberIds: self.selectedData,
          num: self.outForm.num
        }
        self.httpApi.coupon.doDistributeCoupon(requestData, function (data) {
          self.dialogTableVisibleOut = false;
          self.$message.success('发放成功');
          setTimeout(function () {
            self.$router.go(0);
          }, 500);
          self.$router.push('/coupon/listout');

        })
      },//发放确定
    }
  }
</script>
