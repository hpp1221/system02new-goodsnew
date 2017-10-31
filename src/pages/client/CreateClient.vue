<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">添加客户</h3>
			<el-form ref="ruleForm" :model="ruleForm" label-width="80px" class="request-form" inline>
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
				<el-form-item label="性 别 " labelWidth="73px">
					<el-select v-model="ruleForm.vipSex">
						<el-option label="男" value="0">男</el-option>
						<el-option label="女" value="1">女</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="客户编码">
					<el-input v-model="ruleForm.num" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="客户级别">
          <el-select v-model="ruleForm.vip_level" placeholder="全部级别">
            <el-option v-for="item in options" :key="item.levelId" :label="item.levelName" :value="item.levelName">
            </el-option>
          </el-select>
				</el-form-item>
			</el-form>
      <el-button type="primary" @click.native="submitForm">保存</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        options:[],//客户级别
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
			};
		},
    created(){
		  this.getClientLevelList()
    },
		methods: {
      getClientLevelList() {
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token')
        };
        self.httpApi.level.getCustomerLevelList(requestData, function (data) {
          self.options = data.data.list
        });
      },
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
