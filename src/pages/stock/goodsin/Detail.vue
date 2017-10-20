<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">入库详情</h3>
      <div class="goodsinout-detail-top">
        <div class="left">
          <p>所属仓库: <span>{{detailData.selfAddress}}</span></p>
          <p>单号: <span>{{detailData.tradeNo}}</span></p>
          <p>入库日期: <span>{{moment(detailData.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span></p>
          <p>制单人: <span>{{detailData.createUserName}}</span></p>
        </div>
      </div>
      <el-table :data="detailData.list">
        <el-table-column label="编码" prop="goodsNo">

        </el-table-column>
        <el-table-column label="商品" prop="goodsName">

        </el-table-column>
        <el-table-column label="规格" prop="goodsSpec">

        </el-table-column>
        <el-table-column label="单位" prop="goodsUnit">

        </el-table-column>
        <el-table-column label="出库数量" prop="num">

        </el-table-column>
      </el-table>
      <div class="goodsinout-detail-bottom">
        <p>备注: <span>{{detailData.remark}}</span></p>
        <p>经办人: <span>{{detailData.tradeNoHandler}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        detailData: {}
      }
    },

    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },

    methods: {
      select(id){//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          id: id
        };
        self.httpApi.stock.getRecord(requestData, function (data) {
          self.detailData = data.data;
        });
      },
    }
  }
</script>
