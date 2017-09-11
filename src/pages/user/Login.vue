<template>
	<div class="login-container">
		<div class="login-box">
			<div class="login-ivis-div">
				<img src="../../assets/images/ivis.jpg" alt="" />
			</div>
			<el-tabs v-model="tabName">
    			<el-tab-pane label="登录" name="login">
			    	<el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
						<el-form-item prop="username">
							<input type="text" style="display:none;">
					    	<el-input v-model="form.username" placeholder="用户名称" auto-complete="off" autofocus @keyup.enter.native="submitForm('form')"></el-input>
						</el-form-item>
		  				<el-form-item prop="password">
		    				<el-input v-model="form.password" placeholder="输入密码" type="password" @keyup.enter.native="submitForm('form')"></el-input>
		  				</el-form-item>
		  				<el-form-item>
		    				<el-checkbox label="两周内免密登录" name="type" v-model="form.twoWeek"></el-checkbox>
		  				</el-form-item>
		  				<el-button type="primary" @click="submitForm('form')" class="login-btn">登录</el-button>
		  			</el-form>
					<el-button type="text" @click="forgetPwd" class="forget-btn">忘记密码</el-button>
    			</el-tab-pane>
	    		<el-tab-pane label="注册" name="register">
	    			<el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="demo-ruleForm">
						<el-form-item prop="username">
							<input type="text" style="display:none;">
					    	<el-input v-model="registerForm.username" placeholder="公司名称,推荐公司首字母缩写,例如觇智科技(CZKJ)"></el-input>
						</el-form-item>
		  				<el-form-item prop="password">
		    				<el-input v-model="registerForm.password" placeholder="输入密码" type="password"></el-input>
		  				</el-form-item>
		  				<el-form-item prop="phone">
		    				<el-input v-model="registerForm.phone" placeholder="输入手机号" style="width: 300px;"></el-input>
		    				<el-button type="text" class="verify-code" @click="getVerifyCode">获取验证码</el-button>
		  				</el-form-item>
		  				<el-form-item prop="verifyCode">
		    				<el-input v-model="registerForm.verifyCode" placeholder="输入验证码"></el-input>
		  				</el-form-item>
		  				<el-button type="primary" @click="submitForm('registerForm')" class="login-btn">注册</el-button>
		  			</el-form>
	    		</el-tab-pane>
  			</el-tabs>
  			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				form:{
					username:'',
					password:'',
					twoWeek:false,
				},
				rules:{
					username: [
            			{ required: true, message: '请输入用户名称', trigger: 'change' },
          			],
          			password: [
            			{ required: true, message: '请输入密码', trigger: 'change' }
          			],
				},
				registerForm:{
					username:'',
					password:''
				},
				registerRules:{
					username: [
            			{ required: true, message: '请输入用户名称', trigger: 'change' },
          			],
          			password: [
            			{ required: true, message: '请输入密码', trigger: 'change' }
          			],
          			phone:[
          				{ required: true, message: '请输入手机号', trigger: 'change' },
          			]
				},
				tabName:'login'
				
			}
		},
		created(){
			window.localStorage.getItem('twoWeek') === 'true'?this.form.twoWeek = true : this.form.twoWeek = false;
			if(this.form.twoWeek){
				this.checkCookies()
			}
		},
		methods:{
			submitForm(formName) {//登录
				
        		this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this
            			let form = self.form
            			let requestData = {
            				username:form.username,
            				password:form.password
            			}
						self.$http.post('/ui/user/login.do',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log(response)
							if(data.code == 10000){
								window.localStorage.setItem('token', data.data.token);
								self.$router.push('/');
							}else{
								
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
      		forgetPwd(){//忘记密码跳转
      			
      		},
      		checkCookies(){//免密登录
      			
      		},
      		getVerifyCode(){
      			
      		}
		}
	}
</script>

<style>
</style>