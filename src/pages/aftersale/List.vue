<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">售后列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="全部状态">
          <el-select v-model="easyForm.orderAftersalesStatus" style="width:155px">
            <el-option :label="t.name" :key="t.id" :value="t.id" v-for="t in feedbackStatus"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请输入订单号/客户名称 : ">
          <el-input icon="search" v-model="easyForm.searchWord">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
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
        <el-table-column prop="orderNumber" label="订单号">
          <template slot-scope="scope">
                <el-dropdown-item @click.native="seeOrderDetail(scope.row.orderId)">{{scope.row.orderNumber}}</el-dropdown-item>
          </template>
        </el-table-column>
        <el-table-column prop="orderAftersalesNumber" label="售后单号">
          <template slot-scope="scope">
            <el-dropdown-item @click.native="seeAfterOrderDetail(scope.row.orderAftersalesId)">{{scope.row.orderAftersalesNumber}}</el-dropdown-item>
          </template>
        </el-table-column>
        <el-table-column prop="memberName" label="客户名称">

        </el-table-column>
        <el-table-column prop="refundPrice" label="退款金额">

        </el-table-column>
        <el-table-column prop="orderAftersalesComment.comment" label="售后原因">

        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间">
          <template slot-scope="scope">
            <!--{{moment(scope.row.orderTime).format('YYYY-MM-DD HH:mm:ss')}}-->
            {{moment(scope.row.orderTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请售后时间">
          <template slot-scope="scope">
            {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>

        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope" :label="t.name">
            <span :key="t.id" :value="t.id" v-for="t in feedbackStatus" v-if="scope.row.orderAftersalesStatus == t.id">{{t.name}}</span>
          </template>
        </el-table-column>

        <el-table-column>
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row.orderAftersalesId)" v-if="scope.row.orderAftersalesStatus == 1 || scope.row.orderAftersalesStatus == 0">处理</el-dropdown-item>
                <el-dropdown-item @click.native="seeAfterOrderDetail(scope.row.orderAftersalesId)">详情</el-dropdown-item>
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
        regionList: [],
        tableData: [],
        selectedOptions2: [],
        addressData: [],
        easyForm: {//简单查询
          orderAftersalesStatus: '',//售后状态,
          searchWord: '',//关键字查询
        },
        feedbackStatus: [
          {
            id: 1,
            name: '未关闭售后'
          },
          {
            id: 2,
            name: '已关闭售后'
          }
        ],//状态
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,

      }
    },
    created() {
//      this.select();
    },
    components: {
      'pagination': require('../../components/pagination'),
    },
    methods: {
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
        let requestData = {
          pageSize: size,
          pageNum: num,
          orderAftersalesStatus: self.easyForm.orderAftersalesStatus,
          searchWord: self.easyForm.searchWord
        };
//        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.httpApi.aftersale.selectOrderAftersalesBySearchWord(requestData, function (data) {
          console.log('list', data);
          self.tableData = data.data.pageInfo.list;
          self.totalPage = data.data.pageInfo.total;
        });
      },
      update(id) {//处理未关闭售后
        let url = '/aftersale/update/' + id;
        this.$router.push(url);
      },
      seeOrderDetail(id) {//点击订单号查看订单详情
        let url = '/aftersale/orderdetail/' + id;
        this.$router.push(url);
      },
      seeAfterOrderDetail(id){//点击售后单号查看售后订单详情
        let url = '/aftersale/detail/' + id;
        this.$router.push(url);
      },
    }
  }
</script>
