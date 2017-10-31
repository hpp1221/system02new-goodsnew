<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">门店</h3>
      <el-button @click="createStoreHouse">新增</el-button>
      <el-button @click="storeIntenance">所属仓库维护</el-button>
      <!--新增弹框-->
      <el-dialog title="新增门店" :visible.sync="createStore" width="400px">
        <el-form :model="createForm" class="request-form">
          <el-form-item label="门店名称" :label-width="formLabelWidth">
            <el-input v-model="createForm.name" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="门店编码" :label-width="formLabelWidth">
            <el-input v-model="createForm.number" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" :label-width="formLabelWidth">
            <el-input v-model="createForm.address" class="form-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="createStoreHouseSure">确 定</el-button>
          <el-button @click="createStore = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改门店" :visible.sync="updateStore" width="400px">
        <el-form :model="updateForm">
          <el-form-item label="门店名称" :label-width="formLabelWidth">
            <el-input v-model="updateForm.name" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="门店编码" :label-width="formLabelWidth">
            <el-input v-model="updateForm.number" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" :label-width="formLabelWidth">
            <el-input v-model="updateForm.address" class="form-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="updateStoreHouseSure">确 定</el-button>
          <el-button @click="updateStoreCancel">取 消</el-button>
        </div>
      </el-dialog>
      <!--门店表格-->
      <el-table :data="tableData" ref="multipleTable" style="width: 100%">
        <el-table-column prop="name" label="门店名称">
        </el-table-column>
        <el-table-column prop="number" label="门店编码">
        </el-table-column>
        <el-table-column prop="address" label="门店地址">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="updateStoreHouse(scope.$index, scope.row)" class="el-icon-edit updatecategories">修改
            </el-button>
            <!--<el-button-->
            <!--size="small"-->
            <!--@click="handleDelete(scope.$index, scope.row)" class="el-icon-delete updatecategories">删除-->
            <!--</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage">
      </pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        createStore: false,//新增
        updateStore: false,//修改
        createForm: {//新增
          name: '',
          number: '',
          address: ''
        },
        updateForm: {//修改
          name: '',
          number: '',
          address: ''
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        formLabelWidth: '80px'
      };
    },
    components: {
      'pagination': require('../../../components/pagination')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.getStoreHouseList(page.size, page.num);
      },
      getStoreHouseList(size, num) {//门店列表
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num,
          type: 2
        };
        self.httpApi.stock.addressListLimit(requestData, function (data) {
          self.tableData = data.data.list
          self.totalPage = data.data.total
        });
      },
      createStoreHouse() {//新增弹框
        this.createStore = true
        this.createForm = {data: {name: '', number: '', address: ''}};
      },
      storeIntenance() {
        this.$router.push('/')
      },
      createStoreHouseSure() {//新增确定
        let self = this
        let requestData = {
          type: 2,
          name: self.createForm.name,
          number: self.createForm.number,
          address: self.createForm.address,
          token: window.localStorage.getItem('token')
        };
        self.httpApi.stock.createStoreHouse(requestData,function (data) {
          self.createStore = false
          self.$message.success('添加成功')
          self.getStoreHouseList(self.pageSize, self.pageNum)
        });
      },
      updateStoreHouse(index, row) {
        this.updateStore = true
        this.updateForm = row
      },
      updateStoreHouseSure() {
        let self = this
        let requestData = {
          id: self.updateForm.id,
          name: self.updateForm.name,
          number: self.updateForm.number,
          address: self.updateForm.address,
          token: window.localStorage.getItem('token')
        };
        self.httpApi.stock.editStoreHouse(requestData,function (data) {
          self.updateStore = false
          self.$message.success('修改成功')
        });
      },
      updateStoreCancel() {//修改取消
        let self = this
        self.updateStore = false
        self.$message.info('已取消修改')
        self.getStoreHouseList(self.pageSize, self.pageNum)
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  };
</script>
