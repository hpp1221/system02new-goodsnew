<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">部门管理</h3>
			<el-form :model="form" inline class="request-form">
				<el-form-item>
					<el-button @click="addDepartment(0)">新增子部门</el-button>
				</el-form-item>
			</el-form>
			<department-table :tabledata="tableData" 
				:header="true">
			</department-table>
			<!--<el-table :data="tableData">
				<el-table-column type="expand">
					<template scope="scope">
						
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
							    <el-dropdown-item @click.native="update">修改</el-dropdown-item>
							    <el-dropdown-item @click.native="deleteItem">删除</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>-->
			<el-dialog title="新增子部门" v-model="addDepartmentDialog" size="tiny">
			  	<el-form ref="form" :model="addForm" label-width="90px">
			  		<el-form-item label="部门名称">
			  			<el-input v-model="addForm.name"></el-input>
			  		</el-form-item>
			  		<el-form-item label="上级部门">
			  			<el-select v-model="addForm.pid" disabled>
			  				<el-option v-for="t in tableData" 
			  					:key="t.organizationId" 
			  					:value="t.organizationId"
			  					:label="t.name"
			  					>
			  				</el-option>
			  			</el-select>
			  		</el-form-item>
			  		<el-form-item label="备注">
			  			<el-input v-model="addForm.remarks"></el-input>
			  		</el-form-item>
			  		<el-form-item>
			  			<el-button @click="sureAddDepartment">确定</el-button>
			  			<el-button @click="addDepartmentDialog = false">取消</el-button>
			  		</el-form-item>
			  	</el-form>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tableData:[],
				form:{
					
				},
				addDepartmentDialog:false,
				addForm:{
					name:'',
					pid:0,//上级部门id
					remarks:''
				}
			}
		},
		components:{
			'department-table':require('../../../components/departmenttable')
		},
		created(){
			this.selectDepartment();
		},
		methods:{
			selectDepartment(){
				let self = this;
				let requestData = {
					token: window.localStorage.getItem('token'),
					companyId: JSON.parse(window.localStorage.getItem('userinfo')).companyId
				};
				self.$http.post('/ui/organization/selectOrganizationListByCompanyId',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('selectOrganizationListByCompanyId',response)
					if(data.code == 10000){
						self.tableData = data.data;
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			addDepartment(id){
				console.log(id)
				return
				let self = this;
				self.addDepartmentDialog = true;
				self.form.pid = id;
				let requestData = {
					token: window.localStorage.getItem('token'),
					companyId: JSON.parse(window.localStorage.getItem('userinfo')).companyId
				};
				self.$http.post('/ui/organization/selectOrganizationListByCompanyId',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('selectOrganizationListByCompanyId',response)
					if(data.code == 10000){
						self.tableData = data.data;
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			sureAddDepartment(){
				let self = this;
				let requestData = {
					token: window.localStorage.getItem('token'),
					companyId: JSON.parse(window.localStorage.getItem('userinfo')).companyId
				};
				requestData = Object.assign(requestData,self.shallowCopy(self.addForm));
				self.$http.post('/ui/organization/addOrganization',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
					if(data.code == 10000){
						self.addDepartmentDialog = false;
						self.selectDepartment();
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			deleteItem(id){
				
			},
			update(id){//修改接口
				
			},
		}
	}
</script>

<style scoped="scoped">
	.childtable{
		border: none;
	}
</style>