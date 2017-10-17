<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">添加客户</h3>
      <el-form ref="form" :model="addForm" label-width="90px" class="request-form">
        <el-form-item label="客户名称">
          {{addForm.name}}
        </el-form-item>
        <el-form-item label="客户编码">
          {{addForm.customerNo}}
        </el-form-item>
        <el-form-item label="客户电话">
          {{addForm.tel}}
        </el-form-item>
        <el-form-item label="客户手机">
          {{addForm.cel}}
        </el-form-item>
        <el-form-item label="客户地址">
          {{addForm.address}}
        </el-form-item>
        <el-form-item label="客户QQ">
          {{addForm.qq}}
        </el-form-item>
        <el-form-item label="客户邮箱">
          {{addForm.email}}
        </el-form-item>
        <el-form-item label="客户角色">
          {{addForm.customerRole}}
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        addForm: {
          customerId: '',
          customerNo: '',
          name: '',
          cel: '',
          tel: '',
          address: '',
          qq: '',
          email: '',
          customerRole: ''
        },
        totalRoleList: []
      }
    },
    created(){
      this.$route.params.id ? this.getRoleList(this.$route.params.id) : this.$router.push('/error');
    },
    methods: {
      getRoleList(id){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          type: 'customer-role'
        };
        self.$http.post('/ui/dict/selectDictByType', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectDictByType', response)
          if (data.code === 10000) {
            self.totalRoleList = data.data;
            self.select(id);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      select(id){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          customerId: id
        };
        self.$http.get('/ui/customer/selectCustomerById', {params: requestData}).then(function (response) {
          let data = response.data;
          console.log('selectCustomerById', response)
          if (data.code === 10000) {
            self.addForm = self.formPass(self.addForm, data.data);
            for (let i = 0; i < self.totalRoleList.length; i++) {
              if (self.addForm.customerRole === self.totalRoleList[i].value) {
                self.addForm.customerRole = self.totalRoleList[i].name;
              }
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      sureUpdateClient(){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.addForm));
        self.$http.post('/ui/customer/updateCustomerById', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('updateCustomerById', response)
          if (data.code === 10000) {
            self.$router.push('/client/platform/list');
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      cancel(){
        this.$router.push('/client/platform/list');
      }
    }
  }
</script>
