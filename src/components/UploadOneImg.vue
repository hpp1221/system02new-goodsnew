<template>
	<el-upload
  		class="avatar-uploader"
	  	action="http://upload.qiniu.com/"
	  	:data="key"
	  	:show-file-list="false"
	  	:on-success="handleSuccess"
	  	:before-upload="beforeUpload"
	  	style="margin: 10px;width: 120px;height: 120px;">
	  	<img v-if="fileList" :src="fileList" class="avatar">
	  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
</template>

<script>
	export default{
		data(){
			return {
				key:{
					token:'',
					file:''
				},
			}
		},
		props:{
			fileList:{
				type:String
			},
			token:{
				type:String
			}
		},
		created(){
			this.key.token = this.token;
		},
		methods:{
			beforeUpload(file){
				let checkFormat = this.checkImg(file);
				if(!checkFormat) return false;
				if(!this.key.token) return false;
			},
			handleSuccess(response, file, fileList){
				this.$emit('getFileList',{
					name:file.name,
					url:this.imgDomain + response.key
				});
			},
			handleRemove(file, fileList){
				
			}
		}
	}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>