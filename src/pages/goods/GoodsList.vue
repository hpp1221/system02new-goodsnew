<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">商品列表</h3>
			<el-form ref="easyForm" :model="easyForm" inline v-if="!advanceSearch" class="request-form">
				<el-form-item>
					<el-select placeholder="商品分类" v-model="easyForm.storeHouseAddress">
						<el-option label="玩具" value="1"></el-option>
						<el-option label="用品" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select placeholder="商品状态" v-model="easyForm.storeHouseAddress">
						<el-option label="上架" value="1"></el-option>
						<el-option label="下架" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="select">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-dropdown trigger="click">
						<el-button>导入</el-button>
						<el-dropdown-menu slot="dropdown">
						    <el-dropdown-item @click.native="multipleInputGoods">批量导入商品</el-dropdown-item>
						    <el-dropdown-item @click.native="multipleInputImgs">批量导入图片</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					
				</el-form-item>
				<el-form-item>
					<el-button @click="outputFile">导出</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="createGoods">新增</el-button>
				</el-form-item>
			</el-form>
			<el-form ref="form" :model="form" v-if="advanceSearch" class="request-form">
				<el-form-item label="关键词">
					<el-input placeholder="请输入商品名称/编码/按商品合并/关键字/条形码" v-model="form.keyword" class="long-input">
						
					</el-input>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-select v-model="form.series">
						<el-option label="分类1" value="1">
							
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品品牌">
					<el-input placeholder="请选择商品品牌" v-model="form.brandName" class="form-input">
						
					</el-input>
				</el-form-item>
				<el-form-item label="所属供应商">
					<el-input class="form-input">
						
					</el-input>
				</el-form-item>
				<el-form-item label="商品标签">
					<el-checkbox-group v-model="form.tagId">
    					<el-checkbox label="全选"></el-checkbox>
					    <el-checkbox label="新品上架"></el-checkbox>
					    <el-checkbox label="热卖推荐"></el-checkbox>
					    <el-checkbox label="清仓优惠"></el-checkbox>
  					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="所属仓库">
					<el-checkbox-group v-model="form.tagId">
    					<el-checkbox label="全选"></el-checkbox>
					    <el-checkbox label="新品上架"></el-checkbox>
					    <el-checkbox label="热卖推荐"></el-checkbox>
					    <el-checkbox label="清仓优惠"></el-checkbox>
  					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="库存状态">
					<el-checkbox-group v-model="form.storeStatus">
    					<el-checkbox label="全选"></el-checkbox>
					    <el-checkbox label="高于库存上限值"></el-checkbox>
					    <el-checkbox label="低于库存下限值"></el-checkbox>
					    <el-checkbox label="库存<=0商品"></el-checkbox>
  					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="商品状态">
					<el-radio class="radio" v-model="form.goodsStatus" label="1">上架</el-radio>
  					<el-radio class="radio" v-model="form.goodsStatus" label="-1">下架</el-radio>
				</el-form-item>
				<el-form-item label="商品来源">
					<el-radio class="radio" v-model="form.goodsStatus" label="1">上架</el-radio>
  					<el-radio class="radio" v-model="form.goodsStatus" label="-1">下架</el-radio>
				</el-form-item>
				<el-form-item>
					<el-button @click="select">查询</el-button>
					<el-button type="text" @click="advanceSearch = false">取消高级搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="goodslist-check-div" v-if="multipleSelection.length > 0">
				<el-button icon="close" type="text" @click="cancelSelect"></el-button>
				<span>已选择{{multipleSelection.length}}项</span>
				<el-button icon="check" @click="putOnSale">上架</el-button>
				<el-button icon="close" @click="downSale">下架</el-button>
				<el-button icon="delete" @click="deleteGoods">删除</el-button>
				<el-button icon="setting" @click="setTags">设置标签</el-button>
			</div>
			<el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable">
				<el-table-column
      				type="selection"
			    	width="55">
			    </el-table-column>
				<el-table-column prop="goodsImg" label="商品图片">
					
				</el-table-column>
				<el-table-column prop="goodsCode" label="商品编码">
					
				</el-table-column>
				<el-table-column prop="goodsName" label="商品名称">
					
				</el-table-column>
				<el-table-column prop="sku" label="规格">
					
				</el-table-column>
				<el-table-column prop="unit" label="单位">
					
				</el-table-column>
				<el-table-column prop="marketPrice" label="市场价">
					
				</el-table-column>
				<el-table-column prop="costPrice" label="参考成本价">
					
				</el-table-column>
				<el-table-column prop="onTheWay" label="品牌">
					
				</el-table-column>
				<el-table-column prop="inStoreHouse" label="库存数量">
					
				</el-table-column>
				<el-table-column prop="inStoreHouse" label="所属供应商">
					
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-dropdown trigger="click">
							<el-button type="text" icon="more"></el-button>
							<el-dropdown-menu slot="dropdown">
							    <el-dropdown-item @click="update">修改</el-dropdown-item>
							    <el-dropdown-item>明细</el-dropdown-item>
							    <el-dropdown-item>删除</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						
					</template>
				</el-table-column>
			</el-table>
			<el-dialog title="批量设置标签" v-model="dialogTableVisible">
			  	<el-table :data="multipleSelection">
			  		<el-table-column label="商品编码">
					
					</el-table-column>
					<el-table-column label="商品名称" prop="goodsName">
						
					</el-table-column>
					<el-table-column label="规格" prop="goodsSpec">
						
					</el-table-column>
					<el-table-column label="商品上架">
						<template scope="scope">
							<el-checkbox>新品上架</el-checkbox>
						</template>
					</el-table-column>
			  	</el-table>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tableData:[
					{
						goodsName:'辣条',
						goodsSpec:'ns123as',
						
					},
					{
						goodsName:'饼干',
						goodsSpec:'ab321gs',
						
					},
				],
				advanceSearch:false,
				form:{
					brandName:'',//商品品牌
					storeHouseAddress:'',//所属仓库
					tagId:'',//商品标签
					storeStatus:'',//库存状态
					goodsStatus:'',//商品状态
					keyword:'',//关键词
					series:'',//商品分类
				},
				easyForm:{//简单查询
					storeHouseAddress:'',//所属仓库
					keyword:'',//关键词
				},
				multipleSelection: [],//选中项
				dialogTableVisible:false,//设置标签表格是否可见
			}
		},
		watch:{
			advanceSearch:function(){//点击高级搜索和取消时重新查询
				this.select();
			}
		},
		created(){
			this.select();
		},
		methods:{
			select(){//查询
//				let self = this
//				
//				let requestData = {token: window.localStorage.getItem('token')}
//				
//				if(self.advanceSearch){//高级搜索
//					requestData = Object.assign(requestData,self.shallowCopy(self.form))
//				}else{//简单搜索
//					requestData = Object.assig n(requestData,self.shallowCopy(self.easyForm))
//				}
//				
//				self.$http.post('/ui/list',self.qs.stringify(requestData)).then(function (response) {
//				    let data = response.data;
//				    console.log('list',response)
//					if(data.code == 10000){
//						self.tableData = data.data
//					}
//			    }).catch(function (error) {
//			    	console.log(error);
//			    });
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
				console.log(val);
			},
			update(){//修改商品详情
				this.$router.push('/updateGoods');
			},
			createGoods(){
				this.$router.push('/createGoods');
			},
			outputFile(){//导出
				
			},
			multipleInputGoods(){
				this.$router.push('/multipleInputGoods');
			},
			multipleInputImgs(){
				this.$router.push('/multipleInputImgs');
			},
			putOnSale(){//上架
			    this.$confirm('请确认是否批量上架？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.$message({
		            	type: 'success',
		            	message: '您已成功上架!'
		          	});
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '您已取消上架'
		          	});          
		        });
			},
			downSale(){//下架
				this.$confirm('请确认是否批量下架？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.$message({
		            	type: 'success',
		            	message: '您已成功下架!'
		          	});
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '您已取消下架'
		          	});          
		        });
			},
			deleteGoods(){//删除商品
				this.$confirm('请确认是否批量删除？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.$message({
		            	type: 'success',
		            	message: '您已成功删除!'
		          	});
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '您已取消删除'
		          	});          
		        });
			},
			setTags(){//设置标签
				this.dialogTableVisible = true;
			},
			cancelSelect(){//取消选中
				this.$refs.multipleTable.clearSelection();
			}
			
		}
	}
</script>

<style>
</style>