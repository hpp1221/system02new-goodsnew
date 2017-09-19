<template>
	<el-table :data="tabledata" :show-header="header" class="childtable">
		<el-table-column type="expand">
			<template scope="scope">
				<departmenttable 
					:tabledata="scope.row.children" 
					:header="false"
					>
				</departmenttable>
			</template>
			
		</el-table-column>
		<el-table-column prop="name" label="部门名称">
			
		</el-table-column>
		<el-table-column prop="remarks" label="备注">
			
		</el-table-column>
		<el-table-column label="创建时间">
			<template scope="scope">
				{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
			</template>
		</el-table-column>
		<el-table-column prop="creater" label="创建人">
			
		</el-table-column>
		<el-table-column label="修改时间">
			<template scope="scope">
				{{moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')}}
			</template>
		</el-table-column>
		<el-table-column prop="updater" label="修改人">
			
		</el-table-column>
		<el-table-column label="操作">
			<template scope="scope">
				<el-dropdown trigger="click">
					<el-button type="text" icon="more"></el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="addDepartment(scope.row.organizationId)">添加子菜单</el-dropdown-item>
					    <el-dropdown-item @click.native="update(scope.row.organizationId)">修改</el-dropdown-item>
					    <el-dropdown-item @click.native="deleteItem(scope.row.organizationId)">删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	export default{
		name:'departmenttable',
		data(){
			return {
				
			}
		},
		components:{
			'department-table':require('./departmenttable')
		},
		props:{
			tabledata:'',
			header:false
		},
		methods:{
			addDepartment(id){
				this.$emit('addDepartment',id);
			},
			update(id){
				this.$emit('update',id);
			},
			deleteItem(id){
				this.$emit('deleteItem',id);
			},
		}
	}
</script>

<style scoped="scoped">
	.childtable{
		border: none;
	}
</style>