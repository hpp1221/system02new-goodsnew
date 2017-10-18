<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">公司列表</h3>
      <!--<el-form ref="form" :model="form" inline class="request-form">-->
        <!--<el-form-item>-->
          <!--<el-button @click="addUser">新增用户</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <el-form ref="form" :model="form" inline class="request-form">
        <el-form-item label="公司名">
          <el-input v-model="form.name" placeholder="请输入公司名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column prop="name" label="公司名">

        </el-table-column>
        <el-table-column prop="industryType" label="行业类型">

        </el-table-column>
        <el-table-column prop="address" label="公司地址">

        </el-table-column>
        <el-table-column prop="postcode" label="邮编">

        </el-table-column>
        <el-table-column prop="contacts" label="联系人">

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
            name:''
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
        self.$http.post('/ui/company/selectCompanyListPage', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectCompanyListPage', response)
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
