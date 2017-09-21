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
					    	<el-input v-model="registerForm.username" placeholder="公司名称,推荐公司首字母缩写,例如觇智科技(CZKJ)" @blur="checkUserName"></el-input>
						</el-form-item>
		  				<el-form-item prop="password">
		    				<el-input v-model="registerForm.password" placeholder="输入密码" type="password"></el-input>
		  				</el-form-item>
		  				<el-form-item prop="phone">
		    				<el-input v-model="registerForm.phone" placeholder="输入手机号" style="width: 300px;" @blur="checkPhone"></el-input>
		    				<el-button type="text" class="verify-code" @click="getVerifyCode" v-if="verifyText =='获取验证码'">获取验证码</el-button>
		    				<el-button type="text" class="verify-code" disabled v-else>{{verifyText}}秒后重发</el-button>
		  				</el-form-item>
		  				<el-form-item prop="verifyCode">
		    				<el-input v-model="registerForm.code" placeholder="输入验证码"></el-input>
		  				</el-form-item>
		  				<el-button type="primary" @click="register('registerForm')" class="login-btn">注册</el-button>
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
					password:'',
					phone:'',
					code:''
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
          			],
          			code:[
          				{ required: true, message: '请输入验证码', trigger: 'change' },
          			]
				},
				tabName:'login',
				verifyText:'获取验证码',
				phoneAvailable:false,//手机是否可用
				
			}
		},
		created(){
			window.localStorage.getItem('twoWeek') === 'true'?this.form.twoWeek = true : this.form.twoWeek = false;
			if(this.form.twoWeek){
				this.checkCookies();
			}
		},
		methods:{
			submitForm(formName) {//登录
        		this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this;
            			let form = self.form;
            			let requestData = {
            				username:form.username,
            				password:form.password
            			};
						self.$http.post('/ui/user/login.do',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log(response);
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
      		register(formName){//注册按钮
      			this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this;
            			let requestData = self.shallowCopy(self.registerForm);
						self.$http.post('/ui/user/register.do',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log(response);
							if(data.code == 10000){
								self.$message.success('注册成功');
							}else{
								self.$message.error(data.message);
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
      		checkUserName(){//注册判断用户名是否重复
      			let self = this;
    			let requestData = {username:self.registerForm.username};
				self.$http.post('/ui/user/checkUserCount.do',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
					if(data.code == 10000){
						self.$message.success('用户名可用');
					}else{
						self.$message.error('用户名已重复');
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
      		},
      		checkPhone(){
      			let self = this;
    			let requestData = {phone:self.registerForm.phone};
				self.$http.post('/ui/user/checkUserCelCount.do',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
					if(data.code == 10000){
						self.phoneAvailable = true;
					}else{
						self.phoneAvailable = false;
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
      		},
      		forgetPwd(){//忘记密码跳转
      			
      		},
      		checkCookies(){//免密登录
      			
      		},
      		getVerifyCode(){//获取短信验证码
      			let self = this;
      			if(!self.phoneAvailable){
      				self.$message.error('该手机号已被使用');
      				return;
      			}
      			self.verifyText = 60;
      			var messageCount = setInterval(function(){
      				self.verifyText--;
      				if(self.verifyText === 0){
      					self.verifyText = '获取验证码';
      					clearInterval(messageCount);
      				}
      			},1000);
      			let requestData = {params:{phone:self.registerForm.phone,type:1}};//1代表注册,2代表修改
      			self.$http.get('/ui/user/getMessage.do',requestData).then(function (response) {
				    let data = response.data;
				    console.log(response);
					if(data.code == 10000){
						self.$message.success('已成功发送');
					}else{
						self.$message.error(data.message);
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
      			
      		}
		}
	}
</script>

<style>
</style>