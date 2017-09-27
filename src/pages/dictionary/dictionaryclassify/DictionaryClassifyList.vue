<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">商品分类</h3>
      <div class="dictionaryclassify-create">
        <el-button class="create" @click="dictionaryClassifyCreate = true">新增</el-button>
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
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        <ul class="dictionaryclassify-operation">
          <li>
            <i class="el-icon-plus" @click="createChildDependent = true">新增子部门</i>
          </li>
          <li>
            <i class="el-icon-edit" @click="updateDictionaryClassify = true">修改</i>
          </li>
          <li>
            <i class="el-icon-arrow-up" @click="stick ">置顶</i>
          </li>
          <li>
            <i class="el-icon-delete">删除</i>
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
        data: [{
          label: '母婴',
          children: [{
            label: '奶粉',
            children: [
              {
                label: '奶粉一号'
              },
              {
                label: '奶粉二号'
              }]
          },
            {
              label: '纸尿裤',
              children: [
                {
                  label: '拉拉裤'
                },
                {
                  label: '达达裤'
                }]
            }]
        }, {//树形控件
          label: '母婴2',
          children: [{
            label: '奶粉2',
            children: [
              {
                label: '奶粉2-1'
              }, {
                label: '奶粉2-2'
              }
            ]
          }, {
            label: '纸尿裤2',
            children: [{
              label: '拉拉裤2'
            }, {label: '达达裤2'}]
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
    components:{
      'icon':require('../../../assets/css/iconfont.css')
    },
    methods: {
      handleNodeClick(data) {//树形控件
        console.log(data);
      }
    }
  };
</script>
