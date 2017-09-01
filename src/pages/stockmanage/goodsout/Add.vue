<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">添加出库</h3>
			<el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="80px">
				<el-form-item label="仓库" prop="selfAddress">
					<el-select placeholder="全部仓库" v-model="form.selfAddress">
						<el-option :label="t.address" :key="t.id" :value="t.id" v-for="t in totalStores"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="出库日期">
					<el-date-picker
      					type="datetime"
      					placeholder="选择日期时间"
      					v-model="form.createTime">
    				</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-table :data="form.data" border>
						<el-table-column
      						type="index"
      						width="70"
					      	>
					    </el-table-column>
					    <el-table-column width="70">
      						<template scope="scope">
      							<i class="el-icon-plus" @click="addLine"></i>
      							<i class="el-icon-minus" @click="deleteLine(scope.$index)"></i>
      						</template>
					    </el-table-column>
						<el-table-column label="商品编码  商品名称">
							<template scope="scope">
								<el-autocomplete v-on:click.native="handleClick(scope.$index)" v-model="scope.row.combination" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select="handleSelect" :props="{value:'combination',label:'combination'}">
								</el-autocomplete>
							</template>
						</el-table-column>
						
						<el-table-column label="规格" prop="goodsSpec">
							
						</el-table-column>
						<el-table-column label="单位" prop="goodsUnit">
							
						</el-table-column>
						<el-table-column label="出库数量">
							<template scope="scope">
								<el-input v-model="scope.row.num" type="number"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item label="出库单号" prop="tradeNo">
					<el-input class="form-input" v-model="form.tradeNo"></el-input>
				</el-form-item>
				<el-form-item label="出库类型">
					<el-select class="form-input" v-model="form.type" placeholder="选择出库类型">
						<el-option v-for="tt in totalTypes"
							:label="tt.name"
							:key="tt.id"
							:value="tt.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" class="long-input" v-model="form.remark"></el-input>
				</el-form-item>
				<el-form-item label="经办人">
					<el-input class="form-input" v-model="form.tradeNoHandler"></el-input>
				</el-form-item>
				<el-form-item label="制单人">
					<el-input class="form-input" v-model="form.createUserName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="save('form')">保存</el-button>
					<el-button @click="cancel">取消</el-button>
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
					type:'',
					selfAddress:'',//仓库
					createTime:'',//出库日期
					tradeNo:'',//出库单号
					data:[{
						goodsNo:'',//商品编号
						goodsName:'',//商品名
						goodsSpec:'',//规格
						goodsUnit:'',
						num:'',
						combination:'',//编号和名称组合
						goodsSkuId:'',//规格id
					}],
					remark:'',//备注
					createUserName:'',//制单人
					tradeNoHandler:'',//经办人
					status:-1,//1是入库,-1是出库
				},
				rules:{
			        selfAddress: [
			            { required: true, message: '请选择出库仓库' }
			        ],
          			tradeNo: [
            			{ required: true, message: '请输入出库单号', trigger: 'change' }
          			],
				},
				totalStores:[],
				totalTypes:[
					{
						name:'销售出库',
						id:6
					},
					{
						name:'盘亏',
						id:8
					},
					{
						name:'采购退回',
						id:9
					},
					{
						name:'其他出库',
						id:10
					},
				],
				goodsInfoList:[],
				listIndex:'',//现在正在添加的某个list的下标
			}
		},
		created(){
			this.getAddressList()
		},
		methods:{
			save(formName){//保存
				this.$refs[formName].validate((valid) => {
          			if (valid) {
            			let self = this
						let requestData = {token: window.localStorage.getItem('token')}
						for(let i = 0;i < self.form.data.length;i++){
							self.$delete(self.form.data[i],'combination')
						}
						requestData = Object.assign(requestData,self.shallowCopy(self.form))
						
						self.$http.post('/ui/addRecord',self.qs.stringify(requestData)).then(function (response) {
						    let data = response.data;
						    console.log('addRecord',response)
							if(data.code == 10000){
								self.$router.push('/goodsout/list')
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
			cancel(){//取消
				this.$router.push('/goodsout/list')
			},
			querySearchAsync(queryString, cb){
				let self = this
				let requestData = {
					token: window.localStorage.getItem('token'),
					keyword: queryString,
					companyId:1
				}
				self.$http.post('/ui/goodsInfo',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('addAllocationRecord',response)
				    console.log(response.data)
					if(data.code == 10000){
						let list = data.data
						for(let i = 0,listLength = list.length;i < listLength;i++){
							list[i].combination = list[i].goodsNo + list[i].goodsName
						}
						self.goodsInfoList = list
				        // 调用 callback 返回建议列表的数据
				        cb(self.goodsInfoList);
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
				
			},
			getAddressList(){
				let self = this
				let requestData = {token: window.localStorage.getItem('token')}
				self.$http.post('/ui/addressList',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('addressList',response)
					if(data.code == 10000){
						self.totalStores = data.data
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			handleSelect(item){
				this.form.data[this.listIndex] = item
			},
			handleClick(index){
				this.listIndex = index
			},
			addLine(){
				this.form.data.push({
					goodsNo:'',//商品编号
					goodsName:'',//商品名
					goodsSpec:'',//规格
					goodsUnit:'',
					num:'',
					combination:'',//编号和名称组合
					goodsSkuId:'',//规格id
				})
			},
			deleteLine(index){
				this.form.data.length === 1?this.$message('请至少出库一个商品') : this.form.data.splice(index,1)
			},
		}
	}
</script>

<style>
</style>