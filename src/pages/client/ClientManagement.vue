<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">客户列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item>
          <span class="client-list-allclass">全部级别</span>
          <el-select v-model="easyForm.vip_level" placeholder="全部级别" style="width: 130px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入客户名称/联系电话/手机/编码" icon="search" v-model="easyForm.condition"
                    :on-icon-click="handleIconClick" class="client-input">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button @click="leadInClient">导入</el-button>
          <el-button @click="outputClient">导出</el-button>
          <el-button @click="createClient">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable"
                class="clientmanagement-input">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="name" label="客户名称" class="hpp">

        </el-table-column>
        <el-table-column prop="num" label="客户编码">

        </el-table-column>
        <el-table-column prop="tphone" label="联系电话">

        </el-table-column>
        <el-table-column prop="address" label="地址">

        </el-table-column>
        <el-table-column prop="mphone" label="手机" style="width:130px;">

        </el-table-column>
        <el-table-column prop="vip_level" label="客户级别">
          <template scope="scope">
            <span v-if="scope.row.vip_level == '0'">VIP1</span>
            <span v-if="scope.row.vip_level == '1'">VIP2</span>
            <span v-if="scope.row.vip_level == '2'">VIP3</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
          <template scope="scope">
            <span>{{moment(scope.row.create_time).format('YYYY-MM-DD  HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="updateClient(scope.row.id)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="deleteClient(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right">
      </pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {//全部级别
            value: '',
            label: '全部级别'
          },
          {
            value: '0',
            label: 'VIP1'
          }, {
            value: '1',
            label: 'VIP2'
          }, {
            value: '2',
            label: 'VIP3'
          }],
        easyForm: {//查询条件
          vip_level: '',
          condition: '',
        },
        value: '',
        pageSize: 5,//每页条数
        pageNum: 1,//当前页码
        totalPage: 10,//总数
        tableData: [],
      }
    },
    created() {
      this.getClientList()
    },

    components: {
      'pagination': require('../../components/pagination')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
      getClientList() { //客户管理列表
        let self = this
        let params = {
          token: window.localStorage.getItem('token'),
          pageSize: self.pageSize,
          pageNo: self.pageNum
        };
        self.httpApi.vip.viplist(requestData, function (data) {
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      select(size, num) { //查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          vip_level: self.easyForm.vip_level,
          condition: self.easyForm.condition,
          pageNo: num,
          pageSize: size
        }
        self.httpApi.vip.vipterm(requestData, function (data) {
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      handleIconClick(ev) {//输入发查询条件的搜索图标点击
        this.select();
      },
      updateClient(id) { //修改客户详情
        let url = '/client/updateclient/' + id;
        this.$router.push(url);
      },
      deleteClient(row) { //删除单个客户详情
        let self = this;
        let params = {id: row.id};
        self.$confirm('请确认是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.vip.vipdelete(requestData, function (data) {
            self.$message('删除成功');
            this.getClientList();
          });
        })
      },
      outputClient() { //导出客户
        let self = this
        let supplierString = ''
        for (let i = 0; i < self.multipleSelection.length; i++) {
          supplierString += ',' + self.multipleSelection[i].id
        }
        supplierString = supplierString.substring(1, supplierString.length)
        let requestData = {
          params: {
            vipIds: supplierString
          }
        };
        location.href = '/ui/exportVips?vipIds=' + supplierString;
      },
      handleSelectionChange(val) {//选择要导出的记录的回调
        this.multipleSelection = val;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      createClient() { //新增客户
        this.$router.push('/client/createclient');
      },
      leadInClient() { //导入客户
        this.$router.push('/client/inputclient');
      }
    }
  }
</script>
