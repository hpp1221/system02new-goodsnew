<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">仓库</h3>
      <el-button class="dictionarycreate" @click="createStore= true">新增</el-button>
      <!--新增弹框-->
      <el-dialog title="新增仓库" :visible.sync="createStore">
        <el-form :model="createForm">
          <el-form-item label="仓库名称" :label-width="formLabelWidth">
            <el-input v-model="createForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="仓库编码" :label-width="formLabelWidth">
            <el-input v-model="createForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="仓库地址" :label-width="formLabelWidth">
            <el-input v-model="createForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createStore = false">确 定</el-button>
          <el-button @click="createStore = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改仓库" :visible.sync="updateStore">
        <el-form :model="UpdateForm">
          <el-form-item label="仓库名称" :label-width="formLabelWidth">
            <el-input v-model="UpdateForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="仓库编码" :label-width="formLabelWidth">
            <el-input v-model="UpdateForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="仓库地址" :label-width="formLabelWidth">
            <el-input v-model="UpdateForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateStore = false">确 定</el-button>
          <el-button @click="updateStore = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--仓库表格-->
      <el-table :data="tableData" ref="multipleTable" border tooltip-effect="dark" style="width: 100%" class="categories">
        <el-table-column prop="storeName" label="仓库名称">
        </el-table-column>
        <el-table-column prop="storeCode" label="仓库编码">
        </el-table-column>
        <el-table-column prop="storeAddress" label="仓库地址">
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-button
              size="small"
              @click="updateStore = true " class="el-icon-edit updatecategories">修改</el-button>
            <el-button
              size="small"
              @click="handleDelete(scope.$index, scope.row)" class="el-icon-delete updatecategories">删除</el-button>
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
            storeName: '仓库1',
            storeCode:'1002',
            storeAddress:'兴耀科技园'
          }
        ],
        createStore: false,//新增
        updateStore: false,//修改
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
