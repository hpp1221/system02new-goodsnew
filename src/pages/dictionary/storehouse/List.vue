<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">仓库列表</h3>
      <el-form ref="form" :model="form" inline>
        <el-form-item>
          <el-button @click="createStore">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :tableData="tableData">
        <el-table-column label="仓库名称" prop="name">

        </el-table-column>
        <el-table-column label="仓库编码">

        </el-table-column>
        <el-table-column label="仓库地址">

        </el-table-column>
        <el-table-column label="仓库地址">
          <template scope="scope">
            <el-dropdown trigger="click">
              <el-button type="text" icon="more"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row.id)">修改</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增仓库" v-model="addStoreVisible" size="tiny">
        <el-form :model="addForm" label-width="70px">
          <el-form-item label="仓库名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="仓库编码">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="仓库地址">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="sureAddStore" type="primary">确定</el-button>
          <el-button @click="addStoreVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        form: {},
        tableData: [],
        addStoreVisible: false,//添加仓库模态框是否显示
        addForm: {//添加仓库模态框表单

        }
      }
    },

    created(){
      let self = this;
      self.getAddressList(function (data) {
        self.tableData = data;
        console.log(self.tableData)
      });//获取品牌列表

    },
    methods: {
      select(){
        let self = this;
        let requestData = {token: window.localStorage.getItem('token')};

        self.$http.post('/ui/skuList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('skuList', response)
          if (data.code == 10000) {
            self.tableData = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      updated(){

      },
      createStore(){
        this.addStoreVisible = true;
      },
      sureAddStore(){

      }
    }
  }
</script>

<style>
</style>
