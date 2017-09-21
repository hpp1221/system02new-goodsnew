<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">订单列表</h3>
			<el-table :data="tableData">
				<el-table-column
      				type="selection"
      				width="55">
    			</el-table-column>
				<el-table-column prop="tradeNo" label="订单号">
					
				</el-table-column>
				<el-table-column prop="createTime" label="下单时间" sortable>
					<template scope="scope">
						<span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="storeHouseAddress" label="金额">
					
				</el-table-column>
				<el-table-column prop="type" label="出库/发货">
					<template scope="scope">
						<span v-if="scope.row.type == 1">其他入库</span>
						<span v-if="scope.row.type == 2">采购入库</span>
						<span v-if="scope.row.type == 3">销售退货</span>
						<span v-if="scope.row.type == 4">调拨入库</span>
						<span v-if="scope.row.type == 5">盘盈</span>
					</template>
				</el-table-column>
				<el-table-column prop="createUserName" label="状态">
					
				</el-table-column>
				<el-table-column prop="createUserName" label="付款状态">
					
				</el-table-column>
				<el-table-column label="操作">
					<el-button type="text" @click="seeDetail(scope.row.id)">查看明细</el-button>
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
					payType:'',//付款状态
					orderNumber:'',//订单编号
					orderStatus:'',//订单状态
				},
				easyForm:{//简单查询
					
				},
				totalStores:[
					{
						name:'仓库1',
						id:1
					},
					{
						name:'仓库2',
						id:2
					},
					{
						name:'仓库3',
						id:3
					}
				],
				totalOrderStatus:[
					{
						name:'全选'
					},
					{
						name:'待订单审核'
					},
					{
						name:'待财务审核'
					},
					{
						name:'待出库审核'
					},
					{
						name:'待发货确认'
					},
					{
						name:'待收货确认'
					},
					{
						name:'已完成'
					},
					{
						name:'已作废'
					},
				],//订单状态
				totalPaymentStatus:[
					{
						name:'全选'
					},
					{
						name:'未付款'
					},
					{
						name:'付款待审核'
					},
					{
						name:'部分付款'
					},
					{
						name:'已付款'
					},
				],//付款状态
				totalOrderTags:[
					{
						name:'不限'
					},
					{
						name:'特价单'
					},
					{
						name:'非特价单'
					},
					{
						name:'秒杀订单'
					},
				],//订单标签
				advanceSearch:false,
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
				self.$http.post('/ui/order/list',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('list',response)
					if(data.code == 10000){
						self.tableData = data.data.list
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
						//self.totalStores = data.data
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			seeDetail(id){
				this.$router.push({path:'/order/orderdetail',query:{id:id}})
			}
		}
	}
</script>

<style>
</style>