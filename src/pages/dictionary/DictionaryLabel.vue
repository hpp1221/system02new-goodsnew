<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">商品标签管理</h3>
      <p class="dictionarylabel-introduce">管理您的商品标签，最多支持5个标签。</p>
      <el-form ref="form" :model="form" label-width="80px" class="label-content">
        <el-form-item>
          <el-input v-model="form.name" placeholder="新品上架" class="label"></el-input>
          <el-input v-model="form.name" placeholder="热卖推荐" class="label"></el-input>
          <el-input v-model="form.name" placeholder="清仓优惠" class="label"></el-input>
          <el-input v-model="form.name" placeholder="添加新标签" class="label"></el-input>
          <el-input v-model="form.name" placeholder="添加新标签" class="label"></el-input>
        </el-form-item>
        <el-form-item class="label-operation">
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },
    methods: {}
  };
</script>
