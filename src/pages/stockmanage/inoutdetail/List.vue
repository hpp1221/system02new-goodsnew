<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">出入库明细</h3>
			<el-form ref="easyForm" :model="easyForm" inline v-if="!advanceSearch">
				<el-form-item>
					<el-select placeholder="全部仓库" v-model="easyForm.addressName">
						<el-option :label="t.address" :key="t.id" :value="t.address" v-for="t in totalStores"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-date-picker
      					type="daterange"
      					placeholder="选择日期范围"
      					v-model="easyForm.dateRange">
    				</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="按商品名称/编码/规格/条形码/关键字搜索" icon="search" v-model="easyForm.keyword" class="long-input">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="select">查询</el-button>
				</el-form-item>
			</el-form>
			<el-form ref="form" :model="form" v-if="advanceSearch" class="request-form" label-width="100px">
				<el-form-item label="商品信息">
					<el-input placeholder="请输入商品名称/编码/按商品合并/关键字/条形码" v-model="form.keyword" class="long-input">
						
					</el-input>
				</el-form-item>
				<el-form-item label="出入库类型">
					<el-select v-model="form.type">
						<el-option label="全部" :value="-1"></el-option>
						<el-option label="其他入库" :value="1"></el-option>
						<el-option label="采购入库" :value="2"></el-option>
						<el-option label="销售退货" :value="3"></el-option>
						<el-option label="调拨入库" :value="4"></el-option>
						<el-option label="盘盈" :value="5"></el-option>
						<el-option label="销售出库" :value="6"></el-option>
						<el-option label="调拨出库" :value="7"></el-option>
						<el-option label="盘亏" :value="8"></el-option>
						<el-option label="采购退回" :value="9"></el-option>
						<el-option label="其他出库" :value="10"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-select v-model="form.goodsSeriesId">
						<el-option label="全部分类" :value="-1"></el-option>
						<el-option label="日常用品" :value="1"></el-option>
						<el-option label="儿童玩具" :value="2"></el-option>
						<el-option label="妈妈用品" :value="3"></el-option>
						<el-option label="儿童车床" :value="4"></el-option>
						<el-option label="纸质用品" :value="5"></el-option>
						<el-option label="其他用品" :value="6"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品品牌">
					<el-select v-model="form.goodsBrandId">
						<el-option label="全部分类" :value="-1"></el-option>
						<el-option label="日常用品" :value="1"></el-option>
						<el-option label="儿童玩具" :value="2"></el-option>
						<el-option label="妈妈用品" :value="3"></el-option>
						<el-option label="儿童车床" :value="4"></el-option>
						<el-option label="纸质用品" :value="5"></el-option>
						<el-option label="其他用品" :value="6"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="出入库时间">
					<el-date-picker
      					type="daterange"
      					placeholder="选择日期范围"
      					v-model="form.dateRange">
    				</el-date-picker>
				</el-form-item>
				<el-form-item label="所属仓库">
					<el-checkbox-group v-model="form.address">
    					<el-checkbox label="全选"></el-checkbox>
					    <el-checkbox :label="t.address" v-for="t in totalStores" :key="t.id" :value="t.address"></el-checkbox>
  					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="商品标签">
					<el-checkbox-group v-model="form.tags">
    					<el-checkbox label="全选"></el-checkbox>
					    <el-checkbox label="新品上架"></el-checkbox>
					    <el-checkbox label="热卖推荐"></el-checkbox>
					    <el-checkbox label="清仓优惠"></el-checkbox>
					    <el-checkbox label="热卖推荐"></el-checkbox>
					    <el-checkbox label="清仓优惠"></el-checkbox>
  					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-button @click="select">查询</el-button>
					<el-button type="text" @click="advanceSearch = false">取消高级搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData">
				<el-table-column prop="tradeNo" label="编码">
					
				</el-table-column>
				<el-table-column prop="goodsName" label="商品名称">
					
				</el-table-column>
				<el-table-column prop="goodsSpec" label="规格">
					
				</el-table-column>
				<el-table-column prop="unit" label="单位">
					
				</el-table-column>
				<el-table-column prop="createUserName" label="所属仓库">
					
				</el-table-column>
				<el-table-column prop="createUserName" label="类型">
					<template scope="scope">
						<span v-if="scope.row.type == 1">其他入库</span>
						<span v-if="scope.row.type == 2">采购入库</span>
						<span v-if="scope.row.type == 3">销售退货</span>
						<span v-if="scope.row.type == 4">调拨入库</span>
						<span v-if="scope.row.type == 5">盘盈</span>
						<span v-if="scope.row.type == 6">销售出库</span>
						<span v-if="scope.row.type == 7">调拨出库</span>
						<span v-if="scope.row.type == 8">盘亏</span>
						<span v-if="scope.row.type == 9">采购退回</span>
						<span v-if="scope.row.type == 10">其他出库</span>
					</template>
				</el-table-column>
				<el-table-column prop="createUserName" label="单号">
					
				</el-table-column>
				<el-table-column prop="createUserName" label="出入库日期">
					
				</el-table-column>
				<el-table-column prop="createUserName" label="出入库数量">
					
				</el-table-column>
				<el-table-column prop="createUserName" label="库存量">
					
				</el-table-column>
				<el-table-column label="操作">
					<el-button type="text">查看明细</el-button>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tableData:[
				
				],
				form:{
					keyword:'',
					type:-1,
					goodsSeriesId:'',
					goodsBrandId:'',
					dateRange:'',
					address:'',
					tagId:''
				},
				easyForm:{//简单查询
					addressName:'',//仓库名
					keyword:'',//关键词
					dateRange:'',
				},
				advanceSearch:false,//高级搜索
				totalStores:[]
			}
		},
		created(){
			this.select()
			this.getAddressList()
		},
		methods:{
			select(){//查询
				let self = this
				let requestData = {token: window.localStorage.getItem('token')}
				
				if(self.advanceSearch){//高级搜索
					requestData = Object.assign(requestData,self.shallowCopy(self.form))
				}else{//简单搜索
					requestData = Object.assign(requestData,self.shallowCopy(self.easyForm))
				}
				
				requestData = Object.assign(requestData,self.shallowCopy(self.form))
				
				self.$http.post('/ui/recordListBySku',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('出入库明细',response)
					if(data.code == 10000){
						self.tableData = data.data
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
		}
	}
</script>

<style>
</style>