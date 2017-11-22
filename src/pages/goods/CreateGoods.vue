<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">新增商品</h3>
      <el-tabs v-model="activeName">
        <el-tab-pane label="创建商品" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="120px">
            <h4 class="item-title">基础信息</h4>
            <el-form-item label="商品名称">
              <el-input placeholder="请输入商品名称" v-model="form.name" class="form-input">
              </el-input>
            </el-form-item>
            <el-form-item label="商品品牌">
              <brandselect @getBrandSelect="getBrandSelect" :selectAllVisible="false"></brandselect>
            </el-form-item>
            <el-form-item label="商品分类">
              <catselect @getCatSelect="getCatSelect"></catselect>
            </el-form-item>
            <el-form-item label="计量单位">
              <unitselect @getUnitSelect="getUnitSelect" :selectAllVisible="false"></unitselect>
            </el-form-item>

            <h4 class="item-title">商品规格</h4>

            <el-form-item label="商品规格">
              <el-button class="button-new-tag" size="small" @click="addSpec">添加规格</el-button>
              <div v-for="(s,sindex) in form.spec" style="margin-top: 10px;">
                <i class="el-icon-minus" @click="deleteSpec(sindex)"></i>
                <el-input class="form-input" placeholder="请输入规格名称" v-model="s.specName" size="mini"></el-input>
                <el-tag
                  :key="v.name"

                  v-for="v in s.specValue"
                  :closable="true"
                  :close-transition="false"
                  @close="handleClose(v,sindex)"
                  style="margin-left: 10px;">
                  {{v}}
                </el-tag>
                <el-input
                  class="form-input"
                  v-if="s.inputVisible"
                  v-model="inputValue"
                  size="mini"
                  placeholder="请输入规格属性"
                  @keyup.enter.native="handleInputConfirm(s)"
                  @blur="handleInputConfirm(s)">
                </el-input>
                <el-button v-else size="small" @click="showInput(sindex)">添加属性</el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-table
                :data="form.skus"
                v-if="form.skus.length > 0"
              >
                <el-table-column
                  label="主图"
                  width="160">
                  <template slot-scope="scope">
                    <uploadoneimg
                      :fileList="scope.row.img"
                      @getFileList="getSkuImg"
                      @click.native="rememberIndex(scope)">
                    </uploadoneimg>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="s.specName"
                  width="80"
                  v-for="s in form.spec"
                  :key="s.specName">
                  <template slot-scope="scope">
                    <span>{{scope.row.sku[s.specName]}}</span>
                  </template>
                </el-table-column>


                <el-table-column
                  label="商品编码"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.number">

                    </el-input>
                  </template>
                </el-table-column>

                <el-table-column
                  label="条形码"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.barCode">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="关键字"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.title" placeholder="搜索关键字">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="市场价格"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.marketPrice">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="参考成本价"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="库存数量"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.count">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="是否上架"
                  width="180">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isUp" true-label="1" false-label="0"></el-checkbox>
                  </template>
                </el-table-column>
              </el-table>

            </el-form-item>

            <h4 class="item-title">商品图片</h4>
            <el-form-item>
              <uploadmultipleimg
                :fileList="form.goodsExtend.imgs"
                @getFileList="getFileList">
              </uploadmultipleimg>
            </el-form-item>
            <h4 class="item-title">商品描述</h4>
            <el-form-item>
              <VueEditor
                ueditorPath="../../static/ueditor1_4_3_3-utf8-net"
                @ready="editorReady"
                style="width:500px;height:300px"
                :ueditorConfig="editorConfig">
              </VueEditor>
            </el-form-item>
            <h4 class="item-title">扩展属性</h4>
            <el-form-item>
              <!--<div v-for="(s,sindex) in form.spec" style="margin-top: 10px;">-->
              <!--<i class="el-icon-plus"></i>-->
              <!--<el-button class="button-new-tag" size="small" @click="add">添加属性</el-button>-->
              <!--<el-input class="form-input" size="small" v-model="form.goodsExtend.annex.name" ></el-input>-->
              <!--<el-input size="small" class="form-input" v-model="form.goodsExtend.annex.value" ></el-input>-->
              <ul>
                <i class="el-icon-plus" @click="button1"></i>
                <li v-for="item in form.goodsExtend.annex">

                  <el-button class="item.num1" v-if="item.check1" @click="button2">添加属性</el-button>
                  <el-input type="text" class="item.num1 form-input" v-if="item.check2" v-model="item.name" placeholder="请输入属性名称"></el-input>
                  <el-input type="text" class="item.num1 form-input" v-if="item.check2"v-model="item.value" placeholder="请输入属性值"></el-input>
                </li>
              </ul>
              <!--</div>-->
            </el-form-item>
            <el-form-item>
              <el-button @click="submit" type="primary">创建</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!--<el-dialog title="新增扩展属性" :visible.sync="dictionaryUnitCreate">-->
      <!--<el-form :model="form.goodsExtend.annex">-->
      <!--<el-form-item label="属性名称" :label-width="formLabelWidth" >-->
      <!--<el-input v-model="form.goodsExtend.annex.name"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="属性值" :label-width="formLabelWidth">-->
      <!--<el-input v-model="form.goodsExtend.annex.value"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
      <!--<el-button type="primary" @click="createSure">确 定</el-button>-->
      <!--<el-button @click="dictionaryUnitCreate = false">取 消</el-button>-->
      <!--</div>-->
      <!--</el-dialog>-->
    </div>
  </div>
</template>

<script>
  //  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  export default{
    data(){
      return {
        form: {
          name: '',
          brand: '',
          brandName: '',
          brandId: '',
          cat: [],
          catId: '',
          catName: '',
          unit: '',
          spec: [],
          skus: [],
          goodsExtend: {
            imgs: [],
            content: '',
            annex: [{
              name:'',
              value:'',
              check1:false,
              check2:true
            }]
          },
          isPlatform: 0//是否为平台商品，1是0否
        },
        rules: {},
        inputValue: '',
        editorInstance: {},//编辑器实例
        editorConfig: {},//编辑器配置
        activeName: 'first',
        skuImgIndex: 0,
        originCat: '',
        dictionaryUnitCreate:false,
        formLabelWidth: '80px',

      }
    },
    watch: {
      'form.spec': {
        handler: function (val, oldVal) {
          this.form.skus = [];
          this.createGoodsDetail({}, 0);
        },
        // 深度观察
        deep: true
      }

    },
    components: {
      'uploadmultipleimg': require('../../components/uploadmultipleimg'),
      'uploadoneimg': require('../../components/uploadoneimg'),
      'brandselect': require('../../components/getbrandselect'),
      'unitselect': require('../../components/getunitselect'),
      'catselect': require('../../components/getcatselect'),
    },
    created(){
    },
    methods: {
      button2(){
        this.form.goodsExtend.annex.check1 = false;
        this.form.goodsExtend.annex.check2 = true
      },
      button1(){
        this.form.goodsExtend.annex.push({name: '',value:'',check1:false,check2:true});
      },
//      add(){
//        this.dictionaryUnitCreate = true;
//        this.form.goodsExtend.annex.push({name: '',value:''});
//      },
//      createSure(){
//        this.dictionaryUnitCreate = false
//      },
      getBrandSelect(e){//创建商品品牌获取
        this.form.brand = e.brand;
        this.form.brandName = e.brandName;
        this.form.brandId = e.brandId;
      },
      getUnitSelect(e){//创建商品单位获取
        this.form.unit = e;
      },
      getCatSelect(e){
        this.form.cat = e.cat;
        this.form.catName = e.catName;
        this.form.catId = e.catId;
      },
      getFileList(file){//商品图片
        this.form.goodsExtend.imgs.push(file);
      },
      getSkuImg(file){//sku图片
        console.log(file.url)
        this.form.skus[this.skuImgIndex].img = file.url;
      },
      rememberIndex(scope){//点击sku图片记录index
        this.skuImgIndex = scope.$index;
      },
      cancel(){
        this.$router.push('/goods/goodslist');
      },
      editorReady(editorInstance){
        editorInstance.setContent(this.form.goodsExtend.content);
        editorInstance.addListener('contentChange', () => {
          this.form.goodsExtend.content = editorInstance.getContent()
        });
      },
      createGoodsDetail(tableMap, index){
        let size = this.form.spec.length;
        let tableKey = this.form.spec[index].specName;
        for (let i = 0; i < this.form.spec[index].specValue.length; i++) {//颜色
          tableMap[tableKey] = this.form.spec[index].specValue[i];

        if (index < size - 1) {
          index++;
          this.createGoodsDetail(tableMap, index);
          index--;
        } else {
          let singleSku = {
            sku: {},
            marketPrice: '',
            price: '',
            img: '',
            number: '',
            barCode: '',
            isUp: 0,
            count:'',
            title:''
          };
          singleSku.sku = tableMap;
          this.form.skus.push(JSON.parse(JSON.stringify(singleSku)));
        }
        }
      },
      submit(){//新增
        let self = this;
        for (let i = 0; i < self.form.spec.length; i++) {//商品规格
          self.$delete(self.form.spec[i], 'inputVisible');
        }
//        for(let i = 0;i<self.form.goodsSkuList.length;i++){
//          self.form.goodsSkuList[i].sku = JSON.stringify(self.form.goodsSkuList[i].sku)
//        }
        self.form.cat = JSON.stringify(self.form.cat)
        self.form.spec = JSON.stringify(self.form.spec)
        self.form.skus = JSON.stringify(self.form.skus)
        self.form.goodsExtend.annex = JSON.stringify(self.form.goodsExtend.annex)
        self.form.goodsExtend.imgs = JSON.stringify(self.form.goodsExtend.imgs)
        self.form.brandId = "12345623"
        self.form.brandName = "大夫人"
        self.form.brand = [{brandId:'12345623',brandName:'大夫人'}]
        self.form.brand = JSON.stringify(self.form.brand)
        let requestData = {
          goodsInfo: self.form,
        };
//        for(let i = 0;i<self.form.goodsSkuList.length;i++){
//          requestData.goodsInfo.goodsSkuList[i].sku = JSON.stringify(requestData.goodsInfo.goodsSkuList[i].sku)
//        }
//        requestData.goodsInfo.cat = JSON.stringify(requestData.goodsInfo.cat)
//        requestData.goodsInfo.spec = JSON.stringify(requestData.goodsInfo.spec)
//        requestData.goodsInfo.goodsExtend.annex = JSON.stringify(requestData.goodsInfo.goodsExtend.annex)
//        requestData.goodsInfo.goodsExtend.imgs = JSON.stringify(requestData.goodsInfo.goodsExtend.imgs)
        self.httpApi.goods.addGoods(requestData, function (data) {
          self.$router.push('/goods/goodslist');

        });
      },
      addSpec(){//添加规格
        this.form.spec.push({specName: '', specValue: [], inputVisible: false});
      },
      showInput(index) {//显示规格输入框
        this.form.spec[index].inputVisible = true;
      },
      handleInputConfirm(s){//规格属性确定
        let inputValue = this.inputValue;
        if (inputValue) {
          s.specValue.push(this.inputValue);
        }
        s.inputVisible = false;
        this.inputValue = '';
      },
      handleClose(tag, index){//删除某规格属性
        this.form.spec[index].specValue.splice(this.form.spec[index].specValue.indexOf(tag), 1);
      },
      deleteSpec(sindex){//删除一条规格
        this.form.spec.splice(sindex, 1);
      },

    }
  }
</script>
