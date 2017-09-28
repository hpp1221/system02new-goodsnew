<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">商品品牌</h3>
      <div class="dictionaryclassify-create">
        <el-button class="create" @click="dictionaryClassifyCreate = true">新增</el-button>
      </div>
      <!--新增弹框-->
      <el-dialog title="新增计量单位" :visible.sync="dictionaryClassifyCreate">
        <el-form :model="form">
          <el-form-item label="单位名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dictionaryClassifyCreate = false">确 定</el-button>
          <el-button @click="dictionaryClassifyCreate = false">取 消</el-button>
        </div>
      </el-dialog>
      <div class="dictionaryclassify-main">
        <ul class="dictionarybrand-content">
          <li><i class="el-icon-star-on"></i> 包</li>
          <li><i class="el-icon-star-on"></i> 个</li>
        </ul>
        <ul class="dictionaryclassify-operation">
          <li>
            <i class="el-icon-delete">删除</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dictionaryClassifyCreate: false,//新增
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods: {}
  };
</script>
