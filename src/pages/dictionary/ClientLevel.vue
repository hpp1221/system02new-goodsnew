<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">客户级别</h3>
      <el-button @click="CreateclientLevel = true" style="float: right">新增</el-button>
      <!--新增弹框-->
      <el-dialog title="新增客户级别" :visible.sync="CreateclientLevel">
        <el-form :model="createForm">
          <el-form-item label="客户级别" :label-width="formLabelWidth">
            <el-input v-model="createForm.levelName"></el-input>
          </el-form-item>
          <el-form-item label="订单折扣" :label-width="formLabelWidth">
            <el-input v-model="createForm.discount"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="CreateClientLevelSure">确 定</el-button>
          <el-button @click="CreateclientLevel = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改客户级别" :visible.sync="updateClientLevelModel">
        <el-form :model="updateForm">
          <el-form-item label="客户级别" :label-width="formLabelWidth">
            <el-input v-model="updateForm.levelName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单折扣" :label-width="formLabelWidth">
            <el-input v-model="updateForm.discount" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateClientLevelSure">确 定</el-button>
          <el-button @click="cancelUpdateStore">取 消</el-button>
        </div>
      </el-dialog>
      <!--客户级别表格-->
      <el-table :data="tableData" ref="multipleTable" style="width: 100%">
        <el-table-column prop="levelName" label="客户级别">

        </el-table-column>

        <el-table-column prop="discount" label="订单折扣">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" class="el-icon-edit updatecategories"
                       @click="updateClientLevel(scope.$index,scope.row)">修改
            </el-button>
            <el-button size="small" class="iconfont icon-erp-zhiding- updatecategories" style="font-size: 12px"
                       @click="getTopClientLevel(scope.row)">置顶
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right"></pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        CreateclientLevel: false,//新增
        updateClientLevelModel: false,//修改
        createForm: {//新增
          levelName: '',
          discount: '',
        },
        updateForm: {//修改
          levelName: '',
          discount: '',
          levelId: ''
        },
        formLabelWidth: '80px',
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
      };
    },
    components: {
      'pagination': require('../../components/pagination')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.getClientLevel(page.size, page.num);
      },
      getClientLevel(size, num) {//客户级别列表
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNum: num
        };
        self.httpApi.level.getCustomerLevelList(requestData, function (data) {
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        })
      },
      CreateClientLevel() {//新增弹框
        this.CreateclientLevel = true;
        this.createForm = {data: {levelName: '', discount: ''}};
      },
      CreateClientLevelSure() {//新增确定
        let self = this
        let requestData = {
          discount: self.createForm.discount,
          levelName: self.createForm.levelName,
          token: window.localStorage.getItem('token')
        };
        self.httpApi.level.insertCustomerLevel(requestData, function (data) {
          console.log('levelcreate', data)
          self.CreateclientLevel = false
          self.$message.success('添加成功')
          self.getClientLevel(self.pageSize, self.pageNum)
        });
      },
      updateClientLevel(index, row) {//修改
        this.updateClientLevelModel = true
        this.updateForm = row
      },
      updateClientLevelSure() {//修改确定
        let self = this
        let requestData = {
          discount: self.updateForm.discount,
          levelName: self.updateForm.levelName,
          levelId: self.updateForm.levelId,
          token: window.localStorage.getItem('token')
        };
        self.httpApi.level.updateCustomerLevelById(requestData, function (data) {
          self.updateClientLevelModel = false;
          self.$message.success('修改成功');
        });
      },
      cancelUpdateStore() {//取消修改
        let self = this
        self.updateClientLevelModel = false
        self.$message.success('已取消修改')
        self.getClientLevel(self.pageSize, self.pageNum)
      },
      getTopClientLevel(row) {//置顶
        let self = this
        let requestData = {
          customerLevel:row.levelId,
          token: window.localStorage.getItem('token')
        };
        self.$confirm('请确认是否置顶？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.level.setTopCustomerLevel(requestData, function (data) {
            console.log('leveltop',data)
            self.$message({
              type: 'success',
              message: '已成功置顶!'
            });
            self.getClientLevel(self.pageSize, self.pageNum)
          });
        })
      }
    },
  };
</script>
