<template>
  <el-upload
    action="http://upload.qiniu.com/"
    :data="key"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :file-list="fileList"
    :on-preview="downloadFile"
    :disabled="disabled"
    v-if="key.token"
    style="width: 500px;">
    <el-button size="small" type="primary" v-if="!disabled">点击上传</el-button>
    <div slot="tip" class="el-upload__tip" v-if="!disabled">附件最大20M，仅支持PDF、word、txt、excel、jpg、png、bmp、gif、rar、zip格式</div>
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
      disabled: {
        type: Boolean,
        default: false
      }
    },
    created(){
      let self = this;
      let requestData = {
        token: window.localStorage.getItem('token'),
        bucketName: 'management'
      };
      self.httpApi.qiniuyun.imgSignature(requestData, function (data) {
        self.key.token = data.data;
      });
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
          name: file.name,
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
