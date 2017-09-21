<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">角色管理</h3>
			<el-form :model="form" inline class="request-form">
				<el-form-item>
					<el-button @click="addRole(0)">新增角色</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData">
				<el-table-column prop="name" label="角色名称">
					
				</el-table-column>
				<el-table-column prop="remarks" label="备注">
					
				</el-table-column>
				<el-table-column prop="status" label="状态">
					<template scope="scope">
						<span v-if="scope.row.status == 1">正常</span>
						<span v-if="scope.row.status == -1">禁用</span>
					</template>
				</el-table-column>
				<el-table-column label="创建时间">
					<template scope="scope">
						<span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="creater" label="创建人">
					
				</el-table-column>
				<el-table-column label="修改时间">
					<template scope="scope">
						<span>{{moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="updater" label="修改人">
					
				</el-table-column>
				
			</el-table>
			
			<pagination @getPageSize="getPageSize" @getPageNum="getPageNum" :totalPage="totalPage"></pagination>
			<el-dialog title="新增角色" v-model="addRoleDialog" size="tiny">
			  	<el-form ref="form" :model="addForm" label-width="90px">
			  		<el-form-item label="角色名称">
			  			<el-input v-model="addForm.name"></el-input>
			  		</el-form-item>
			  		<el-form-item label="是否启用">
			  			<el-select v-model="addForm.status">
			  				<el-option label="启用" :value="1"></el-option>
			  				<el-option label="禁用" :value="-1"></el-option>
			  			</el-select>
			  		</el-form-item>
			  		<el-form-item label="备注">
			  			<el-input v-model="addForm.remarks"></el-input>
			  		</el-form-item>
			  		<el-form-item label="权限">
			  			<el-tree
						  	:data="data"
						  	show-checkbox
						  	default-expand-all
						  	node-key="id"
						  	ref="tree"
						  	highlight-current
						  	check-strictly
						  	:default-checked-keys="defaultPermission"
						  	:props="defaultProps" style="float:left;width:200px;border:none">
						</el-tree>
			  		</el-form-item>
			  		<el-form-item>
			  			<el-button @click="sureAddRole">确定</el-button>
			  			<el-button @click="addRoleDialog = false">取消</el-button>
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
				pageSize:5,
				pageNum:1,
				totalPage:10,
				tableData:[],
				addRoleDialog:false,
				form:{
					
				},
				addForm:{
					name:'',
					status:-1,
					
				}
			}
		},
		created(){
			this.select();
		},
		components:{
			'pagination':require('../../../components/pagination')
		},
		watch:{
			pageSize:function(newVal,oldVal){
				this.select();
			},
			pageNum:function(newVal,oldVal){
				this.select();
			}
		},
		methods:{
			addRole(id){
				let self = this;
				self.addRoleDialog = true;
			},
			sureAddRole(){
				
			},
			getPageSize(val){
				this.pageSize = val;
			},
			getPageNum(val){
				this.pageNum = val;
			},
			select(){
				let self = this;
				let requestData = {
					token: window.localStorage.getItem('token'),
					pageSize:self.pageSize,
					pageNum:self.pageNum
				};
				//requestData = Object.assign(requestData,self.shallowCopy(self.form));
				self.$http.post('/ui/role/selectRoleListPage',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('selectRoleListPage',response)
					if(data.code == 10000){
						self.tableData = data.data.list;
						self.totalPage = data.data.total;
						//self.$router.push('/goods/goodslist');
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			}
		}
	}
</script>

<style>
</style>