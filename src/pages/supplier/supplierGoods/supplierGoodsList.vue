<template>
	<div class="container">
		<div class="wrapper">
			<h4 class="client-management-title">供应商管理</h4>
			<h5 class="client-management-clientlist">供应商商品列表</h5>
			<el-form ref="form" :model="form" inline class="request-form">
				<el-form-item label="快速查询">
					<el-input placeholder="请输入供应商名称/联系电话/手机/编码" class="fast-query" icon="search" v-model="input2" :on-icon-click="select">
					</el-input>
				</el-form-item>
				<el-form-item style="float: right;">
					<el-button @click="leadInSupplier">导入</el-button>
					<el-button @click="outputSupplier">导出</el-button>
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
	export default {
		data() {
			return {
				input: '',
				value: '',
				input2: '',
				currentPage4: 4,
				tableData: [{
					clientName: 'LISON',
					clientCode: '10001',
					clientTel: '0571-55698215',
					clientAddress: '兴耀科技园',
					clientMobile: '18824661634',
					clientClass: 'VIP1',
					createTime: '2017-09-02 08:00:00',
				}],
			}
		},
		methods: {
			handleIconClick(ev) {
				console.log(ev);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			inputClient() { //客户导入模块
				this.$router.push('/personal/client/inputclient');
			},
			updateClient() { //修改客户详情
				this.$router.push('/personal/client/updateclient');
			},
			createClient() { //新增客户
				this.$router.push('/personal/client/createclient');
			},
			outputClient() { //导出客户
				this.$router.push('/personal/client/outputclient')
			}
		}
	}
</script>