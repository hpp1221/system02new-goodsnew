<template>
	<div class="container">
		<div class="wrapper">
			<el-form ref="form" :model="form" inline>
				<el-form-item>
					<el-select>
						
					</el-select>
				</el-form-item>
				<el-form-item>
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
				<el-table-column prop="" label="单号">
					
				</el-table-column>
				<el-table-column prop="" label="入库日期">
					
				</el-table-column>
				<el-table-column prop="" label="所属仓库">
					
				</el-table-column>
				<el-table-column prop="" label="类型">
					
				</el-table-column>
				<el-table-column prop="" label="制单人">
					
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