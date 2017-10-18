<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品标签管理</h3>
      <p>管理您的商品标签，最多支持5个标签。</p>
      <el-form ref="form" :model="form" label-width="80px" class="label-content">
        <el-form-item>
          <el-input v-model="form.name" placeholder="新品上架" class="label"></el-input>
          <el-input v-model="form.name" placeholder="热卖推荐" class="label"></el-input>
          <el-input v-model="form.name" placeholder="清仓优惠" class="label"></el-input>
          <el-input v-model="form.name" placeholder="添加新标签" class="label"></el-input>
          <el-input v-model="form.name" placeholder="添加新标签" class="label"></el-input>
        </el-form-item>
        <el-form-item class="label-operation">
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogForm: {
          id: '',
          name: ''
        },   //新增表单
        updateForm: {
          id: '',
          name: ''
        },//修改表单
        dynamicTags: [],
        dialogFormVisible: false,//新增
        updateStoreLabel: false//修改

      };
    },
    created() {
      this.getStoreLabel()//标签列表
    },
    methods: {
      cancelUpdateLabel() {//取消修改
        let self = this
        self.updateStoreLabel = false
        self.$message.success('已取消修改')
        self.getStoreLabel()
      },
      storeEditLabel(tag) {//修改弹框
        this.updateForm = tag
        this.updateStoreLabel = true
      },
      updateLabelSure() {//修改弹框确定
        let self = this
        let requestData = {
          id: self.updateForm.id,
          name: self.updateForm.name,
          token: window.localStorage.getItem('token')
        };
        self.$http.post('/ui/editTag', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('update', response)
          if (data.code == 10000) {
            self.updateStoreLabel = false
            self.$message.success('修改成功')
//            self.getStoreHouseList(self.pageSize,self.pageNum)
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      showDialog() {//新增弹框
        if (this.dynamicTags.length >= 5) {
          this.$message({
            message: '最多设置5个标签',
            type: 'warning'
          });
        } else {
          this.dialogFormVisible = true;
          this.dialogForm = {data: {name: ''}};
        }
      },
      handleAdd() {//添加
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          tagName: self.dialogForm.name
        };
        self.$http.post('/ui/addTag', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('addTag', response)
          if (data.code == 10000) {
            self.dialogFormVisible = false
            self.$message.success('添加成功')
            self.getStoreLabel()
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getStoreLabel() {//标签列表
        let self = this
        let params = {
          token: window.localStorage.getItem('token')
        };
        self.$http.post('/ui/tagList', self.qs.stringify(params)).then(function (response) {
          let data = response.data
          console.log('label', response)
          if (data.code === 10000) {
            self.dynamicTags = data.data
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      handleClose(tag) {
        console.log('tag', tag)
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
    }
  }
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .storeLabel {
    padding: 50px 0px 0px 20px;
  }
</style>
