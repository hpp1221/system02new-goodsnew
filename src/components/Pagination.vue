<template>
	<el-pagination
		@getPageSize="getPageSize" 
		@getPageNum="getPageNum"
	    :total="total" style="margin-top:20px">
	</el-pagination>
</template>

<script>
	export default{
		data(){
			return {
				pageNo:1,//页码
		        pageSize:5,//一页的数量
		        pageSizes:[5, 10, 15, 20],//页码选择
			}
		},
		created(){
			if(localStorage.getItem('pageSize')){
				this.pageSize = parseInt(localStorage.getItem('pageSize'))
			}
		},
		props:{
			totalPage:{
				type:Number,
				default:10
			}
		},
		watch:{
			pageNum:function(newVal,oldVal){
				
			},
			pageSize:function(newVal,oldVal){
				
			}
		},
		methods:{
			handleSizeChange(val) {
				this.pageSize = val;
				this.$emit('getPageSize',val);
				localStorage.setItem('pageSize',val)
		    },
		    handleCurrentChange(val) {
		        this.pageNum = val;
		        this.$emit('getPageNum',val);
		    },
		}
	}
</script>

<style>
</style>