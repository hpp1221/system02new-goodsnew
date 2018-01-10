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

            <h4 class="item-title">商品规格</h4>

            <el-form-item label="商品规格">
              <div v-for="(s,sindex) in form.spec" :key="s.specName">
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
                  width="250">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.number" :disabled="true">

                    </el-input>
                  </template>
                </el-table-column>

                <el-table-column
                  label="条形码"
                  width="250">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.barCode">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="关键字"
                  width="250">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.title">

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
                  label="建议零售价"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.retailPrice">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="起订量"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.mustBuyNum">

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
              <img v-lazy="f.url" v-for="f in form.goodsExtend.imgs" :key="f.url"
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
            <h4 class="item-title">扩展属性</h4>
            <el-form-item v-for="item in form.goodsExtend.annex" :key="item.name">
              属性名称 : <el-input v-model="item.name" class="form-input" style="padding:0px 10px" :disabled="true"></el-input>
              属性值 : <el-input v-model="item.value" class="form-input" style="padding:0px 10px" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="updateSku">保存</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改商品" name="second">
          <el-form ref="goodsForm" :model="goodsForm" class="request-form" label-width="120px" inline v-if="goodsForm.id">
            <h4 class="item-title">基础信息</h4>
            <el-form-item label="商品名称" style="margin-right: 210px">
              <el-input placeholder="请输入商品名称" v-model="goodsForm.name" class="form-input" style="margin:0;width:350px;">
              </el-input>
            </el-form-item>
            <el-form-item label="商品品牌" style="margin-right: 210px">
              <!--{{goodsForm.brandName}}-->
              <brandselect
                @getBrandSelect="getGoodsFormBrandSelect"
                :outBrand="goodsForm.brand"
                :isClickFetch="false"
                style="margin:0;width:350px;">
              </brandselect>
              <!--<el-select v-model="goodsForm.brandName" filterable placeholder="请选择" style="margin:0;width:350px;">-->
              <!--<el-option-->
              <!--v-for="item in brandNameSelectData"-->
              <!--:key="item.brandDealerId"-->
              <!--:label="item.name"-->
              <!--:value="item.name">-->
              <!--</el-option>-->
              <!--</el-select>-->
            </el-form-item>
            <br>
            <!--:key="goodsForm.cat"-->
            <el-form-item label="商品分类" style="margin-right: 210px">
              <catselect
                @getCatSelect="getGoodsFormCatSelect"
                :outCat="goodsForm.cat"
                style="margin:0;width:350px;"
              >
              </catselect>
            </el-form-item>
            <el-form-item label="计量单位" style="margin-right: 210px">
              <unitselect
                @getUnitSelect="getGoodsFormUnitSelect"
                :outUnit="goodsForm.unit"
                :isClickFetch="false"
                :selectAllVisible="false"
                style="margin:0;width:350px;">
              </unitselect>
            </el-form-item>
            <h4 class="item-title">商品规格</h4>
            <el-form-item label="商品规格">
              <div v-for="(s,sindex) in goodsForm.spec" :key="s.specName">
                {{s.specName}}
                <el-tag
                  :key="v.name"
                  v-for="v in s.specValue"
                  :closable="false"
                  :close-transition="false"
                  @close="handleClose(v,sindex)"
                  style="margin-left: 10px;margin-right: 330px;"
                >
                  {{v}}
                </el-tag>

              </div>

            </el-form-item>
            <br>
            <br>
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
                  width="250">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.number" :disabled="true">

                    </el-input>
                  </template>
                </el-table-column>

                <el-table-column
                  label="条形码"
                  width="250">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.barCode">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="关键字"
                  width="250">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.title">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="市场价格"
                  width="140">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.marketPrice">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="参考成本价"
                  width="140">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="建议零售价"
                  width="140">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.retailPrice">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="起订量"
                  width="140">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.mustBuyNum">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="库存数量"
                  width="140">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.count">

                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="是否上架"
                  width="140">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isUp" true-label="1" false-label="0"></el-checkbox>
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
            <h4 class="item-title">扩展属性</h4>
            <!--<el-form-item v-for="item in goodsForm.goodsExtend.annex" :key="item.name">-->
            <!--属性名称 : <el-input v-model="item.name" class="form-input" style="padding:0px 10px"></el-input>-->
            <!--属性值 : <el-input v-model="item.value" class="form-input" style="padding:0px 10px"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item>
              <!--<ul>-->
                <!--<i class="el-icon-plus" @click="button1"></i>-->
                <!--<li v-for="item in goodsForm.goodsExtend.annex" :key="item.value">-->

                  <!--<el-button class="item.num1" v-if="item.check1" @click="button2">添加属性</el-button>-->
                  <!--<el-input type="text" class="item.num1 form-input" v-if="item.check2" v-model="item.name"-->
                            <!--placeholder="请输入属性名称"></el-input>-->
                  <!--<el-input type="text" class="item.num1 form-input" v-if="item.check2" v-model="item.value"-->
                            <!--placeholder="请输入属性值"></el-input>-->
                <!--</li>-->
              <!--</ul>-->
              <ul>
                <i class="el-icon-plus" @click="addOneAnnex"></i> <br>

                <li v-for="(item,index) in goodsForm.goodsExtend.annex">
                  <i class="el-icon-minus" @click="deleteOneAnnex(index)"></i>
                  <!--<el-button class="item.num1" v-if="item.check1" @click="button2">添加属性</el-button>-->
                  <el-input type="text" class="item.num1 form-input" v-model="item.name"
                            placeholder="请输入属性名称"></el-input>
                  <el-input type="text" class="item.num1 form-input" v-model="item.value"
                            placeholder="请输入属性值"></el-input>
                </li>
              </ul>
              <!--</div>-->
            </el-form-item>
            <br>
            <el-form-item>
              <el-button @click="updateGoods">确认</el-button>
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
        brandNameSelectData:[],//商品品牌商

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
          goodsSkuList: [],
          tags: [],
          goodsExtend: {
            imgs: [],
            content: '',
            annex: [],
          }
        },
        goodsForm: {
          brandNewSelectName:'',
          id: '',
          name: '',
          brand: [],
          brandName: '',
          brandId: '',
          spec: [],
          cat: [],
          catId: '',
          catName: '',
          unit: '',
          skus: [],
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
        getCat: false,//是否获取过cat数据
        originCat: ''
      }
    },
    created(){
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');

//      let self = this;
//      self.getTagList(function (data) {
//        self.goodsTags = data;
//      });//获取标签列表
      //获取分类列表
    },
    components: {
      'uploadmultipleimg': require('../../components/uploadmultipleimg'),
      'uploadfiles': require('../../components/uploadfiles'),
      'uploadoneimg': require('../../components/uploadoneimg'),
      'brandselect': require('../../components/getbrandselect'),
      'unitselect': require('../../components/getunitselect'),
      'catselect': require('../../components/getcatselectupdate'),
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
    methods: {
      getGoodsFormBrandSelect(e) {
        this.goodsForm.brand = e.brand;
        this.goodsForm.brandId = e.brandDealerId;
        this.goodsForm.brandName = e.brandName;
      },
      deleteOneAnnex(index) {
        this.goodsForm.goodsExtend.annex.splice(index, 1);
      },
      button2() {//扩展属性
        this.goodsForm.goodsExtend.annex.check1 = false;
        this.goodsForm.goodsExtend.annex.check2 = true
      },
      addOneAnnex() {//扩展属性
        this.goodsForm.goodsExtend.annex.push({name: '', value: ''});
      },
//      getBrandSelect() {
//        let self = this
//        let requestData = {
//          name: self.form.brandName
//        }
//        self.httpApi.brand.selectBrandDealerAllList(requestData, function (data) {
//          self.brandNameSelectData = data.data.list;
//        });
//      },
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
      getSkuImg(file){//sku,sku图片
        console.log(this.form.skus[this.skuImgIndex].img)
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
        let requestData = {skuId: skuId};
        self.httpApi.goods.goodsDetail(requestData, function (data) {
          self.form = self.formPass(self.form, data.data);
          self.form.spec = JSON.parse(self.form.spec);
          self.form.brand = JSON.parse(self.form.brand);

          self.form.goodsExtend.annex = JSON.parse(self.form.goodsExtend.annex);
          self.form.goodsExtend.imgs = JSON.parse(self.form.goodsExtend.imgs);
          self.form.skus = JSON.parse(self.form.skus);
          self.form.skus[0].sku = JSON.parse(self.form.skus[0].sku);
          self.form.skus[0].img = self.form.skus[0].img || '';
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
        let requestData = {goodsId: goodsId};
        self.httpApi.goods.showGoodsDetail(requestData, function (data) {
          self.goodsForm = self.formPass(self.goodsForm, data.data);
          self.goodsForm.spec = JSON.parse(self.goodsForm.spec);
          self.goodsForm.brand = JSON.parse(self.goodsForm.brand);
          self.goodsForm.brand = {brandDealerId:self.goodsForm.brand.brandId,brandName:self.goodsForm.brand.brandName}
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
          console.log(self.goodsForm)
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
//        let requestData = {
//          self.form.skus
//        };
        self.form.skus[0].sku= JSON.stringify(self.form.skus[0].sku);
        self.$confirm('此操作将修改原有内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.goods.editSku(self.form.skus, function (data) {
            self.$router.push('/goods/goodslist');
          });
          self.$message({

            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消修改'
          });
        });

      },
      updateGoods(){//修改商品
        let self = this;
        let goodsForm = {
          brandNewSelectName:'',
          id: '',
          name: '',
          brand: [],
          brandName: '',
          brandId: '',
          spec: [],
          cat: [],
          catId: '',
          catName: '',
          unit: '',
          skus: [],
          keyword: '',
          goodsSkuList: [],
          tags: [],
          goodsExtend: {
            imgs: [],
            content: '',
            annex: []
          }
        };

        goodsForm.id = self.goodsForm.id;
        goodsForm.name = self.goodsForm.name;
        goodsForm.unit =self.goodsForm.unit;
        goodsForm.cat =JSON.stringify(self.goodsForm.cat);
        goodsForm.catId =self.goodsForm.catId;
        goodsForm.catName = self.goodsForm.catName;
        goodsForm.spec = JSON.stringify(self.goodsForm.spec);
        goodsForm.skus =JSON.stringify(self.goodsForm.skus);
        goodsForm.brand = JSON.stringify(self.goodsForm.brand);
        goodsForm.brandId = self.goodsForm.brandId;
        goodsForm.brandName = self.goodsForm.brandName;
        goodsForm.goodsExtend= {annex:JSON.stringify(self.goodsForm.goodsExtend.annex),content:self.goodsForm.goodsExtend.content,imgs:JSON.stringify(self.goodsForm.goodsExtend.imgs)};
        if(!self.goodsForm.brand){
          self.$message({
            message: '请选择品牌',
            center: true
          });
          return
        }
//        if (!(self.goodsForm.cat instanceof Array)) {
//          self.goodsForm.cat = [self.goodsForm.cat];
//        }
//        self.goodsForm.cat = JSON.stringify(self.goodsForm.cat)
//        self.goodsForm.spec = JSON.stringify(self.goodsForm.spec)
//        self.goodsForm.skus = JSON.stringify(self.goodsForm.skus)
//        self.goodsForm.brand = JSON.stringify(self.goodsForm.brand)
//        console.log('brand',self.goodsForm.brand)
//        self.goodsForm.goodsExtend.annex = JSON.stringify(self.goodsForm.goodsExtend.annex)
//        self.goodsForm.goodsExtend.imgs = JSON.stringify(self.goodsForm.goodsExtend.imgs)

        let requestData = {goodsInfo: goodsForm};
        self.$confirm('操作将修改原有内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.goods.editGoods(requestData, function (data) {
            self.$router.push('/goods/goodslist');
          });
          self.$message({

            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消修改'
          });
        });

      },
    }
  }
</script>
