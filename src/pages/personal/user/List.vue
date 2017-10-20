<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">用户管理</h3>
      <el-form ref="form" :model="form" inline class="request-form">
        <el-form-item label="用户名">
          <el-input v-model="form.loginId" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option :value="''" label="全部"></el-option>
            <el-option :value="1" label="启用"></el-option>
            <el-option :value="-1" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addUser">新增用户</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column prop="loginId" label="用户名">

        </el-table-column>
        <el-table-column prop="name" label="姓名">

        </el-table-column>
        <el-table-column prop="position" label="职位">

        </el-table-column>
        <el-table-column prop="department" label="部门">

        </el-table-column>
        <el-table-column prop="cel" label="手机">

        </el-table-column>
        <el-table-column prop="email" label="邮箱">

        </el-table-column>
        <el-table-column label="状态">
          <template scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row.userId)">修改</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.status == -1" @click.native="deleteItem(scope.row.userId,1)">启用
                </el-dropdown-item>
                <el-dropdown-item v-else @click.native="deleteItem(scope.row.userId,-1)">禁用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <pagination @setChanged="pageChanged" :totalPage="totalPage"></pagination>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        tableData: [],
        form: {
          name: '',
          loginId: '',
          status: ''
        },
      }
    },
    components: {
      'pagination': require('../../../components/pagination')
    },

    methods: {
      addUser(){
        this.$router.push('/personal/user/add');
      },
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
      select(size, num){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.user.selectUserListPage(requestData, function (data) {
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      update(id){
        let url = '/personal/user/update/' + id;
        this.$router.push(url);
      },
      deleteItem(id, status){
        let self = this;
        let str = '';
        status === 1 ? str = '确认启用?' : str = '确认禁用?';
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            token: window.localStorage.getItem('token'),
            userId: id,
            status: status
          };
          self.httpApi.user.updateUserStatus(requestData, function (data) {
            self.$message.success('操作成功');
            setTimeout(function () {
              self.$router.go(0);
            },500);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }
  }
</script>
