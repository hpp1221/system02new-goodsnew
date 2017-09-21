<template>
	<el-pagination
		@size-change="handleSizeChange"
	    @current-change="handleCurrentChange"
	    :current-page="pageNum"
	    :page-sizes="pageSizes"
	    :page-size="pageSize"
	    layout="total, sizes, prev, pager, next, jumper"
	    :total="totalPage" style="margin-top:20px">
	</el-pagination>
</template>

<script>
	export default{
		data(){
			return {
				totalPage:10,//页码
				pageNum:1,//页码
		        pageSize:5,//页码
		        pageSizes:[5, 10, 15, 20],//页码选择
			}
		},
		created(){
			if(localStorage.getItem('pageSize')){
				this.pageSize = parseInt(localStorage.getItem('pageSize'))
			}
		},
		methods:{
			handleSizeChange(val) {
				this.pageSize = val;
				localStorage.setItem('pageSize',val)
		    },
		    handleCurrentChange(val) {
		        this.pageNum = val;
		    },
		}
	}
</script>

<style>
</style>