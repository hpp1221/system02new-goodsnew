<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">公司信息</h3>
			<el-form ref="form" :model="form" class="request-form" label-width="120px" style="width:700px">
				<h4 class="item-title">基础信息</h4>
				<el-form-item label="公司名称">
					<el-input v-model="form.name" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="区域">
					<el-input placeholder="请输入商品名称" v-model="form.name" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="邮编">
					<el-input placeholder="请输入邮编" v-model="form.name" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="联系人">
					<el-input placeholder="请输入联系人" v-model="form.name" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="职位">
					<el-input placeholder="请输入职位" v-model="form.name" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input placeholder="请输入手机" class="form-input" v-model="form.keyword"></el-input>
				</el-form-item>
				<el-form-item label="QQ">
					<el-input placeholder="请输入QQ" class="form-input" v-model="form.supplier"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input placeholder="请输入邮箱" class="form-input"></el-input>
				</el-form-item>
				
				<h4 class="item-title">财务信息</h4>
				
			  	<el-form-item label="纳税人识别号">
			  		<el-input placeholder="请输入纳税人识别号" class="form-input" v-model="form.keyword"></el-input>
			  	</el-form-item>
			  	<el-form-item label="发票抬头">
			  		<el-input placeholder="请输入发票抬头" class="form-input" v-model="form.keyword"></el-input>
			  	</el-form-item>
			  	
			  	<h4 class="item-title">服务支持</h4>
			  	<el-form-item label="服务热线">
			  		<el-input placeholder="请输入邮箱" class="form-input"></el-input>
			  	</el-form-item>
			  	<el-form-item label="对外联系人">
			  		
			  	</el-form-item>
			  	<el-form-item label="公司logo">
			  		
			  	</el-form-item>
			  	<el-form-item label="详细地址">
			  		<el-input placeholder="请输入公司详细地址" class="form-input"></el-input>
			  	</el-form-item>
			  	<el-form-item label="电话">
			  		<el-input placeholder="请输入公司电话" class="form-input"></el-input>
			  	</el-form-item>
			  	<el-form-item label="传真">
			  		<el-input placeholder="请输入公司传真" class="form-input"></el-input>
			  	</el-form-item>
			  	<el-form-item label="公司地址">
			  		<el-input placeholder="请输入公司传真" class="form-input"></el-input>
			  	</el-form-item>
			  	<el-form-item label="公司介绍">
			  		<el-input placeholder="请输入公司传真" class="form-input"></el-input>
			  	</el-form-item>
			  	
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
					
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>