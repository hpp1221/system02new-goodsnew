<template>
	<div class="container">
		<div class="wrapper">
			<h4 class="user-security-title">账户安全</h4>
			<div class="user-security-div">
				<h4 class="title">安全中心</h4>
				<div class="user-security-level-div">
					<p class="level-label">安全级别：</p>
					<el-progress :text-inside="true" :stroke-width="20" :percentage="90" status="success" style="width:200px;display:inline-block;top:-2px"></el-progress>
					<p class="level-status">较高</p>
					<p class="suggestion">建议您启动全部安全设置。以保障账户及资金安全。</p>
				</div>
				<div class="user-security-repeat-div">
					<img src="../../../assets/images/success.png" alt="" class="status-img"/>
					<p class="label-name">登陆密码</p>
					<div class="vertical-line"></div>
					<p class="label-warning">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p>
					<el-button type="text" class="update-button" @click="pwdModalVisible = true">修改</el-button>
				</div>
				<div class="user-security-repeat-div">
					<img src="../../../assets/images/success.png" alt="" class="status-img"/>
					<p class="label-name">邮箱验证</p>
					<div class="vertical-line"></div>
					<p class="label-value" v-if="userInfo.email">你验证的邮箱：<span>{{userInfo.email}}</span></p>
					<p class="label-value" v-else>未验证邮箱</p>
					
					<el-button type="text" class="update-button" v-if="userInfo.email">修改</el-button>
					<el-button type="text" class="update-button" v-else>去验证</el-button>
				</div>
				<div class="user-security-repeat-div">
					<img src="../../../assets/images/success.png" alt="" class="status-img"/>
					<p class="label-name">手机验证</p>
					<div class="vertical-line"></div>
					<p class="label-value">你绑定的手机：<span v-if="userInfo.cel">{{userInfo.cel}}</span></p>
					<el-button type="text" class="update-button" @click="phoneModalVisible = true">修改</el-button>
				</div>
				<div class="user-security-repeat-div">
					<img src="../../../assets/images/success.png" alt="" class="status-img"/>
					<p class="label-name">支付密码</p>
					<div class="vertical-line"></div>
					<p class="label-value">
						安全程度
						<el-progress :text-inside="true" :stroke-width="20" :percentage="90" status="success" style="width:200px;display:inline-block;top:-2px;left:20px"></el-progress>
					</p>
					<el-button type="text" class="update-button">修改</el-button>
				</div>
			</div>
			<el-dialog title="密码修改" v-model="pwdModalVisible" size="tiny">
			  	<el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="80px">
			    	<el-form-item label="输入旧密码" prop="oldPwd">
			      		<el-input type="password" v-model="pwdForm.oldPwd" auto-complete="off"></el-input>
			    	</el-form-item>
			    	<el-form-item label="输入新密码" prop="pwd">
					    <el-input type="password" v-model="pwdForm.pwd" auto-complete="off" ></el-input>
					</el-form-item>
				    <el-form-item label="确认新密码" prop="pwdAgain" :label-width="formLabelWidth">
				      	<el-input type="password" v-model="pwdForm.pwdAgain" auto-complete="off" ></el-input>
				    </el-form-item>
			  	</el-form>
			  	<div slot="footer">
			    	<el-button @click="pwdModalVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="sureChangePwd('pwdForm')">确 定</el-button>
			  	</div>
			</el-dialog>
			<el-dialog title="新手机绑定" v-model="phoneModalVisible" size="tiny">
			  	<el-form :model="phoneForm" :rules="phoneRules" ref="phoneForm" label-width="80px">
			    	<el-form-item prop="phone" label="手机">
	    				<el-input v-model="phoneForm.phone" placeholder="输入手机号" style="width: 300px;" @blur="checkPhone"></el-input>
	    				<el-button type="text" class="verify-code" @click="getVerifyCode" v-if="verifyText =='获取验证码'">获取验证码</el-button>
	    				<el-button type="text" class="verify-code" disabled v-else>{{verifyText}}秒后重发</el-button>
	  				</el-form-item>
	  				<el-form-item prop="code" label="验证码">
	    				<el-input v-model="phoneForm.code" placeholder="输入验证码"></el-input>
	  				</el-form-item>
			  	</el-form>
			  	<div slot="footer">
			    	<el-button @click="phoneModalVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="sureChangePhone">确 定</el-button>
			  	</div>
			</el-dialog>
			<el-dialog title="修改邮箱" v-model="emailModalVisible">
			  	<el-form :model="emailForm" :rules="emailRules" ref="emailForm" label-width="100px">
			    	<el-form-item label="邮箱" prop="pass">
			      		<el-input v-model="emailForm.email" auto-complete="off"></el-input>
			    	</el-form-item>
			    	<el-form-item label="输入新密码" prop="checkPass">
					    <el-input v-model="pwdForm.newPwd" auto-complete="off"></el-input>
					</el-form-item>
				    <el-form-item label="确认新密码" :label-width="formLabelWidth">
				      	<el-input v-model="pwdForm.newPwdAgain" auto-complete="off"></el-input>
				    </el-form-item>
			  	</el-form>
			  	<div slot="footer">
			    	<el-button @click="dialogFormVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			  	</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			var oldPwdValidator = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请输入旧密码'));
		        } else {
		          	callback();
		        }
	      	};
			var pwdValidator = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请输入密码'));
		        } else {
		          	if (this.pwdForm.pwdAgain !== '') {
		            	this.$refs.pwdForm.validateField('pwdAgain');
		          	}
		          	callback();
		        }
	      	};
		    var pwdAgainValidator = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.pwdForm.pwd) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		    };
			return {
				rate:3.5,
				pwdModalVisible:false,//修改密码模态框
				phoneModalVisible:false,//修改手机模态框
				pwdForm:{
					oldPwd:'',//老密码
					pwd:'',//新密码
					pwdAgain:'',//确认新密码
				},
				phoneForm:{
					phone:'',
					code:''
				},
				emailForm:{
					
				},
				pwdRules:{
					oldPwd: [
						{
							validator: oldPwdValidator, 
						}
					],
					pwd: [
			            {
			            	validator: pwdValidator, 
			            	trigger:'change'
			            }
			        ],
			        pwdAgain: [
			            {
			            	validator: pwdAgainValidator, 
			            	trigger:'change'
			            }
			        ],
				},
				phoneRules:{
					
				},
				emailRules:{
					
				},
				verifyText:'获取验证码',
				phoneAvailable:false
			}
		},
		created(){
			console.log(JSON.parse(window.localStorage.getItem('userinfo')));
		},
		computed:{
			userInfo:function(){
				return JSON.parse(window.localStorage.getItem('userinfo'));
			}
		},
		methods:{
			sureChangePwd(formName){
				this.$refs[formName].validate((valid) => {
			        if (valid) {
			        	let self = this;
			        	let requestData = {
			        		token: window.localStorage.getItem('token'),
			        		oldPwd:self.pwdForm.oldPwd,
			        		pwd: self.pwdForm.pwd,
			        	};
			            self.$http.post('/ui/user/updatePwd.do',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log(response);
							if(data.code == 10000){
								self.pwdModalVisible = false;
								self.$message.success('修改成功！');
								self.getUserInfo();
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
			sureChangePhone(){
				let self = this;
	        	let requestData = {
	        		token: window.localStorage.getItem('token'),
	        		phone:self.phoneForm.phone,
	        		code: self.phoneForm.code,
	        	};
	            self.$http.post('/ui/user/updateUserPhone.do',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log(response);
					if(data.code == 10000){
						self.phoneModalVisible = false;
						self.$message.success('修改成功！');
						self.getUserInfo();
					}else{
						self.$message.error(data.message);
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
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
      			let requestData = {params:{phone:self.phoneForm.phone,type:2}};//1代表修改
      			self.$http.get('/ui/user/getMessage.do',requestData).then(function (response) {
				    let data = response.data;
				    console.log(response);
					if(data.code == 10000){
						self.$message.success('已成功发送');
					}else{
						self.$message.error('发送失败');
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
      			
      		},
      		checkPhone(){
      			let self = this;
    			let requestData = {phone:self.phoneForm.phone};
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
		}
	}
</script>

<style>
</style>