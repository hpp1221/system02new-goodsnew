<template>
  <div class="container">
    <div class="wrapper">
      <!--  -------------------  优惠券发放部分 start --------------------------------------->
      <h3 class="page-title">优惠券发放</h3>
      <el-form ref="formCoupon" key="formCoupon" :model="formCoupon" inline
               class="couponselect"
               label-width="100px">
        <el-form-item label="优惠券ID">
          <el-input v-model="formCoupon.id" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="优惠券名称">
          <el-input v-model="formCoupon.name" placeholder="单行输入"></el-input>
        </el-form-item>

        <el-form-item class="addButtonAndSelect">
          <el-button @click="selectCoupon(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <br>
        <el-table
          :data="tableDataCoupon"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="优惠券ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="优惠券名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="count"
            label="优惠券总数"
            width="100">
          </el-table-column>
          <el-table-column
            prop="num"
            label="个人可领取数"
            width="110">
          </el-table-column>
          <el-table-column
            prop="receiveType"
            label="领取类型"
            width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.receiveType === '0'">主动领取</span>
              <span v-if="scope.row.receiveType === '1'">自动发放</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="hasLimit"
            label="是否有上限"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.hasLimit === '0'">无上限</span>
              <span v-if="scope.row.hasLimit === '1'">有上限</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="优惠券规则"
            width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.type === 'brand'">品牌规则</span>
              <span v-if="scope.row.type === 'category'">品类规则</span>
              <span v-if="scope.row.type === 'brand_and_category'">品牌和品类规则</span>
              <span v-if="scope.row.type === 'all'">通用券</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="amountRuleId"
            label="金额规则"
            width="100">
            <template slot-scope="scope">
              <span v-for="item in tableDataMoney" :key="item.id" v-if="scope.row.amountRuleId === item.id">{{item.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="categoryRuleName"
            label="品类规则"
            width="100">
          </el-table-column>
          <el-table-column
            prop="brandRuleName"
            label="品牌规则"
            width="100">
          </el-table-column>
          <el-table-column
            prop="days"
            label="有效期"
            width="300">
            <template slot-scope="scope">
              <span v-if="scope.row.dateRuleType === 'time-interval'">{{moment(scope.row.startTime).format('YYYY-MM-DD HH:mm:ss')}}--{{moment(scope.row.endTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
              <span v-if="scope.row.dateRuleType === 'fixed-days'">{{scope.row.days + '     ' + '天'}}</span>
            </template>
          </el-table-column>
      <!--    <el-table-column
            prop="status"
            width="80"
            label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 0">禁用</span>
              <span v-if="scope.row.status === 1">启用</span>
            </template>
          </el-table-column>-->
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <i class="iconfont icon-more" style="cursor: pointer"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="seeClient(scope.row.id)">发放</el-dropdown-item>
                  <el-dropdown-item @click.native="seeClientDetail">发放记录</el-dropdown-item>
                  <!--<el-dropdown-item>删除</el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
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
          id: '',//优惠券ID
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
        this.selectMoney();
      },
      /*  -------------------  优惠券配置部分 start -------------------------------*/

      selectCoupon(size, num) {
        let self = this;
        let requestData = {
          pageNo: num,
          pageSize: size,
          name: self.formCoupon.name,
          id: self.formCoupon.id,
        }
        self.httpApi.coupon.selectDistributeCouponList(requestData, function (data) {
          self.tableDataCoupon = data.data.pageInfo.list;
          self.totalPageCoupon = data.data.pageInfo.total;
        })
      },//优惠券查询列表
      seeClient(id){//发放进入客户页面
        let url = '/coupon/couponclient/';
        this.$router.push(url);
        localStorage.setItem('seeClientId',id);
      },
      seeClientDetail(id){//进入发放记录
        let url = '/coupon/outlist/';
        this.$router.push(url);
      },
      /*  -------------------  优惠券配置部分 end -------------------------------*/
      selectMoney() {
        let self = this;
        let requestData = {
        }
        self.httpApi.coupon.selectCouponAmountRuleList(requestData, function (data) {
          self.tableDataMoney = data.data.pageInfo.list;
          self.totalPageMoney = data.data.pageInfo.total;
        })
      },//金额查询列表
    },
  }
</script>

