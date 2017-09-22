<template>
	<el-upload
		action="http://upload.qiniu.com/"
		list-type="picture-card"
		:data="key"
		:file-list="fileList"
		:before-upload="beforeUpload"
		:on-success="handleSuccess"
		:on-remove="handleRemove">
		<i class="el-icon-plus"></i>
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