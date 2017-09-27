<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">供应商列表</h3>
			<el-form ref="form" :model="form" inline class="request-form">
				<el-form-item label="快速查询">
					<el-input placeholder="请输入供应商名称/联系电话/手机/编码" class="fast-query" icon="search" v-model="form.query" :on-icon-click="handleIconClick">
					</el-input>
				</el-form-item>
				<el-form-item style="float: right;">
					<el-button @click="leadInSupplier">导入</el-button>
					<el-button plain @click="outputSupplier">导出</el-button>
					<el-button @click="createSupplier">新增</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" ref="multipleTable" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" prop="supplierId">
				</el-table-column>
				<el-table-column prop="name" label="供应商名称">

				</el-table-column>

				<el-table-column prop="number" label="供应商编码">

				</el-table-column>
				<el-table-column prop="tel" label="联系电话">

				</el-table-column>
				<el-table-column prop="address" label="地址">

				</el-table-column>
				<el-table-column prop="phone" label="手机">

				</el-table-column>
				<el-table-column label="创建时间">
					<template scope="scope">
						<span>{{moment(scope.row.createdTime).format('YYYY-MM-DD  HH:mm:ss')}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-dropdown trigger="click">
							<el-button type="text" icon="more"></el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="updateSupplier(scope.row.supplierId)">修改</el-dropdown-item>
								<el-dropdown-item @click.native="deleteSupplier(scope.row)">删除</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>

					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	let self = this;
	export default {
		data() {
			return {
				tableData: [],
				input2: '',
				multipleSelection: [],
				supplierIdVal: [],
				total: 0,
				pageSize: 10,
				pageNo: 1,
				form: {
					query: ''
				}
			}
		},
		created() {
			this.select();
			this.getSupplierList()
		},
		mounted() {

		},
		methods: {
			getSupplierList() { //供应商管理列表
				let self = this
				let params = {
					pageSize: self.pageSize,
					pageNo: self.pageNo
				};
				self.$http.post('/ui/supplier/listByPage', self.qs.stringify(params)).then(function(response) {
					console.log(response)
					console.log('code', response.data.data)

					if(response.data.code === 10000) {
						self.tableData = response.data.data
					}

				}).catch(function(error) {
					console.log(error);
				})

				self.$http.post('/ui/supplier/getSupplierCountByQuery').then(res => {
					this.total = res.data.data
				})
			},
			select() { //查询
				let self = this
				let requestData = {
					token: window.localStorage.getItem('token'),
					pageSize: self.pageSize,
					pageNo: self.pageNo,
					query: self.form.query
				}
				self.$http.post('/ui/supplier/listByPageAndQuery', self.qs.stringify(requestData)).then(function(response) {
					let data = response.data;
					console.log('list', response)
					if(data.code == 10000) {
						self.tableData = data.data
					}
				}).catch(function(error) {
					console.log(error);
				});
				let params = {
					query: self.form.query
				}
				self.$http.post('/ui/supplier/getSupplierCountByQuery', self.qs.stringify(params)).then(res => {
					console.log('926', res)
					if(res.data.code == 10000) {
						self.total = res.data.data
					}

				})
			},
			handleIconClick(ev) {
				this.select();
			},
			updateSupplier(supplierId) { //修改供应商详情
				this.$router.push({
					path: '/supplier/suppliers/updatesupplier',
					query: {
						supplierId: supplierId
					}
				});
			},
			deleteSupplier(row) { //删除单个供应商详情
				let self = this;
				let params = {
					supplierId: row.supplierId
				};
				self.$confirm('请确认是否删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					self.$http.post('/ui/supplier/deleteSupplierBySupplierId', self.qs.stringify(params)).then((res) => {
						if(res.data.code == 10000) {
							self.$message({
								type: 'success',
								message: '您已成功删除!'
							});
							this.getSupplierList()
						} else {
							self.$message({
								type: 'info',
								message: '您已取消删除'
							});
						}
					})

				})
			},
			outputSupplier() { //导出供应商
				let self = this
				let supplierString = ''
				for(let i = 0; i < self.multipleSelection.length; i++) {
					supplierString += ',' + self.multipleSelection[i].supplierId
					supplierString = supplierString.substring(1, supplierString.length)
					let requestData = {
						params: {
							supplierIds: supplierString
						}
					};
					location.href = '/ui/supplier/exportSupplierGoods?supplierIds=' + supplierString;
				}

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			toggleSelection(rows) {
				if(rows) {
					console.log('rows', rows)
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},

			createSupplier() { //新增供应商
				this.$router.push('/supplier/suppliers/createsupplier');
			},
			leadInSupplier() { //导入供应商
				this.$router.push('/supplier/suppliers/leadin');
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.select()
			},
			handleCurrentChange(val) {
				this.pageNo = val;
				this.select()
			}
		}
	}
</script>