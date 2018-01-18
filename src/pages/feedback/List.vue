<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">用户意见反馈</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="反馈时间">
          <el-date-picker
            style="width:400px"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="easyForm.dateRange">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input icon="search" v-model.trim="easyForm.condition" placeholder="请输入客户账号/客户电话/反馈单号" style="width:255px">
          </el-input>
        </el-form-item>
        <el-form-item label="问题类型">
          <el-select placeholder="全部" v-model="easyForm.sugType" style="width:155px">
            <el-option :label="t.name" :key="t.id" :value="t.id" v-for="t in feedbackType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select placeholder="全部" v-model="easyForm.sugStatus" style="width:155px">
            <el-option :label="t.name" :key="t.id" :value="t.id" v-for="t in feedbackStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
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
        <el-table-column prop="userId" label="客户名称">

        </el-table-column>
        <el-table-column prop="sugId" label="反馈单号">

        </el-table-column>
        <el-table-column prop="userPhone" label="联系电话">

        </el-table-column>
        <el-table-column prop="createTime" label="反馈时间">
          <template slot-scope="scope">
            {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="sugMessage" label="反馈内容">

        </el-table-column>
        <el-table-column prop="sugType" label="问题类型">
          <template slot-scope="scope">
            <span v-if="scope.row.sugType == o.id" v-for="o in feedbackType">{{o.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sugStatus" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.sugStatus == o.id" v-for="o in feedbackStatus">{{o.name}}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.row.sugStatus == 1" @click.native="solve(scope.row.sugId)">处理</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.sugStatus == 0" @click.native="seeDetail(scope.row.sugId)">详情</el-dropdown-item>
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
        easyForm: {
          sugId:'',
          dateRange: null,
          createTime: '',
          beginTime: '',
          endTime: '',
          condition: '',
          sugStatus: '',
          sugType: '',
        },//简单查询
        tableData: [],//反馈列表
        feedbackType: [
          {
            name: '全部'
          },
          {
            id: 1,
            name: '性能问题'
          }, {
            id: 2,
            name: '功能建议'
          }, {
            id: 3,
            name: '购买遇到其他问题'
          }, {
            id: 4,
            name: '其他'
          }
        ],//问题类型
        feedbackStatus: [
          {
            name: '全部'
          },
          {
            id: 0,
            name: '已处理'
          }, {
            id: 1,
            name: '未处理'
          }
        ],//状态
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
      }
    },
    created() {
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
        self.easyForm.beginTime = self.easyForm.dateRange === null ? '' : self.easyForm.dateRange[0];
        self.easyForm.endTime = self.easyForm.dateRange === null ? '' : self.easyForm.dateRange[1];
        let requestData = {
          pageSize: size,
          pageNo: num,
          dateRange: self.easyForm.dateRange,
          createTime: self.easyForm.createTime,
          beginTime: self.easyForm.beginTime,
          endTime: self.easyForm.endTime,
          condition: self.easyForm.condition,
          sugStatus: self.easyForm.sugStatus,
          sugType: self.easyForm.sugType
        };
//      requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        self.httpApi.feedback.getSug(requestData, function (data) {
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      seeDetail(id) {
        let url = '/feedback/detail/'+id;
        this.$router.push(url);
      },
      solve(id) {
        let url = '/feedback/solve/' + id;
        this.$router.push(url);
      }
    }
  }
</script>
