<template>
	<div class="container">
		<div class="wrapper">
			<h4 class="client-management-title">客户管理</h4>
			<h5 class="client-management-clientlist">客户新增</h5>
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
				<el-form-item label="客户名称" class="createclient-list" prop="clientname">
					<el-input v-model="ruleForm.clientname" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="客户电话" class="createclient-list" prop="clienttel">
					<el-input v-model="ruleForm.clienttel" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="客户手机" class="createclient-list" prop="clientmobile">
					<el-input v-model="ruleForm.clientmobile" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="客户地址" class="createclient-list" style="width:90%" prop="clientaddress">
					<el-input v-model="ruleForm.clientaddress"></el-input>
				</el-form-item>
				<el-form-item label="客户QQ" class="createclient-list" prop="clientqq">
					<el-input v-model="ruleForm.clientqq" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="客户邮箱" class="createclient-list" prop="clientemail">
					<el-input v-model="ruleForm.clientemail" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="性别" class="createclient-list" prop="clientsex">
					<el-select v-model="ruleForm.clientsex">
						<el-option label="男" value="clientwoman"></el-option>
						<el-option label="女" value="clientman"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="客户编码" class="createclient-list" prop="clientcode">
					<el-input v-model="ruleForm.clientcode" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="客户级别" class="createclient-list" prop="clientclass">
					<el-select v-model="ruleForm.clientclass">
						<el-option label="VIP1" value="VIP1"></el-option>
						<el-option label="VIP2" value="VIP2"></el-option>
						<el-option label="VIP3" value="VIP3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" class="createclient-list">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					clientname: '',
					clienttel: '',
					clientmobile: '',
					clientaddress: '',
					clientqq: '',
					clientemail: '',
					clientsex: '',
					clientcode: '',
					clientclass: '',

				},
				rules: {
					clientname: [{
							required: true,
							message: '请输入客户名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							message: '长度在 1 到 20 个字符',
							trigger: 'blur'
						}
					],
					clienttel: [{
						required: true,
						message: '请输入客户电话',
						trigger: 'blur'
					}],
					clientmobile: [{
						required: true,
						message: '请输入客户手机',
						trigger: 'blur'
					}],
					clientaddress: [{
						required: true,
						message: '请输入客户地址',
						trigger: 'blur'
					}],
					clientqq: [{

						required: true,
						message: '请输入客户QQ',
						trigger: 'blur'
					}],
					clientemail: [{
						required: true,
						message: '请输入客户邮箱',
						trigger: 'blur'
					}],
					clientsex: [{
						required: true,
						message: '请输入性别',
						trigger: 'change'
					}],
					clientcode: [{
						required: true,
						message: '请输入客户编码',
						trigger: 'blur'
					}],
					clientclass: [{
						required: true,
						message: '请输入客户级别',
						trigger: 'change'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>