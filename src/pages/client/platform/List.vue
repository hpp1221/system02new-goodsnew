<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">客户列表</h3>
      <!--<el-form ref="form" :model="form" inline class="request-form">-->
      <!--<el-form-item>-->
      <!--<el-button @click="addUser">新增用户</el-button>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <el-form ref="form" :model="form" inline class="request-form">
        <el-form-item label="全部角色">
          <el-select v-model="form.role">
            <el-option :label="全部角色" :value="0"></el-option>
            <el-option v-for="r in roles" :label="r.name" :key="r.id">

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="全部角色">
          <el-input placeholder="请输入客户名称/联系电话/手机/编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
          <el-button @click="select">导入</el-button>
          <el-button @click="select">导出</el-button>
          <el-button @click="addClient">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column prop="name" label="客户名称">

        </el-table-column>
        <el-table-column prop="customerId" label="客户编码">

        </el-table-column>
        <el-table-column prop="tel" label="联系电话">

        </el-table-column>
        <el-table-column prop="address" label="地址">

        </el-table-column>
        <el-table-column prop="cel" label="手机">

        </el-table-column>
        <el-table-column prop="contacts" label="客户角色">

        </el-table-column>
        <el-table-column prop="contacts" label="创建时间">

        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeDetail(scope.row.companyId)">查看详情</el-dropdown-item>
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
          name: ''
        },
      }
    },
    components: {
      'pagination': require('../../../components/pagination')
    },

    methods: {
      addClient(){//添加客户
        this.$router.push('/client/platform/add');
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
        self.$http.get('/ui/customer/selectCustomerListPage', {params: requestData}).then(function (response) {
          let data = response.data;
          console.log('selectCustomerListPage', response)
          if (data.code === 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      seeDetail(id){
        let url = '/tenant/company/detail/' + id;
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
          self.$http.post('/ui/user/updateUserStatus', self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            console.log(response)
            if (data.code === 10000) {
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
