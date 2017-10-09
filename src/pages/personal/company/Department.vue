<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">部门管理</h3>
			<el-form :model="form" inline class="request-form">
				<el-form-item>
					<el-button @click="addDepartment(0)">新增子部门</el-button>
				</el-form-item>
			</el-form>
			<table>
				<thead>
					<tr>
						<th width="12%">部门名称</th>
						<th width="12%">备注</th>
						<th width="12%">创建时间</th>
						<th width="12%">创建人</th>
						<th width="12%">修改时间</th>
						<th width="12%">修改人</th>
						<th width="20%">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="m in configs" :id="m.organizationId">
						<td @click="showChild(m.organizationId,m.toggle)" style="cursor:pointer;user-select:none">
							<span v-if="m.level == 2" style="margin-left:15px"></span>
							<span v-if="m.level == 3" style="margin-left:30px"></span>
							<span v-if="m.level > 3" style="margin-left:45px"></span>
							<span class="permission-td-p">{{m.name}}</span>
							<i class="el-icon-arrow-down" v-if="m.children && !m.toggle"></i>
							<i class="el-icon-arrow-up" v-if="m.children && m.toggle"></i>
						</td>
						<td>{{m.remarks}}</td>
						<td>{{moment(m.createTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
						<td>{{m.creater}}</td>
						<td>{{moment(m.updateTime).format('YYYY-MM-DD HH:mm:ss')}}</td>
						<td>{{m.updater}}</td>
						<td>
							<el-dropdown trigger="click">
                <i class="iconfont icon-more" style="cursor: pointer"></i>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click.native="addDepartment(m.organizationId)">添加子菜单</el-dropdown-item>
								    <el-dropdown-item @click.native="update(m.organizationId)">修改</el-dropdown-item>
								    <el-dropdown-item @click.native="deleteItem(m.organizationId)">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<!--<div style="overflow:hidden;display:inline-block;margin:0 auto;vertical-align:middle;width:270px">
								<router-link class="ivis-table-button float" :to="{path:'/createPermission',query:{pid:m.id,pids:m.pids,type:1}}">
									<img src="../../../static/images/common/add.png">
									<span>添加</span>
								</router-link>
								<router-link :to="{path:'/createPermission',query:{id:m.id,type:2}}" class="ivis-table-button float" style="margin-left:10px">
									<img src="../../../static/images/common/edit.png">
									<span>修改</span>
								</router-link>
								<a class="ivis-table-button float" style="margin-left:10px" @click="showDeleteDialog(m.id)">
									<img src="../../../static/images/common/delete.png">
									<span>删除</span>
								</a>
								<a class="ivis-table-button float" style="margin-left:10px" @click="changeVisiable(m.id,m.visiable)">
									<img src="../../../static/images/common/forbidden.png" v-if="m.visiable == 1">
									<img src="../../../static/images/common/start.png" v-if="m.visiable == 0">
									<span v-if="m.visiable == 1">禁用</span>
									<span v-if="m.visiable == 0">启用</span>
								</a>
							</div>-->
						</td>
					</tr>
				</tbody>
			</table>
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
			<el-dialog title="新增子部门" :visible.sync="addDepartmentDialog" size="tiny">
			  	<el-form ref="form" :model="addForm" label-width="90px">
			  		<el-form-item label="部门名称">
			  			<el-input v-model="addForm.name"></el-input>
			  		</el-form-item>
			  		<el-form-item label="上级部门">
			  			<el-select v-model="addForm.pid" disabled v-if="addForm.pid!=0">
			  				<el-option v-for="t in configs"
			  					:key="t.organizationId"
			  					:value="t.organizationId"
			  					:label="t.name"
			  					>
			  				</el-option>
			  			</el-select>
			  			<span v-else>根部门</span>
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
			<el-dialog title="修改部门信息" :visible.sync="updateDepartmentDialog" size="tiny">
			  	<el-form ref="form" :model="updateForm" label-width="90px">
			  		<el-form-item label="部门名称">
			  			<el-input v-model="updateForm.name"></el-input>
			  		</el-form-item>
			  		<el-form-item label="上级部门">
			  			<el-select v-model="updateForm.pid" disabled v-if="updateForm.pid!=0">
			  				<el-option v-for="t in configs"
			  					:key="t.organizationId"
			  					:value="t.organizationId"
			  					:label="t.name"
			  					>
			  				</el-option>
			  			</el-select>
			  			<span v-else>根部门</span>
			  		</el-form-item>
			  		<el-form-item label="备注">
			  			<el-input v-model="updateForm.remarks"></el-input>
			  		</el-form-item>
			  		<el-form-item>
			  			<el-button @click="sureUpdateDepartment(updateForm.organizationId)">确定</el-button>
			  			<el-button @click="updateDepartmentDialog = false">取消</el-button>
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
				updateDepartmentDialog:false,
				addForm:{
					name:'',
					pid:0,//上级部门id
					remarks:'',
					pids:0
				},
				updateForm:{
					name:'',
					organizationId:'',
					pid:0,//上级部门id
					remarks:'',
					pids:0
				},
				flag:0,
				configs:[],
			}
		},
		updated(){
			if(this.flag != 0){
				return;
			}
			this.flag += 1;
			this.showAll(this.configs);
		},
		components:{
			'department-table':require('../../../components/departmenttable')
		},
		created(){
			this.selectDepartment();
		},
		methods:{
			selectDepartment(){//查询部门列表
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
						self.configs = [];
						self.hasNext(self.tableData);
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			addDepartment(id){//打开添加部门模态框
				let self = this;
				self.addDepartmentDialog = true;
				if(id !== 0){
					let requestData = {
						token: window.localStorage.getItem('token'),
						organizationId: id
					};
					self.$http.post('/ui/organization/selectOrganizationById',self.qs.stringify(requestData)).then(function (response) {
					    let data = response.data;
					    console.log('selectOrganizationById',response)
						if(data.code == 10000){
							self.addForm.pid = data.data.organizationId;
							self.addForm.pids = data.data.pids;

						}
				    }).catch(function (error) {
				    	console.log(error);
				    });
				}

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
						self.$router.go(0);
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			sureUpdateDepartment(id){
				let self = this;
				let requestData = {
					token: window.localStorage.getItem('token'),
					companyId: JSON.parse(window.localStorage.getItem('userinfo')).companyId,
					organizationId: id
				};
				requestData = Object.assign(requestData,self.shallowCopy(self.updateForm));
				self.$http.post('/ui/organization/updateOrganization',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
					if(data.code == 10000){
						self.updateDepartmentDialog = false;
						self.$router.go(0);
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			deleteItem(id){
				let self = this;
				this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	let requestData = {
						token: window.localStorage.getItem('token'),
						organizationId: id
					};
					self.$http.post('/ui/organization/deleteOrganizationById',self.qs.stringify(requestData)).then(function (response) {
					    let data = response.data;
					    console.log('selectOrganizationListByCompanyId',response)
						if(data.code == 10000){
							self.$message.success('删除成功');
							self.$router.go(0);
						}
				    }).catch(function (error) {
				    	console.log(error);
				    });
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '已取消删除'
		          	});
		        });
			},
			update(id){//修改接口
				let self = this;
				self.updateDepartmentDialog = true;

				let requestData = {
					token: window.localStorage.getItem('token'),
					organizationId: id
				};
				self.$http.post('/ui/organization/selectOrganizationById',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log(response)
					if(data.code == 10000){
						self.updateForm = self.formPass(self.updateForm,data.data);
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			hasNext(arr){
	    		for(let i = 0;i < arr.length;i++){
	    		 	arr[i].pid == 0?this.$set(arr[i],'show',true):this.$set(arr[i],'show',false);
	    		 	this.$set(arr[i],'toggle',false);
	    		 	this.$set(arr[i],'level',arr[i].pids.split(",").length);
	    		 	this.configs.push(arr[i]);
	    			if(arr[i].children){
	    				this.hasNext(arr[i].children);
	    			}
	    		}
	    	},
	    	showAll(arr){
	    		for(let i = 0;i < arr.length;i++){
	    			if(arr[i].show){
	    				if(document.getElementById(arr[i].organizationId)){
		    				document.getElementById(arr[i].organizationId).style.display = "table-row";
		    			}

	    			}else{
	    				if(document.getElementById(arr[i].organizationId)){
		    				document.getElementById(arr[i].organizationId).style.display = "none";
		    			}
	    			}
	    			if(arr[i].children){
						this.showAll(arr[i].children)
					}
	    		}
	    	},
	    	showChild(id,toggle){
				if(toggle){//收起子菜单
					this.deleteChild(id);
				}else{
					this.createChild(id);
				}
	    		for(let i = 0;i < this.configs.length;i++){
	    			if(this.configs[i].organizationId == id){
	    				this.configs[i].toggle = !toggle;
	    			}
	    		}
	    	},
	    	deleteChild(id){
	    		for(let i = 0; i < this.configs.length;i++){
	    			if(this.configs[i].pid == id){
	    				if(document.getElementById(this.configs[i].organizationId)){
		    				document.getElementById(this.configs[i].organizationId).style.display = "none";
		    			}
	    				this.configs[i].show = false;
	    				this.configs[i].toggle = false;
	    				if(this.configs[i].children){
	    					this.deleteChild(this.configs[i].organizationId);
	    				}
	    			}
	    		}
	    		this.showAll(this.configs);
    		},
    		createChild(id){
				for(let i = 0; i < this.configs.length;i++){
	    			if(this.configs[i].pid == id){
	    				if(document.getElementById(this.configs[i].organizationId)){
	    					document.getElementById(this.configs[i].organizationId).style.display = "table-row";
	    				}
	    				this.configs[i].show = true;
	    			}
	    		}
	    		this.showAll(this.configs);
	    	},
		}
	}
</script>

<style scoped="scoped">
	table{
		width: 100%;
		border-collapse:collapse;
		color:#333;
		font-size: 14px;
		border:none;
		background-color: white;
		text-align: center;
	}
	thead,tbody,th,td{
		height: 40px;
	}

	th{
		font-weight: normal;
		font-size: 16px;
		background-color: #fafafa;
		border:1px solid #ddd;
		min-width: 120px;
	}
	td{
		min-width: 120px;
		overflow: hidden;
		border:1px solid #ddd;
	}
</style>
