<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">租户列表</h3>
      <!--<el-form ref="form" :model="form" inline class="request-form">-->
      <!--<el-form-item>-->
      <!--<el-button @click="addUser">新增用户</el-button>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <el-form ref="form" :model="form" inline class="request-form">
        <el-form-item label="用户名">
          <el-input v-model="form.loginId" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="公司">
          <el-input v-model="form.companyName" placeholder="请输入公司"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column prop="loginId" label="用户名">

        </el-table-column>
        <el-table-column prop="name" label="姓名">

        </el-table-column>
        <el-table-column prop="position" label="职位">

        </el-table-column>
        <el-table-column prop="companyName" label="公司">

        </el-table-column>
        <el-table-column prop="cel" label="手机">

        </el-table-column>
        <el-table-column prop="email" label="邮箱">

        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeDetail(scope.row.userId)">查看详情</el-dropdown-item>
                <el-dropdown-item @click.native="initializationPwd(scope.row.userId)">初始化密码</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.status == -1" @click.native="forbidden(scope.row.userId,1)">启用
                </el-dropdown-item>
                <el-dropdown-item v-else @click.native="forbidden(scope.row.userId,-1)">禁用</el-dropdown-item>
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
          loginId: '',
          name: '',
          companyName: ''
        },
      }
    },
    components: {
      'pagination': require('../../../components/pagination')
    },

    methods: {
      initializationPwd(id){
        let self = this;
        this.$confirm('确认初始化该用户的密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            token: window.localStorage.getItem('token'),
            userId: id
          };
          self.httpApi.tenant.initUserPwd(requestData, function (data) {
            self.$message.success('操作成功');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
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
        self.httpApi.company.selectCompanyUserListPage(requestData, function (data) {
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      seeDetail(id){
        let url = '/tenant/tenant/detail/' + id;
        this.$router.push(url);
      },
      forbidden(id, status){//启用，禁用
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
            }, 500);
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
