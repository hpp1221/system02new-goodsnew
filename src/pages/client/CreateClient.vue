<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">添加客户</h3>
			<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="request-form">
				<el-form-item label="客户名称">
					<el-input v-model="ruleForm.name" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="客户电话">
					<el-input v-model="ruleForm.tphone" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="客户手机">
					<el-input v-model="ruleForm.mphone" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="客户地址">
					<el-input v-model="ruleForm.address" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="客户QQ">
					<el-input v-model="ruleForm.vipQQ" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="客户邮箱">
					<el-input v-model="ruleForm.vipMail" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-select v-model="ruleForm.vipSex">
						<el-option label="男" value="0">男</el-option>
						<el-option label="女" value="1">女</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="客户编码">
					<el-input v-model="ruleForm.num" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="客户级别">
					<el-select v-model="ruleForm.vip_level">
						<el-option label="VIP1" value="0">VIP1</el-option>
						<el-option label="VIP2" value="1">VIP2</el-option>
						<el-option label="VIP3" value="2">VIP3</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="submitForm">保存</el-button>
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
				ruleForm: {//新增表单
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
		methods: {
			submitForm() { //新增后保存
						let self = this;
						let requestData = {
							token: window.localStorage.getItem('token')
						};
						requestData = Object.assign(requestData, self.shallowCopy(self.ruleForm));
            self.httpApi.vip.insertvip(requestData, function (data) {
              self.$router.push('/client/clientmanagement');
            });
			},
			resetForm() {//取消
				let self = this
				self.$router.push('/client/clientmanagement')
			}
		}
	}
</script>
