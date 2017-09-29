<template>
	<div class="container">
		<div class="wrapper">
			<h4 class="client-management-title">客户管理</h4>
			<h5 class="client-management-clientlist">客户修改</h5>
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
				<el-form-item label="客户名称" class="createclient-list">
					<el-input v-model="ruleForm.name" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="客户电话" class="createclient-list">
					<el-input v-model="ruleForm.tphone" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="客户手机" class="createclient-list">
					<el-input v-model="ruleForm.mphone" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="客户地址" class="createclient-list" style="width:90%">
					<el-input v-model="ruleForm.address"></el-input>
				</el-form-item>
				<el-form-item label="客户QQ" class="createclient-list">
					<el-input v-model="ruleForm.vipQQ" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="客户邮箱" class="createclient-list">
					<el-input v-model="ruleForm.vipMail" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="性别" class="createclient-list">
					<el-select v-model="ruleForm.vipSex">
						<el-option label="男" value="0"></el-option>
						<el-option label="女" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="客户编码" class="createclient-list">
					<el-input v-model="ruleForm.num" class="createclient-input"></el-input>
				</el-form-item>
				<el-form-item label="客户级别" class="createclient-list">
					<el-select v-model="ruleForm.vip_level">
						<el-option label="VIP1" value="0"></el-option>
						<el-option label="VIP2" value="1"></el-option>
						<el-option label="VIP3" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="submitForm('ruleForm')" class="createclient-list">保存</el-button>
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
					name: '',
					tphone: '',
					mphone: '',
					address: '',
					vipQQ: '',
					vipMail: '',
					vipSex: '',
					num: '',
					vip_level: ''
				},
				rules: {//基本验证
					name: [{
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
					tphone: [{
						required: true,
						message: '请输入客户电话',
						trigger: 'blur'
					}],
					mphone: [{
						required: true,
						message: '请输入客户手机',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '请输入客户地址',
						trigger: 'blur'
					}],
					vipQQ: [{
						required: true,
						message: '请输入客户QQ',
						trigger: 'blur'
					}],
					vipMail: [{
						required: true,
						message: '请输入客户邮箱',
						trigger: 'blur'
					}],
					vipSex: [{
						required: true,
						message: '请输入性别',
						trigger: 'change'
					}],
					num: [{
						required: true,
						message: '请输入客户编码',
						trigger: 'blur'
					}],
					vip_level: [{
						required: true,
						message: '请输入客户级别',
						trigger: 'change'
					}]
				}
			};
		},
		created() {
			this.$route.query.id ? 　this.select(this.$route.query.id) : this.$router.push('/error')//判断是否接收到要修改的记录的id
		},
		methods: {
			select(id) {
				let self = this
				let requestData = {
					token: window.localStorage.getItem('token'),
					id: id
				};
				requestData = Object.assign(requestData, self.shallowCopy(self.ruleForm));
				self.$http.post('/ui/upvipdata', self.qs.stringify(requestData)).then(function(response) {
					let data = response.data;
					if(data.error_code == 0){
						self.ruleForm = response.data.data;
					}

				}).catch(function(error) {
					console.log(error);
				});
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let self = this;
						let requestData = {
							token: window.localStorage.getItem('token')
						};
						requestData = Object.assign(requestData, self.shallowCopy(self.ruleForm));
						self.$http.post('/ui/upuser', self.qs.stringify(requestData)).then(function(response) {
							let data = response.data;
							if(data.code == 0) {
								self.$router.push('/personal/client/clientmanagement');
							}
						}).catch(function(error) {
							console.log(error)
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				let self = this
				self.$refs[formName].resetFields()
				self.$router.push('/personal/client/clientmanagement')
			}
		}
	}
</script>
