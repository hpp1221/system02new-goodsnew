<template>
  <div class="container">
    <div class="wrapper">
      <!--  -------------------  优惠券发放部分 start --------------------------------------->
      <h3 class="page-title">优惠券已发放记录</h3>
      <el-form ref="formCoupon" key="formCoupon" :model="formCoupon" inline
               class="couponselect"
               label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="formCoupon.name" placeholder="单行输入"></el-input>
        </el-form-item>

        <el-form-item class="addButtonAndSelect">
          <el-button @click="selectCoupon(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <br>
        <el-table
          :data="tableDataCoupon"
          border
        style="width: 70%;">
          <el-table-column
            prop="memberName"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="couponId"
            label="优惠券ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="couponName"
            label="优惠券名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="couponReceiveType"
            label="领取类型"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.couponReceiveType === '0'">主动领取</span>
              <span v-if="scope.row.couponReceiveType === '1'">自动发放</span>
            </template>
          </el-table-column>

        <!--  <el-table-column
            prop="dateRuleType"
            label="优惠券规则"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.dateRuleType === 'brand'">品牌规则</span>
              <span v-if="scope.row.dateRuleType === 'category'">品类规则</span>
              <span v-if="scope.row.dateRuleType === 'brand_and_category'">品牌和品类规则</span>
              <span v-if="scope.row.dateRuleType === 'all'">通用券</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="amountRuleId"
            label="金额规则"
            width="120">
            <template slot-scope="scope">
              <span v-for="item in tableDataMoney" :key="item.id" v-if="scope.row.amountRuleId === item.id">{{item.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="categoryRuleName"
            label="品类规则"
            width="120">
          </el-table-column>
          <el-table-column
            prop="brandRuleName"
            label="品牌规则"
            width="120">
          </el-table-column>-->
          <el-table-column
            prop="days"
            label="有效期"
            width="330">
            <template slot-scope="scope">
              <span v-if="scope.row.dateRuleType === 'time-interval'">{{moment(scope.row.startTime).format('YYYY-MM-DD HH:mm:ss')}}--{{moment(scope.row.endTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
              <span v-if="scope.row.dateRuleType === 'fixed-days'">{{scope.row.days + '     ' + '天'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="creater"
            label="发放人"
            width="200">
          </el-table-column>
        </el-table>
        <pagination @setChanged="pageChanged" :totalPage="totalPageCoupon"></pagination>
      </el-form>
      <!--  -------------------  优惠券发放部分 end--------------------------------------->
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableDataCoupon: [],//优惠券list
        formCoupon: {//优惠券搜索条件form
          name: '',//优惠券名称
        },
        formLabelWidth: '120px',
        pageSize: 5,
        pageNum: 1,
        totalPageCoupon: 10,
        tableDataMoney: [],//金额规则list
      }
    },
    components: {
      'pagination': require('../../components/pagination'),
    },
    activated() {
      this.selectCoupon(localStorage.getItem('pageSizeList'), localStorage.getItem('pageNumList'));
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        localStorage.setItem('pageSizeList', page.size);
        localStorage.setItem('pageNumList', page.num);
        this.selectCoupon(page.size, page.num);
        // this.selectMoney();
      },
      /*  -------------------  优惠券配置部分 start -------------------------------*/

      selectCoupon(size, num) {
        let self = this;
        let requestData = {
          pageNo: num,
          pageSize: size,
          memberName: self.formCoupon.name,
          couponId: localStorage.getItem('seeClientId'),
        }
        self.httpApi.coupon.selectDistributeMemberCouponList(requestData, function (data) {
          self.tableDataCoupon = data.data.list;
          self.totalPageCoupon = data.data.total;
        })
      },//优惠券查询列表
      /*  -------------------  优惠券配置部分 end -------------------------------*/
/*      selectMoney() {
        let self = this;
        let requestData = {
        }
        self.httpApi.coupon.selectCouponAmountRuleList(requestData, function (data) {
          self.tableDataMoney = data.data.pageInfo.list;
          self.totalPageMoney = data.data.pageInfo.total;
        })
      },//金额查询列表*/
    },
  }
</script>

