<template>
	<el-upload
		class="upload-demo"
		action="http://upload.qiniu.com/"
		:data="key"
		:on-success="handleSuccess"
		:on-remove="handleRemove"
		:file-list="fileList">
	  <el-button size="small" type="primary">点击上传</el-button>
	  <div slot="tip" class="el-upload__tip">商品附件最大20M，仅支持PDF、word、txt、excel、jpg、png、bmp、gif、rar、zip格式</div>
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
				type:Array
			}
		},
		created(){
			this.getImgAccess();
		},
		methods:{
			beforeUpload(file){
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

<style>
</style>