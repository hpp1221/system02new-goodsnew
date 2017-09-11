<template>
	<div class="container">
		<div class="wrapper">
			<h3 class="page-title">调拨详情</h3>
			<div class="goodsinout-detail-top">
				<div class="left">
					<p>调拨单号: <span>{{detailData.tradeNo}}</span> <span>(在途)</span></p>
				</div>
				<div class="right">
					<el-button type="text">入库</el-button>
					<el-button type="text">打印</el-button>
					<el-button type="text">导出</el-button>
					<el-button type="text">作废</el-button>
				</div>
			</div>
			<div class="goodsinout-detail-top">
				<div class="left">
					<p>调出仓: <span>{{detailData.outPutAddress}}</span></p>
					<p>调出时间: <span>测试</span></p>
					<p>调入仓: <span>{{detailData.inPutAddress}}</span></p>
					<p>调入时间: <span>测试</span></p>
				</div>
			</div>
			<el-table :data="detailData.goods" show-summary>
				<el-table-column label="商品编码" prop="number">
					
				</el-table-column>
				<el-table-column label="商品名称" prop="name">
					
				</el-table-column>
				<el-table-column label="规格" prop="sku">
					
				</el-table-column>
				<el-table-column label="单位" prop="unit">
					
				</el-table-column>
				<el-table-column label="调拨数量" prop="num">
					
				</el-table-column>
			</el-table>
			<div class="goodsinout-detail-bottom">
				<p>备注说明: <span>{{detailData.remark}}</span></p>
				<p>经办人: <span>{{detailData.tradeNoHandler}}</span></p>
				<p>制单人: <span>{{detailData.createUserName}}</span></p>
				<p>操作日志
					<el-switch
  						v-model="operationLogVisible"
  						on-text=""
						off-text="">
					</el-switch>
				</p>
			</div>
			<el-table v-if="operationLogVisible">
				<el-table-column label="操作人">
					
				</el-table-column>
				<el-table-column label="时间">
					
				</el-table-column>
				<el-table-column label="操作类别">
					
				</el-table-column>
				<el-table-column label="操作日志">
					
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
				detailData:{},
				operationLogVisible:false
			}
		},
		created(){
			this.$route.query.id ?　this.select(this.$route.query.id) : this.$router.push('/error')
		},
		methods:{
			select(id){
				let self = this
				let requestData = {
					token: window.localStorage.getItem('token'),
					id:id	
				}
				self.$http.post('/ui/getAllocationRecordDetail',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('调拨详情',response)
					if(data.code == 10000){
						self.detailData = data.data
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			save(){//保存
				
			},
			cancel(){//取消
				this.$router.push('/goodsin')
			}
		}
	}
</script>
