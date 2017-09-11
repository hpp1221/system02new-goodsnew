<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">新增商品</h3>
			
			<el-form ref="form" :model="form" class="request-form" label-width="120px" style="width:700px" inline>
				<h4 class="item-title">基础信息</h4>
				<el-form-item label="是否立即上架">
					<el-checkbox true-label="1" false-label="0" v-model="form.up">立即上架</el-checkbox>
				</el-form-item>
				<el-form-item label="商品名称">
					<el-input placeholder="请输入商品名称" v-model="form.name" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="商品品牌">
					<el-select placeholder="请选择商品品牌" v-model="form.brandName">
						<el-option label="上架" value="1"></el-option>
						<el-option label="下架" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-select v-model="form.catId">
						<el-option value="1" label="一级分类"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="计量单位">
					<el-select v-model="form.unit">
						<el-option value="1" label="个"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="关键字">
					<el-input placeholder="搜索关键字" class="form-input" v-model="form.keyword"></el-input>
				</el-form-item>
				<el-form-item label="所属供应商名称">
					<el-input placeholder="请输入供应商名称" class="form-input" v-model="form.supplier"></el-input>
				</el-form-item>
				<el-form-item label="商品标签">
					<el-checkbox :label="t.name" v-for="t in goodsTags" :key="t.id"></el-checkbox>
				</el-form-item>
				
				<h4 class="item-title">商品规格</h4>
				
			  	<el-form-item label="商品规格">
			  		<el-button class="button-new-tag" size="small" @click="addSpec">添加规格</el-button>
			  		<div v-for="(s,sindex) in form.spec" style="margin-top: 10px;">
				  		<i class="el-icon-minus" @click="deleteSpec(sindex)"></i>
				  		<el-input class="form-input" placeholder="请输入规格名称" v-model="s.specName"></el-input>
				  		<el-tag
							:key="v.name"
							v-for="v in s.specValue"
							:closable="true"
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
						<el-button v-else class="button-new-tag" size="small" @click="showInput(sindex)">添加属性</el-button>
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
						:ueditorConfig="editorConfig">
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
			  		<el-button @click="submit('form')">创建</el-button>
			  		<el-button @click="getContent">取消</el-button>
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
					up:0,//是否上架，1是，0否
					goodsName:'',
					spec:[],
					skus:[],
					goodsExtend:{
						imgs:[],
						content:'',
						annex:[]
					}
				},
				key:{},
				inputValue:'',
				goodsTags:[],//商品标签
				editorInstance:{},//编辑器实例
				editorConfig:{},//编辑器配置
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
		methods:{
			editorReady(editorInstance){
				editorInstance.setContent(this.form.goodsExtend.content);
			    editorInstance.addListener('contentChange',() => {
			        this.form.goodsExtend.content = editorInstance.getContent()
			    });
            },
            getContent(){
            	console.log(this.form.goodsExtend.content)
            },
			submit(formName){
				this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this;
						let requestData = {token: window.localStorage.getItem('token')};
						for(let i = 0;i < self.form.spec.length;i++){
							self.$delete(self.form.spec[i],'inputVisible');
						}
						requestData = Object.assign(requestData,self.shallowCopy(self.form));
						self.$http.post('/ui/addGoods',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log('addGoods',response)
							if(data.code == 10000){
								self.$router.push('/goodslist');
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
							barCode:''
						};
						singleSku.sku = tableMap;
						this.form.skus.push(JSON.parse(JSON.stringify(singleSku)));
					}
				}
			},
			handleAvaterSuccess(response,file,fileList){
				this.form.skus[this.imgIndex].img = 'http://ivis.oss-cn-shanghai.aliyuncs.com/' + this.key.key;
				this.getKey();
			},
		}
	}
</script>

<style>
</style>