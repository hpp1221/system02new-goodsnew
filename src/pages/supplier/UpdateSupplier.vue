<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">供应商修改</h3>

			<el-form ref="form" :model="form" class="request-form" label-width="120px" style="width:700px" inline>
				<el-form-item label="供应商名称">
					<el-input v-model="form.name" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="供应商电话">
					<el-input placeholder="请输入供应商电话" v-model="form.tel" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="供应商手机">
					<el-input placeholder="请输入供应商手机" v-model="form.phone" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="供应商地址">
					<el-input placeholder="请输入供应商地址" v-model="form.address" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="供应商编码">
					<el-input placeholder="请输入供应商编码" v-model="form.number" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="供应商邮箱">
					<el-input placeholder="请输入供应商邮箱" v-model="form.email" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click.native="submit('form')">保存</el-button>
				</el-form-item>
			</el-form>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					
				},
				key: {},
				inputValue: ''
			}
		},
		watch: {

		},
		created() {
			this.$route.query.supplierId ? 　this.select(this.$route.query.supplierId) : this.$router.push('/error')
			//this.select()
		},
		methods: {
			select(supplierId) {
				let self = this
				let requestData = {
					token: window.localStorage.getItem('token'),
					supplierId: supplierId
				}
				self.$http.post('/ui/supplier/getById', self.qs.stringify(requestData)).then(function(response) {
					//let data = response.data;
//					console.log('修改详情', response)
//					console.log('data',response.data.data)
					if(response.data.code == 10000) {
						self.form = response.data.data;
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			getContent() {
				console.log(this.form.goodsExtend.content)
			},
			submit(formName) {//修改后保存
				this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this;
						let requestData = {token: window.localStorage.getItem('token'),goodsInfo:JSON.stringify(self.form)};
						requestData = Object.assign(requestData,self.shallowCopy(self.form));
						self.$http.post('/ui/supplier/modifySupplier',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log('addGoods',response)
							if(response.data.code == 10000){
								self.$router.push('/supplier/supplierlist');
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
		}
	}
</script>

<style>

</style>