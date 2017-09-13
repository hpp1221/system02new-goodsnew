<template>
	<div class="container">
		<div class="wrapper">
			<h4 class="client-management-title">客户管理</h4>
			<h5 class="client-management-clientlist">客户列表</h5>
			<div class="client-management-class">
				<el-form ref="easyForm" :model="easyForm" inline v-if="!advanceSearch" class="request-form">
					<el-form-item>
						<span class="client-list-allclass">全部级别</span>
						<el-select v-model="value" placeholder="全部级别">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-input placeholder="请输入客户名称/联系电话/手机/编码" icon="search" v-model="input2" :on-icon-click="handleIconClick" class="client-input">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="inputClient">导入</el-button>
					</el-form-item>
					<el-form-item>
						<el-button @click="outputClient">导出</el-button>
					</el-form-item>
					<el-form-item>
						<el-button @click="createClient">新增</el-button>
					</el-form-item>

				</el-form>
			</div>
			<el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable" class="clientmanagement-input">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="clientName" label="客户名称" class="hpp">

				</el-table-column>
				<el-table-column prop="clientCode" label="客户编码">

				</el-table-column>
				<el-table-column prop="clientTel" label="联系电话">

				</el-table-column>
				<el-table-column prop="clientAddress" label="地址">

				</el-table-column>
				<el-table-column prop="clientMobile" label="手机">

				</el-table-column>
				<el-table-column prop="clientClass" label="客户级别">

				</el-table-column>
				<el-table-column prop="createTime" label="创建时间">

				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-dropdown trigger="click">
							<el-button type="text" icon="more"></el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click="updateClient">修改</el-dropdown-item>
								<el-dropdown-item>删除</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>

					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					value: '选项1',
					label: '全部级别'
				}, {
					value: '选项2',
					label: 'VIP1'
				}, {
					value: '选项3',
					label: 'VIP2'
				}, {
					value: '选项4',
					label: 'VIP3'
				}],
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
			inputClient(){//客户导入模块
				this.$router.push('/personal/client/inputclient');
			},
			updateClient(){//修改客户详情
				this.$router.push('/personal/client/updateclient');
			},
			createClient(){//新增客户
				this.$router.push('/personal/client/createclient');
			},
			outputClient(){//导出客户
				this.$router.push('/personal/client/outputclient')
			}
		}
	}
</script>
