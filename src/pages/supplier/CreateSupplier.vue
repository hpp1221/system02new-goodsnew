<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">供应链新增</h3>
			
			<el-form ref="form" :model="form" class="request-form" label-width="120px" style="width:700px" inline>
				<el-form-item label="供应链名称">
					<el-input placeholder="请输入供应商名称" v-model="form.name" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="供应商电话">
					<el-input placeholder="请输入商品名称" v-model="form.name" class="form-input">
					</el-input>
				</el-form-item>
				<el-form-item label="供应商手机">
					<el-select placeholder="请选择商品品牌" v-model="form.brandName">
						<el-option label="上架" value="1"></el-option>
						<el-option label="下架" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="供应商地址">
					<el-select v-model="form.catId">
						<el-option value="1" label="一级分类"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="供应商编码">
					<el-select v-model="form.unit">
						<el-option value="1" label="个"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="供应商邮箱">
					<el-input placeholder="搜索关键字" class="form-input" v-model="form.keyword"></el-input>
				</el-form-item>
				<el-form-item label="供应商商品">
					<el-input placeholder="请输入供应商名称" class="form-input" v-model="form.supplier"></el-input>
				</el-form-item>
			  	<el-form-item>
			  		<el-button @click="submit('form')">保存</el-button>
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