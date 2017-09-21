<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">供应商新增</h3>

			<el-form ref="form" :model="form" class="request-form" label-width="120px" style="width:700px" inline>
				<el-form-item label="供应商名称">
					<el-input placeholder="请输入供应商名称" v-model="form.name" class="form-input">
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
				form: {
					up: 0, //是否上架，1是，0否
					goodsName: '',
					spec: [],
					skus: [],
					goodsExtend: {
						imgs: [],
						content: '',
						annex: []
					}
				},
				key: {},
				inputValue: '',
				goodsTags: [], //商品标签
				editorInstance: {}, //编辑器实例
				editorConfig: {}, //编辑器配置
			}
		},
		watch: {

			'form.spec': {
				handler: function(val, oldVal) {
					//要执行的任务
					//这里不知道怎么才能修改到this.data的数据，有知道的麻烦告知
					//现在知道的就是通过直接修改Store.state的方式来更新数据，当然效果和修改this.data是一样的
					this.form.skus = [];
					this.createGoodsDetail({}, 0);
				},

				// 深度观察
				deep: true
			}
		},
		methods: {
			editorReady(editorInstance) {
				editorInstance.setContent(this.form.goodsExtend.content);
				editorInstance.addListener('contentChange', () => {
					this.form.goodsExtend.content = editorInstance.getContent()
				});
			},
			getContent() {
				console.log(this.form.goodsExtend.content)
			},
			submit(formName) {//保存
				this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this;
						
						for(let i = 0;i < self.form.spec.length;i++){
							self.$delete(self.form.spec[i],'inputVisible');
						}
						let requestData = {token: window.localStorage.getItem('token'),goodsInfo:JSON.stringify(self.form)};
						requestData = Object.assign(requestData,self.shallowCopy(self.form));
						self.$http.post('/ui/supplier/createSupplier',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log('addGoods',response)
							if(response.data.code == 10000){
								self.$router.push('/supplier/suppliers/supplierlist');
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
			handleAvaterSuccess(response, file, fileList) {
				this.form.skus[this.imgIndex].img = 'http://ivis.oss-cn-shanghai.aliyuncs.com/' + this.key.key;
				this.getKey();
			},
		}
	}
</script>

<style>

</style>