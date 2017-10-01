<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">商品分类</h3>
      <div class="dictionaryclassify-create">
        <el-button class="dictionarycreate" @click="ClassifyCreate">新增</el-button>
      </div>
      <!--新增弹框-->
      <el-dialog title="新增商品分类" v-model="dictionaryClassifyCreate">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.input" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="母婴">
              <el-option label="母婴" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dictionaryClassifyCreate = false">取 消</el-button>
          <el-button type="primary" @click="dictionaryClassifyCreate = false">确 定</el-button>
        </div>
      </el-dialog>
      <!--新增子部门弹框-->
      <el-dialog title="新增商品分类" :visible.sync="createChildDependent">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="纸尿裤">
              <el-option label="纸尿裤" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createChildDependent = false">取 消</el-button>
          <el-button type="primary" @click="createChildDependent = false">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改商品分类信息" :visible.sync="updateDictionaryClassify">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="纸尿裤">
              <el-option label="纸尿裤" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDictionaryClassify = false">取 消</el-button>
          <el-button type="primary" @click="updateDictionaryClassify = false">确 定</el-button>
        </div>
      </el-dialog>
      <div class="dictionaryclassify-main">
        <el-tree
          :data="totalCategories"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          @node-click="handleNodeClick"
          :props="defaultProps">
        </el-tree>
        <div class="dictionaryclassify-operation">
          <el-button class="el-icon-plus  icon-createchilddependent" @click="createChildDependent">新增子部门
          </el-button>
          <el-button class="el-icon-edit icon-updatechilddependent" @click="updateDictionaryClassify">修改
          </el-button>
          <!--<el-button class="iconfont icon-erp-zhiding-" @click="getCheckedKeys">置顶</el-button>-->
          <!--<el-button class="el-icon-delete icon-deletechilddependent" @click="deleteDictionaryClassify">删除-->
          <!--</el-button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        totalCategories: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        dictionaryClassifyCreate: false,//新增
        createChildDependent: false,//新增子部门
        updateDictionaryClassify: false,//修改
        form: {
          input: '',
          region: ''
        },
        formLabelWidth: '120px'
      };
    },
    created() {
      this.getCatChild()
    },
    methods: {
      getCatChild(val) {//商品分类
        console.log('vall', val)
        let self = this;
        var requestData;
        if (val === undefined) {
          requestData = {params: {token: window.localStorage.getItem('token')}};
        } else {
          requestData = {params: {token: window.localStorage.getItem('token'), catId: val.id}};

        }
        self.$http.get('/ui/catList', requestData).then(function (response) {
          let data = response.data;
          console.log('data22', response);
          if (data.code == 10000) {
            for (let i = 0; i < data.data.length; i++) {
              if (parseInt(data.data[i].hasChild) > 0) {
                data.data[i].children = [];
              }
            }
            if (val === undefined) {
              self.totalCategories = data.data;
            } else {
              self.insertCat(self.totalCategories, val, data.data, 0);
            }
          }
        }).catch(function (error) {
          console.log(error);
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
      handleNodeClick(data) {//树形控件
        console.log('data', data)
        let parentArr = data.parentIds.split('/')
        this.getCatChild({parent: parentArr, id: data.id})
        console.log('id', data);
      },
      ClassifyCreate() {
        this.dictionaryClassifyCreate = true
        self.$http.get('/ui/catList').then(function (response) {
          let data = response.data;
          console.log('data22', response);
          if (data.code == 10000) {
            self.form.input = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
  ;
</script>
