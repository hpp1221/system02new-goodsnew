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
        pageNum: 1,//页码
        pageSize: 5,//一页的数量
        pageSizes: [5, 10, 15, 20],//页码选择
      }
    },
    created(){
      if (localStorage.getItem('pageSize')) {
        this.pageSize = parseInt(localStorage.getItem('pageSize'))
      }
      this.changed();
    },
    props: {
      totalPage: {
        type: Number,
        default: 10
      }
    },
    watch: {
      pageNum: function () {
        this.changed();
      },
      pageSize: function () {
        this.changed();
      },
    },
    methods: {
      changed(){
        this.$emit('setChanged', {size: this.pageSize, num: this.pageNum});
      },
      handleSizeChange(val) {
        this.pageSize = val;
        localStorage.setItem('pageSize', val)
      },
      handleCurrentChange(val) {
        this.pageNum = val;
      },
    }
  }
</script>

<style>
</style>
