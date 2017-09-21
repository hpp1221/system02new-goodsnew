<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">员工与部门信息</h3>
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="员工账号" name="first">
			    	<el-form ref="searchForm" :model="searchForm" inline class="request-form">
						<el-form-item label="部门">
							<el-select placeholder="商品分类" v-model="searchForm.storeHouseAddress">
								<el-option label="玩具" value="1"></el-option>
								<el-option label="用品" value="1"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="状态">
							<el-select placeholder="商品状态" v-model="searchForm.storeHouseAddress">
								<el-option label="上架" value="1"></el-option>
								<el-option label="下架" value="1"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-input placeholder="请输入员工姓名/账号/手机/职位/角色">
								
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button @click="select">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button @click="createEmployee">新增</el-button>
						</el-form-item>
					</el-form>
					<el-table :data="tableData">
						<el-table-column prop="username" label="用户名">
							
						</el-table-column>
						<el-table-column prop="realname" label="姓名">
							
						</el-table-column>
						<el-table-column prop="job" label="职位">
							
						</el-table-column>
						<el-table-column prop="department" label="部门">
							
						</el-table-column>
						<el-table-column prop="phone" label="手机">
							
						</el-table-column>
						<el-table-column prop="email" label="邮箱">
							
						</el-table-column>
						<el-table-column label="操作">
							<template scope="scope">
								<el-dropdown trigger="click">
									<el-button type="text" icon="more"></el-button>
									<el-dropdown-menu slot="dropdown">
									    <el-dropdown-item @click.native="update">修改</el-dropdown-item>
									    <el-dropdown-item @click.native="forbidden">禁用</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</template>
						</el-table-column>
					</el-table>
			    </el-tab-pane>
			    <el-tab-pane label="部门设置" name="second">
			    	2
			    </el-tab-pane>
			    <el-tab-pane label="角色权限设置" name="third">
			    	3
			    </el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				activeName:'first',
				tableData:[{
					
				}],
				searchForm:{
					
				},
			}
		},
		methods:{
			handleClick(){
				
			},
			select(){//条件查询
				
			},
			createEmployee(){
				
			},
			update(){//修改接口
				
			},
			forbidden(){//禁用
				this.$confirm('确认禁用?', '提示', {
		          	confirmButtonText: '确认',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.$message({
		            	type: 'success',
		            	message: '禁用成功!'
		          	});
		        }).catch(() => {
		        	
		        });
			}
		}
	}
</script>

<style>
</style>