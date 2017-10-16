<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">添加客户</h3>
      <el-form ref="form" :model="addForm" label-width="90px" class="request-form">
        <el-form-item label="客户名称">
          <el-input v-model="addForm.name" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="客户电话">
          <el-input v-model="addForm.tel" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="客户手机">
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
        <el-form-item label="客户角色">
          <el-select v-model="addForm.customerRole" @click.native="getRoleList">
            <el-option v-for="t in totalRoleList" :key="t.name" :value="t.value" :label="t.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="sureAddClient">确定</el-button>
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
    methods: {
      getRoleList(){
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
          }
        }).catch(function (error) {
          console.log(error);
        });
      },

      sureAddClient(){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.addForm));
        self.$http.post('/ui/customer/insertCustomer', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('insertCustomer', response)
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
