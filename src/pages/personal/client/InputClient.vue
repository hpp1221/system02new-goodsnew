<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">客户导入</h3>
			<el-steps :active="active">
				<el-step title="上传导入文件"></el-step>
				<el-step title="导入文件预览"></el-step>
				<el-step title="导入完成"></el-step>
			</el-steps>
			<el-form v-if="active == 1" label-width="150px">
				<el-form-item label="1、数据模板下载">
					<el-button type="text" @click="getExcel">下载模板</el-button>
				</el-form-item>
				<el-form-item label="2、添加客户数据">
					<el-upload action="/ui/analysisExcel" :on-success="uploadSuccess" :on-remove="removeExcel" :file-list="form.excelFile" style="width: 300px;">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">
							<i class="el-icon-warning inputClient-icon"></i>
							<ul class="inputClient-detail">
								<li>文件后缀名必须为:xls或xlsx(即Excel格式)，文件大小不得大于10M</li>
								<li>客户名称不允许为空，不允许重复，一旦为空或者重复，则本行数据不允许导入</li>
								<li>客户编码不允许重复，一旦重复，则本行数据不允许导入</li>
								<li>客户级别允许为空，为空则此客户分入系统默认的"普通"级别</li>
							</ul>
						</div>
					</el-upload>

				</el-form-item>
				<el-form-item>
					<el-button @click="next">下一步</el-button>
				</el-form-item>
			</el-form>
			<el-form v-if="active == 2">
				<el-form-item class="inputclient-view">
					<el-table :data="excelResponse" border>
						<el-table-column label="客户名称" prop="customerName">

						</el-table-column>
						<el-table-column label="客户编码" prop="clientCode">

						</el-table-column>
						<el-table-column label="客户姓名" prop="clientName">

						</el-table-column>
						<el-table-column label="客户手机" prop="clientMobile">

						</el-table-column>
						<el-table-column label="客户电话" prop="clientTel">

						</el-table-column>
						<el-table-column label="客户级别" prop="clientClass">

						</el-table-column>
						<el-table-column label="客户地址" prop="clientAddress">

						</el-table-column>

					</el-table>
				</el-form-item>
				<el-form-item>

					<el-button @click="goBack">返回上一步</el-button>
					<el-button @click="sureExport">确定导入</el-button>
				</el-form-item>
			</el-form>
			<el-form v-if="active == 3">
				<el-form-item>
					<download-excel class="btn btn-default" :data="excelResponse" :fields="json_fields" :meta="json_meta" button_text="下载导入数据" name="filename.xls">
					</download-excel>
				</el-form-item>
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
				excelResponse: [{
					customerName: '觇智科技',
					clientCode: '3402',
					clientName: '觇智科技',
					clientMobile: '0517-12345678',
					clientTel: '18326578901',
					clientClass: 'VIP1',
					clientAddress: '兴耀科技园'
				}], //excel解析后的数据
				json_fields: {
					"客户名称": "String",
					"客户编码": "String",
					"客户姓名": "String",
					"客户手机": "String",
					"客户电话": "String",
					"客户级别": "String",
					"客户地址": "String",
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
				this.active++;
			},
			getExcel() { //下载excelmodel
				if(this.form.addressId && this.form.catId) {
					location.href = '/ui/export?addressId=' + this.form.addressId + '&catId=' + this.form.catId
				}
			},
			uploadSuccess(response, file, fileList) { //成功上传的回调
				if(response.code == 10000) {
					this.form.excelFile = [file]
					if(response.data.length > 0) {
						for(let i = 0; i < response.data.length; i++) {
							if(response.data[i].relNum != response.data[i].inStoreHouse) {
								this.excelResponse[i].customerName = response.data[i].customerName
								this.excelResponse[i].clientCode = response.data[i].clientCode
								this.excelResponse[i].clientName = response.data[i].clientName
								this.excelResponse[i].clientMobile = response.data[i].clientMobile
								this.excelResponse[i].clientTel = response.data[i].clientTel
								this.excelResponse[i].clientClass = response.data[i].clientClass
								this.excelResponse[i].clientAddress = response.data[i].clientAddress
							}
						}
					}
				} else {
					this.form.excelFile = []
					this.$message.error(response.message);
				}

			},
			removeExcel() { //清空文件
				this.form.excelFile = []
			},
			goBack() { //返回上一步
				this.active--;
			},
			sureExport() { //确定导入
				this.active++
			}
		}
	}
</script>
<style>
	.inputclient-view {
		text-align: center;
	}
	
	.el-table th>.cell {
		text-align: center;
	}
</style>