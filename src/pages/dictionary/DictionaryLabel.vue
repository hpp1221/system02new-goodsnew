<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle" style="padding-top: 30px">商品标签</h3>
      <div class="storeLabel">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag.id"
          size="medium"
        >
          <i class="el-icon-edit" @click="storeEditLabel(tag)"></i>
          {{tag.name}}
        </el-tag>
        <el-button icon="el-icon-plus" size="large" @click="showDialog"
                   style="vertical-align: middle;margin: 10px;"></el-button>
        <!--<transition name="fade">-->
        <!--<div class="el-form-item__error" v-show="tagsValid">{{ tagsError }}</div>-->
        <!--</transition>-->
      </div>
      <!--修改弹框-->
      <el-dialog title="修改商品标签" :visible.sync="updateStoreLabel">
        <el-form :model="updateForm">
          <el-form-item label="商品标签" :label-width="formLabelWidth">
            <el-input v-model="updateForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateLabelSure">确 定</el-button>
          <el-button @click="cancelUpdateLabel">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 弹框 -->
      <el-dialog title="添加商品标签" :visible.sync="dialogFormVisible">
        <el-form :model="dialogForm">
          <el-form-item>
            <el-input v-model="dialogForm.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
     <el-button @click.native="dialogFormVisible = false">取 消</el-button>
     <el-button type="primary" @click.native="handleAdd">添加</el-button>
    </span>
      </el-dialog>
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
        },   // 活动标签对话框表单
        updateForm: {
          id: '',
          name: ''
        },
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
        let self = this;
        self.updateStoreLabel = false;
        self.$message.success('已取消修改');
        self.getStoreLabel();
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
        self.httpApi.goodsCat.editTag(requestData, function (data) {
          self.updateStoreLabel = false;
          self.$message.success('修改成功');
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
        self.httpApi.goodsCat.addTag(requestData, function (data) {
          self.dialogFormVisible = false;
          self.$message.success('添加成功');
          self.getStoreLabel();
        });
      },
      getStoreLabel() {//标签列表
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token')
        };
        self.httpApi.goods.tagList(requestData, function (data) {
          self.dynamicTags = data.data
        });
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
