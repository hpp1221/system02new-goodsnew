<template>
	<div class="container">
		<div class="wrapper">
      <h3 class="page-title">商品库存</h3>
			<el-form ref="easyForm" :model="easyForm" inline v-if="!advanceSearch" class="request-form">
				<el-form-item>
					<el-select placeholder="全部仓库" v-model="easyForm.address" multiple>
						<el-option :label="t.address" :key="t.id" :value="t.address" v-for="t in totalStores"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="按商品名称/编码/规格/条形码/关键字搜索" icon="search" v-model="easyForm.keyword" class="long-input">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="select">查询</el-button>
				</el-form-item>
			</el-form>
			<el-form ref="form" :model="form" v-if="advanceSearch" class="request-form">
				<el-form-item label="关键词">
					<el-input placeholder="请输入商品名称/编码/按商品合并/关键字/条形码" v-model="form.keyword" class="long-input">

					</el-input>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-select v-model="form.series">
						<el-option label="分类1" value="1">

						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品品牌">
					<el-input placeholder="请选择商品品牌" v-model="form.brandName" class="form-input">

					</el-input>
				</el-form-item>
				<el-form-item label="所属仓库">
					<el-checkbox-group v-model="form.address">
					    <el-checkbox :label="t.address" v-for="t in totalStores" :key="t.address"></el-checkbox>
  					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="商品标签">
					<el-checkbox-group v-model="form.tags">
					    <el-checkbox :label="t.id" :key="t.id" v-for="t in totalSeries">{{t.name}}</el-checkbox>
  					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="库存状态">
					<el-checkbox-group v-model="form.storeStatus">
    					<el-checkbox label="全选"></el-checkbox>
					    <el-checkbox label="高于库存上限值"></el-checkbox>
					    <el-checkbox label="低于库存下限值"></el-checkbox>
					    <el-checkbox label="库存<=0商品"></el-checkbox>
  					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="商品状态">
					<el-radio class="radio" v-model="form.goodsStatus" label="0">全部</el-radio>
					<el-radio class="radio" v-model="form.goodsStatus" label="1">上架</el-radio>
  					<el-radio class="radio" v-model="form.goodsStatus" label="-1">下架</el-radio>
				</el-form-item>
				<el-form-item>
					<el-button @click="select">查询</el-button>
					<el-button type="text" @click="advanceSearch = false">取消高级搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData">
				<el-table-column prop="goodsName" label="商品名称" sortable>

				</el-table-column>
				<el-table-column prop="goodsSpec" label="规格">

				</el-table-column>
				<el-table-column prop="unit" label="单位">

				</el-table-column>
				<el-table-column prop="storeHouseAddress" label="所属仓库">

				</el-table-column>
				<el-table-column prop="upLimit" label="库存上限">

				</el-table-column>
				<el-table-column prop="downLimit" label="库存下限">

				</el-table-column>
				<el-table-column prop="preOrder" label="预购量" sortable>

				</el-table-column>
				<el-table-column prop="onTheWay" label="在途量">

				</el-table-column>
				<el-table-column prop="inStoreHouse" label="库存量" sortable>

				</el-table-column>
				<el-table-column label="操作">
					<el-button type="text">查看明细</el-button>
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
				advanceSearch:false,
				form:{
					brandName:'',//商品品牌
					address:[],//所属仓库
					tagId:'',//商品标签
					storeStatus:'',//库存状态
					goodsStatus:'',//商品状态
					keyword:'',//关键词
					series:'',//商品分类
				},
				easyForm:{//简单查询
					address:[],//所属仓库
					keyword:'',//关键词
				},
				totalStores:[],
				totalSeries:[
					{
						id:1,
						name:'日常用品'
					},
					{
						id:2,
						name:'儿童玩具'
					},
					{
						id:3,
						name:'妈妈用品'
					},
					{
						id:4,
						name:'儿童车床'
					},
					{
						id:5,
						name:'纸质用品'
					},
					{
						id:6,
						name:'其他用品'
					},
				]
			}
		},
		watch:{
			advanceSearch:function(){//点击高级搜索和取消时重新查询
				this.select()
			}
		},
		created(){
			let self = this;
			self.select();
			self.getAddressList(function(data){
				self.totalStores = data.data;
			});
		},
		methods:{
			select(){//查询
				let self = this

				let requestData = {token: window.localStorage.getItem('token')}

				if(self.advanceSearch){//高级搜索
					requestData = Object.assign(requestData,self.shallowCopy(self.form))
				}else{//简单搜索
					requestData = Object.assign(requestData,self.shallowCopy(self.easyForm))
				}

				self.$http.post('/ui/list',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
				    console.log('list',response)
					if(data.code == 10000){
						self.tableData = data.data
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
		}
	}
</script>

<style>
</style>
