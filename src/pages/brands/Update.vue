<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="品牌Logo">
          <uploadoneimg
            v-if="form.id"
            :fileList="form.logo"
            @getFileList="getFileLogo">
          </uploadoneimg>
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input v-model="form.nameCn" style="width:25%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="品牌别名">
          <el-input v-model="form.nameOt" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="品牌官网">
          <el-input v-model="form.officialWebsite" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-model="form.remark" style="width:25%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sureUpdate">确认</el-button>
          <el-button @click="cancelUpdate">取消</el-button>
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
          brandId:'',
          logo:'',//品牌logo
          nameCn:'',//品牌名称
          nameOt:'',//品牌别名
          officialWebsite:'',//品牌官网
          remark:'',//备注,
          status:'',//品牌状态
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
        this.form.logo = file.url;
      },
      select(id) {//详情接口
        let self = this
        let requestData = {
          brandId: id
        }
        self.httpApi.brands.selectBrandById(requestData, function (data) {
          self.form = data.data;
        });
      },
      sureUpdate() {//修改确认
        let self = this
        self.httpApi.brands.updateBrandById(self.form, function (data) {
          self.$router.push('/brands/list')
        });
      },
      cancelUpdate() {//修改取消
        this.$router.push('/brands/list')
      },
    }
  }
</script>
