<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">租户详情</h3>
      <el-form ref="form" :model="form" class="request-form" label-width="120px">
        <el-form-item label="登录账号" prop="loginId">
          <span>{{companySuffix}}{{form.loginId}}</span>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          {{form.name}}
        </el-form-item>
        <el-form-item label="性别">
          <span v-if="form.sex">男</span>
          <span v-else>女</span>
        </el-form-item>
        <el-form-item label="头像">
          <uploadoneimg
            :fileList="form.avatar"
            @getFileList="getLogo">
          </uploadoneimg>
        </el-form-item>
        <el-form-item label="昵称">
          {{form.nickname}}
        </el-form-item>
        <el-form-item label="手机" prop="cel">
          {{form.cel}}
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          {{form.email}}
        </el-form-item>
        <el-form-item label="职位">
          {{form.position}}
        </el-form-item>
        <el-form-item label="QQ">
          {{form.qq}}
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        form: {
          userId: '',
          loginId: '',
          name: '',
          sex: true,
          avatar: '',
          nickname: '',
          cel: '',
          email: '',
          pwd: '',
          position: '',
          qq: '',
          pwdAgain: '',
        },
        companySuffix: '',//公司loginId前缀
        totalRoleList: [],
        totalDepartmentList: [],
        type: false,//false是添加true是修改
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    components: {
      'uploadoneimg': require('../../../components/uploadoneimg')
    },
    methods: {
      select(id){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          companyId: id
        };
        self.httpApi.company.selectCompanyById(requestData, function (data) {
          self.formPass(self.form, data.data);
        });
      },
      getDepartmentList(){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          companyId: JSON.parse(window.localStorage.getItem('userinfo')).companyId
        };
        self.httpApi.organization.selectOrganizationList(requestData, function (data) {
          self.totalDepartmentList = data.data;
        });
      },
    }
  }
</script>
