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
        <el-form-item label="客户名称">
          <el-input placeholder="请输入客户名称" class="form-input" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input placeholder="请输入联系电话" class="form-input" v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input placeholder="请输入手机" class="form-input" v-model="form.cel"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input placeholder="请输入编码" class="form-input" v-model="form.customerNo"></el-input>
        </el-form-item>
        <el-form-item label="全部角色">
          <el-select v-model="form.customerRole" @click.native="getRoleList">
            <el-option label="全部角色" :value="''"></el-option>
            <el-option v-for="t in totalRoleList" :key="t.name" :value="t.value" :label="t.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <el-button @click="addClient">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="客户名称">

        </el-table-column>
        <el-table-column prop="customerNo" label="客户编码">

        </el-table-column>
        <el-table-column prop="tel" label="联系电话">

        </el-table-column>
        <el-table-column prop="address" label="地址">

        </el-table-column>
        <el-table-column prop="cel" label="手机">

        </el-table-column>
        <el-table-column prop="customerRole" label="客户角色">

        </el-table-column>
        <el-table-column label="创建时间" min-width="180px">
          <template scope="scope">
            {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="creater" label="创建人">

        </el-table-column>
        <el-table-column label="修改时间" min-width="180px">
          <template scope="scope">
            {{moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="updater" label="修改人">

        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeDetail(scope.row.customerId)">查看详情</el-dropdown-item>
                <el-dropdown-item @click.native="update(scope.row.customerId)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="deleteClient(scope.row.customerId)">删除</el-dropdown-item>
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
          customerRole: '',
          name: '',
          tel: '',
          cel: '',
          customerNo: ''
        },
        totalRoleList: []
      }
    },
    components: {
      'pagination': require('../../../components/pagination')
    },

    methods: {
      addClient(){//添加客户
        this.$router.push('/client/platform/add');
      },
      getRoleList(){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          type: 'customer-role'
        };
        self.httpApi.dict.selectDictByType(requestData, function (data) {
          self.totalRoleList = data.data;
        });
      },
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
      deleteClient(id){
        let self = this;
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            token: window.localStorage.getItem('token'),
            customerId: id,
          };
          self.httpApi.customer.deleteCustomerById(requestData, function (data) {
            self.$message.success('删除成功');
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
      },
      select(size, num){

        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.customer.selectCustomerListPage(requestData, function (data) {
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      seeDetail(id){
        let url = '/client/platform/detail/' + id;
        this.$router.push(url);
      },
      update(id){
        let url = '/client/platform/update/' + id;
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
