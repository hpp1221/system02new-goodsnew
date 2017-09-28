<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">订单详情</h3>
			<div class="goodsinout-detail-top">
				<div class="left">
					<p>已作废</p>
					<p>订单号: <span>{{detailData.tradeNo}}</span></p>
					<p>业务员: <span>{{detailData.tradeNo}}</span></p>
					<p>制单人: <span>{{detailData.createUserName}}</span></p>
				</div>
				<div class="right">
					<el-button type="text">打印</el-button>
				</div>
			</div>
			<el-table :data="detailData.list">
				<el-table-column label="主图" prop="goodsNo">

				</el-table-column>
				<el-table-column label="商品编码" prop="goodsName">

				</el-table-column>
				<el-table-column label="商品名称" prop="goodsSpec">

				</el-table-column>
				<el-table-column label="规格" prop="goodsUnit">

				</el-table-column>
				<el-table-column label="数量" prop="num">

				</el-table-column>
				<el-table-column label="单位" prop="num">

				</el-table-column>
				<el-table-column label="商品参数" prop="num">

				</el-table-column>
				<el-table-column label="单价" prop="num">

				</el-table-column>
				<el-table-column label="金额小计" prop="num">

				</el-table-column>
				<el-table-column label="备注" prop="num">

				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				detailData:{

				}
			}
		},
		created(){
			this.$route.query.id ?　this.select(this.$route.query.id) : this.$router.push('/error')
		},
		methods:{
			select(id){
				let self = this;
				let requestData = {
					token: window.localStorage.getItem('token'),
					id:id
				};
				self.$http.post('/ui/order/detail',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('出库详情',response)
					if(data.code == 10000){
						self.detailData = data.data
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
