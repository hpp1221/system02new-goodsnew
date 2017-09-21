<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">供应商导入</h3>
			<el-steps :active="active">
				<el-step title="上传数据"></el-step>
				<el-step title="预览数据"></el-step>
				<el-step title="导入完成"></el-step>
			</el-steps>
			<el-form v-if="active == 1" label-width="150px" label-position="left">
				<el-form-item label="1、数据模板下载">
					<el-button type="text" @click="getExcel">下载模板</el-button>
				</el-form-item>
				<el-form-item label="2、导入数据">
					<el-upload action="/ui/supplier/importSupplierGoods" :on-success="uploadSuccess" :on-remove="removeExcel" :file-list="form.excelFile" multiple style="width: 300px;">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除</div>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button @click="next">下一步</el-button>
				</el-form-item>
			</el-form>
			<el-form v-if="active == 2">
				<el-form-item>
					<el-table :data="excelResponse" border>
						<el-table-column prop="name" label="供应商名称">
						</el-table-column>
						<el-table-column prop="number" label="供应商编码">

						</el-table-column>
						<el-table-column prop="tel" label="联系电话">

						</el-table-column>
						<el-table-column prop="address" label="地址">

						</el-table-column>
						<el-table-column prop="phone" label="手机">

						</el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item :data="excelResponse">
					<el-button @click="goBack">返回上一步</el-button>
					<el-button @click="sureExport">确定导入</el-button>
				</el-form-item>

			</el-form>
			<el-form v-if="active == 3">
				
			</el-form>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 1,
				form: {
					addressId: '',
					catId: -1,
					excelFile: []
				},
				excelResponse: [], //excel解析后的数据
				excelAnalysisStatus: false, //excelResponse默认是数组，不传数据也可以直接下一步，所以要先false
				json_fields: {
					"供应商名称": "String",
					"供应商编码": "Number",
					"联系电话": "Number",
					"地址": "String",
					"手机": "Number"
				},
				json_meta: [
					[{
						"key": "charset",
						"value": "utf-8"
					}]
				],
			}
		},
		components: {
			'download-excel': require('vue-json-excel')
		},
		methods: {
			next() { //下一步
				this.excelAnalysisStatus ? this.active++ : this.$message.error('请添加模板数据');
			},
			getExcel() { //下载excelmodel
				//window.open('/ui/supplier/exportSupplierGoodsDemo')
				location.href = '/ui/supplier/exportSupplierGoodsDemo'
			},
			uploadSuccess(response, file, fileList) { //成功上传的回调
				this.excelAnalysisStatus = true;
				fileList = [file];
				this.form.excelFile = [file]
				if(response.length > 0) {
					for(let i = 0; i < response.length; i++) {
						this.excelResponse = response;
					}
				} else {
					this.form.excelFile = []
					this.$message.error(response.message);
				}

			},
			removeExcel() { //清空文件
				this.form.excelFile = []
				this.excelAnalysisStatus = false;
			},
			goBack() { //返回上一步
				this.active--;
			},
			sureExport() { //确定导入
				this.active++
				let self = this
				let requestData = {
					token: window.localStorage.getItem('token'),
					supplierList: JSON.stringify(self.excelResponse)
				};
				self.$http.post('/ui/supplier/insertSupplierList', self.qs.stringify(requestData)).then(function(res) {
					let data = res.data;
					if(data.code == 10000) {
						self.$router.push('/supplier/supplierlist');
					}
				}).catch(function(error) {
					console.log(error);
				});
			}
		}
	}
</script>