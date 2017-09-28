<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">商品品牌</h3>
      <div class="dictionaryclassify-create">
        <el-button class="create" @click="dictionaryClassifyCreate = true">新增</el-button>
      </div>
      <!--修改弹框-->
      <el-dialog title="修改商品品牌" :visible.sync="updateDictionaryClassify">
        <el-form :model="form">
          <el-form-item label="品牌名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateDictionaryClassify = false">确 定</el-button>
          <el-button @click="updateDictionaryClassify = false">取 消</el-button>
        </div>
      </el-dialog>
      <div class="dictionaryclassify-main">
        <ul class="dictionarybrand-content">
          <li><i class="el-icon-star-on"></i> 帮宝适</li>
          <li><i class="el-icon-star-on"></i> 花王</li>
        </ul>
        <ul class="dictionaryclassify-operation">
          <li>
            <i class="el-icon-edit" @click="updateDictionaryClassify = true">修改</i>
          </li>
          <li>
            <i class="el-icon-arrow-up">置顶</i>
          </li>
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
        updateDictionaryClassify: false,//修改
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
