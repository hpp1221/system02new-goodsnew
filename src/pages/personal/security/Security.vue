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
					<p class="label-value">你验证的邮箱：<span>122817113@qq.com</span></p>
					<el-button type="text" class="update-button">修改</el-button>
				</div>
				<div class="user-security-repeat-div">
					<img src="../../../assets/images/success.png" alt="" class="status-img"/>
					<p class="label-name">手机验证</p>
					<div class="vertical-line"></div>
					<p class="label-value">你绑定的手机：<span>159****3422</span></p>
					<el-button type="text" class="update-button">修改</el-button>
				</div>
				<div class="user-security-repeat-div">
					<img src="../../../assets/images/success.png" alt="" class="status-img"/>
					<p class="label-name">支付密码</p>
					<div class="vertical-line"></div>
					<p class="label-value">
						<el-progress :text-inside="true" :stroke-width="20" :percentage="90" status="success" style="width:200px;display:inline-block;top:-2px"></el-progress>
					</p>
					<el-button type="text" class="update-button">修改</el-button>
				</div>
			</div>
			<el-dialog title="密码修改" v-model="pwdModalVisible">
			  	<el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="100px">
			    	<el-form-item label="输入旧密码" prop="pass">
			      		<el-input type="password" v-model="pwdForm.oldPwd" auto-complete="off"></el-input>
			    	</el-form-item>
			    	<el-form-item label="输入新密码" prop="checkPass">
					    <el-input type="password" v-model="pwdForm.newPwd" auto-complete="off"></el-input>
					</el-form-item>
				    <el-form-item label="确认新密码" :label-width="formLabelWidth">
				      	<el-input type="password" v-model="pwdForm.newPwdAgain" auto-complete="off"></el-input>
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
			return {
				rate:3.5,
				pwdModalVisible:false,//修改密码模态框
				pwdForm:{
					oldPwd:'',//老密码
					newPwd:'',//新密码
					newPwdAgain:'',//确认新密码
				},
			}
		}
	}
</script>

<style>
</style>