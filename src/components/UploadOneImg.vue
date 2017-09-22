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
			}
		},
		created(){
			this.getImgAccess();
		},
		methods:{
			beforeUpload(file){
				let checkFormat = this.checkImg(file);
				if(!checkFormat) return false;
				if(!this.key.token) return false;
			},
//			uploadImg(file){
//				let imgAccess = this.getImgAccess(file);
//			},
			getImgAccess(){
				let self = this;
				let requestData = {
					token: window.localStorage.getItem('token'),
					bucketName: 'sass'
				};
				self.$http.post('/ui/imgSignature',self.qs.stringify(requestData)).then(function (response) {
				    let data = response.data;
					if(data.code == 10000){
						self.key.token = data.data;
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			handleSuccess(response, file, fileList){
				this.$emit('getFileList',this.imgDomain + response.key);
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