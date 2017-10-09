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
          :props="defaultProps">
        </el-tree>
        <div class="dictionaryclassify-operation">
          <el-button class="el-icon-plus  icon-createchilddependent" @click="createChildDependent = true">新增子部门</el-button>
          <el-button class="el-icon-edit icon-updatechilddependent" @click="updateDictionaryClassify = true">修改</el-button>
          <el-button class="iconfont icon-erp-zhiding-" @click="createChildDependent = true">置顶</el-button>
          <el-button class="el-icon-delete icon-deletechilddependent" @click="createChildDependent = true">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {ElButton},
    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dictionaryClassifyCreate: false,//新增
        createChildDependent:false,//新增子部门
        updateDictionaryClassify:false,//修改
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      handleNodeClick(data) {//树形控件
        console.log(data);
      }
    }
  };
</script>
