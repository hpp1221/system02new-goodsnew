<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">库存调拨</h3>
      <el-form ref="form" :model="form" inline>
        <el-form-item label="调入仓">
          <el-select v-model="form.inPutAddress">

          </el-select>
        </el-form-item>
        <el-form-item label="调出仓">
          <el-select v-model="form.outPutAddress">

          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
          <el-button @click="add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData">
        <el-table-column prop="tradeNo" label="调拨单号">

        </el-table-column>
        <el-table-column prop="outPutAddress" label="调出仓库">

        </el-table-column>
        <el-table-column prop="inPutAddress" label="调入仓库">

        </el-table-column>
        <el-table-column prop="" label="调出时间">

        </el-table-column>
        <el-table-column prop="" label="调入时间">

        </el-table-column>
        <el-table-column prop="createUserName" label="制单人">

        </el-table-column>
        <el-table-column prop="" label="状态">

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
        tableData: [],
        form: {}
      }
    },
    created(){
      this.select()
    },
    methods: {
      select(){//查询
        let self = this

        let requestData = {token: window.localStorage.getItem('token')}

        if (self.advanceSearch) {//高级搜索
          requestData = Object.assign(requestData, self.shallowCopy(self.form))
        } else {//简单搜索
          requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        }

        self.$http.post('/ui/allocationRecordList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('allocationRecordList', response)
          if (data.code == 10000) {
            self.tableData = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      add(){
        this.$router.push('/stock/stockallocation/add')
      },
      seeDetail(id){
        this.$router.push({path: '/stock/stockallocation/detail', query: {id: id}})
      }
    }
  }
</script>

<style>
</style>
