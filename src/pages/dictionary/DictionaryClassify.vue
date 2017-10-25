<template>
  <div class="container">
    <div class="wrapper" style="overflow: hidden">
      <h3 class="page-title">商品分类</h3>
      <el-button @click="openFirstModal" style="float: right">新增一级类目</el-button>
        <el-tree
          :data="totalCategories"
          :props="defaultProps"
          accordion
          node-key="id"
          @node-click="handleNodeClick"
          @node-expand="handleNodeClick"
          :default-expanded-keys="defaultExpandedKeys"
          :render-content="renderContent"
          v-if="totalCategories.length > 0" style="margin-top: 75px">
        </el-tree>
      <!--新增弹框-->
      <el-dialog title="新增商品分类" :visible.sync="createChildDependent">
        <el-form :model="childForm">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="childForm.name"></el-input>
          </el-form-item>
          <el-form-item label="上级分类" :label-width="formLabelWidth" v-if="childForm.parent.name">
            <el-input :disabled="true" v-model="childForm.parent.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createChildDependent = false">取 消</el-button>
          <el-button type="primary" @click="createSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改商品分类信息" :visible.sync="updateDictionaryClassify">
        <el-form :model="updateForm">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="updateForm.parent.name"></el-input>
          </el-form-item>
          <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-input :disabled="true" v-model="updateForm.oldName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDictionaryClassify = false">取 消</el-button>
          <el-button type="primary" @click="updateSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        totalCategories: [],
        defaultProps: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        dictionaryClassifyCreate: false,//新增
        createChildDependent: false,//新增子部门
        updateDictionaryClassify: false,//修改
        updateForm: {
          name: '',
          oldName:'',
          parent: {}
        },
        childForm: {
          name: '',
          parent: {}
        },
        formLabelWidth: '80px',
        defaultExpandedKeys: []
      };
    },
    created() {
      this.getCatChild()
    },
    methods: {
      getCatChild(val) {//商品分类
        let self = this;
        let requestData;
        if (val === undefined) {
          requestData =  {token: window.localStorage.getItem('token')};
        } else {
          requestData =  {token: window.localStorage.getItem('token'), catId: val.id};
        }
        self.httpApi.goods.catList(requestData, function (data) {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].res = JSON.parse(data.data[i].res);
            if (parseInt(data.data[i].hasChild) > 0) {
              data.data[i].children = [{}];
            }
          }
          if (val === undefined) {
            self.totalCategories = data.data;
          } else {
            self.insertCat(self.totalCategories, val, data.data, 0);
            console.log(self.totalCategories)
          }
        });
      },
      insertCat(arr, val, data, level) {//val:所有父级的数组,data:当前获取到的数据
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].name === val.parent[level]) {
            if (val.parent.length === level + 1) {
              arr[i].children = data;
            } else {
              level++;
              this.insertCat(arr[i].children, val, data, level);
            }
          }
        }
      },
      renderContent(h, {node, data, store}) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
          <span>{node.label}</span>
        </span>
        <span>
          <el-button style="font-size: 12px;" type="text" on-click={ () => this.openCreateModal(node, data) }>新增</el-button>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.updateModal(node, data) }>修改</el-button>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.deleteNode(node, data) }>删除</el-button>
        </span>
        </span>);
      },
      handleNodeClick(data) {//树形控件
        let self = this
        let parentArr = data.parentIds.split('/')
        self.getCatChild({parent: parentArr, id: data.id})
      },
      openCreateModal(parent, now) {
        console.log('now',now)
        event.stopPropagation()
        this.createChildDependent = true;
        this.childForm.parent = parent.data;
      },
      openFirstModal() {
        this.createChildDependent = true;
        this.childForm.parent = {data: {name: ''}};
      },
      updateModal(parent,now){//修改弹窗
        event.stopPropagation()
        console.log('parent',parent)
        console.log('parentdata',parent.data)
        this.updateDictionaryClassify = true;
        this.updateForm.parent = parent.data;
        this.updateForm.oldName = parent.parent.data.name
      },
      updateSure(){//修改确定
        let self = this
        let requestData = {
          id: self.updateForm.parent.id,
          parentId: self.updateForm.parent.parentId,
          name: self.updateForm.parent.name,
          parentIds: self.updateForm.parent.parentIds,
          hasChild: self.updateForm.parent.hasChild,
          token: window.localStorage.getItem('token'),
          oldParentId: self.updateForm.parent.parentId,
        };
        self.httpApi.goodsCat.editCategory(requestData, function (data) {
          self.updateDictionaryClassify = false
          self.$message.success('修改成功')
          self.totalCategories = []
          self.getCatChild()
          self.childForm.name = ''
          self.childForm.parent = {}
        });
      },
      deleteNode(node, now) {
        event.stopPropagation()//阻止冒泡
        let self = this
        let requestData = {
          id: node.data.id,
          parentId: node.data.parentId,
          name: node.data.name,
          parentIds: node.data.parentIds,
          hasChild: node.data.hasChild,
          token: window.localStorage.getItem('token'),
        };
        this.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.goodsCat.deleteCategory(requestData, function (data) {
            self.$message.success('删除成功');
            self.totalCategories = [];
            self.getCatChild();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      createSure() {//新增确定
        let self = this
        let requestData = {
          id: self.childForm.parent.id,
          parentId: self.childForm.parent.parentId,
          name: self.childForm.parent.name,
          parentIds: self.childForm.parent.parentIds,
          hasChild: self.childForm.parent.hasChild,
          token: window.localStorage.getItem('token'),
          newCatName: self.childForm.name
        };

        self.$http.post('/ui/createCategory', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('createChild', response)
          if (data.code == 10000) {
            self.createChildDependent = false
            self.$message.success('添加成功')
            self.totalCategories = []
            self.getCatChild()
            self.childForm.name = ''
            self.childForm.parent = {}
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
  ;
</script>
