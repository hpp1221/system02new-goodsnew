<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">通知分类</h3>
      <el-button @click="CreateCategories = true">新增</el-button>
      <!--新增弹框-->
      <el-dialog title="新增通知类型" :visible.sync="CreateCategories">
        <el-form :model="createForm">
          <el-form-item label="通知类型" :label-width="formLabelWidth">
            <el-input v-model="createForm.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="CreateCategories = false">确 定</el-button>
          <el-button @click="CreateCategories = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改通知类型" :visible.sync="UpdateCategories">
        <el-form :model="UpdateForm">
          <el-form-item label="通知类型" :label-width="formLabelWidth">
            <el-input v-model="UpdateForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="UpdateCategories = false">确 定</el-button>
          <el-button @click="UpdateCategories = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--通知分类表格-->
      <el-table :data="tableData" ref="multipleTable" style="width: 100%">
        <el-table-column prop="level" label="通知类型">
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-button
              size="small"
              @click="UpdateCategories = true " class="el-icon-edit icon-updatechilddependent">修改</el-button>
            <el-button
              size="small"
              @click="handleTop(scope.$index, scope.row)" class="iconfont icon-erp-zhiding-">置顶</el-button>
            <el-button
              size="small"
              @click="handleDelete(scope.$index, scope.row)" class="el-icon-delete icon-deletechilddependent">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            level: '公司发文'
          }
        ],
        CreateCategories: false,//新增
        UpdateCategories: false,//修改
        createForm: {//新增
          name: '',
          region: ''
        },
        UpdateForm: {//修改
          name: '',
          region: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleTop(index, row) {
        console.log(index, row);
      },
    }
  };
</script>
