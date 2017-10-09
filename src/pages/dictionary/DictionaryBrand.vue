<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">商品品牌</h3>
      <div class="dictionaryclassify-create">
        <el-button class="dictionarycreate" @click="dictionaryClassifyCreate = true">新增</el-button>
      </div>
      <!--修改弹框-->
      <el-dialog title="修改商品品牌" :visible.sync="updateDictionaryBrand">
        <el-form :model="form">
          <el-form-item label="品牌名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateDictionaryBrand = false">确 定</el-button>
          <el-button @click="updateDictionaryBrand = false">取 消</el-button>
        </div>
      </el-dialog>
      <div class="dictionaryclassify-main">
        <ul class="dictionarybrand-content">
          <li><i class="iconfont icon-erp-R"></i> 帮宝适</li>
          <li><i class="iconfont icon-erp-R"></i> 花王</li>
        </ul>
        <div class="dictionaryclassify-operation">
          <el-button class="el-icon-edit icon-updatechilddependent" @click="updateDictionaryClassify = true">修改</el-button>
          <el-button class="iconfont icon-erp-zhiding-" @click="createChildDependent = true">置顶</el-button>
          <el-button class="el-icon-delete icon-deletechilddependent" @click="createChildDependent = true">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        updateDictionaryBrand: false,//修改
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
