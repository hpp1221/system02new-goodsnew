<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">修改商品</h3>
			
			<el-form ref="form" :model="form" class="request-form" label-width="120px" style="width:700px" inline>
				<h4 class="item-title">基础信息</h4>
				<el-form-item>
					<el-checkbox>立即上架</el-checkbox>
				</el-form-item>
				<el-form-item label="商品名称">
					<el-input placeholder="请输入商品名称" v-model="form.goodsName" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="商品品牌">
					<el-select placeholder="请选择商品品牌" v-model="form.storeHouseAddress">
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
					<el-input placeholder="搜索关键字" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="所属供应商名称">
					<el-input placeholder="请输入供应商名称" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="商品标签">
					<el-checkbox label="新品上架"></el-checkbox>
				</el-form-item>
				
				<h4 class="item-title">商品规格</h4>
				
			  	<el-form-item label="商品规格">
			  		<el-button class="button-new-tag" size="small" @click="addSpec">添加规格</el-button>
			  		<div v-for="(s,sindex) in form.specArr" style="margin-top: 10px;">
				  		<i class="el-icon-minus" @click="deleteSpec(sindex)"></i>
				  		<el-input class="form-input" placeholder="请输入规格名称" v-model="s.specName"></el-input>
				  		<el-tag
							:key="v.name"
							v-for="v in s.specValue"
							:closable="true"
							:close-transition="false"
							@close="handleClose(v,sindex)"
							style="margin-left: 10px">
							{{v.name}}
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
					    :data="tableData"
					    border
					    v-if="tableData.length > 0"
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
					      width="180" v-for="s in form.specArr" :key="s.specName">
					      	<template scope="scope">
					        	<span style="margin-left: 10px">{{ scope.row[s.specName] }}</span>
					      	</template>
					    </el-table-column>
					    
					    
					    <el-table-column
					      	label="商品编码"
					      	width="180">
					      	<template scope="scope">
					        	<el-input v-model="scope.row.price">
					        	
					        	</el-input>
					      	</template>
					    </el-table-column>
					    
					    <el-table-column
					      	label="条形码"
					      	width="180">
					      	<template scope="scope">
					        	<el-input v-model="scope.row.price">
					        	
					        	</el-input>
					      	</template>
					    </el-table-column>
					    
					    <el-table-column
					      	label="市场价格"
					      	width="180">
					      	<template scope="scope">
					        	<el-input v-model="scope.row.price">
					        	
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
			</el-form>
			
			
			
			<h4 class="item-title">商品图片</h4>
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				form:{
					goodsName:'',
					specArr:[],
					tableData:[]
				},
				key:{},
				inputValue:'',
				tableData:[
					
				],
				tableObj:{},
			}
		},
		watch:{
			
			'form.specArr':{
				handler:function(val,oldVal){
                    //要执行的任务
                    //这里不知道怎么才能修改到this.data的数据，有知道的麻烦告知
                    //现在知道的就是通过直接修改Store.state的方式来更新数据，当然效果和修改this.data是一样的
	            	this.tableData = [];
        			this.createGoodsDetail(this.tableObj,0);
				},
				
	            // 深度观察
	            deep:true
			}
		},
		methods:{
			addSpec(){
				this.form.specArr.push({specName:'',specValue:[],inputVisible:false})
			},
			showInput(index) {
        		this.form.specArr[index].inputVisible = true;
      		},
      		handleInputConfirm(s){
      			let inputValue = this.inputValue;
      			if(inputValue){
      				s.specValue.push({name:this.inputValue});
      			}
      			s.inputVisible = false;
      			this.inputValue = '';
      		},
      		handleClose(tag,index){//删除某规格属性
				this.form.specArr[index].specValue.splice(this.form.specArr[index].specValue.indexOf(tag), 1);
			},
			deleteSpec(sindex){
				this.form.specArr.splice(sindex,1)
			},
			createGoodsDetail(tableMap,index){
				let size = this.form.specArr.length
				let tableKey = this.form.specArr[index].specName
				for(let i = 0;i < this.form.specArr[index].specValue.length;i++){//颜色
					tableMap[tableKey] = this.form.specArr[index].specValue[i].name
					
					if(index < size - 1){
						index++
						this.createGoodsDetail(tableMap,index)
						index--
					}else{
						tableMap.img = ''
						tableMap.price = ''
						this.tableData.push(JSON.parse(JSON.stringify(tableMap)))
					}
				}
			},
			handleAvaterSuccess(response,file,fileList){
				this.tableData[this.imgIndex].img = 'http://ivis.oss-cn-shanghai.aliyuncs.com/' + this.key.key
				this.getKey()
			},
		}
	}
</script>

<style>
</style>