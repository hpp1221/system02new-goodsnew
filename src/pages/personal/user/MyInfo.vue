<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">个人信息</h3>
      <el-form ref="form" :model="form" class="request-form" label-width="120px" style="width:700px">
        <h4 class="item-title">账户信息</h4>
        <el-form-item label="账号">
          <el-input v-model="form.loginId" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.name" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="头像">
          <uploadoneimg
            :fileList="form.avatar"
            @getFileList="getLogo"
            :token="imgToken"
            v-if="imgToken">
          </uploadoneimg>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.cel" class="form-input" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="form.qq" class="form-input" type="number">
          </el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select placeholder="请选择部门" class="form-input" v-model="form.department">
            <el-option v-for="t in totalDepartmentList" :key="t.organizationId" :value="t.organizationId"
                       :label="t.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.position" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input class="form-input" v-model="form.email" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit('form')">保存</el-button>
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
          nickname: '',
          avatar: '',
          cel: '',
          qq: '',
          department: '',
          position: '',
          email: ''
        },
        imgToken: '',
        totalDepartmentList: [],
      }
    },
    created(){
      let self = this;
      self.getUserInfo();//查询用户信息
      self.userInfoToForm();//把userinfo放入form
      self.getDepartmentList();
      self.getImgAccess(function (data) {
        self.imgToken = data;
      });//获取图片token
    },
    components: {
      'uploadoneimg': require('../../../components/uploadoneimg')
    },
    methods: {
      userInfoToForm(){//查询公司信息
        this.formPass(this.form, JSON.parse(window.localStorage.getItem('userinfo')));
      },
      getLogo(file){//获取logo
        this.form.avatar = file.url;
      },
      submit(formName){//保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let self = this;
            let requestData = {
              token: window.localStorage.getItem('token'),
            };
            requestData = Object.assign(requestData, self.shallowCopy(self.form));
            self.httpApi.user.updateMyInfo(requestData, function (data) {
              self.$message.success('保存成功');
              setTimeout(function () {
                self.$router.go(0)
              }, 1000);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
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
