<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">商品出库</h3>
			<el-form ref="form" :model="form" inline>
				<el-form-item>
					<el-select placeholder="全部仓库" v-model="form.addressId">
						<el-option :label="t.address" :key="t.id" :value="t.address" v-for="t in totalStores"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select placeholder="全部出库类型" v-model="form.type">
						<el-option label="全部出库类型" :value="-1"></el-option>
						<el-option label="销售出库" :value="6"></el-option>
						<el-option label="盘亏" :value="8"></el-option>
						<el-option label="采购退回" :value="9"></el-option>
						<el-option label="其他出库" :value="10"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-date-picker
      					type="daterange"
      					placeholder="选择日期范围"
      					v-model="form.dateRange">
    				</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button @click="select">查询</el-button>
					<el-button>新增</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData">
				<el-table-column prop="tradeNo" label="单号">
					
				</el-table-column>
				<el-table-column prop="createTime" label="出库日期">
					<template scope="scope">
						<span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="selfAddress" label="所属仓库">
					
				</el-table-column>
				<el-table-column prop="type" label="类型">
					<template scope="scope">
						<span v-if="scope.row.type == 6">销售出库</span>
						<span v-if="scope.row.type == 8">盘亏</span>
						<span v-if="scope.row.type == 9">采购退回</span>
						<span v-if="scope.row.type == 10">其他出库</span>
					</template>
				</el-table-column>
				<el-table-column prop="createUserName" label="制单人">
					
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button type="text" @click="seeDetail(scope.row.id)">查看明细</el-button>
					</template>
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
					type:-1,
					addressId:'',
					status:-1,//-1代表出库
					dateRange:''
				},
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
				if(self.form.dateRange instanceof Array){
					requestData.startDate = self.form.dateRange[0].getTime()
					requestData.endDate = self.form.dateRange[1].getTime()
				}
				requestData = Object.assign(requestData,self.shallowCopy(self.form))
				self.$http.post('/ui/recordList',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('入库list',response)
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
			seeDetail(id){
				this.$router.push({path:'/stock/goodsout/detail',query:{id:id}})
			}
		}
	}
</script>

<style>
</style>