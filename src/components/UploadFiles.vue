<template>
  <el-upload
    class="upload-demo"
    action="http://upload.qiniu.com/"
    :data="key"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :file-list="fileList"
    :on-preview="downloadFile"
    :disabled="disabled"
    style="width: 500px;">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">附件最大20M，仅支持PDF、word、txt、excel、jpg、png、bmp、gif、rar、zip格式</div>
  </el-upload>
</template>

<script>
  export default{
    data(){
      return {
        key: {
          token: '',
          file: ''
        },
      }
    },
    props: {
      fileList: {
        type: Array
      },
      token: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    created(){
      this.key.token = this.token;
    },
    methods: {
      beforeUpload(file){
        if (!this.key.token) return false;
      },
      handleSuccess(response, file, fileList){
        let suffix = '';
        if (file.name.indexOf('.') > -1) {
          suffix = file.name.substring(file.name.indexOf('.'));
        }
        this.$emit('getFileList', {
          name: file.name + suffix,
          url: this.imgDomain + response.key
        });
      },
      downloadFile(file){
        location.href = file.url;
      },
      handleRemove(file, fileList){
        this.$emit('removeFile', {
          name: file.name,
          url: file.url
        });
      }
    }
  }
</script>

<style>
</style>
