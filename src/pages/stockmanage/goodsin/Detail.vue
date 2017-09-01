<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">入库详情</h3>
			<div class="goodsinout-detail-top">
				<div class="left">
					<p>仓库: <span></span></p>
					<p>单号: <span></span></p>
					<p>入库日期: <span></span></p>
					<p>制单人: <span></span></p>
				</div>
				<div class="right">
					<el-button type="text">打印</el-button>
				</div>
			</div>
			<el-table :data="tableData">
				<el-table-column label="编码">
					
				</el-table-column>
				<el-table-column label="商品">
					
				</el-table-column>
				<el-table-column label="规格">
					
				</el-table-column>
				<el-table-column label="单位">
					
				</el-table-column>
				<el-table-column label="入库数量">
					
				</el-table-column>
				<el-table-column label="备注">
					
				</el-table-column>
			</el-table>
			<div class="goodsinout-detail-bottom">
				<p>备注: <span></span></p>
				<p>经办人: <span></span></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tableData:[
					
				],
			}
		},
		methods:{
			save(){//保存
				
			},
			cancel(){//取消
				this.$router.push('/goodsin')
			}
		}
	}
</script>
