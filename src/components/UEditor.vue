<template>
	<VueEditor
		ueditorPath="../../static/ueditor1_4_3_3-utf8-net"
		@ready="editorReady" 
		style="width:100%;height:300px" 
		:ueditorConfig="editorConfig">
	</VueEditor>
</template>
<script>
	export default{
		data(){
			return {
				editorInstance:{},
				content:'',
			}
		},
		props:{
			editorConfig:{},//编辑器配置
			editorContent:'',//编辑器默认文字
		},
		watch:{
			editorContent:function(newValue,oldValue){
				if(typeof(this.editorInstance) != 'string'){
					this.editorInstance.setContent(newValue)
				}
			}
		},
		methods:{
			editorReady(editorInstance){
				let self = this
				self.editorInstance = editorInstance;
				self.editorInstance.setContent(self.editorContent)  
			    self.editorInstance.addListener('contentChange',() => {
			        self.content = self.editorInstance.getContent()
			    })
            },
            
		}
	}
</script>