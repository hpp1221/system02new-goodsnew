<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="form" :model="form" label-width="100px">

        <el-form-item label="品牌Logo">
          <uploadoneimg
            :fileList="form.brandLogo"
            @getFileList="getFileLogo">
          </uploadoneimg>
        </el-form-item>
        <el-form-item label="品牌名称">
        <el-input v-model="form.brandName" style="width:25%"></el-input>
      </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-model="form.remark" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="BrandAddCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    data() {
      return {
        form: {
          brandLogo:'',
          brandName:'',
          remark:''
        },
      }
    },
    components: {
      ElInput,
      ElButton,
      'uploadoneimg': require('../../components/uploadoneimg'),
    },
    methods: {
      getFileLogo(file){//品牌logo
        this.form.brandLogo = file.url;
      },
      onSubmit() {//新增接口
        let self = this
        self.httpApi.brand.addBrand(self.form, function (data) {
          self.$router.push('/brand/list')
        });
      },
      BrandAddCancel(){
        this.$router.push('/brand/list')
      }
    }
  }
</script>
