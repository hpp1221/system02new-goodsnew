<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">修改商品详情</h3>
      <el-tabs v-model="tabName">
        <el-tab-pane label="修改sku" name="first">
          <el-form ref="form" :model="form" class="request-form" label-width="120px">
            <h4 class="item-title">基础信息</h4>
            <el-form-item label="商品名称">
              {{form.name}}
            </el-form-item>
            <el-form-item label="商品品牌">
              {{form.brandName}}
            </el-form-item>
            <el-form-item label="商品分类">
              {{form.catName}}
            </el-form-item>
            <el-form-item label="计量单位">
              {{form.unit}}
            </el-form-item>
            <el-form-item label="关键字">
              {{form.keyword}}
            </el-form-item>
            <el-form-item label="所属供应商名称">
              {{form.supplierName}}
            </el-form-item>

            <h4 class="item-title">商品规格</h4>

            <el-form-item label="商品规格">
              <div v-for="(s,sindex) in form.spec">
                {{s.specName}}:
                <el-tag
                  :key="v.name"
                  v-for="v in s.specValue"
                  :closable="false"
                  :close-transition="false"
                  @close="handleClose(v,sindex)"
                  style="margin-left: 10px">
                  {{v}}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item>
              <el-table
                :data="form.skus"
                border
                v-if="form.skus.length > 0"
                style="width: 100%">
                <el-table-column
                  label="主图"
                  width="180">
                  <template slot-scope="scope">
                    <uploadoneimg
                      :fileList="scope.row.img"
                      @getFileList="getSkuImg"
                      @click.native="rememberIndex(scope)"
>
                    </uploadoneimg>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="s.specName"
                  width="180"
                  v-for="s in form.spec"
                  :key="s.specName">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.sku[s.specName]}}</span>
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
              <img v-lazy="f.url" v-for="f in form.goodsExtend.imgs"
                   style="width: 160px;height: 160px;margin-left: 10px">
            </el-form-item>
            <h4 class="item-title">商品描述</h4>
            <el-form-item>
              <VueEditor
                ueditorPath="../../static/ueditor1_4_3_3-utf8-net"
                @ready="editorReady"
                style="width:100%;height:300px"
                :ueditorConfig="editorConfig1"
                v-if="form.name">
              </VueEditor>
            </el-form-item>
            <h4 class="item-title">添加附件</h4>
            <el-form-item>
              <uploadfiles
                :fileList="form.goodsExtend.annex"
                @getFileList="getAnnex"
                :disabled="true">
              </uploadfiles>
            </el-form-item>
            <el-form-item>
              <el-button @click="updateSku">保存</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改商品" name="second">
          <el-form ref="goodsForm" :model="goodsForm" class="request-form" label-width="120px">
            <h4 class="item-title">基础信息</h4>
            <el-form-item label="商品名称">
              <el-input placeholder="请输入商品名称" v-model="goodsForm.name" class="form-input">
              </el-input>
            </el-form-item>
            <el-form-item label="商品品牌">
              <brandselect
                :outBrand="goodsForm.brand"
                @getBrandSelect="getGoodsFormBrandSelect"
                :isClickFetch="false"
                v-if="goodsForm.id"
                :selectAllVisible="false">
              </brandselect>
            </el-form-item>
            <el-form-item label="商品分类">
              <catselect
                @getCatSelect="getGoodsFormCatSelect"
                :outCat="goodsForm.cat"
                v-if="goodsForm.id"
              >
              </catselect>
            </el-form-item>
            <el-form-item label="计量单位">
              <unitselect
                @getUnitSelect="getGoodsFormUnitSelect"
                :outUnit="goodsForm.unit"
                :isClickFetch="false"
                v-if="goodsForm.id"
                :selectAllVisible="false">
              </unitselect>
            </el-form-item>
            <el-form-item label="关键字">
              <el-input placeholder="搜索关键字" class="form-input" v-model="goodsForm.keyword"></el-input>
            </el-form-item>
            <el-form-item label="所属供应商名称">
              {{goodsForm.supplierName}}
            </el-form-item>

            <h4 class="item-title">商品规格</h4>

            <el-form-item label="商品规格">
              <div v-for="(s,sindex) in goodsForm.spec">
                {{s.specName}}
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
                :data="goodsForm.skus"
                border
                v-if="goodsForm.skus.length > 0">
                <el-table-column
                  label="主图"
                  width="160">
                  <template slot-scope="scope">
                    <uploadoneimg
                      :fileList="scope.row.img"
                      @getFileList="getSkuImg2"
                      @click.native="rememberIndex(scope)">
                    </uploadoneimg>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="s.specName"
                  v-for="s in goodsForm.spec"
                  :key="s.specName">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.sku[s.specName]}}</span>
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
                :fileList="goodsForm.goodsExtend.imgs"
                @getFileList="getFileList2"
                @removeFile="removeFileList">
              </uploadmultipleimg>
            </el-form-item>
            <h4 class="item-title">商品描述</h4>
            <el-form-item>
              <VueEditor
                ueditorPath="../../static/ueditor1_4_3_3-utf8-net"
                @ready="editorReady2"
                style="width:500px;height:300px"
                :ueditorConfig="editorConfig2"
                v-if="goodsForm.name">
              </VueEditor>
            </el-form-item>
            <h4 class="item-title">添加附件</h4>
            <el-form-item>
              <uploadfiles
                :fileList="goodsForm.goodsExtend.annex"
                @getFileList="getAnnex2"
                @removeFile="removeAnnex">
              </uploadfiles>
            </el-form-item>
            <el-form-item>
              <el-button @click="updateGoods">创建</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
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
          brandName: '',
          brandId: '',
          spec: [],
          cat: [],
          catId: '',
          catName: '',
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
          }
        },
        goodsForm: {
          id: '',
          name: '',
          brand: '',
          brandName: '',
          brandId: '',
          spec: [],
          cat: [],
          catId: '',
          catName: '',
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
          }
        },
        inputValue: '',
        goodsTags: [],//商品标签
        editorConfig1: {
          readonly: true
        },//编辑器配置
        editorConfig2: {},
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        totalCategories: [],
        tabName: 'first',//当前选中的tab
        skuImgIndex: 0,
        imgToken: '',
        getCat: false,//是否获取过cat数据
        originCat: ''
      }
    },
    components: {
      'uploadmultipleimg': require('../../components/uploadmultipleimg'),
      'uploadfiles': require('../../components/uploadfiles'),
      'uploadoneimg': require('../../components/uploadoneimg'),
      'brandselect': require('../../components/getbrandselect'),
      'unitselect': require('../../components/getunitselect'),
      'catselect': require('../../components/getcatselect'),
    },
    watch: {
      tabName: function (newVal, oldVal) {
        if (newVal === 'first') {
          this.select(this.$route.params.id);
        } else if (newVal === 'second') {
          this.selectGoods(this.$route.params.goodsId);
        }
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
      let self = this;
      self.getTagList(function (data) {
        self.goodsTags = data;
      });//获取标签列表
      //获取分类列表
    },
    methods: {
      getSupplierSelect(e){
        this.goodsForm.supplier = e.supplier;
        this.goodsForm.supplierName = e.supplierName;
        this.goodsForm.supplierId = e.supplierId;
      },
      getGoodsFormBrandSelect(e){//修改商品品牌select
        this.goodsForm.brand = e.brand;
        this.goodsForm.brandName = e.brandName;
        this.goodsForm.brandId = e.brandId;
      },
      getGoodsFormUnitSelect(e){
        this.goodsForm.unit = e;
      },
      getGoodsFormCatSelect(e){
        this.goodsForm.cat = e.cat;
        this.goodsForm.catName = e.catName;
        this.goodsForm.catId = e.catId;
      },
      getFileList(file){//sku，商品图片
        this.form.goodsExtend.imgs.push(file);
      },
      getFileList2(file){//商品，商品图片
        this.goodsForm.goodsExtend.imgs.push(file);
      },
      removeFileList(file){//商品移除某商品图片
        this.goodsForm.goodsExtend.imgs.splice(file, 1);
      },
      getAnnex(file){//sku，附件
        this.form.goodsExtend.annex.push(file);
      },
      getAnnex2(file){//商品，附件
        this.goodsForm.goodsExtend.annex.push(file);
      },
      removeAnnex(file){//商品移除某附件
        this.goodsForm.goodsExtend.annex.splice(file, 1);
      },
      getSkuImg(file){//sku,sku图片
        console.log(this.form.skus[this.skuImgIndex].img)
        console.log(file.url)
        this.form.skus[this.skuImgIndex].img = file.url;
      },
      getSkuImg2(file){//商品,sku图片
        this.goodsForm.skus[this.skuImgIndex].img = file.url;
      },
      rememberIndex(scope){//点击sku图片记录index
        this.skuImgIndex = scope.$index;
      },
      select(skuId){
        let self = this;
        let requestData = {token: window.localStorage.getItem('token'), skuId: skuId};
        self.httpApi.goods.goodsDetail(requestData, function (data) {
          self.form = self.formPass(self.form, data.data);
          self.form.spec = JSON.parse(self.form.spec);
          self.form.brand = JSON.parse(self.form.brand);

          self.form.goodsExtend.annex = JSON.parse(self.form.goodsExtend.annex);
          self.form.goodsExtend.imgs = JSON.parse(self.form.goodsExtend.imgs);
          self.form.skus = JSON.parse(self.form.skus);
          self.form.skus[0].sku = JSON.parse(self.form.skus[0].sku);
          console.log(self.form)
        });
      },
      clickCat(){
        if (!this.getCat) {
          this.getCatList();
        }
      },
      selectGoods(goodsId){
        let self = this;
        let requestData = {token: window.localStorage.getItem('token'), goodsId: goodsId};
        self.httpApi.goods.showGoodsDetail(requestData, function (data) {
          self.goodsForm = self.formPass(self.goodsForm, data.data);
          self.goodsForm.spec = JSON.parse(self.goodsForm.spec);
          self.goodsForm.brand = JSON.parse(self.goodsForm.brand);
          // self.originCat = [JSON.parse(self.goodsForm.cat)];
//          let cat = JSON.parse(self.goodsForm.cat);
//
//          cat.res = cat;
//          self.totalCategories = [cat];
          self.goodsForm.cat = JSON.parse(self.goodsForm.cat);
          self.goodsForm.goodsExtend.annex = JSON.parse(self.goodsForm.goodsExtend.annex);
          self.goodsForm.goodsExtend.imgs = JSON.parse(self.goodsForm.goodsExtend.imgs);
          self.goodsForm.skus = JSON.parse(self.goodsForm.skus);
          for (let i = 0; i < self.goodsForm.skus.length; i++) {
            self.goodsForm.skus[i].sku = JSON.parse(self.goodsForm.skus[i].sku);
          }
        });
      },
      editorReady(editorInstance){//修改sku ueditor初始化
        editorInstance.setContent(this.form.goodsExtend.content);
        editorInstance.addListener('contentChange', () => {
          this.form.goodsExtend.content = editorInstance.getContent()
        });
      },
      editorReady2(editorInstance){//修改商品ueditor初始化
        editorInstance.setContent(this.goodsForm.goodsExtend.content);
        editorInstance.addListener('contentChange', () => {
          this.goodsForm.goodsExtend.content = editorInstance.getContent()
        });
      },
      cancel(){
        this.$router.push('/goods/goodslist');
      },
      updateSku(){//修改sku
        let self = this;
        let requestData = {token: window.localStorage.getItem('token'), skuInfo: JSON.stringify(self.form.skus)};
        self.httpApi.goods.editSku(requestData, function (data) {
          self.$router.push('/goods/goodslist');
        });
      },
      updateGoods(){//修改商品
        let self = this;
        if (!(self.goodsForm.cat instanceof Array)) {
          self.goodsForm.cat = [self.goodsForm.cat];
        }
        let requestData = {token: window.localStorage.getItem('token'), goodsInfo: JSON.stringify(self.goodsForm)};
        self.httpApi.goods.editGoods(requestData, function (data) {
          self.$router.push('/goods/goodslist');
        });
      },
    }
  }
</script>
