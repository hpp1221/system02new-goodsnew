<template>
	<div class="container">
		<div class="wrapper">
			<el-form ref="form" :model="form" inline>
				<el-form-item label="调入仓">
					<el-select>
						
					</el-select>
				</el-form-item>
				<el-form-item label="调出仓">
					<el-select>
						
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-date-picker
      					type="daterange"
      					placeholder="选择日期范围">
    				</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button @click="select">查询</el-button>
					<el-button>新增</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData">
				<el-table-column prop="" label="调拨单号">
					
				</el-table-column>
				<el-table-column prop="" label="调出仓库">
					
				</el-table-column>
				<el-table-column prop="" label="调入仓库">
					
				</el-table-column>
				<el-table-column prop="" label="调出时间">
					
				</el-table-column>
				<el-table-column prop="" label="调入时间">
					
				</el-table-column>
				<el-table-column prop="" label="制单人">
					
				</el-table-column>
				<el-table-column prop="" label="状态">
					
				</el-table-column>
				<el-table-column label="操作">
					<el-button type="text">查看详情</el-button>
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
				
				]
			}
		},
		methods:{
			select(){//查询
				
			}
		}
	}
</script>

<style>
</style>