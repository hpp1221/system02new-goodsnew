<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">商品分类</h3>
      <div class="dictionaryclassify-create">
        <el-button class="dictionarycreate" @click="dictionaryClassifyCreate = true">新增</el-button>
      </div>
      <!--新增弹框-->
      <el-dialog title="新增商品分类" :visible.sync="dictionaryClassifyCreate">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
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
          :data="data2"
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
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        dictionaryClassifyCreate: false,//新增
        createChildDependent: false,//新增子部门
        updateDictionaryClassify: false,//修改
        form: {
          name: '',
          region: ''
        },
        formLabelWidth: '120px'
      };
    },
    created() {
      this.getFirstClass()
    },
    methods: {
      getFirstClass() { //一级分类
        let self = this
        let params = {
          token: window.localStorage.getItem('token')
        };
        self.$http.get('/ui/catList', self.qs.stringify(params)).then(function (response) {
          let data = response.data
          console.log('0930', response)
          if (data.code === 10000) {
            for(let i = 0;i < data.data.length;i++){
//              if(parseInt(data.data[i].hasChild) > 0){
                data.data[i].children = [];
//              }
            }
            self.data2 = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      getCatChild(data) {//获取一级以下的分类
        let self = this;
        let requestData = {
          params:{
            token: window.localStorage.getItem('token'),
            catId:self.data.id
          }
        };
        self.$http.get('/ui/catList',requestData).then(function (response) {
          let data = response.data;
          console.log('data22',response);
          if(data.code == 10000){
            for(let i = 0;i < self.data.length;i++){
              if(self.data2[i].id == data.id){
                for(let j = 0;j < data.data.length;j++){
                  if(parseInt(data.data[j].hasChild) > 0){
                    data.data[j].children = [];
                  }
                }
                self.data2[i].children = data.data;
              }
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      handleNodeClick(data) {//树形控件
        console.log('tree',data);
      },
//      getCheckedKeys() {
//        this.dictionaryClassifyId=this.$refs.tree.getCheckedKeys();
//        console.log('101',this.dictionaryClassifyId)
//      },
    }
  };
</script>
