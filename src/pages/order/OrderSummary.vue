<template>
	<div class="container">
		<div class="wrapper">
			<el-radio v-model="statisticsType" label="1">按商品明细统计</el-radio>
  			<el-radio v-model="statisticsType" label="2">订单明细统计</el-radio>
			<el-row :gutter="0" style="margin: 20px 0;">
  				<el-col :xs="8" :sm="8" :md="8" :lg="8">
  					<div class="goodssummary first">
  						<p class="first-p">0.00</p>
  						<p class="second-p">订单总数</p>
  					</div>
  				</el-col>
  				<el-col :xs="8" :sm="8" :md="8" :lg="8">
  					<div class="goodssummary second">
  						<p class="first-p">0.00</p>
  						<p class="second-p">商品总数</p>
  					</div>
  				</el-col>
  				<el-col :xs="8" :sm="8" :md="8" :lg="8">
  					<div class="goodssummary third">
  						<p class="first-p">0.00</p>
  						<p class="second-p">总金额</p>
  					</div>
  				</el-col>
			</el-row>	
			<el-table :data="tableData" border>
				<el-table-column prop="tradeNo" label="订单号">
					
				</el-table-column>
				<el-table-column prop="goodsName" label="状态">
					
				</el-table-column>
				<el-table-column prop="goodsSpec" label="下单日期">
					
				</el-table-column>
				<el-table-column prop="unit" label="商品编码">
					
				</el-table-column>
				<el-table-column prop="unit" label="商品名称">
					
				</el-table-column>
				
				<el-table-column prop="createUserName" label="规格">
					
				</el-table-column>
				
				<el-table-column prop="createUserName" label="数量">
					
				</el-table-column>
				<el-table-column prop="createUserName" label="单位">
					
				</el-table-column>
				<el-table-column prop="createUserName" label="单价">
					
				</el-table-column>
				<el-table-column prop="createUserName" label="小计金额">
					
				</el-table-column>
				<el-table-column prop="createUserName" label="是否赠品">
					
				</el-table-column>
			</el-table>
			<pagination></pagination>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tableData:[],
				statisticsType:'1',
			}
		},
		components:{
			'pagination':require('../../components/pagination')
		},
		methods:{
			
		}
	}
</script>


<style scoped="scoped">
	.goodssummary{
		height: 100px;
		text-align: center;
		color:white;
		padding-top: 24px;
	}
	.first{
		background-color: #f77686;
	}
	.second{
		background-color: #2da9f1;
	}
	.third{
		background-color: #9674cc;
	}
	.fourth{
		background-color: #f9a38b;
	}
	.first-p{
		font-size: 24px;
	}
	.second-p{
		
	}
</style>