<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="品牌Logo">
          <uploadoneimg
            v-if="form.brandId"
            :fileList="form.brandLogo"
            @getFileList="getFileLogo"
          :disabled="true">
          </uploadoneimg>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input v-model="form.brandName" style="width:25%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-model="form.remark" style="width:25%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelUpdate">返回</el-button>
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
          brandId:'',
          brandLogo:'',
          brandName:'',
          remark:''
        },
      }
    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    components: {
      ElInput,
      ElButton,
      'uploadoneimg': require('../../components/uploadoneimg'),
    },
    methods: {
      getFileLogo(file) {//品牌商logo
        this.form.brandLogo = file.url;
      },
      select(id) {//详情接口
        let self = this
        let requestData = {
          brandId: id
        }
        self.httpApi.brand.selectBrandById(requestData, function (data) {

          self.form = data.data;
        });
      },
      cancelUpdate() {//修改取消
        this.$router.push('/brand/list')
      },
    }
  }
</script>
