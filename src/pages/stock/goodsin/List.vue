<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">商品入库</h3>
			<el-form ref="form" :model="form" inline>
				<el-form-item>
					<el-select placeholder="全部仓库" v-model="form.addressId" filterable>
						<el-option label="全部" :value="-1"></el-option>
						<el-option :label="t.name" :key="t.id" :value="t.name" v-for="t in totalStores"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select placeholder="全部入库类型" v-model="form.type">
						<el-option label="全部入库类型" :value="-1"></el-option>
						<el-option label="其他入库" :value="1"></el-option>
						<el-option label="采购入库" :value="2"></el-option>
						<el-option label="销售退货" :value="3"></el-option>
						<el-option label="盘盈" :value="5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-date-picker
      					type="daterange"
      					placeholder="选择日期范围"
      					v-model="form.dateRange">
    				</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button @click="select">查询</el-button>
					<el-button @click="jumpToAdd">新增</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData">
				<el-table-column prop="tradeNo" label="单号">

				</el-table-column>
				<el-table-column prop="createTime" label="入库日期" sortable>
					<template scope="scope">
						<span>{{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="selfAddress" label="所属仓库">

				</el-table-column>
				<el-table-column prop="type" label="类型">
					<template scope="scope">
						<span v-if="scope.row.type == 1">其他入库</span>
						<span v-if="scope.row.type == 2">采购入库</span>
						<span v-if="scope.row.type == 3">销售退货</span>
						<span v-if="scope.row.type == 5">盘盈</span>
					</template>
				</el-table-column>
				<el-table-column prop="createUserName" label="制单人">

				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button type="text" @click="seeDetail(scope.row.id)">查看明细</el-button>
					</template>
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

				],
				form:{
					type:-1,
					addressId:-1,
					status:1,//1代表入库
					dateRange:'',
					startDate:'',
					endDate:''
				},
				totalStores:[]
			}
		},
		created(){
			let self = this;
			self.select();
			self.getAddressList(function(data){
				self.totalStores = data;
			});
		},
		methods:{
			select(){//查询
				let self = this;
				let requestData = {token: window.localStorage.getItem('token')};
				if(self.form.dateRange instanceof Array){
					self.form.startDate = self.form.dateRange[0];
					self.form.endDate = self.form.dateRange[1];
				}
				requestData = Object.assign(requestData,self.shallowCopy(self.form));
				self.$http.post('/ui/recordList',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('入库list',response)
					if(data.code == 10000){
						self.tableData = data.data
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			seeDetail(id){
				this.$router.push({path:'/stock/goodsin/detail',query:{id:id}})
			},
			jumpToAdd(){//跳到增加入库页面
				this.$router.push('/stock/goodsin/add');
			}
		}
	}
</script>

<style>
</style>
