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
              <el-select placeholder="请选择商品品牌" v-model="form.brand" value-key="brandId">
                <el-option :label="t.brandName" :value="t" :key="t.brandName" v-for="t in totalBrandList"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                :options="totalCategories"
                v-model="form.cat"
                @active-item-change="getCatList"
                :show-all-levels="false"
                :props="props">
              </el-cascader>
              <!--<el-select v-model="form.cat" placeholder="请选择商品分类" value-key="id">
                                <el-option v-for="t in totalCategories"
                                    :key="t.id"
                                    :label="t.name"
                                    :value="t">
                                </el-option>
                            </el-select>-->
            </el-form-item>
            <el-form-item label="计量单位">
              <el-select v-model="form.unit">
                <el-option v-for="u in totalUnitList" :key="u.id" :label="u.name" :value="u.name">

                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字">
              <el-input placeholder="搜索关键字" class="form-input" v-model="form.keyword"></el-input>
            </el-form-item>
            <el-form-item label="所属供应商名称">
              <el-select v-model="form.supplier" value-key="supplierId">
                <el-option v-for="u in totalSupplierList" :key="u.supplierId" :label="u.name" :value="u">

                </el-option>
              </el-select>
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
                      @click.native="rememberIndex(scope)"
                      :token="imgToken"
                      v-if="imgToken"
                    >
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
                  label="是否上架"
                  width="180">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isUp" true-label="1" false-label="0"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  label="商品标签"
                  width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.tagList" value-key="id" multiple>
                      <el-option :label="t.name" v-for="t in goodsTags" :key="t.id" :value="t"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>

            <h4 class="item-title">商品图片</h4>
            <el-form-item>
              <uploadmultipleimg
                :fileList="form.goodsExtend.imgs"
                @getFileList="getFileList"
                :token="imgToken"
                v-if="imgToken">
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
            <h4 class="item-title">添加附件</h4>
            <el-form-item>
              <uploadfiles
                :fileList="form.goodsExtend.annex"
                @getFileList="getAnnex"
                :token="imgToken"
                v-if="imgToken">
              </uploadfiles>
            </el-form-item>
            <el-form-item>
              <el-button @click="submit" type="primary">创建</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="引入平台商品" name="second">
          <el-button @click="exportGoods" style="margin-bottom: 20px;">引入</el-button>
          <el-form ref="exportForm" :model="exportForm" class="request-form" label-width="120px" v-if="exportForm.name">
            <h4 class="item-title">基础信息</h4>
            <el-form-item label="商品名称">
              <el-input placeholder="请输入商品名称" v-model="exportForm.name" class="form-input" disabled>
              </el-input>
            </el-form-item>
            <el-form-item label="商品品牌">
              <el-select placeholder="请选择商品品牌" v-model="exportForm.brand" value-key="brandId">
                <el-option :label="t.brandName" :value="t" :key="t.brandName" v-for="t in totalBrandList"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                :options="totalCategories"
                v-model="exportForm.cat"
                @active-item-change="getCatList"
                :show-all-levels="false"
                :props="props">
              </el-cascader>
              <!--<el-select v-model="form.cat" placeholder="请选择商品分类" value-key="id">
                                <el-option v-for="t in totalCategories"
                                    :key="t.id"
                                    :label="t.name"
                                    :value="t">
                                </el-option>
                            </el-select>-->
            </el-form-item>
            <el-form-item label="计量单位">
              <el-select v-model="exportForm.unit">
                <el-option v-for="u in totalUnitList" :key="u.id" :label="u.name" :value="u.name">

                </el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="商品品牌">-->
            <!--<el-select placeholder="请选择商品品牌" v-model="exportForm.brand" value-key="brandId" disabled>-->
            <!--<el-option :label="t.brandName" :value="t" :key="t.brandName" v-for="t in totalBrandList"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="商品分类">-->
            <!--<el-cascader-->
            <!--:options="totalCategories"-->
            <!--v-model="exportForm.cat"-->
            <!--@active-item-change="getCatList"-->
            <!--@click.native="clickCat"-->
            <!--disabled-->
            <!--:show-all-levels="false"-->
            <!--:props="props">-->
            <!--</el-cascader>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="计量单位">-->
            <!--<el-select v-model="exportForm.unit" disabled>-->
            <!--<el-option v-for="u in totalUnitList" :key="u.id" :label="u.name" :value="u.name">-->

            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="关键字">
              <el-input placeholder="搜索关键字" class="form-input" v-model="exportForm.keyword"></el-input>
            </el-form-item>
            <el-form-item label="所属供应商名称">
              <el-select v-model="exportForm.supplierName" disabled>
                <el-option v-for="u in totalSupplierList" :key="u.supplierId" :label="u.name" :value="u.name">

                </el-option>
              </el-select>
            </el-form-item>

            <h4 class="item-title">商品规格</h4>

            <el-form-item label="商品规格">
              <div v-for="(s,sindex) in exportForm.spec" style="margin-top: 10px;">
                <el-input class="form-input" placeholder="请输入规格名称" v-model="s.specName" disabled></el-input>
                <el-tag
                  :key="v.name"
                  v-for="v in s.specValue"
                  :closable="false"
                  :close-transition="false"
                  @close="handleClose(v,sindex)"
                  style="margin-left: 10px"
                >
                  {{v}}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item>
              <el-table
                :data="exportForm.skus"
                border
                v-if="exportForm.skus.length > 0"
                style="width: 100%">
                <el-table-column
                  label="主图"
                  width="160">
                  <template slot-scope="scope">
                    <uploadoneimg
                      :fileList="scope.row.img"
                      @click.native="rememberIndex(scope)"
                      :disabled="true"
                      :token="imgToken"
                      v-if="imgToken">
                    </uploadoneimg>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="s.specName"
                  width="80"
                  v-for="s in exportForm.spec"
                  :key="s.specName">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.sku[s.specName]}}</span>
                  </template>
                </el-table-column>


                <el-table-column
                  label="商品编码"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.number" disabled>

                    </el-input>
                  </template>
                </el-table-column>

                <el-table-column
                  label="条形码"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.barCode" disabled>

                    </el-input>
                  </template>
                </el-table-column>

                <el-table-column
                  label="市场价格"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.marketPrice" disabled>

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="参考成本价"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price" disabled>

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="是否上架"
                  width="180">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isUp" true-label="1" false-label="0" disabled></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  label="商品标签"
                  width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.tagList" value-key="id" multiple disabled>
                      <el-option :label="t.name" v-for="t in goodsTags" :key="t.id" :value="t"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>

            <h4 class="item-title">商品图片</h4>
            <el-form-item>
              <uploadmultipleimg
                :fileList="exportForm.goodsExtend.imgs"
                :disabled="true"
                :token="imgToken"
                v-if="imgToken">
              </uploadmultipleimg>
            </el-form-item>
            <h4 class="item-title">商品描述</h4>
            <el-form-item>
              <VueEditor
                ueditorPath="../../static/ueditor1_4_3_3-utf8-net"
                @ready="editorReady2"
                style="width:500px;height:300px"
                :ueditorConfig="editorConfig2"
                v-if="exportForm.name">
              </VueEditor>
            </el-form-item>
            <h4 class="item-title">添加附件</h4>
            <el-form-item>
              <uploadfiles
                :fileList="exportForm.goodsExtend.annex"
                :disabled="true"
                :token="imgToken"
                v-if="imgToken">
              </uploadfiles>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitExportGoods">创建</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <el-dialog title="引入商品" :visible.sync="exportGoodsVisible">
        <el-table :data="exportGoodsList">
          <el-table-column label="商品名称" prop="name">

          </el-table-column>
          <el-table-column label="商品品牌" prop="brandName">

          </el-table-column>
          <el-table-column label="商品分类" prop="catName">

          </el-table-column>
          <el-table-column label="商品单位" prop="unit">

          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button @click="sureExport(scope.row.id)">引入</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        form: {
          name: '',
          brand: '',
          cat: [],
          unit: '',
          keyword: '',
          supplier: '',
          supplierName: '',
          supplierId: '',
          spec: [],
          skus: [],
          goodsExtend: {
            imgs: [],
            content: '',
            annex: []
          },
          isPlatform: 0//是否为平台商品，1是0否
        },
        exportForm: {
          id: '',
          name: '',
          brand: '',
          spec: [],
          cat: [],
          unit: '',
          skus: [],
          supplier: '',
          supplierName: '',
          supplierId: '',
          keyword: '',
          goodsSkuList: [],
          tags: [],
          goodsExtend: {
            imgs: [],
            content: '',
            annex: []
          },
          isPlatForm: 0
        },
        rules: {},
        inputValue: '',
        goodsTags: [],//商品标签
        editorInstance: {},//编辑器实例
        editorConfig: {},//编辑器配置
        editorConfig2: {readonly: true},//编辑器配置
        totalCategories: [],
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        totalBrandList: [],
        totalUnitList: [],
        totalSupplierList: [],
        exportGoodsVisible: false,//导入商品
        exportGoodsList: [],
        activeName: 'first',
        skuImgIndex: 0,
        imgToken: '',
        originCat: ''
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
      'uploadfiles': require('../../components/uploadfiles'),
      'uploadoneimg': require('../../components/uploadoneimg'),
    },
    created(){
      let self = this;
      self.getBrandList(function (data) {
        console.log('brand', data)
        self.totalBrandList = data;
      });//获取品牌列表
      self.getTagList(function (data) {
        self.goodsTags = data;
      });//获取标签列表
      self.getImgAccess(function (data) {
        self.imgToken = data;
      });//获取图片token
      self.getUnitList(function (data) {
        self.totalUnitList = data.list;
      });
      self.getSupplierList(function (data) {
        console.log('supplier', data)
        self.totalSupplierList = data;
      });
      this.getCatList();//获取分类列表
    },
    methods: {
      getFileList(file){//商品图片
        this.form.goodsExtend.imgs.push(file);
      },
      getAnnex(file){//附件
        this.form.goodsExtend.annex.push(file);
      },
      getSkuImg(file){//sku图片
        this.form.skus[this.skuImgIndex].img = file.url;
      },
      rememberIndex(scope){//点击sku图片记录index
        this.skuImgIndex = scope.$index;
      },
      exportGoods(){//引入商品
        let self = this;
        self.exportGoodsVisible = true;
        let requestData = {token: window.localStorage.getItem('token')};
        self.httpApi.goods.showGoodsList(requestData, function (data) {
          self.exportGoodsList = data.data;
        });
      },

      cancel(){
        this.$router.push('/goods/goodslist');
      },
      sureExport(id){//确定引入
        let self = this;
        self.exportGoodsVisible = false;
        let requestData = {token: window.localStorage.getItem('token'), goodsId: id};
        self.httpApi.goods.showGoodsDetail(requestData, function (data) {
          self.exportForm = self.formPass(self.exportForm, data.data);
          self.exportForm.spec = JSON.parse(self.exportForm.spec);
          self.exportForm.brand = '';
          self.exportForm.unit = '';
          self.exportForm.keyword = '';
          //self.originCat = [JSON.parse(self.exportForm.cat)];
          //let cat = JSON.parse(self.exportForm.cat);

          //cat.res = cat;
          // self.totalCategories = [cat];
          self.exportForm.cat = [];
          self.exportForm.goodsExtend.annex = JSON.parse(self.exportForm.goodsExtend.annex);
          self.exportForm.goodsExtend.imgs = JSON.parse(self.exportForm.goodsExtend.imgs);
          self.exportForm.skus = JSON.parse(self.exportForm.skus);
          for (let i = 0; i < self.exportForm.skus.length; i++) {
            self.exportForm.skus[i].sku = JSON.parse(self.exportForm.skus[i].sku);
          }
        });
      },
      editorReady(editorInstance){
        editorInstance.setContent(this.form.goodsExtend.content);
        editorInstance.addListener('contentChange', () => {
          this.form.goodsExtend.content = editorInstance.getContent()
        });
      },
      editorReady2(editorInstance){
        editorInstance.setContent(this.exportForm.goodsExtend.content);
        editorInstance.addListener('contentChange', () => {
          this.exportForm.goodsExtend.content = editorInstance.getContent()
        });
      },
      getCatList(val){
        let self = this;
        var requestData;
        if (val === undefined) {
          requestData = {token: window.localStorage.getItem('token')};
        } else {
          requestData = {token: window.localStorage.getItem('token'), catId: val[val.length - 1].id};
        }
        self.httpApi.goods.catList(requestData, function (data) {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].res = JSON.parse(data.data[i].res);
            if (parseInt(data.data[i].hasChild) > 0) {
              data.data[i].children = [];
            }
          }
          if (val === undefined) {
            self.totalCategories = data.data;
          } else {
            self.insertCat(self.totalCategories, val, data.data, 0);
          }
        });
      },
      insertCat(arr, val, data, level){//val:所有父级的数组,data:当前获取到的数据
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === val[level].id) {
            if (val.length === level + 1) {
              arr[i].children = data;
            } else {
              level++;
              this.insertCat(arr[i].children, val, data, level);
            }
          }
        }
      },
      submit(){
        let self = this;
        self.form.cat = [self.form.cat[self.form.cat.length - 1]];
        for (let i = 0; i < self.form.spec.length; i++) {
          self.$delete(self.form.spec[i], 'inputVisible');
        }
        self.form.supplierId = self.form.supplier.supplierId;
        self.form.supplierName = self.form.supplier.name;
        let requestData = {token: window.localStorage.getItem('token'), goodsInfo: JSON.stringify(self.form)};
        self.httpApi.goods.addGoods(requestData, function (data) {
          self.$router.push('/goods/goodslist');
        });
      },
      submitExportGoods(){//提交引入的商品
        let self = this;
        console.log(self.exportForm)
        self.exportForm.isPlatForm = 0;
        let requestData = {token: window.localStorage.getItem('token'), goodsInfo: JSON.stringify(self.exportForm)};
        //requestData = Object.assign(requestData,self.shallowCopy(self.form));
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
              tagList: []
            };
            singleSku.sku = tableMap;
            this.form.skus.push(JSON.parse(JSON.stringify(singleSku)));
          }
        }
      },
    }
  }
</script>
