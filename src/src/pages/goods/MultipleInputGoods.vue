<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">批量导入商品</h3>
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
					<el-upload
  						action="/ui/goods/analysisExcel"
  						:on-success="uploadSuccess"
  						:on-remove="removeExcel"
  						:file-list="form.excelFile"
  						multiple
  						style="width: 300px;">
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
						<el-table-column label="商品编码" prop="number">
							
						</el-table-column>
						<el-table-column label="商品名称" prop="name">
							
						</el-table-column>
						<el-table-column label="规格" prop="sku">
							
						</el-table-column>
						<el-table-column label="条形码">
							
						</el-table-column>
						<el-table-column label="商品状态" prop="status">
							
						</el-table-column>
						<el-table-column label="商品分类" prop="catName">
							
						</el-table-column>
						<el-table-column label="单位" prop="unit">
							
						</el-table-column>
						<el-table-column label="库存上限" prop="upLimit">
							
						</el-table-column>
						<el-table-column label="库存下限" prop="downLimit">
							
						</el-table-column>
						<el-table-column label="库存数量" prop="inStoreHouse">
							
						</el-table-column>
						<el-table-column label="盘点数量" prop="relNum">
							
						</el-table-column>
						<el-table-column label="备注" prop="remark">
							
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
					<download-excel
						class="btn btn-default"
						:data="excelResponse"
						:fields="json_fields"
						:meta="json_meta"
						button_text="下载导入数据"
						name="filename.xls">
					</download-excel>
				</el-form-item>
			</el-form>
				
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				active:1,
				form:{
					addressId:'',
					catId:-1,
					excelFile:[]
				},
				totalStores:[//所有盘点仓库
					{
						name:'仓库1',
						id:1
					},
					{
						name:'仓库2',
						id:2
					},
					{
						name:'仓库3',
						id:3
					}
				],
				totalTypes:[//所有分类
					{
						name:'全部',
						id:-1
					},
					{
						name:'日常用品',
						id:1
					},
					{
						name:'儿童玩具',
						id:2
					},
					{
						name:'妈妈用品',
						id:3
					},
					{
						name:'儿童车床',
						id:4
					},
					{
						name:'纸质用品',
						id:5
					},
					{
						name:'其他用品',
						id:6
					}
				],
				excelResponse:[{
					number:'',
					name:'',
					sku:'',
					code:'',
					status:'',
					catName:'',
					unit:'',
					upLimit:'',
					downLimit:'',
					inStoreHouse:'',
					relNum:'',
					remark:''
				}],//excel解析后的数据
				json_fields : {
		    		"商品编码": "String",
				    "商品名称": "String",
				    "规格": "String",
				    "条形码": "String",
				    "商品状态": "String",
				    "商品分类": "String",
				    "单位": "String",
				    "库存上限": "String",
				    "库存下限": "String",
				    "库存数量": "String",
				    "实际数量": "String",
				    "备注": "String",
				},
				json_meta: [
					[{
						"key": "charset",
						"value": "utf-8"
					}]
				],
			}
		},
		components:{
			'download-excel':require('vue-json-excel')
		},
		methods:{
			next(){//下一步
				if(!this.form.addressId){
					this.$message.error('请选择盘点仓库')
	    			return
				}
				this.excelResponse instanceof Array ? this.active++ : this.$message.error('请添加盘点数据');
			},
			getExcel(){//下载excelmodel
				if(this.form.addressId && this.form.catId){
					location.href = '/ui/export?addressId=' + this.form.addressId + '&catId=' + this.form.catId
				}
			},
			uploadSuccess(response, file, fileList){//成功上传的回调
				console.log(response)
				return
				if(response.code == 10000){
					this.form.excelFile = [file]
					if(response.data.length > 0){
						for(let i = 0;i < response.data.length;i++){
							if(response.data[i].relNum != response.data[i].inStoreHouse){
								this.excelResponse[i].number = response.data[i].number
								this.excelResponse[i].name = response.data[i].name
								this.excelResponse[i].sku = response.data[i].sku
								this.excelResponse[i].code = response.data[i].code
								this.excelResponse[i].status = response.data[i].status
								this.excelResponse[i].catName = response.data[i].catName
								this.excelResponse[i].unit = response.data[i].unit
								this.excelResponse[i].upLimit = response.data[i].upLimit
								this.excelResponse[i].downLimit = response.data[i].downLimit
								this.excelResponse[i].inStoreHouse = response.data[i].inStoreHouse
								this.excelResponse[i].relNum = response.data[i].relNum
								this.excelResponse[i].remark = response.data[i].remark
							}
						}
					}
				}else{
					this.form.excelFile = []
					this.$message.error(response.message);
				}
				
			},
			removeExcel(){//清空文件
				this.form.excelFile = []
			},
			goBack(){//返回上一步
				this.active--;
			},
			sureExport(){//确定导入
				this.active++
			}
		}
	}
</script>
