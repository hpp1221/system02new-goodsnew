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
  						action="/ui/analysisGoodsExcel"
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
						<el-table-column label="商品编码" prop="goodsNumber">
							
						</el-table-column>
						<el-table-column label="商品名称" prop="goodsName">
							
						</el-table-column>
						<el-table-column label="商品品牌" prop="brandName">
							
						</el-table-column>
						<el-table-column label="商品分类" prop="catName">
							
						</el-table-column>
						<el-table-column label="多规格字段设置" prop="spec">
							
						</el-table-column>
						<el-table-column label="规格内容" prop="sku">
							
						</el-table-column>
						<el-table-column label="商品介绍" prop="content">
							
						</el-table-column>
						<el-table-column label="计量单位" prop="unit">
							
						</el-table-column>
						<el-table-column label="条形码" prop="goodsBarCode">
							
						</el-table-column>
						<el-table-column label="关键词" prop="keyword">
							
						</el-table-column>
						<el-table-column label="状态" prop="relNum">
							<template scope="scope">
								<span v-if="scope.row.isUp">上架</span>
								<span v-else>下架</span>
							</template>
						</el-table-column>
						<el-table-column label="参考价(元)" prop="price">
							
						</el-table-column>
						<el-table-column label="市场价(元)" prop="marketPrice">
							
						</el-table-column>
						<el-table-column label="供应商名称" prop="supplierName">
							
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
					<p>成功导入{{exportResult.success}},失败{{exportResult.fail}}</p>
					<!--<download-excel
						class="btn btn-default"
						:data="excelResponse"
						:fields="json_fields"
						:meta="json_meta"
						button_text="下载导入数据"
						name="filename.xls">
					</download-excel>-->
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
				excelResponse:[],//excel解析后的数据
				excelAnalysisStatus:false,
				json_fields : {
		    		"商品编码": "String",
				    "商品名称": "String",
				    "商品品牌": "String",
				    "一级分类": "String",
				    "二级分类": "String",
				    "三级分类": "String",
				    "四级分类": "String",
				    "多规格字段设置": "String",
				    "规格内容": "String",
				    "商品介绍": "String",
				    "计量单位": "String",
				    "条形码": "String",
				    "关键词": "String",
				    "状态": "String",
				    "参考价(元)": "String",
				    "市场价(元)": "String",
				    "供应商名称": "String",
				},
				json_meta: [
					[{
						"key": "charset",
						"value": "utf-8"
					}]
				],
				exportResult:{
					success:'',
					fail:''
				}
			}
		},
		components:{
			'download-excel':require('vue-json-excel')
		},
		methods:{
			next(){//下一步
				this.excelAnalysisStatus? this.active++ : this.$message.error('请传入商品excel');
			},
			getExcel(){//下载excelmodel
				location.href = '/ui/exportGoodsDemo';
			},
			uploadSuccess(response, file, fileList){//成功上传的回调
				if(response.code == 10000){
					this.excelAnalysisStatus = true;
					fileList = [file];
					this.form.excelFile = [file];
					if(response.data.length > 0){
						for(let i = 0;i < response.data.length;i++){
							this.excelResponse = response.data;
						}
					}
				}else{
					this.form.excelFile = [];
					this.$message.error(response.message);
				}
				
			},
			removeExcel(){//清空文件
				this.form.excelFile = [];
				this.excelAnalysisStatus = false;
			},
			goBack(){//返回上一步
				this.active--;
			},
			sureExport(){//确定导入
				let self = this;
				self.active++;
				let requestData = {
					token: window.localStorage.getItem('token'),
					goodsList:JSON.stringify(self.excelResponse)
				};
				self.$http.post('/ui/inputGoods',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('inputGoods',response)
					if(data.code == 10000){
						self.exportResult = {success:data.success,fail:data.fail};
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			}
		}
	}
</script>
