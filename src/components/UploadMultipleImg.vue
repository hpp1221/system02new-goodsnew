<template>
  <el-upload
    action="http://upload.qiniu.com/"
    list-type="picture-card"
    :data="key"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    v-if="key.token"
    :disabled="disabled">
    <i class="el-icon-plus" v-if="!disabled"></i>
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
        imageNum:0
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
      self.httpApi.aliyun.imgSignature(requestData, function (data) {
        self.key.token = data.data;
      });
    },
    methods: {
      beforeUpload(file){
        let checkFormat = this.checkImg(file);
        if (!checkFormat) return false;
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
      handleRemove(file, fileList){
        if(this.imageNum>3){
          this.imageNum--;
          return
        }
        //this.cutimgurlMulti(this.imageUrlduo);
        this.imageNum--;
        console.log('delete---file',file);
        console.log('delete---fileList',fileList);
        this.$emit('removeFile', {
          name: file.name,
          url: file.url
        });
      }
    }
  }
</script>
