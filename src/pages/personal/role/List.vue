<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">角色管理</h3>
      <el-form :model="form" inline class="request-form">
        <el-form-item>
          <el-button @click="addRole">新增角色</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column prop="name" label="角色名称">

        </el-table-column>
        <el-table-column prop="remarks" label="备注">

        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template scope="scope">
            <span v-if="scope.row.status == 1">正常</span>
            <span v-if="scope.row.status == -1">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creater" label="创建人">

        </el-table-column>
        <el-table-column label="修改时间">
          <template scope="scope">
            <span>{{moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updater" label="修改人">

        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row.roleId)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="deleteItem(scope.row.roleId)">删除</el-dropdown-item>
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
    components: {
      'pagination': require('../../../components/pagination')
    },
    methods: {
      addRole(){
        this.$router.push('/personal/role/add');
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
          pageNum: num
        };
        self.$http.post('/ui/role/selectRoleListPage', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectRoleListPage', response)
          if (data.code == 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      update(id){
        let path = '/personal/role/update/' + id;
        this.$router.push({path: path});
      },
      deleteItem(id){
        let self = this;
        this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            token: window.localStorage.getItem('token'),
            roleId: id
          };
          self.$http.post('/ui/role/deleteRole', self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            if (data.code == 10000) {
              self.$message.success('删除成功');
              self.$router.go(0);
            }
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style>
</style>
