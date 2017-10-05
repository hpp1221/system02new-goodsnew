<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">员工账户详细信息</h3>
      <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="120px" style="width:700px">
        <h4 class="item-title">基础信息</h4>
        <el-form-item label="登录账号" prop="loginId">
          <span>{{companySuffix}}</span>
          <el-input placeholder="请输入登录账号" v-model="form.loginId" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input placeholder="请输入真实姓名" v-model="form.name" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" :label="true">男</el-radio>
          <el-radio v-model="form.sex" :label="false">女</el-radio>
        </el-form-item>
        <el-form-item label="头像">
          <uploadoneimg :fileList="form.avatar" @getFileList="getLogo"></uploadoneimg>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input placeholder="请输入昵称" v-model="form.nickname" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="手机" prop="cel">
          <el-input type="number" placeholder="请输入手机" v-model="form.cel" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" placeholder="为空表示不修改密码" v-model="form.pwd" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-radio v-model="form.departmentManager" :label="true">是</el-radio>
          <el-radio v-model="form.departmentManager" :label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" class="form-input" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select placeholder="请选择部门" class="form-input" v-model="form.department">
            <el-option v-for="t in totalDepartmentList" :key="t.organizationId" :value="t.organizationId"
                       :label="t.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-input placeholder="请输入职位" v-model="form.position" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input type="number" placeholder="请输入QQ" v-model="form.qq" class="form-input">
          </el-input>
        </el-form-item>

        <el-form-item label="账户角色">
          <el-select placeholder="请输入账户角色" class="form-input" v-model="form.roleIds" multiple>
            <el-option v-for="t in totalRoleList" :key="t.roleId" :value="t.roleId" :label="t.name"></el-option>
          </el-select>
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
//			var celValidator = (rule, value, callback) => {
//		        if (value === '') {
//		          	callback(new Error('请输入手机'));
//		        } else {
//		          	let self = this;
//		          	let requestData = {phone:value};
//		          	self.$http.post('/ui/user/checkUserCelCount',self.qs.stringify(requestData)).then(function (response) {
//					    let data = response.data;
//					    console.log('checkUserCelCount',response)
//						if(data.code == 10000){
//							callback();
//						}else{
//							callback(new Error('手机已被使用'));
//						}
//
//				    }).catch(function (error) {
//				    	console.log(error);
//				    });
//		        }
//	      	};
//			var emailValidator = (rule, value, callback) => {
//		        if (value === '') {
//		          	callback(new Error('请输入邮箱'));
//		        } else {
//		          	let self = this;
//		          	let requestData = {email:value};
//		          	self.$http.post('/ui/user/selectUserCountByEmail',self.qs.stringify(requestData)).then(function (response) {
//					    let data = response.data;
//					    console.log('selectUserCountByEmail',response)
//						if(data.code == 10000){
//							callback();
//						}else{
//							callback(new Error('邮箱已被使用'));
//						}
//
//				    }).catch(function (error) {
//				    	console.log(error);
//				    });
//
//		        }
//	      	};
//			var pwdValidator = (rule, value, callback) => {
//		        if (value === '') {
//		          	callback(new Error('请输入密码'));
//		        } else {
//		          	if (this.form.pwdAgain !== '') {
//		            	this.$refs.form.validateField('pwdAgain');
//		          	}
//		          	callback();
//		        }
//	      	};
//		    var pwdAgainValidator = (rule, value, callback) => {
//		        if (value === '') {
//		          callback(new Error('请再次输入密码'));
//		        } else if (value !== this.form.pwd) {
//		          callback(new Error('两次输入密码不一致!'));
//		        } else {
//		          callback();
//		        }
//		    };
      return {
        form: {
          loginId: '',
          name: '',
          sex: true,
          avatar: '',
          nickname: '',
          cel: '',
          departmentManager: false,
          email: '',
          pwd: '',
          department: '',
          position: '',
          qq: '',
          pwdAgain: '',
          roleIds: []
        },
//				rules:{
//					loginId: [
//						{required:true,message:'请输入登录账号'}
//					],
//					name: [
//						{required:true,message:'请输入真实姓名'}
//					],
//					cel: [
//						{
//							validator: celValidator,
//			            	trigger:'blur'
//						}
//					],
//					email: [
//						{
//							validator: emailValidator,
//			            	trigger:'blur'
//						}
//					],
//					pwd: [
//			            {
//			            	validator: pwdValidator,
//			            	trigger:'change'
//			            }
//			        ],
//			        pwdAgain: [
//			            {
//			            	validator: pwdAgainValidator,
//			            	trigger:'change'
//			            }
//			        ],
//				},
        rules: {},
        companySuffix:'',//公司loginId前缀
        totalRoleList: [],
        totalDepartmentList: [],
        type: false,//false是添加true是修改
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
      this.getPrimaryUserLoginId();
      this.getRoleList();
      this.getDepartmentList();
    },
    components: {
      'uploadoneimg': require('../../../components/uploadoneimg')
    },
    methods: {
      getPrimaryUserLoginId(){
        let self = this;
        let requestData = {token: window.localStorage.getItem('token')};
        self.$http.post('/ui/user/selectPrimaryUserLoginId',self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectPrimaryUserLoginId',response)
          if(data.code == 10000){
            self.companySuffix = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      select(id){
        let self = this;
        let requestData = {
          params: {
            token: window.localStorage.getItem('token'),
            userId: id
          }
        };
        self.$http.get('/ui/user/selectUserById', requestData).then(function (response) {
          let data = response.data;
          console.log('selectUserById', response)
          if (data.code == 10000) {
            self.formPass(self.form, data.data);
            self.form.pwd = '';
//            if (self.form.loginId.indexOf(self.userinfo.loginId) === 0) {
//              self.form.loginId = self.form.loginId.substring(self.userinfo.loginId.length + 1, self.form.loginId.length);
//            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getLogo(file){//获取logo
        this.form.avatar = file;
      },
      submit(formName){//保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let self = this;
            let requestData = {
              token: window.localStorage.getItem('token'),
              userId: self.$route.query.id
            };
            //self.form.loginId = JSON.parse(window.localStorage.getItem('userinfo')).loginId + '-' + self.form.loginId;
            requestData = Object.assign(requestData, self.shallowCopy(self.form));
            self.$http.post('/ui/user/updateUser', self.qs.stringify(requestData)).then(function (response) {
              let data = response.data;
              console.log('addUser', response)
              if (data.code == 10000) {
                self.$message.success('保存成功');
                self.$router.push('/personal/user/list');
              }
            }).catch(function (error) {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getRoleList(){
        let self = this;
        let requestData = {token: window.localStorage.getItem('token')};
        self.$http.post('/ui/role/selectRoleList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectRoleList', response)
          if (data.code == 10000) {
            self.totalRoleList = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getDepartmentList(){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          companyId: JSON.parse(window.localStorage.getItem('userinfo')).companyId
        };
        self.$http.post('/ui/organization/selectOrganizationList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectOrganizationList', response)
          if (data.code == 10000) {
            self.totalDepartmentList = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>

<style>
</style>
