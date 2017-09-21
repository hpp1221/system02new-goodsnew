<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">供应商列表</h3>
			<el-form ref="easyForm" :model="easyForm" inline class="request-form">
				<el-form-item label="快速查询">
					<el-input placeholder="请输入供应商名称/联系电话/手机/编码" class="fast-query" icon="search" v-model="input2" :on-icon-click="select">
					</el-input>
				</el-form-item>
				<el-form-item style="float: right;">
					<el-button @click="leadInSupplier">导入</el-button>
					<el-button @click="outputFile">导出</el-button>
					<el-button @click="createSupplier">新增</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable">
				<el-table-column type="selection" width="55">
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
		</div>
	</div>
</template>

<script>
	let self = this;
	export default {
		data() {
			return {
				tableData: [],
				advanceSearch: false,
				easyForm: { //简单查询
					storeHouseAddress: '', //所属仓库
					keyword: '', //关键词
				},
				multipleSelection: [], //选中项
				dialogTableVisible: false, //设置标签表格是否可见
			}
		},
		watch: {
			advanceSearch: function() { //点击高级搜索和取消时重新查询
				this.select();
			}
		},
		created() {
			//			this.select();
			this.getSupplierList()
		},
		methods: {
			getSupplierList() {
				var data = []
				let self = this
				self.$http.post('/ui/supplier/list', self.qs.stringify({})).then(function(response) {
					console.log(response)
					console.log(response.data.data[0])
					if(data.code === 10000) {
						self.tableData = response.data.data[0];
					}
					for(let i = 0; i < response.data.data.length; i++) {

						var obj = {}
						obj.name = response.data.data[i].name
						obj.supplierId = response.data.data[i].supplierId
						obj.number = response.data.data[i].number
						obj.tel = response.data.data[i].tel
						obj.address = response.data.data[i].address
						obj.phone = response.data.data[i].phone
						obj.createdTime = response.data.data[i].createdTime
						data[i] = obj
					}
					self.tableData = data
				}).catch(function(error) {
					console.log(error);
				})
			},
			//			select() { //查询
			//				let self = this
			//
			//				let requestData = {
			//					token: window.localStorage.getItem('token')
			//				}
			//
			//				if(self.advanceSearch) { //高级搜索
			//					requestData = Object.assign(requestData, self.shallowCopy(self.form))
			//				} else { //简单搜索
			//					requestData = Object.assig n(requestData, self.shallowCopy(self.easyForm))
			//				}
			//
			//				self.$http.post('/ui/list', self.qs.stringify(requestData)).then(function(response) {
			//					let data = response.data;
			//					console.log('list', response)
			//					if(data.code == 10000) {
			//						self.tableData = data.data
			//					}
			//				}).catch(function(error) {
			//					console.log(error);
			//				});
			//			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val);
			},
			updateSupplier(supplierId) { //修改供应商详情
				this.$router.push({
					path: '/supplier/updatesupplier',
					query: {
						supplierId: supplierId
					}
				});
			},
			deleteSupplier(row) {
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
			createSupplier() { //新增供应商
				this.$router.push('/supplier/createsupplier');
			},
			leadInSupplier() {
				this.$router.push('/supplier/leadin');
			},

			deleteGoods() { //删除商品
				this.$confirm('请确认是否批量删除？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '您已成功删除!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '您已取消删除'
					});
				});
			},
			setTags() { //设置标签
				this.dialogTableVisible = true;
			},
			cancelSelect() { //取消选中
				this.$refs.multipleTable.clearSelection();
			}

		}
	}
</script>