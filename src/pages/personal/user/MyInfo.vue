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
			  		<uploadoneimg :fileList="form.avatar" @getFileList="getLogo"></uploadoneimg>
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
						<el-option v-for="t in totalDepartmentList" :key="t.organizationId" :value="t.organizationId" :label="t.name"></el-option>
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
				form:{
					userId:'',
					loginId:'',
					name:'',
					nickname:'',
					avatar:'',
					cel:'',
					qq:'',
					department:'',
					position:'',
					email:''
				},
				totalDepartmentList:[],
			}
		},
		created(){
			this.getUserInfo();//查询用户信息
			this.userInfoToForm();//把userinfo放入form
			this.getDepartmentList();
		},
		components:{
			'uploadoneimg':require('../../../components/uploadoneimg')
		},
		methods:{
			userInfoToForm(){//查询公司信息
				this.formPass(this.form,JSON.parse(window.localStorage.getItem('userinfo')));
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
						};
						requestData = Object.assign(requestData,self.shallowCopy(self.form));
						self.$http.post('/ui/user/updateMyInfo',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log('updateUser',response)
							if(data.code == 10000){
								self.$message.success('保存成功');
								self.$router.go(0);
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
			getDepartmentList(){
				let self = this;
				let requestData = {
					token: window.localStorage.getItem('token'),
					companyId: JSON.parse(window.localStorage.getItem('userinfo')).companyId
				};
				self.$http.post('/ui/organization/selectOrganizationList',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('selectOrganizationList',response)
					if(data.code == 10000){
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