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
        :highlight-current="true"
        @node-click="handleNodeClick"
        @node-expand="handleNodeClick"
        :default-expanded-keys="defaultExpandedKeys"
        :expand-on-click-node="false"
        :render-content="renderContent"
        v-if="totalCategories.length > 0" style="margin-top: 75px">
      </el-tree>
      <!--新增一级商品分类弹框-->
      <el-dialog title="新增一级商品分类" :visible.sync="createOneDependent">
        <el-form :model="childFormFirst">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="childFormFirst.name"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" :label-width="formLabelWidth">
            <uploadoneimgnew
              :fileList="childFormFirst.img"
              @getFileList="getFileListFirst">
            </uploadoneimgnew>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createOneDependentFalse">取 消</el-button>
          <el-button type="primary" @click="createOneSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--新增商品分类弹框-->
      <el-dialog title="新增商品分类" :visible.sync="createChildDependent">
        <el-form :model="childForm">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="childForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" :label-width="formLabelWidth">
            <uploadoneimgnew
              :fileList="childForm.img"
              @getFileList="getFileList">
            </uploadoneimgnew>
          </el-form-item>
          <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-input :disabled="true" v-model="childForm.topName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createChildDependent = false">取 消</el-button>
          <el-button type="primary" @click="createChildSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改商品分类信息" :visible.sync="updateDictionaryClassify" v-if="updateDictionaryClassify">
        <el-form :model="updateForm">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="updateForm.parent.name"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" :label-width="formLabelWidth">
            <uploadoneimg
              :fileList="updateForm.parent.img"
              @getFileList="getFileListUpdate">
            </uploadoneimg>
          </el-form-item>
          <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-input :disabled="true" v-model="updateForm.oldName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateSureCancel">取 消</el-button>
          <el-button type="primary" @click="updateSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--规格弹框-->
      <el-dialog title="规格信息" :visible.sync="createChildDependentSpec">
        <el-button @click="openFirstModalSpec" style="float: right">新增规格</el-button>
        <el-tree
          :data="totalCategoriesSpec"
          :props="defaultProps"
          accordion
          node-key="id"
          :highlight-current="true"
          @node-click="handleNodeClick"
          @node-expand="handleNodeClick"
          :default-expanded-keys="defaultExpandedKeys"
          :expand-on-click-node="false"
          :render-content="renderContentSpec"
          style="margin-top: 75px">
        </el-tree>
      </el-dialog>
      <!--基本属性弹框-->
      <el-dialog title="基本属性信息" :visible.sync="createChildDependentBasicInfo">
        <el-button @click="openFirstModalBasicInfo" style="float: right">新增基本属性</el-button>
        <el-tree
          :data="totalCategoriesBasicInfo"
          :props="defaultProps"
          accordion
          node-key="id"
          :highlight-current="true"
          @node-click="handleNodeClick"
          @node-expand="handleNodeClick"
          :default-expanded-keys="defaultExpandedKeys"
          :expand-on-click-node="false"
          :render-content="renderContentBasicInfo"
          style="margin-top: 75px">
        </el-tree>
      </el-dialog>
      <!--新增规格弹框-->
      <el-dialog title="新增规格" :visible.sync="createOneDependentSpec">
        <el-form :model="childFormSpec">
          <el-form-item label="规格名称" :label-width="formLabelWidth">
            <el-input v-model="childFormSpec.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span style="margin-left:11px;">规格是否是查询条件 ：</span>
            <el-radio-group v-model="childFormSpec.isCondition">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createOneDependentSpec = false">取 消</el-button>
          <el-button type="primary" @click="createOneSureSpec">确 定</el-button>
        </div>
      </el-dialog>
      <!--新增基本属性弹框-->
      <el-dialog title="新增基本属性" :visible.sync="createOneDependentBasicInfo">
        <el-form :model="childFormBasicInfo">

          <el-form-item label="属性名称" :label-width="formLabelWidth">
            <el-input v-model="childFormBasicInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="值排序" :label-width="formLabelWidth">
            <el-input v-model="childFormBasicInfo.orders"></el-input>(数字越小排序越靠前，0-99之内)
          </el-form-item>
<!--            <span style="margin-left:11px;">是否是必填属性 ：</span>
            <el-radio-group v-model="childFormBasicInfo.required">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>-->
<!--          <br>
          <br>
          <span style="margin-left:11px;">输入形态是文本框：</span>
          <el-radio-group v-model="childFormBasicInfo.input">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>-->
<!--          <br>
          <br>
            <span style="margin-left:11px;">输入形态是复选框 ：</span>
            <el-radio-group v-model="childFormBasicInfo.checkbox">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>-->
   <!--       <br>
          <br>
          <span style="margin-left:11px;">是否是颜色属性：</span>
          <el-radio-group v-model="childFormBasicInfo.color">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>-->
          <br>
          <br>
            <span style="margin-left:11px;">规格是否是查询条件 ：</span>
            <el-radio-group v-model="childFormBasicInfo.isCondition">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
       <!--   <br>
          <br>
            <span style="margin-left:11px;">是否是枚举 ：</span>
            <el-radio-group v-model="childFormBasicInfo.isEnum">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>-->
          <br>
          <br>
            <span style="margin-left:11px;">是否是关键字 ：</span>
            <el-radio-group v-model="childFormBasicInfo.keyword">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          <br>
          <br>
            <span style="margin-left:11px;">是否是销售属性 ：</span>
            <el-radio-group v-model="childFormBasicInfo.sales">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createOneDependentBasicInfoFalse">取 消</el-button>
          <el-button type="primary" @click="createOneSureBasicInfo">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改规格弹框-->
      <el-dialog title="修改规格" :visible.sync="updateDictionaryClassifySpec" v-if="updateDictionaryClassifySpec">
        <el-form :model="updateFormSpec">
          <el-form-item label="规格名称" :label-width="formLabelWidth">
            <el-input v-model="updateFormSpec.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span style="margin-left:11px;">规格是否是查询条件 ：</span>
            <el-radio-group v-model="updateFormSpec.isCondition">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDictionaryClassifySpec = false">取 消</el-button>
          <el-button type="primary" @click="updateSureSpec">确 定</el-button>
        </div>
      </el-dialog>
      <!--新增规格下规格值弹框-->
      <el-dialog title="新增规格值" :visible.sync="createOneDependentSpecValue">
        <el-form :model="childFormSpecValue">
          <el-form-item label="值名称" :label-width="formLabelWidth">
            <el-input v-model="childFormSpecValue.name" style="display: inline-block"></el-input>
          </el-form-item>
          <el-form-item label="值排序" :label-width="formLabelWidth">
            <el-input v-model="childFormSpecValue.orders"></el-input>(数字越小排序越靠前，0-99之内)
          </el-form-item>

          <el-form-item>
            <!--<el-form-item label="所属规格" :label-width="formLabelWidth">-->
              <!--<el-input v-model="childFormSpecValue.name"></el-input>-->
            <!--</el-form-item>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createOneDependentSpecValue = false">取 消</el-button>
          <el-button type="primary" @click="createOneSureSpecValue">确 定</el-button>
        </div>
      </el-dialog>
      <!--新增基本属性下基本属性值弹框-->
      <el-dialog title="新增基本属性值" :visible.sync="createOneDependentBasicInfoValue">
        <el-form :model="childFormBasicInfoValue">
          <el-form-item label="值名称" :label-width="formLabelWidth">
            <el-input v-model="childFormBasicInfoValue.name" style="display: inline-block"></el-input>
          </el-form-item>
          <el-form-item label="值排序" :label-width="formLabelWidth">
            <el-input v-model="childFormBasicInfoValue.orders"></el-input>(数字越小排序越靠前，0-99之内)
          </el-form-item>
          <el-form-item>
            <!--<el-form-item label="所属规格" :label-width="formLabelWidth">-->
            <!--<el-input v-model="childFormSpecValue.name"></el-input>-->
            <!--</el-form-item>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createOneDependentBasicInfoValueFalse">取 消</el-button>
          <el-button type="primary" @click="createOneSureBasicInfoValue">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改基本属性弹框-->
      <el-dialog title="修改基本属性" :visible.sync="updateDictionaryClassifyBasicInfo" v-if="updateDictionaryClassifyBasicInfo">
        <el-form :model="updateFormBasicInfo">
          <el-form-item label="值名称" :label-width="formLabelWidth">
            <el-input v-model="updateFormBasicInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="值排序" :label-width="formLabelWidth">
            <el-input v-model="updateFormBasicInfo.orders"></el-input>(数字越小排序越靠前，0-99之内)
          </el-form-item>
         <!-- <span style="margin-left:11px;">是否是必填属性 ：</span>-->
     <!--     <el-radio-group v-model="updateFormBasicInfo.required">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>-->
  <!--        <br>
          <br>
          <span style="margin-left:11px;">输入形态是文本框：</span>
          <el-radio-group v-model="updateFormBasicInfo.input">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>-->
    <!--      <br>
          <br>
          <span style="margin-left:11px;">输入形态是复选框 ：</span>
          <el-radio-group v-model="updateFormBasicInfo.checkbox">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>-->
<!--          <br>
          <br>
          <span style="margin-left:11px;">是否是颜色属性：</span>
          <el-radio-group v-model="updateFormBasicInfo.color">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>-->
          <!--<br>-->
          <!--<br>-->
          <span style="margin-left:11px;">规格是否是查询条件 ：</span>
          <el-radio-group v-model="updateFormBasicInfo.isCondition">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
     <!--     <br>
          <br>
          <span style="margin-left:11px;">是否是枚举 ：</span>
          <el-radio-group v-model="updateFormBasicInfo.isEnum">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>-->
          <br>
          <br>
          <span style="margin-left:11px;">是否是关键字 ：</span>
          <el-radio-group v-model="updateFormBasicInfo.keyword">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          <br>
          <br>
          <span style="margin-left:11px;">是否是销售属性 ：</span>
          <el-radio-group v-model="updateFormBasicInfo.sales">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateDictionaryClassifyBasicInfo = false">取 消</el-button>
          <el-button type="primary" @click="updateSureBasicInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        totalCategories: [],//商品分类数组
        totalCategoriesSpec:[],//规格数组
        totalCategoriesBasicInfo:[],//基本属性数组
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        dictionaryClassifyCreate: false,//新增
        createOneDependent: false,//新增一级类目
        createChildDependent:false,//新增二级类目
        createOneDependentSpec: false,//打开新增规格弹窗
        createOneDependentBasicInfo:false,//打开新增基本属性弹窗
        createOneDependentSpecValue: false,//新增规格值
        createOneDependentBasicInfoValue: false,//新增基本属性值
        updateDictionaryClassify: false,//修改类目
        updateDictionaryClassifySpec: false,//修改规格
        updateDictionaryClassifyBasicInfo: false,//修改基本属性
        createChildDependentSpec:false,//打开规格弹框
        createChildDependentBasicInfo: false,//打开基本属性弹框
        updateForm: {//修改form
          oldName: '',
          parent: {},
          name:'',
          img:'',
          parentIds:0,
          parentId:'',
          status:'',
        },
        updateFormSpec:{
          name:'',
          isCondition:'',
          id:'',
          status:'',
        },
        childFormFirst:{//新增一级类目form
          name:'',
          img:'',
          parentNode: {},
          parentIds:0,
          parentId:0,
          status:'',
        },
        childForm: {//新增类目form
          name: '',//类目名称
          topName:'',//上级分类
          img:'',
          parentNode: {},
          parentIds:0,
          parentId:0,
          status:'',
        },
        childFormSpec: {//新增规格form
          categoryId:'',//类目id
          name: '',//类目名称
          isCondition:'',//规格是否是查询条件
          status:'',//类目规格状态
        },
        childFormBasicInfo:{//新增基本属性form
          categoryId:'',//类目id
          name: '',//基本属性名称
          isCondition:'',//规格是否是查询条件
          orders:'',//排序
          status:'',//类目基本属性状态
          checkbox: '',//是否是复选
          color: '',//是否是颜色属性
          input: '',//是否是文本输入
          isEnum: '',//是否是枚举
          keyword: '',//是否是关键字
          required: '',//是否是必填属性
          sales: '',//是否是销售属性
        },
        updateFormBasicInfo:{//修改基本属性form
          id:'',//规格id
          categoryId:'',//类目id
          name: '',//类目名称
          isCondition:'',//规格是否是查询条件
          status:'',//类目规格状态
        },
        childFormSpecValue:{//新增规格值form
          name:'',//当前规格值name
          id:'',//当前规格值id
          categoryId:'',//所属类目id
          orders:'',//排序
          specId:'',//规格名id
          status:'',//类目规格状态
          parent:{},
        },
        childFormBasicInfoValue:{//新增基本属性值form
          name:'',//当前基本属性值name
          id:'',//当前基本属性值id
          categoryId:'',//所属类目id
          orders:'',//排序
          attributeId:'',//基本属性名id
          status:'',//类目基本属性状态
          parent:{},
        },
        formLabelWidth: '80px',
        defaultExpandedKeys: []
      };
    },
    created() {
      this.getCatList();
    },
    components: {
      'uploadoneimg': require('../../components/uploadoneimg'),
      'uploadoneimgnew': require('../../components/uploadoneimgnew'),
    },
    methods: {
      getCatList(){
        let self = this;
        let requestData={};
        self.httpApi.goodsCat.selectCategoryTreeList(requestData,function (data) {
          self.totalCategories = data.data;
        })
      },
      getFileListFirst(file){//商品图片
        this.childFormFirst.img=file.url;
      },
      getFileList(file){//商品图片
        this.childForm.img=file.url;
      },
      renderContent(h, {node, data, store}) {//商品分类
        console.log("node",node);
          return (
            <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
            <span>{node.label}</span>
          </span>
          <span>
        {node.level === 1 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.openCreateModal(node, data) }>新增</el-button> : ''}
          <el-button style="font-size: 12px;" type="text" on-click={ () => this.updateModal(node, data) }>修改</el-button>
          <el-button style="font-size: 12px;" type="text" on-click={ () => this.deleteNode(node, data) }>删除</el-button>
          {node.data.status ===1 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.closeClassButton(node, data) }>禁用</el-button> : <el-button style="font-size: 12px;" type="text" on-click={ () => this.openClassButton(node, data) }>启用</el-button>}
        {node.level !== 1 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.basicInfoClassify(node, data) }>基本属性</el-button> : ''}
        {node.level !== 1 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.specClassify(node, data) }>规格</el-button> : ''}

          </span>
          </span>);
      },
      renderContentSpec(h, {node, data, store}){//规格
        console.log('nodespec999',node);
          return (
            <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
            <span>{node.label}</span>
          </span>
          <span>
          {node.level === 1 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.openCreateModalSpec(node, data) }>新增</el-button> : <el-button style="font-size: 12px;" type="text" on-click={ () => this.openCreateModalSpec(node, data) }></el-button>}
          {node.level === 1 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.updateModalSpec(node, data) }>修改</el-button> : <el-button style="font-size: 12px;" type="text" on-click={ () => this.updateModalSpec(node, data) }></el-button>}
           <el-button style="font-size: 12px;" type="text" on-click={ () => this.deleteNodeSpec(node, data) }>删除</el-button>
          {node.data.status == 1 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.closeClassButtonSpec(node, data) }>禁用</el-button> : <el-button style="font-size: 12px;" type="text" on-click={ () => this.openClassButtonSpec(node, data) }>启用</el-button>}
          </span>
          </span>);
      },
      renderContentBasicInfo(h, {node, data, store}){//基本属性
        console.log('nodebasciinfo',node);
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
          <span>{node.label}</span>
        </span>
        <span>
        {node.level === 1 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.openCreateModalBasicInfo(node, data) }>新增</el-button> : <el-button style="font-size: 12px;" type="text" on-click={ () => this.openCreateModalBasicInfo(node, data) }></el-button>}
        {node.level === 1 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.updateModalBasicInfo(node, data) }>修改</el-button> : <el-button style="font-size: 12px;" type="text" on-click={ () => this.updateModalBasicInfo(node, data) }></el-button>}
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.deleteNodeBasicInfo(node, data) }>删除</el-button>
        {node.data.status == 1 ? <el-button style="font-size: 12px;" type="text" on-click={ () => this.closeClassButtonBasicInfo(node, data) }>禁用</el-button> : <el-button style="font-size: 12px;" type="text" on-click={ () => this.openClassButtonBasicInfo(node, data) }>启用</el-button>}
      </span>
        </span>);
      },
      handleNodeClick(data) {//树形控件
      },
      openCreateModal(parentNode, now) {//打开类目弹框
        event.stopPropagation();
        this.createChildDependent = true;
        this.childForm.parentId = parentNode.data.id;
        this.childForm.topName = parentNode.data.name;
        let parentIds=[0];
        parentIds.push(parentNode.data.id);
        parentIds = parentIds.join(',');
        this.childForm.parentIds = parentIds;
        this.childForm.name='';
        this.childForm.img='';
      },
      createChildSure() {//二级类目弹框确定
        let self = this
        let requestData = {
          name:self.childForm.name,
          img:self.childForm.img,
          parentId:self.childForm.parentId,
          parentIds:self.childForm.parentIds,
          status:1
        };
        self.httpApi.goodsCat.AddCategory(requestData, function (data) {
          self.createChildDependent = false;
          self.$message.success('添加成功')
          self.totalCategories = []
          self.getCatList();
          self.childForm.name = ''
        })

      },
      openFirstModal() {//新增一级类目弹窗
        console.log('childFormFirst',this.childFormFirst);
        console.log('img',this.childFormFirst.img);
        this.createOneDependent = true;
        this.childFormFirst.name='';
        this.childFormFirst.img='';
      },
      createOneSure() {//新增一级类目确定
        let self = this;
          let requestData = {
            name:self.childFormFirst.name,
            img:self.childFormFirst.img,
            parentId:0,
            parentIds:0,
            status:1
          };
          self.httpApi.goodsCat.AddCategory(requestData, function (data) {
            self.createOneDependent = false
            self.$message.success('添加成功')
            self.totalCategories = [];
            self.getCatList();
            self.childFormFirst.name='';
            self.childFormFirst.img='';
            // location.reload();
          })

      },
      createOneDependentFalse(){//新增一级类目取消
        this.createOneDependent = false;
        this.childFormFirst = {name:'',img:''};
      },
      getFileListUpdate(file){
        this.updateForm.parent.img = file.url
      },
      updateModal(parent, now){//修改弹窗
        event.stopPropagation()
        this.updateDictionaryClassify = true;
        this.updateForm.parent = parent.data;
        this.updateForm.oldName = parent.parent.data.name
      },
      updateSure(){//修改确定
        let self = this
        let requestData = {
          name:self.updateForm.parent.name,
          id:self.updateForm.parent.id,
          img:self.updateForm.parent.img,
          parentId:self.updateForm.parent.parentId,
          parentIds:self.updateForm.parent.parentIds,
          status:1,
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.goodsCat.updateCategory(requestData, function (data) {
            self.updateDictionaryClassify = false
            self.$message.success('修改成功')
            self.totalCategories = []
            self.getCatList()
            self.childForm.name = '',
              self.childForm.img='',
              self.childForm.parentNode = {}
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消修改'
          });
          self.updateDictionaryClassify = false;
          self.getCatList();
        });
      },
      updateSureCancel(){
        this.updateDictionaryClassify = false;
        this.getCatList();
      },
      deleteNode(node, now) {//删除
        event.stopPropagation()//阻止冒泡
        let self = this
        let requestData = {
          id:node.data.id
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.goodsCat.deleteCategoryById(requestData, function (data) {
            self.$message.success('删除成功');
            self.totalCategories = [];
            self.getCatList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      openClassButton(node, data){//启用
        let self = this
        let requestData = {
          id:node.data.id,
          name:node.data.name,
          img:node.data.img,
          parentId:node.data.parentId,
          parentIds:node.data.parentIds,
          status:1
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.goodsCat.updateCategoryStatusById(requestData, function (data) {
            self.$message.success('已启用');
            self.totalCategories = [];
            self.getCatList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          });
        });
      },
      closeClassButton(node, data){//禁用
        let self = this;
        let requestData = {
          id:node.data.id,
          name:node.data.name,
          img:node.data.img,
          parentId:node.data.parentId,
          parentIds:node.data.parentIds,
          status:0
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.goodsCat.updateCategoryStatusById(requestData, function (data) {
            self.$message.success('已禁用');
            self.totalCategories = [];
            self.getCatList();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });
        });
      },
      basicInfoClassify(node,now){
        let url = '/commodit/basicinfo/' + node.data.id;
        this.$router.push(url);
      },
      specClassify(node,row){//规格
        let self = this;
        self.createChildDependentSpec = true;
        self.totalCategoriesSpec = [];
        self.childFormSpec.categoryId = node.data.id;
        let requestData={
          categoryId:node.data.id
        };
        self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData,function (data) {
          self.totalCategoriesSpec = data.data;
        })
      },
      basicInfoClassify(node,row){//基本属性
        let self = this;
        self.createChildDependentBasicInfo = true;
        self.childFormBasicInfo.categoryId = node.data.id;
        let requestData={
          categoryId:node.data.id
        };
        self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData,function (data) {
          self.totalCategoriesBasicInfo = data.data;
        })
      },
      openFirstModalSpec() {//新增规格弹窗
        this.createOneDependentSpec = true;
        this.childFormSpec.name='';
        this.childFormSpec.isCondition='';
      },
      openFirstModalBasicInfo(){//新增基本属性弹窗
        this.createOneDependentBasicInfo= true;
        this.childFormBasicInfo.name = '';
        this.childFormBasicInfo.isCondition = '';
        this.childFormBasicInfo.orders = '';
        this.childFormBasicInfo.status = '';
        this.childFormBasicInfo.checkbox = '';
        this.childFormBasicInfo.color = '';
        this.childFormBasicInfo.input = '';
        this.childFormBasicInfo.isEnum = '';
        this.childFormBasicInfo.keyword = '';
        this.childFormBasicInfo.required = '';
        this.childFormBasicInfo.sales = '';
      },
      createOneSureSpec() {//新增规格确定
        let self = this
        let requestData = {
          categoryId:self.childFormSpec.categoryId,
          name:self.childFormSpec.name,
          isCondition:self.childFormSpec.isCondition,
          status:1
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.commodit.addCategorySpec(requestData, function (data) {
            self.createOneDependentSpec = false;
            self.$message.success('添加成功');
            let requestData={
              categoryId:self.childFormSpec.categoryId
            };
            self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData,function (data) {
              self.totalCategoriesSpec = data.data;
            })
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消添加'
          });
          self.createOneDependentSpec = false;
        });
      },
      createOneSureBasicInfo() {//新增基本属性确定
        let self = this
        let requestData = {
          categoryId:self.childFormBasicInfo.categoryId,
          checkbox:1,
          color:0,
          input:0,
          isEnum:0,
          keyword:self.childFormBasicInfo.keyword,
          required:1,
          sales:self.childFormBasicInfo.sales,
          name:self.childFormBasicInfo.name,
          orders:self.childFormBasicInfo.orders,
          isCondition:self.childFormBasicInfo.isCondition,
          status:1
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.commodit.addCategoryAttribute(requestData, function (data) {
            self.createOneDependentBasicInfo = false;
            self.$message.success('添加成功');
            let requestData={
              categoryId:self.childFormBasicInfo.categoryId
            };
            self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData,function (data) {
              self.totalCategoriesBasicInfo = data.data;
            })
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加',

          });
          this.createOneDependentBasicInfo = false;
          this.childFormBasicInfo.name = '';
          this.childFormBasicInfo.isCondition = '';
          this.childFormBasicInfo.orders = '';
          this.childFormBasicInfo.status = '';
          this.childFormBasicInfo.checkbox = '';
          this.childFormBasicInfo.color = '';
          this.childFormBasicInfo.input = '';
          this.childFormBasicInfo.isEnum = '';
          this.childFormBasicInfo.keyword = '';
          this.childFormBasicInfo.required = '';
          this.childFormBasicInfo.sales = '';
        });
      },
      createOneDependentBasicInfoFalse(){//新增基本属性取消
        this.createOneDependentBasicInfo = false;
        this.childFormBasicInfo.name = '';
        this.childFormBasicInfo.isCondition = '';
        this.childFormBasicInfo.orders = '';
        this.childFormBasicInfo.status = '';
        this.childFormBasicInfo.checkbox = '';
        this.childFormBasicInfo.color = '';
        this.childFormBasicInfo.input = '';
        this.childFormBasicInfo.isEnum = '';
        this.childFormBasicInfo.keyword = '';
        this.childFormBasicInfo.required = '';
        this.childFormBasicInfo.sales = '';
      },
      deleteNodeSpec(node,now){//规格删除
        if(node.level === 1){
          event.stopPropagation()//阻止冒泡
          let self = this
          let requestData = {
            id:node.data.id
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.deleteCategorySpecById(requestData, function (data) {
              self.$message.success('删除成功');
              let requestData={
                categoryId:self.childFormSpec.categoryId
              };
              self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData,function (data) {
                self.totalCategoriesSpec = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          event.stopPropagation()//阻止冒泡
          let self = this
          let requestData = {
            id:node.data.id
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.deleteCategorySpecItemById(requestData, function (data) {
              self.$message.success('删除成功');
              let requestData={
                categoryId:self.childFormSpec.categoryId
              };
              self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData,function (data) {
                self.totalCategoriesSpec = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }

      },
      deleteNodeBasicInfo(node,row){//属性删除
        if(node.level === 1){
          event.stopPropagation()//阻止冒泡
          let self = this
          let requestData = {
            id:node.data.id
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.deleteCategoryAttributeById(requestData, function (data) {
              self.$message.success('删除成功');
              let requestData={
                categoryId:self.childFormBasicInfo.categoryId
              };
              self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData,function (data) {
                self.totalCategoriesBasicInfo = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          event.stopPropagation()//阻止冒泡
          let self = this
          let requestData = {
            id:node.data.id
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.deleteAttributeItemById(requestData, function (data) {
              self.$message.success('删除成功');
              let requestData={
                categoryId:self.childFormBasicInfo.categoryId
              };
              self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData,function (data) {
                self.totalCategoriesBasicInfo = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }

      },
      updateModalSpec(node,now) {//修改规格弹窗
        console.log('node555',node);
        let self = this;
        self.updateDictionaryClassifySpec = true;
        self.updateFormSpec.id = node.data.id;
        let requestData = {
             id:node.data.id
        };
        self.httpApi.commodit.selectCategorySpecById(requestData,function (data) {
          self.updateFormSpec = data.data;
        })
      },
      updateModalBasicInfo(node,row){//打开修改基本属性弹窗
        let self = this;
        self.updateDictionaryClassifyBasicInfo = true;
        self.updateFormBasicInfo.id = node.data.id;
        let requestData = {
          id:node.data.id
        };
        self.httpApi.commodit.selectCategoryAttributeById(requestData,function (data) {
          self.updateFormBasicInfo = data.data;
        })
      },
      updateSureSpec() {//修改规格确定
        let self = this
        let requestData = {
          categoryId:self.childFormSpec.categoryId,
          id:self.updateFormSpec.id,
          name:self.updateFormSpec.name,
          isCondition:self.updateFormSpec.isCondition,
          status:self.updateFormSpec.status,
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.commodit.updateCategorySpec(requestData, function (data) {
            self.updateDictionaryClassifySpec = false;
            self.$message.success('修改成功');
            let requestData={
              categoryId:self.childFormSpec.categoryId
            };
            self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData,function (data) {
              self.totalCategoriesSpec = data.data;
            })
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消修改'
          });
          self.updateDictionaryClassifySpec = false;
        });
      },
      updateSureBasicInfo() {//修改基本属性确定
        let self = this
        let requestData = {
          categoryId:self.updateFormBasicInfo.categoryId,
          id:self.updateFormBasicInfo.id,
          name:self.updateFormBasicInfo.name,
          isCondition:self.updateFormBasicInfo.isCondition,
          status:self.updateFormBasicInfo.status,
          checkbox:1,
          color:0,
          input:0,
          isEnum:0,
          keyword:self.updateFormBasicInfo.keyword,
          required:1,
          sales:self.updateFormBasicInfo.sales,
          orders:self.updateFormBasicInfo.orders,
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.commodit.updateCategoryAttribute(requestData, function (data) {
            self.updateDictionaryClassifyBasicInfo = false;
            self.$message.success('修改成功');
            let requestData={
              categoryId:self.childFormBasicInfo.categoryId
            };
            self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData,function (data) {
              self.totalCategoriesBasicInfo = data.data;
            })
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消修改'
          });
          self.updateDictionaryClassifyBasicInfo = false;
        });
      },
      openClassButtonSpec(node, data){//规格启用
        if(node.level === 1){//一级规格
          let self = this
          let requestData = {
            id:node.data.id,
            categoryId:node.data.categoryId,
            status:1
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.updateCategorySpecStatus(requestData, function (data) {
              self.$message.success('已启用');
              let requestData={
                categoryId:self.childFormSpec.categoryId
              };
              self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData,function (data) {
                self.totalCategoriesSpec = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用'
            });
          });
        }else{//二级
          let self = this
          let requestData = {
            id:node.data.id,
            categoryId:node.data.categoryId,
            status:1
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.updateCategorySpecItemStatus(requestData, function (data) {
              self.$message.success('已启用');
              let requestData={
                categoryId:self.childFormSpec.categoryId
              };
              self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData,function (data) {
                self.totalCategoriesSpec = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用'
            });
          });
        }

      },
      openClassButtonBasicInfo(node,row){//基本属性启用
        console.log("0000",node);
        if(node.level === 1){
          let self = this
          let requestData = {
            id:node.data.id,
            categoryId:node.data.categoryId,
            status:1
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.updateCategoryAttributeStatus(requestData, function (data) {
              self.$message.success('已启用');
              let requestData={
                categoryId:self.childFormBasicInfo.categoryId
              };
              self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData,function (data) {
                self.totalCategoriesBasicInfo = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用'
            });
          });
        }else{
          let self = this
          let requestData = {
            id:node.data.id,
            categoryId:node.data.categoryId,
            status:1
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.updateAttributeItemStatus(requestData, function (data) {
              self.$message.success('已启用');
              let requestData={
                categoryId:self.childFormBasicInfo.categoryId
              };
              self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData,function (data) {
                self.totalCategoriesBasicInfo = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消启用'
            });
          });
        }
      },
      closeClassButtonSpec(node, data){//规格禁用
        if(node.level === 1){
          let self = this;
          let requestData = {
            id:node.data.id,
            categoryId:node.data.categoryId,
            status:0
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.updateCategorySpecStatus(requestData, function (data) {
              self.$message.success('已禁用');
              let requestData={
                categoryId:self.childFormSpec.categoryId
              };
              self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData,function (data) {
                self.totalCategoriesSpec = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消禁用'
            });
          });
        }else{
          let self = this;
          let requestData = {
            id:node.data.id,
            categoryId:node.data.categoryId,
            status:0
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.updateCategorySpecItemStatus(requestData, function (data) {
              self.$message.success('已禁用');
              let requestData={
                categoryId:self.childFormSpec.categoryId
              };
              self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData,function (data) {
                self.totalCategoriesSpec = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消禁用'
            });
          });
        }
      },
      closeClassButtonBasicInfo(node, data){//基本属性禁用
        console.log('node1',node)
        if(node.level === 1){
          let self = this;
          let requestData = {
            id:node.data.id,
            categoryId:node.data.categoryId,
            status:0
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.updateCategoryAttributeStatus(requestData, function (data) {
              self.$message.success('已禁用');
              let requestData={
                categoryId:self.childFormBasicInfo.categoryId
              };
              self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData,function (data) {
                self.totalCategoriesBasicInfo = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消禁用'
            });
          });
        }else{
          console.log('node2',node)
          let self = this;
          let requestData = {
            id:node.data.id,
            categoryId:node.data.categoryId,
            status:0
          };
          self.$confirm('此操作不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.httpApi.commodit.updateAttributeItemStatus(requestData, function (data) {
              self.$message.success('已禁用');
              let requestData={
                categoryId:self.childFormBasicInfo.categoryId
              };
              self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData,function (data) {
                self.totalCategoriesBasicInfo = data.data;
              })
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消禁用'
            });
          });
        }
      },
      openCreateModalSpec(node,now){//新增规格值弹框
        this.createOneDependentSpecValue = true;
        this.childFormSpecValue.parent = node.data;
        this.childFormSpecValue.name='';
        this.childFormSpecValue.orders='';
      },
      openCreateModalBasicInfo(node,row){//新增基本属性值弹框
        this.createOneDependentBasicInfoValue = true;
        this.childFormBasicInfoValue.parent = node.data;
      },
      createOneSureSpecValue(){//新增规格值弹框确定
        let self = this;
        let requestData = {
          categoryId:self.childFormSpecValue.parent.categoryId,
          specId:self.childFormSpecValue.parent.id,
          name:self.childFormSpecValue.name,
          isCondition:self.childFormSpecValue.parent.isCondition,
          status:self.childFormSpecValue.parent.status,
          orders:self.childFormSpecValue.orders,
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.commodit.addCategorySpecItem(requestData, function (data) {
            self.createOneDependentSpecValue = false;
            self.$message.success('添加成功');
            self.childFormSpecValue.name='';
            self.childFormSpecValue.orders='';
            let requestData={
              categoryId:self.childFormSpec.categoryId
            };
            self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData,function (data) {
              self.totalCategoriesSpec = data.data;
            })
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消添加'
          });
          self.createOneDependentSpecValue = false;
          self.childFormSpecValue.name='';
          self.childFormSpecValue.orders='';
        });
      },
      createOneSureBasicInfoValue(){//新增基本属性值弹框确定
        let self = this;
        let requestData = {
          categoryId:self.childFormBasicInfoValue.parent.categoryId,
          attributeId:self.childFormBasicInfoValue.parent.id,
          name:self.childFormBasicInfoValue.name,
          isCondition:self.childFormBasicInfoValue.parent.isCondition,
          status:self.childFormBasicInfoValue.parent.status,
          orders:self.childFormBasicInfoValue.orders,
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.commodit.addAttributeItem(requestData, function (data) {
            self.createOneDependentBasicInfoValue = false;
            self.$message.success('添加成功');
            self.childFormBasicInfoValue.name='';
            self.childFormBasicInfoValue.orders='';
            let requestData={
              categoryId:self.childFormBasicInfo.categoryId
            };
            self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData,function (data) {
              self.totalCategoriesBasicInfo = data.data;
            })
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消添加'
          });
          self.createOneDependentBasicInfoValue = false;
          this.childFormBasicInfoValue.name='';
          this.childFormBasicInfoValue.orders='';
        });
      },
      createOneDependentBasicInfoValueFalse(){//新增基本属性值弹框取消
        this.createOneDependentBasicInfoValue = false;
        this.childFormBasicInfoValue.name='';
        this.childFormBasicInfoValue.orders='';
      },
    },
  };
</script>
