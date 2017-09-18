<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">公司信息</h3>
			<el-form ref="form" :model="form" class="request-form" label-width="120px" style="width:700px">
				<h4 class="item-title">基础信息</h4>
				<el-form-item label="公司名称">
					<el-input placeholder="请输入公司名称" v-model="form.name" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="区域">
					<el-input placeholder="请输入区域" v-model="form.area" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="所属行业">
					<el-radio :key="t.value" :label="t.value" v-model="form.industryType" v-for="t in totalIndustryTypes">
					{{t.name}}
					</el-radio>
				</el-form-item>
				<el-form-item label="邮编">
					<el-input placeholder="请输入邮编" v-model="form.postcode" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="联系人">
					<el-input placeholder="请输入联系人" v-model="form.contacts" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="职位">
					<el-input placeholder="请输入职位" v-model="form.position" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input placeholder="请输入手机" class="form-input" v-model="form.cel"></el-input>
				</el-form-item>
				<el-form-item label="QQ">
					<el-input placeholder="请输入QQ" class="form-input" v-model="form.qq"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input placeholder="请输入邮箱" class="form-input" v-model="form.email"></el-input>
				</el-form-item>
				
				<h4 class="item-title">财务信息</h4>
				
			  	<el-form-item label="纳税人识别号">
			  		<el-input placeholder="请输入纳税人识别号" class="form-input" v-model="form.tin"></el-input>
			  	</el-form-item>
			  	<el-form-item label="发票抬头">
			  		<el-input placeholder="请输入发票抬头" class="form-input" v-model="form.invoiceTitle"></el-input>
			  	</el-form-item>
			  	
			  	<h4 class="item-title">服务支持</h4>
			  	<el-form-item label="服务热线">
			  		<el-input placeholder="请输入服务热线" class="form-input" v-model="form.hotline"></el-input>
			  	</el-form-item>
			  	<el-form-item label="对外联系人">
			  		
			  	</el-form-item>
			  	<el-form-item label="公司logo">
			  		<el-upload
			  			class="avatar-uploader"
					  	action="http://ivis.oss-cn-shanghai.aliyuncs.com/"
					  	:show-file-list="false"
					  	:data="key"
					  	:on-success="handleLogoSuccess"
					  	:before-upload="beforeLogoUpload">
					  	<img v-if="form.logo" :src="form.logo" class="avatar">
					  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
			  	</el-form-item>
			  	<el-form-item label="详细地址">
			  		<el-input placeholder="请输入公司详细地址" class="form-input" v-model="form.detailAddress"></el-input>
			  	</el-form-item>
			  	<el-form-item label="电话">
			  		<el-input placeholder="请输入公司电话" class="form-input" v-model="form.tel"></el-input>
			  	</el-form-item>
			  	<el-form-item label="传真">
			  		<el-input placeholder="请输入公司传真" class="form-input" v-model="form.fax"></el-input>
			  	</el-form-item>
			  	<el-form-item label="公司地址">
			  		<el-input placeholder="请输入公司地址" class="form-input" v-model="form.address"></el-input>
			  	</el-form-item>
			  	<el-form-item label="公司介绍">
			  		<el-input placeholder="请输入公司介绍" class="form-input" v-model="form.introduction"></el-input>
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
					name:'',//公司名称
					area:'',//区域
					industryType:'',//所属行业
					postcode:'',//邮编
					contacts:'',//联系人
					logo:'',//公司logo
					position:'',//职位
					cel:'',//手机
					qq:'',
					email:'',
					tin:'',//纳税人识别号
					invoiceTitle:'',//发票抬头
					hotline:'',//服务热线
					detailAddress:'',//详细地址
					tel:'',//电话
					fax:'',//传真
					detail:'',//公司地址
					introduction:'',//公司介绍
				},
				key:{},
				totalIndustryTypes:[]
			}
		},
		created(){
			this.key = this.getKey();
			this.getIndustry();
		},
		methods:{
			submit(formName){
				this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this;
						let requestData = {token: window.localStorage.getItem('token')};
						requestData = Object.assign(requestData,self.shallowCopy(self.form));
						self.$http.post('/ui/company/addCompany',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log('addCompany',response)
							if(data.code == 10000){
								self.$message.success('保存成功');
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
			handleLogoSuccess(res, file){
				console.log(file)
				this.form.logo = file.url;
				this.key = this.getKey();
			},
			beforeLogoUpload(){
				
			},
			getIndustry(){
				let self = this;
				let requestData = {token: window.localStorage.getItem('token'),type:'industry'};
				self.$http.post('/ui/dict/selectDictByType',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('selectDictByType',response)
					if(data.code == 10000){
						self.totalIndustryTypes = data.data;
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