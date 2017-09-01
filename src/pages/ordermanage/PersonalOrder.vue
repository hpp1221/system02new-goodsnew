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
					type:-1,
					addressId:'',
					status:1,//1代表入库
					dateRange:''
				}
			}
		},
		created(){
			this.select()
		},
		methods:{
			select(){//查询
				
			}
		}
	}
</script>

<style>
</style>