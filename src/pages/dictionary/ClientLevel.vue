<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">客户级别</h3>
      <el-button class="clientlevel-create" @click="CreateclientLevel = true">新增</el-button>
      <!--新增弹框-->
      <el-dialog title="新增客户级别" :visible.sync="CreateclientLevel">
        <el-form :model="createForm">
          <el-form-item label="客户级别" :label-width="formLabelWidth">
            <el-input v-model="createForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单折扣" :label-width="formLabelWidth">
            <el-input v-model="createForm.discount" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="CreateclientLevel = false">取 消</el-button>
          <el-button type="primary" @click="CreateclientLevel = false">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改客户级别" :visible.sync="updateClientLevel">
        <el-form :model="UpdateForm">
          <el-form-item label="客户级别" :label-width="formLabelWidth">
            <el-input v-model="UpdateForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单折扣" :label-width="formLabelWidth">
            <el-input v-model="UpdateForm.region" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateClientLevel = false">确 定</el-button>
          <el-button @click="updateClientLevel = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--客户级别表格-->
      <el-table :data="tableData" ref="multipleTable" border tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="level" label="客户级别">

        </el-table-column>

        <el-table-column prop="discount" label="订单折扣">

        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-dropdown trigger="click">
              <el-button type="text" icon="more"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="updateClientLevel = true">修改</el-dropdown-item>
                <el-dropdown-item>置顶</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

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
            level: '普通',
            discount: '100%'
          },{
            level: '普通',
            discount: '80%'
          }
        ],
        CreateclientLevel: false,//新增
        updateClientLevel: false,//修改
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
    methods: {}
  };
</script>
