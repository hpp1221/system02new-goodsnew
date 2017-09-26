<template>
	<el-upload
		action="http://upload.qiniu.com/"
		list-type="picture-card"
		:data="key"
		:file-list="fileList"
		:before-upload="beforeUpload"
		:on-success="handleSuccess"
		:on-remove="handleRemove"
		:disabled="disabled">
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
			},
			token:{
				type:String
			},
			disabled:{
				type:Boolean,
				default:false
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
				this.$emit('removeFile',{
					name:file.name,
					url:file.url
				});
			}
		}
	}
</script>

<style>
</style>