<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">用户管理</h3>
      <el-form :model="form" inline class="request-form">
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
              <el-button type="text" icon="more"></el-button>
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
        form: {},
      }
    },
    created(){
      this.select();

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
        self.$http.post('/ui/user/selectUserListPage', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectUserListPage', response)
          if (data.code == 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      update(id){
        this.$router.push({path: '/personal/user/update', query: {id: id}})
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
          self.$http.post('/ui/user/updateUserStatus', self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            console.log(response)
            if (data.code == 10000) {
              self.$message.success('操作成功');
              self.$router.go(0);
            }
          }).catch(function (error) {
            console.log(error);
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

<style>
</style>
