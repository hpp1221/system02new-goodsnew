<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">修改商品详情</h3>
			<el-tabs v-model="tabName">
			    <el-tab-pane label="修改sku" name="first">
			    	<el-form ref="form" :model="form" class="request-form" label-width="120px">
						<h4 class="item-title">基础信息</h4>
						<el-form-item label="商品名称">
							<el-input v-model="form.name" class="form-input" disabled>
							</el-input>
						</el-form-item>
						<el-form-item label="商品品牌">
							<el-select v-model="form.brand" value-key="name" disabled>
								<el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalBrandList"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商品分类">
							<el-cascader
							  	:options="totalCategories"
							  	v-model="form.cat"
							  	@active-item-change="getCatChild"
							  	:props="props">
							</el-cascader>
						</el-form-item>
						<el-form-item label="计量单位">
							<el-input v-model="form.unit" class="form-input" disabled></el-input>
						</el-form-item>
						<el-form-item label="关键字">
							<el-input class="form-input" v-model="form.keyword" disabled></el-input>
						</el-form-item>
						<el-form-item label="所属供应商名称">
							<el-input class="form-input" v-model="form.supplierName" disabled></el-input>
						</el-form-item>
						
						<h4 class="item-title">商品规格</h4>
						
					  	<el-form-item label="商品规格">
					  		<div v-for="(s,sindex) in form.spec" style="margin-top: 10px;">
						  		<el-input class="form-input" placeholder="请输入规格名称" v-model="s.specName" disabled></el-input>
						  		<el-tag
									:key="v.name"
									v-for="v in s.specValue"
									:closable="false"
									:close-transition="false"
									@close="handleClose(v,sindex)"
									style="margin-left: 10px">
									{{v}}
								</el-tag>
					    	</div>
					  	</el-form-item>
					  	<el-form-item>
					  		<el-table
							    :data="form.skus"
							    border
							    v-if="form.skus.length > 0"
							    style="width: 100%">
							    <el-table-column
							      	label="主图"
							      	width="180">
							      	<template scope="scope">
							      		<uploadoneimg 
							      			:fileList="scope.row.img" 
											@getFileList="getSkuImg" 
											@click.native="rememberIndex(scope)" 
											:token="imgToken" 
											v-if="imgToken">
							      		</uploadoneimg>
							      	</template>
							    </el-table-column>
						    	<el-table-column
							      	:label="s.specName"
							      	width="180" 
							      	v-for="s in form.spec" 
							      	:key="s.specName">
							      	<template scope="scope">
							        	<span style="margin-left: 10px">{{scope.row.sku[s.specName]}}</span>
							      	</template>
							    </el-table-column>
							    
							    
							    <el-table-column
							      	label="商品编码"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.number">
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    
							    <el-table-column
							      	label="条形码"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.barCode">
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    
							    <el-table-column
							      	label="市场价格"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.marketPrice">
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    <el-table-column
							      	label="参考成本价"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.price">
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    <el-table-column
							      	label="是否上架"
							      	width="180">
							      	<template scope="scope">
							      		<el-checkbox v-model="scope.row.isUp" true-label="1" false-label="0"></el-checkbox>
							      	</template>
							    </el-table-column>
							    <el-table-column
							      	label="商品标签"
							      	width="180">
							      	<template scope="scope">
							      		<el-select v-model="scope.row.tagList" value-key="id" multiple>
							      			<el-option :label="t.name" v-for="t in goodsTags" :key="t.id" :value="t"></el-option>
							      		</el-select>
							      	</template>
							    </el-table-column>
						  	</el-table>
					  	</el-form-item>
					  	
					  	<h4 class="item-title">商品图片</h4>
					  	<el-form-item>
							<uploadmultipleimg 
								:fileList="form.goodsExtend.imgs" 
								@getFileList="getFileList" 
								:disabled="true"
								:token="imgToken" 
								v-if="imgToken">
							</uploadmultipleimg>
					  	</el-form-item>
					  	<h4 class="item-title">商品描述</h4>
						<el-form-item>
							<VueEditor
								ueditorPath="../../static/ueditor1_4_3_3-utf8-net"
								@ready="editorReady" 
								style="width:100%;height:300px"
								:ueditorConfig="editorConfig1"
								v-if="form.name">
							</VueEditor>
						</el-form-item>
						<h4 class="item-title">添加附件</h4>
						<el-form-item>
							<uploadfiles 
								:fileList="form.goodsExtend.annex" 
								@getFileList="getAnnex" 
								:disabled="true"
								:token="imgToken" 
								v-if="imgToken">
							</uploadfiles>
						</el-form-item>
					  	<el-form-item>
					  		<el-button @click="updateSku('form')">保存</el-button>
					  		<el-button @click="cancel">取消</el-button>
					  	</el-form-item>
					</el-form>
			    </el-tab-pane>
			    <el-tab-pane label="修改商品" name="second">
			    	<el-form ref="goodsForm" :model="goodsForm" class="request-form" label-width="120px">
						<h4 class="item-title">基础信息</h4>
						<el-form-item label="商品名称">
							<el-input placeholder="请输入商品名称" v-model="goodsForm.name" class="form-input">
							</el-input>
						</el-form-item>
						<el-form-item label="商品品牌">
							<el-select placeholder="请选择商品品牌" v-model="goodsForm.brand" value-key="name">
								<el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalBrandList"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商品分类">
							<el-cascader
							  	:options="totalCategories"
							  	v-model="goodsForm.cat"
							  	@active-item-change="getCatChild"
							  	:props="props">
							</el-cascader>
						</el-form-item>
						<el-form-item label="计量单位">
							<el-input placeholder="请输入计量单位" v-model="goodsForm.unit" class="form-input"></el-input>
						</el-form-item>
						<el-form-item label="关键字">
							<el-input placeholder="搜索关键字" class="form-input" v-model="goodsForm.keyword"></el-input>
						</el-form-item>
						<el-form-item label="所属供应商名称">
							<el-input placeholder="请输入供应商名称" class="form-input" v-model="goodsForm.supplierName"></el-input>
						</el-form-item>
						
						<h4 class="item-title">商品规格</h4>
						
					  	<el-form-item label="商品规格">
					  		<div v-for="(s,sindex) in goodsForm.spec" style="margin-top: 10px;">
						  		<el-input class="form-input" placeholder="请输入规格名称" v-model="s.specName" disabled></el-input>
						  		<el-tag
									:key="v.name"
									v-for="v in s.specValue"
									:closable="false"
									:close-transition="false"
									@close="handleClose(v,sindex)"
									style="margin-left: 10px"
									>
									{{v}}
								</el-tag>
					    	</div>
					  	</el-form-item>
					  	<el-form-item>
					  		<el-table
							    :data="goodsForm.skus"
							    border
							    v-if="goodsForm.skus.length > 0"
							    style="width: 100%">
							    <el-table-column
							      	label="主图"
							      	width="180">
							      	<template scope="scope">
							      		<uploadoneimg 
							      			:fileList="scope.row.img" 
											@getFileList="getSkuImg2" 
											@click.native="rememberIndex(scope)"
											:token="imgToken" 
											v-if="imgToken">
							      		</uploadoneimg>
							      	</template>
							    </el-table-column>
						    	<el-table-column
							      	:label="s.specName"
							      	width="180" 
							      	v-for="s in goodsForm.spec" 
							      	:key="s.specName">
							      	<template scope="scope">
							        	<span style="margin-left: 10px">{{scope.row.sku[s.specName]}}</span>
							      	</template>
							    </el-table-column>
							    
							    
							    <el-table-column
							      	label="商品编码"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.number">
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    
							    <el-table-column
							      	label="条形码"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.barCode">
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    
							    <el-table-column
							      	label="市场价格"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.marketPrice">
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    <el-table-column
							      	label="参考成本价"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.price">
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    <el-table-column
							      	label="是否上架"
							      	width="180">
							      	<template scope="scope">
							      		<el-checkbox v-model="scope.row.isUp" true-label="1" false-label="0"></el-checkbox>
							      	</template>
							    </el-table-column>
							    <el-table-column
							      	label="商品标签"
							      	width="180">
							      	<template scope="scope">
							      		<el-select v-model="scope.row.tagList" value-key="id" multiple>
							      			<el-option :label="t.name" v-for="t in goodsTags" :key="t.id" :value="t"></el-option>
							      		</el-select>
							      	</template>
							    </el-table-column>
						  	</el-table>
					  	</el-form-item>
					  	
					  	<h4 class="item-title">商品图片</h4>
					  	<el-form-item>
							<uploadmultipleimg 
								:fileList="goodsForm.goodsExtend.imgs" 
								@getFileList="getFileList2"
								@removeFile="removeFileList"
								:token="imgToken" 
								v-if="imgToken">
							</uploadmultipleimg>
					  	</el-form-item>
					  	<h4 class="item-title">商品描述</h4>
						<el-form-item>
							<VueEditor
								ueditorPath="../../static/ueditor1_4_3_3-utf8-net"
								@ready="editorReady2" 
								style="width:500px;height:300px"
								:ueditorConfig="editorConfig2"
								v-if="goodsForm.name">
							</VueEditor>
						</el-form-item>
						<h4 class="item-title">添加附件</h4>
						<el-form-item>
							<uploadfiles 
								:fileList="goodsForm.goodsExtend.annex" 
								@getFileList="getAnnex2"
								@removeFile="removeAnnex"
								:token="imgToken" 
								v-if="imgToken">
							</uploadfiles>
						</el-form-item>
					  	<el-form-item>
					  		<el-button @click="updateGoods('goodsForm')">创建</el-button>
					  		<el-button @click="cancel">取消</el-button>
					  	</el-form-item>
					</el-form>
			    </el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				form:{
					name:'',
					brand:'',
					spec:[],
					cat:[],
					unit:'',
					skus:[],
					supplierName:'',
					keyword:'',
					goodsSkuList:[],
					tags:[],
					goodsExtend:{
						imgs:[],
						content:'',
						annex:[]
					}
				},
				goodsForm:{
					id:'',
					name:'',
					brand:'',
					spec:[],
					cat:[],
					unit:'',
					skus:[],
					supplierName:'',
					keyword:'',
					goodsSkuList:[],
					tags:[],
					goodsExtend:{
						imgs:[],
						content:'',
						annex:[]
					}
				},
				inputValue:'',
				goodsTags:[],//商品标签
				editorConfig1:{
					readonly:true
				},//编辑器配置
				editorConfig2:{
				},
				props: {
		          	value: 'res',
		          	children: 'children',
		          	label: 'name'
		        },
				totalCategories:[],
				totalBrandList:[],
				tabName:'first',//当前选中的tab
				skuImgIndex:0,
				imgToken:''
			}
		},
		components:{
			'uploadmultipleimg':require('../../components/uploadmultipleimg'),
			'uploadfiles':require('../../components/uploadfiles'),
			'uploadoneimg':require('../../components/uploadoneimg'),
		},
		watch:{
			tabName:function(newVal,oldVal){
				if(newVal === 'first'){
					this.select(this.$route.query.id);
				}else if(newVal === 'second'){
					this.selectGoods(this.$route.query.goodsId);
				}
			}
		},
		created(){
			this.$route.query.id ?　this.select(this.$route.query.id) : this.$router.push('/error');
			let self = this;
			self.getBrandList(function(data){
				self.totalBrandList = data;
			});//获取品牌列表
			self.getTagList(function(data){
				self.goodsTags = data;
			});//获取标签列表
			self.getImgAccess(function(data){
				self.imgToken = data;
			});//获取图片token
			this.getCatList();//获取分类列表
		},
		methods:{
			getFileList(file){//sku，商品图片
				this.form.goodsExtend.imgs.push(file);
			},
			getFileList2(file){//商品，商品图片
				this.goodsForm.goodsExtend.imgs.push(file);
			},
			removeFileList(file){//商品移除某商品图片
				this.goodsForm.goodsExtend.imgs.splice(file,1);
			},
			getAnnex(file){//sku，附件
				this.form.goodsExtend.annex.push(file);
			},
			getAnnex2(file){//商品，附件
				this.goodsForm.goodsExtend.annex.push(file);
			},
			removeAnnex(file){//商品移除某附件
				this.goodsForm.goodsExtend.annex.splice(file,1);
			},
			getSkuImg(file){//sku,sku图片
				this.form.skus[this.skuImgIndex].img = file.url;
			},
			getSkuImg2(file){//商品,sku图片
				this.goodsForm.skus[this.skuImgIndex].img = file.url;
			},
			rememberIndex(scope){//点击sku图片记录index
				this.skuImgIndex = scope.$index;
			},
			select(skuId){
				let self = this;
				let requestData = {token: window.localStorage.getItem('token'),skuId:skuId};
				self.$http.post('/ui/goodsDetail',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('form',response)
					if(data.code == 10000){
						self.form = self.formPass(self.form,data.data);
						self.form.spec = JSON.parse(self.form.spec);
						self.form.brand = JSON.parse(self.form.brand);
						self.form.cat = [JSON.parse(self.form.cat)];
						self.form.goodsExtend.annex = JSON.parse(self.form.goodsExtend.annex);
						self.form.goodsExtend.imgs = JSON.parse(self.form.goodsExtend.imgs);
						self.form.skus = JSON.parse(self.form.skus);
						self.form.skus[0].sku = JSON.parse(self.form.skus[0].sku);
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			selectGoods(goodsId){
				let self = this;
				let requestData = {token: window.localStorage.getItem('token'),goodsId:goodsId};
				self.$http.post('/ui/showGoodsDetail',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('showGoodsDetail1',response)
					if(data.code == 10000){
						self.goodsForm = self.formPass(self.goodsForm,data.data);
						self.goodsForm.spec = JSON.parse(self.goodsForm.spec);
						self.goodsForm.brand = JSON.parse(self.goodsForm.brand);
						//self.goodsForm.cat = JSON.parse(self.goodsForm.cat);
						self.goodsForm.cat = JSON.parse(self.goodsForm.cat);
						self.goodsForm.goodsExtend.annex = JSON.parse(self.goodsForm.goodsExtend.annex);
						self.goodsForm.goodsExtend.imgs = JSON.parse(self.goodsForm.goodsExtend.imgs);
						self.goodsForm.skus = JSON.parse(self.goodsForm.skus);
						for(let i = 0;i < self.goodsForm.skus.length;i++){
							self.goodsForm.skus[i].sku = JSON.parse(self.goodsForm.skus[i].sku);
						}
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			editorReady(editorInstance){//修改sku ueditor初始化
				editorInstance.setContent(this.form.goodsExtend.content);
			    editorInstance.addListener('contentChange',() => {
			        this.form.goodsExtend.content = editorInstance.getContent()
			    });
            },
            editorReady2(editorInstance){//修改商品ueditor初始化
				editorInstance.setContent(this.goodsForm.goodsExtend.content);
			    editorInstance.addListener('contentChange',() => {
			        this.goodsForm.goodsExtend.content = editorInstance.getContent()
			    });
            },
            cancel(){
            	this.$router.push('/goods/goodslist');
            },
			updateSku(formName){//修改sku
				this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this;
						let requestData = {token: window.localStorage.getItem('token'),skuInfo:JSON.stringify(self.form.skus)};
						self.$http.post('/ui/editSku',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log('editGoods',response)
							if(data.code == 10000){
								self.$router.push('/goods/goodslist');
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
			updateGoods(formName){//修改商品
				this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this;
						let requestData = {token: window.localStorage.getItem('token'),goodsInfo:JSON.stringify(self.goodsForm)};
						self.$http.post('/ui/editGoods',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log('editGoods',response)
							if(data.code == 10000){
								self.$router.push('/goods/goodslist');
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
			getCatList(){
            	let self = this;
				let requestData = {params:{token: window.localStorage.getItem('token')}};
				self.$http.get('/ui/catList',requestData).then(function (response) {
				    let data = response.data;
				    console.log('catList',response)
					if(data.code == 10000){
						for(let i = 0;i < data.data.length;i++){
							if(parseInt(data.data[i].hasChild) > 0){
								data.data[i].children = [];
							}
						}
						self.totalCategories = data.data;
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
            },
            getCatChild(val) {//获取子集分类
            	let self = this;
				let requestData = {params:{token: window.localStorage.getItem('token'),catId:JSON.parse(val).id}};
				self.$http.get('/ui/catList',requestData).then(function (response) {
				    let data = response.data;
				    console.log(data);
					if(data.code == 10000){
						for(let i = 0;i < self.totalCategories.length;i++){
							if(self.totalCategories[i].id === JSON.parse(val).id){
								for(let j = 0;j < data.data.length;j++){
									if(parseInt(data.data[j].hasChild) > 0){
										data.data[j].children = [];
									}
								}
								self.totalCategories[i].children = data.data;
							}
						}
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