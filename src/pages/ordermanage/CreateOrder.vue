<template>
	<div class="container">
		<div class="wrapper">
			<el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="80px">
				<el-table :data="form.data" border>
					<el-table-column
						type="index"
						width="70">
				    </el-table-column>
				    <el-table-column width="70">
						<template scope="scope">
							<i class="el-icon-plus" @click="addLine"></i>
							<i class="el-icon-minus" @click="deleteLine(scope.$index)"></i>
						</template>
				    </el-table-column>
				    <el-table-column label="主图" width="80">
						<template scope="scope">
							<img :src="scope.row.url" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>
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
					<el-table-column label="数量">
						<template scope="scope">
							<el-input v-model="scope.row.num" type="number"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="单位" prop="goodsUnit">
						
					</el-table-column>
					<el-table-column label="单价" prop="price">
						
					</el-table-column>
					<el-table-column label="小计" prop="subtotal">
						<template scope="scope">
							<span v-if="scope.row.subtotal">{{scope.row.subtotal}}</span>
							<span v-else="scope.row.subtotal"></span>
						</template>
					</el-table-column>
					<el-table-column label="备注">
						<template scope="scope">
							<el-input v-model="scope.row.remark"></el-input>
						</template>
					</el-table-column>
				</el-table>
				<!--<div class="order-table-total">
					<div class="top">
						<el-checkbox class="checkbox"></el-checkbox>
						<p class="checkbox">已申请特价，请输入获批订单金额</p>
						<el-input class="input"></el-input>
					</div>
					<div class="bottom">
						<p class="first-p">应付金额：</p>
						<p class="second-p">86.40</p>
					</div>
				</div>-->
				<el-form-item label="收货信息" style="margin-top: 20px;">
					
				</el-form-item>
				<el-form-item label="交货日期">
					<el-date-picker
				      	v-model="form.deliveryTime"
				      	type="date"
				      	placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="发票信息">
					<el-select v-model="form.invoiceType">
						<el-option v-for="i in invoiceTypes" :key="i.id" :value="i.id" :label="i.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注说明">
					<el-input type="textarea" v-model="form.remark" class="form-input"></el-input>
				</el-form-item>
				<el-form-item label="附件信息">
					
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submit">确定</el-button>
					<el-button>取消</el-button>
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
					orderDetails:[{
						goodsNo:'',//商品编号
						goodsName:'',//商品名
						goodsSpec:'',//规格
						goodsUnit:'',
						num:'',
						subtotal:'',//小计
						price:'',//价格
						combination:'',//编号和名称组合
						goodsSkuId:'',//规格id
					}],
					deliveryTime:'',//交货日期
					invoiceType:'',//发票信息
					remark:'',//备注
				},
				rules:{
					
				},
				listIndex:'',//现在正在添加的某个list的下标
				goodsInfoList:[],
				invoiceTypes:[
					{
						id:1,
						name:'不开发票'
					},
					{
						id:2,
						name:'电子发票'
					},
					{
						id:3,
						name:'普通发票'
					}
				]
			}
		},
		watch:{
			'form.data':{
				handler:(val,oldVal)=>{
                    //要执行的任务
                    //这里不知道怎么才能修改到this.data的数据，有知道的麻烦告知
                    //现在知道的就是通过直接修改Store.state的方式来更新数据，当然效果和修改this.data是一样的
	            	for(let i = 0;i < val.length;i++){
	            		val[i].subtotal = parseInt(val[i].num) * parseInt(val[i].price)
	            	
	            	}
				},
				
	            // 深度观察
	            deep:true
			}
			
		},
		methods:{
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
							list[i].subtotal = ''
							list[i].num = ''
						}
						self.goodsInfoList = list
				        // 调用 callback 返回建议列表的数据
				        cb(self.goodsInfoList);
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
				
			},
			handleSelect(item){
				console.log(item)
				this.form.data[this.listIndex] = item
			},
			handleClick(index){
				this.listIndex = index
			},
			submit(){//提交订单
				let self = this
				let requestData = {token: window.localStorage.getItem('token')}
				
				self.$http.post('/ui/order/submit',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('allocationRecordList',response)
					if(data.code == 10000){
						self.tableData = data.data
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			addLine(){
				this.form.data.push({
					goodsNo:'',//商品编号
					goodsName:'',//商品名
					goodsSpec:'',//规格
					goodsUnit:'',
					price:'',//价格
					num:'',
					subtotal:'',//小计
					combination:'',//编号和名称组合
					goodsSkuId:'',//规格id
				})
			},
			deleteLine(index){
				this.form.data.length === 1?this.$message('请至少选择一个商品') : this.form.data.splice(index,1)
			},
		}
	}
</script>
