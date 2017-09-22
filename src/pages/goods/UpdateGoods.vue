<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">修改商品详情</h3>
			<el-tabs v-model="tabName">
			    <el-tab-pane label="修改sku" name="first">
			    	<el-form ref="form" :model="form" class="request-form" label-width="120px">
						<h4 class="item-title">基础信息</h4>
						<el-form-item label="商品名称">
							<el-input placeholder="请输入商品名称" v-model="form.name" class="form-input" disabled>
							</el-input>
						</el-form-item>
						<el-form-item label="商品品牌">
							<el-select placeholder="请选择商品品牌" v-model="form.brand" value-key="name" disabled>
								<el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalBrandList"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商品分类">
							<el-select v-model="form.cat" placeholder="请选择商品分类" value-key="name" disabled>
								<el-option v-for="t in totalCategories" 
									:key="t.name"
									:label="t.name"
									:value="t">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="计量单位">
							<el-input placeholder="请输入计量单位" v-model="form.unit" class="form-input" disabled></el-input>
						</el-form-item>
						<el-form-item label="关键字">
							<el-input placeholder="搜索关键字" class="form-input" v-model="form.keyword" disabled></el-input>
						</el-form-item>
						<el-form-item label="所属供应商名称">
							<el-input placeholder="请输入供应商名称" class="form-input" v-model="form.supplierName" disabled></el-input>
						</el-form-item>
						
						<h4 class="item-title">商品规格</h4>
						
					  	<el-form-item label="商品规格">
					  		<el-button class="button-new-tag" size="small" @click="addSpec" disabled>添加规格</el-button>
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
								<el-input
									class="form-input"
									v-if="s.inputVisible"
									v-model="inputValue"
									size="mini"
									placeholder="请输入规格属性"
									@keyup.enter.native="handleInputConfirm(s)"
									@blur="handleInputConfirm(s)">
								</el-input>
								<el-button v-else class="button-new-tag" size="small" @click="showInput(sindex)" disabled>添加属性</el-button>
					    	</div>
					  	</el-form-item>
					  	<el-form-item>
					  		<el-table
							    :data="form.goodsSkuList"
							    border
							    v-if="form.goodsSkuList.length > 0"
							    style="width: 100%">
							    <el-table-column
							      	label="主图"
							      	width="180">
							      	<template scope="scope">
										<el-upload
									  		class="upload-demo"
									  		action="http://ivis.oss-cn-shanghai.aliyuncs.com/"
									  		:data="key"
									  		:show-file-list="false"
									 		:on-success="handleAvaterSuccess"
									  		list-type="picture">
									  	<img v-if="scope.row.img" :src="scope.row.img" class="avatar" @click="rememberIndex(scope)">
									  	<i v-else class="el-icon-plus avatar-uploader-icon" @click="rememberIndex(scope)"></i>
										</el-upload>
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
						  	</el-table>
					  	</el-form-item>
					  	
					  	<h4 class="item-title">商品图片</h4>
					  	<el-form-item>
					  		<el-upload
								action="http://ivis.oss-cn-shanghai.aliyuncs.com/"
								:data="key"
								list-type="picture-card"
								:file-list="form.goodsExtend.imgs"
								disabled>
							</el-upload>
					  	</el-form-item>
					  	<h4 class="item-title">商品描述</h4>
						<el-form-item>
							<VueEditor
								ueditorPath="../../static/ueditor1_4_3_3-utf8-net"
								@ready="editorReady" 
								style="width:100%;height:300px"
								:ueditorConfig="editorConfig1">
							</VueEditor>
						</el-form-item>
						<h4 class="item-title">添加附件</h4>
						<el-form-item>
							<el-upload
								class="upload-demo"
								action="http://ivis.oss-cn-shanghai.aliyuncs.com/"
								:data="key"
								:file-list="form.goodsExtend.annex"
								disabled>
							</el-upload>
						</el-form-item>
					  	<el-form-item>
					  		<el-button @click="updateSku('form')">创建</el-button>
					  		<el-button @click="cancel">取消</el-button>
					  	</el-form-item>
					</el-form>
			    </el-tab-pane>
			    <el-tab-pane label="修改商品" name="second">
			    	<el-form ref="goodsForm" :model="goodsForm" class="request-form" label-width="120px">
						<h4 class="item-title">基础信息</h4>
						<el-form-item label="商品名称">
							<el-input placeholder="请输入商品名称" v-model="goodsForm.name" class="form-input" disabled>
							</el-input>
						</el-form-item>
						<el-form-item label="商品品牌">
							<el-select placeholder="请选择商品品牌" v-model="goodsForm.brand" value-key="name" disabled>
								<el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalBrandList"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商品分类">
							<el-select v-model="goodsForm.cat" placeholder="请选择商品分类" value-key="name" disabled>
								<el-option v-for="t in totalCategories" 
									:key="t.name"
									:label="t.name"
									:value="t">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="计量单位">
							<el-input placeholder="请输入计量单位" v-model="goodsForm.unit" class="form-input" disabled></el-input>
						</el-form-item>
						<el-form-item label="关键字">
							<el-input placeholder="搜索关键字" class="form-input" v-model="goodsForm.keyword" disabled></el-input>
						</el-form-item>
						<el-form-item label="所属供应商名称">
							<el-input placeholder="请输入供应商名称" class="form-input" v-model="goodsForm.supplierName" disabled></el-input>
						</el-form-item>
						<el-form-item label="商品标签" value-key="id">
							<el-checkbox-group v-model="goodsForm.tags">
							    <el-checkbox :label="t" v-for="t in goodsTags" :key="t.id" disabled>{{t.name}}</el-checkbox>
							</el-checkbox-group>
							
						</el-form-item>
						
						<h4 class="item-title">商品规格</h4>
						
					  	<el-form-item label="商品规格">
					  		<el-button class="button-new-tag" size="small" @click="addSpec">添加规格</el-button>
					  		<div v-for="(s,sindex) in goodsForm.spec" style="margin-top: 10px;">
						  		<i class="el-icon-minus" @click="deleteSpec(sindex)"></i>
						  		<el-input class="form-input" placeholder="请输入规格名称" v-model="s.specName"></el-input>
						  		<el-tag
									:key="v.name"
									v-for="v in s.specValue"
									:closable="true"
									:close-transition="false"
									@close="handleClose(v,sindex)"
									style="margin-left: 10px"
									>
									{{v}}
								</el-tag>
								<el-input
									class="form-input"
									v-if="s.inputVisible"
									v-model="inputValue"
									size="mini"
									placeholder="请输入规格属性"
									@keyup.enter.native="handleInputConfirm(s)"
									@blur="handleInputConfirm(s)"
									disabled>
								</el-input>
								<el-button v-else class="button-new-tag" size="small" @click="showInput(sindex)" disabled>添加属性</el-button>
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
										<el-upload
									  		class="upload-demo"
									  		action="http://ivis.oss-cn-shanghai.aliyuncs.com/"
									  		:data="key"
									  		:show-file-list="false"
									 		:on-success="handleAvaterSuccess"
									  		list-type="picture">
									  	<img v-if="scope.row.img" :src="scope.row.img" class="avatar" @click="rememberIndex(scope)">
									  	<i v-else class="el-icon-plus avatar-uploader-icon" @click="rememberIndex(scope)"></i>
										</el-upload>
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
							        	<el-input v-model="scope.row.number" disabled>
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    
							    <el-table-column
							      	label="条形码"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.barCode" disabled>
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    
							    <el-table-column
							      	label="市场价格"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.marketPrice" disabled>
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    <el-table-column
							      	label="参考成本价"
							      	width="180">
							      	<template scope="scope">
							        	<el-input v-model="scope.row.price" disabled>
							        	
							        	</el-input>
							      	</template>
							    </el-table-column>
							    <el-table-column
							      	label="是否上架"
							      	width="180">
							      	<template scope="scope">
							      		<el-checkbox v-model="scope.row.isUp" true-label="1" false-label="0" disabled></el-checkbox>
							      	</template>
							    </el-table-column>
						  	</el-table>
					  	</el-form-item>
					  	
					  	<h4 class="item-title">商品图片</h4>
					  	<el-form-item>
					  		<!--<el-upload
								action="https://jsonplaceholder.typicode.com/posts/"
								list-type="picture-card"
								:on-preview="handlePictureCardPreview"
								:on-remove="handleRemove">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog v-model="dialogVisible" size="tiny">
							  	<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>-->
					  	</el-form-item>
					  	<h4 class="item-title">商品描述</h4>
						<el-form-item>
							<VueEditor
								ueditorPath="../../static/ueditor1_4_3_3-utf8-net"
								@ready="editorReady" 
								style="width:100%;height:300px"
								:ueditorConfig="editorConfig2">
							</VueEditor>
						</el-form-item>
						<h4 class="item-title">添加附件</h4>
						<el-form-item>
							<!--<el-upload
								class="upload-demo"
								action="https://jsonplaceholder.typicode.com/posts/"
								:on-change="handleChange"
								:file-list="form.goodsExtend.annex">
							  <el-button size="small" type="primary">点击上传</el-button>
							  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
							</el-upload>-->
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
					cat:'',
					skus:[],
					supplierName:'',
					goodsSkuList:[],
					tags:[],
					goodsExtend:{
						imgs:[],
						content:'',
						annex:[]
					}
				},
				goodsForm:{
					name:'',
					brand:'',
					spec:[],
					cat:'',
					skus:[],
					supplierName:'',
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
				totalCategories:[
					{
						id:1,
						name:'日常用品'
					},
					{
						id:2,
						name:'儿童玩具'
					},
					{
						id:3,
						name:'妈妈用品'
					},
					{
						id:4,
						name:'儿童车床'
					},
					{
						id:5,
						name:'纸质用品'
					},
					{
						id:6,
						name:'其他用品'
					},
				],
				totalBrandList:[],
				tabName:'first',//当前选中的tab
			}
		},
		watch:{
			
			'form.spec':{
				handler:function(val,oldVal){
                    //要执行的任务
                    //这里不知道怎么才能修改到this.data的数据，有知道的麻烦告知
                    //现在知道的就是通过直接修改Store.state的方式来更新数据，当然效果和修改this.data是一样的
	            	this.form.skus = [];
        			this.createGoodsDetail({},0);
				},
				
	            // 深度观察
	            deep:true
			}
		},
		created(){
			this.$route.query.id ?　this.select(this.$route.query.id) : this.$router.push('/error');
			let self = this;
			self.getBrandList(function(data){
				self.totalBrandList = data.data;
			});//获取品牌列表
			self.getTagList(function(data){
				self.goodsTags = data.data;
			});//获取标签列表
		},
		methods:{
			select(skuId){
				let self = this;
				let requestData = {token: window.localStorage.getItem('token'),skuId:skuId};
				self.$http.post('/ui/goodsDetail',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    
					if(data.code == 10000){
						self.form = self.formPass(self.form,data.data);
						self.form.spec = JSON.parse(self.form.spec);
						self.form.brand = JSON.parse(self.form.brand);
						self.form.cat = JSON.parse(self.form.cat);
						self.form.goodsExtend.annex = JSON.parse(self.form.goodsExtend.annex);
						self.form.goodsExtend.imgs = JSON.parse(self.form.goodsExtend.imgs);
						self.form.goodsSkuList[0].sku = JSON.parse(self.form.goodsSkuList[0].sku);
						console.log('form',self.form)
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			editorReady(editorInstance){
				editorInstance.setContent(this.form.goodsExtend.content);
			    editorInstance.addListener('contentChange',() => {
			        this.form.goodsExtend.content = editorInstance.getContent()
			    });
            },
            cancel(){
            	this.$router.push('/goods/goodslist');
            },
			updateSku(formName){
				this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this;
						
						for(let i = 0;i < self.form.spec.length;i++){
							self.$delete(self.form.spec[i],'inputVisible');
						}
						let requestData = {token: window.localStorage.getItem('token'),goodsInfo:JSON.stringify(self.form)};
						//requestData = Object.assign(requestData,self.shallowCopy(self.form));
						self.$http.post('/ui/editGoods',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log('addGoods',response)
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
			updateGoods(formName){
				this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this;
						for(let i = 0;i < self.form.spec.length;i++){
							self.$delete(self.form.spec[i],'inputVisible');
						}
						let requestData = {token: window.localStorage.getItem('token'),goodsInfo:JSON.stringify(self.form)};
						//requestData = Object.assign(requestData,self.shallowCopy(self.form));
						self.$http.post('/ui/editGoods',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log('addGoods',response)
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
			addSpec(){//添加规格
				this.form.spec.push({specName:'',specValue:[],inputVisible:false});
			},
			showInput(index) {//显示规格输入框
        		this.form.spec[index].inputVisible = true;
      		},
      		handleInputConfirm(s){//规格属性确定
      			let inputValue = this.inputValue;
      			if(inputValue){
      				s.specValue.push(this.inputValue);
      			}
      			s.inputVisible = false;
      			this.inputValue = '';
      		},
      		handleClose(tag,index){//删除某规格属性
				this.form.spec[index].specValue.splice(this.form.spec[index].specValue.indexOf(tag), 1);
			},
			deleteSpec(sindex){//删除一条规格
				this.form.spec.splice(sindex,1);
			},
			createGoodsDetail(tableMap,index){
				let size = this.form.spec.length;
				let tableKey = this.form.spec[index].specName;
				for(let i = 0;i < this.form.spec[index].specValue.length;i++){//颜色
					tableMap[tableKey] = this.form.spec[index].specValue[i];
					
					if(index < size - 1){
						index++;
						this.createGoodsDetail(tableMap,index);
						index--;
					}else{
						let singleSku = {
							sku:{},
							marketPrice:'',
							price:'',
							img:'',
							number:'',
							barCode:'',
							isUp:0,
						};
						singleSku.sku = tableMap;
						this.form.skus.push(JSON.parse(JSON.stringify(singleSku)));
					}
				}
			},
		}
	}
</script>

<style>
</style>