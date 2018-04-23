<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">计量单位</h3>
      <el-button @click="createUnit" style="float: right">新增</el-button>
      <!--新增弹框-->
      <el-dialog title="新增计量单位" :visible.sync="dictionaryUnitCreate">
        <el-form :model="form">
          <el-form-item label="单位名称" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createSure">确 定</el-button>
          <el-button @click="dictionaryUnitCreate = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改计量单位" :visible.sync="dictionaryUnitUpdate">
        <el-form :model="updateForm">
          <el-form-item label="单位名称" :label-width="formLabelWidth">
            <el-input v-model="updateForm.name" style="width: 50%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateSure">确 定</el-button>
          <el-button @click="updateCancel">取 消</el-button>
        </div>
      </el-dialog>
      <div class="dictionaryclassify-main">
        <ul class="dictionarybrand-content">
          <li v-for="item in list" class="iconfont icon-erp-R">{{item.name}}
            <el-button class="el-icon-delete icon-deletechilddependent" v-on:click="deleteUnit(item.id)">删除</el-button>
            <el-button class="el-icon-delete icon-deletechilddependent" v-on:click="updateById(item)">修改</el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dictionaryUnitCreate: false,//新增
        dictionaryUnitUpdate: false,//修改
        list: [],
        form: {
          name: ''
        },
        updateForm: {
          id: '',
          name: ''
        },
        formLabelWidth: '80px'
      };
    },
    created() {
      this.getUnitList();
    },
    methods: {
      getUnitList() {//单位列表
        let self = this
        let requestData = {};
        self.httpApi.goodsCat.selectUnitList(requestData, function (data) {
          self.list = data.data.list;
        });
      },
      createUnit() {//新增单元
        this.dictionaryUnitCreate = true;
        this.form = {name: ''};
      },
      createSure() {//新增确定
        let self = this
        self.httpApi.goodsCat.addUnit(self.form, function (data) {
          self.dictionaryUnitCreate = false
          self.$message.success('添加成功');
          self.getUnitList();
        });
      },
      updateById(row) {//打开修改弹框
        this.dictionaryUnitUpdate = true;
        this.updateForm = row;
      },
      updateSure() {//修改确定
        let self = this;
        let requestData = {
          id: self.updateForm.id,
          name: self.updateForm.name
        };
        self.httpApi.goodsCat.updateUnit(requestData, function (data) {
          self.$message.success('修改成功');
          self.dictionaryUnitUpdate = false;
          self.getUnitList();
        });
      },
      updateCancel() {//修改确定取消
        this.dictionaryUnitUpdate = false;
        this.getUnitList();
      },
      deleteUnit(id) {//删除
        let self = this;
        let requestData = {id: id};
        self.$confirm('请确认是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.goodsCat.deleteUnit(requestData, function (data) {
            self.$message.success('删除成功');
            self.getUnitList();
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  };
</script>
