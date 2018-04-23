<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">标签管理</h3>
     <div style="text-align: center;margin-top: 10%;">
       <el-tag
         :key="tag.id"
         v-for="tag in dynamicTags"
         closable
         :disable-transitions="false"
         @close="handleClose(tag)">
         {{tag.name}}
       </el-tag>
       <el-input
         class="input-new-tag"
         v-if="inputVisible"
         v-model="inputValue"
         ref="saveTagInput"
         size="small"
         @keyup.enter.native="handleInputConfirm"
         @blur="handleInputConfirm"
       >
       </el-input>
       <el-button v-else class="button-new-tag" size="medium" @click="showInput"> + </el-button>
     </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      };
    },
    created(){
      this.select();
    },
    methods: {
      handleClose(tag) {
        console.log('tag',tag);
        let self = this;
        let requestData = {
          id:tag.id,
          name:tag.name
        };
        self.$confirm('请确认是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.goodsCat.deleteTag(requestData, function (data) {
            self.$message.success('删除成功');
            self.dynamicTags.splice(self.dynamicTags.indexOf(tag), 1);
            self.select();
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });
          self.select();
        });
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let self = this;
        let inputValue = self.inputValue;
        if (inputValue) {
          self.dynamicTags.push(inputValue);
          let requestData={
            name:self.inputValue
          };
          self.httpApi.goodsCat.addTag(requestData,function (data) {
            self.$message.success('新增成功');
            self.select();
          })

        }
        self.inputVisible = false;
        self.inputValue = '';
      },
      select(){
        let self = this;
        self.httpApi.goodsCat.selectTagList({},function (data) {
          self.dynamicTags = data.data.list;
        })
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
</style>
