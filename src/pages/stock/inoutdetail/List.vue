<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">品牌商</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="请输入品牌商名称 : ">
          <el-input icon="search" v-model="easyForm.name">
          </el-input>
        </el-form-item>

        <el-form-item label="品牌商收款账号 : ">
          <el-input icon="search" v-model="easyForm.bankAccount">
          </el-input>
        </el-form-item>
        <el-form-item label="品牌商联系人 : ">
          <el-input icon="search" v-model="easyForm.contacts">
          </el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围"
            v-model="easyForm.dateRange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="品牌商地址 : ">
          <el-select v-model="easyForm.address" placeholder="请选择">
            <el-option-group
              v-for="group in options3"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
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
        <el-table-column prop="memberName" label="联系人">

        </el-table-column>
        <el-table-column prop="mobile" label="联系电话">

        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址">

        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="seeDetail(scope.row.id)">详情</el-dropdown-item>
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

        tableData: [],
        options3: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        easyForm: {//简单查询
          bankAccount: '',//收款账号,
          name: '',//品牌商名称,
          address: '',//品牌商地址,
          contacts: '',//品牌商联系人
          dateRange: null,//创建时间
          createTime: '',
          endTime: '',
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10
      }
    },
    created() {

    },
    components: {
      'pagination': require('../../../components/pagination'),
    },
    methods: {
      brandAdd() {//品牌商新增
        this.$router.push('/stock/inoutdetail/add');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num)
      },
      select(size, num) {//查询
        let self = this;
        let requestData = {
          pageSize: size,
          pageNo: num,
          address: self.easyForm.address,
          name: self.easyForm.name,
          contacts: self.easyForm.contacts,
          bankAccount: self.easyForm.bankAccount
        };
        self.easyForm.createTime = self.easyForm.dateRange === null ? '' : self.easyForm.dateRange[0];
        self.easyForm.endTime = self.easyForm.dateRange === null ? '' : self.easyForm.dateRange[1];
//        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.httpApi.stock.recordListBySku(requestData, function (data) {
          self.tableData = data.data.pageInfo.list;
          self.totalPage = data.data.pageInfo.total;
        });
      },
      seeDetail(id) {
        this.$router.push(url);
      }
    }
  }
</script>
