<template>
  <VueEditor
    ueditorPath="../../static/ueditor1_4_3_3-utf8-net"
    @ready="editorReady"
    style="width:100%;height:300px"
    :ueditorConfig="editorConfig">
  </VueEditor>
</template>
<script>
  import VueUEditor from 'vue-ueditor'

  export default {
    data() {
      return {
        editorInstance: {},
        content: '',
      }
    },
    props: {
      editorConfig: {
        /* 上传图片配置项 */
        "imageUrl": "http://up.qiniu.com/",
        "imageActionName": "uploadimage", /* 执行上传图片的action名称 */
        "imageFieldName": "file", /* 提交的图片表单名称 */
        "imageMaxSize": 2048000, /* 上传大小限制，单位B */
        "imageAllowFiles": [  ".jpg", ".jpeg" ], /* 上传图片格式显示 */
        "imageCompressEnable": true, /* 是否压缩图片,默认是true */
        "imageCompressBorder": 1600, /* 图片压缩最长边限制 */
        "imageInsertAlign": "none", /* 插入的图片浮动方式 */
        "imageUrlPrefix": "http://7xkcdc.com2.z0.glb.qiniucdn.com/", /* 图片访问路径前缀 */
        "imagePathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
      },//
      editorContent: '',//编辑器默认文字
    },
    watch: {
      editorContent: function (newValue, oldValue) {
        if (typeof(this.editorInstance) != 'string') {
          this.editorInstance.setContent(newValue)
        }
      }
    },
    methods: {
      editorReady(editorInstance) {
        let self = this
        self.editorInstance = editorInstance;
        self.editorInstance.setContent(self.editorContent)
        self.editorInstance.addListener('contentChange', () => {
          self.content = self.editorInstance.getContent()
        })
      },

    }
  }
</script>
