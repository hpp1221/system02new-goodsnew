<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">修改客户</h3>
      <el-form ref="form" :model="addForm" label-width="90px" class="request-form">
        <el-form-item label="客户名称" required>
          <el-input v-model="addForm.name" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="客户电话" required>
          <el-input v-model="addForm.tel" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="客户手机" required>
          <el-input v-model="addForm.cel" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="客户地址">
          <el-input v-model="addForm.address" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="客户QQ">
          <el-input v-model="addForm.qq" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="客户邮箱">
          <el-input v-model="addForm.email" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="客户角色" required>
          <el-select v-model="addForm.customerRole">
            <el-option v-for="t in totalRoleList" :key="t.name" :value="t.value" :label="t.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="sureUpdateClient">确定</el-button>
          <el-button @click="cancel">取消</el-button>
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
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
      this.getRoleList();
    },
    methods: {
      getRoleList(){
        let self = this;
        let requestData = {
          type: 'customer-role'
        };
        self.httpApi.dict.selectDictByType(requestData, function (data) {
          self.totalRoleList = data.data;
        });
      },
      select(id){
        let self = this;
        let requestData = {
          customerId: id
        };
        self.httpApi.customer.selectCustomerById(requestData, function (data) {
          self.addForm = self.formPass(self.addForm, data.data);
        });
      },
      sureUpdateClient(){
        let self = this;
        let requestData = {};
        requestData = Object.assign(requestData, self.shallowCopy(self.addForm));
        self.httpApi.customer.updateCustomerById(requestData, function (data) {
          self.$router.push('/client/platform/list');
        });
      },
      cancel(){
        this.$router.push('/client/platform/list');
      }
    }
  }
</script>
