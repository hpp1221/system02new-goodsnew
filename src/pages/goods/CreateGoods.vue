<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">新增商品</h3>
      <el-tabs v-model="activeName">
        <el-tab-pane label="创建商品" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="120px" inline>
            <h4 class="item-title">基础信息</h4>
            <el-form-item label="商品名称" style="margin-right: 210px">
              <el-input placeholder="请输入商品名称" v-model="form.name" class="form-input" style="margin:0;width:350px;">
              </el-input>
            </el-form-item>
            <el-form-item label="商品品牌" style="margin-right: 210px">
              <brandselect @getBrandSelect="getBrandSelect" style="width:350px;"></brandselect>
              <!--<el-select v-model="form.brandName" filterable placeholder="请选择" style="width:350px;">-->
                <!--<el-option-->
                  <!--v-for="item in brandNameSelectData"-->
                  <!--:key="item.brandDealerId"-->
                  <!--:label="item.name"-->
                  <!--:value="item.name">-->
                <!--</el-option>-->
              <!--</el-select>-->
            </el-form-item>
            <br>
            <el-form-item label="商品分类" style="margin-right: 210px">
              <catselect @getCatSelect="getCatSelect" style="width:350px;"></catselect>
            </el-form-item>
            <el-form-item label="计量单位" style="margin-right: 210px">
              <unitselect @getUnitSelect="getUnitSelect" :selectAllVisible="false" style="width:350px;"></unitselect>
            </el-form-item>

            <h4 class="item-title">商品规格</h4>
            <el-form-item label="商品规格" style="overflow: hidden">
              <el-button class="button-new-tag" size="small" @click="addSpec">添加规格</el-button>
              <div v-for="(s,sindex) in form.spec" style="margin-top: 10px;">
                <i class="el-icon-minus" @click="deleteSpec(sindex)"></i>
                <el-input class="form-input" placeholder="请输入规格名称" v-model="s.specName" size="mini"
                          style="margin:0;width: 200px;"></el-input>
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
                  style="margin:0;"
                  @keyup.enter.native="handleInputConfirm(s)"
                  @blur="handleInputConfirm(s)">
                </el-input>
                <el-button v-else size="small" @click="showInput(sindex)">添加属性</el-button>
              </div>
            </el-form-item>
            <br>
            <el-form-item>
              <el-table
                :data="form.skus"
                v-if="form.skus.length > 0"
                style="width: 1700px;overflow: auto"
              >
                <el-table-column
                  label="主图"
                  width="180">
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
                  width="250">
                  <template slot-scope="scope">
                    <!--<span v-if="form.number.length > 0">{{scope.row.number}}</span>-->
                    <!--<p>{{scope.row.number}}</p>-->
                    <span>{{scope.row.number}}</span>
                    <!--<el-input v-model="form.number" :disabled="true">-->
                    <!--&lt;!&ndash;{{form.number}}&ndash;&gt;-->
                    <!--</el-input>-->
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
                  width="350">
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
                  label="物流运费"
                  width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.emsPrice">

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
                @getFileList="getFileList"
                @removeFile="removeFileList"
                style="margin-left:50px">
              </uploadmultipleimg>
            </el-form-item>
            <h4 class="item-title">商品描述</h4>
            <el-form-item style="margin-left:50px">
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
                <i class="el-icon-plus" @click="addOneAnnex"></i> <br>

                <li v-for="(item,index) in form.goodsExtend.annex">
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
              <el-button @click="submit" type="primary">创建</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        brandNameSelectData: [],
        form: {
//          goodsName:'',
          brandName: '',//品牌商下拉框
          name: '',
          brand: '',
          brandId: '',
          cat: [],
          catId: '',
          catName: '',
          unit: '',
          number: '',
          spec: [],
          skus: [],
          goodsExtend: {
            imgs: [],
            content: '',
            annex: []
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
        dictionaryUnitCreate: false,
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
      'unitselect': require('../../components/getunitselect'),
      'catselect': require('../../components/getcatselect'),
      'brandselect': require('../../components/getbrandselect'),
    },
    created() {
//      this.getBrandSelect()
    },
    methods: {
      getGoodsNumbers(skuNum) {//自动生成商品编码
        //p开头 年月日时分秒一位或者两位数字
        let str = 'P-';
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1;
        if (month < 10) month = '0' + month;
        let day = nowDate.getDate();
        if (day < 10) day = '0' + day;
        let hour = nowDate.getHours();
        if (hour < 10) hour = '0' + hour;
        let minutes = nowDate.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        let seconds = nowDate.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;
        str = str + year + month + day + hour + minutes + seconds;
        for (let i = 0; i < skuNum; i++) {
          let currentStr = str;
          let randomNum = Math.floor(Math.random() * 1000000);
          currentStr += randomNum.toString().substr(0, 4);
          this.form.skus[i].number = currentStr;
//          this.form.skus[i].number = '12471824712847148';
        }
      },
//      getBrandSelect() {
//        let self = this
//        let requestData = {
//          name: self.form.brandName,
//
//        }
//        self.httpApi.brand.selectBrandDealerAllList(requestData, function (data) {
//          console.log('id',data)
//          self.brandNameSelectData = data.data.list;
//        });
//      },
      getBrandSelect(e) {
        console.log('eeee',e)
        this.form.brandId = e.brandDealerId;
        this.form.brandName = e.brandName;
        this.form.brand = e.brand;
      },
      deleteOneAnnex(index) {
        this.form.goodsExtend.annex.splice(index, 1);
      },
      button2() {//扩展属性
        this.form.goodsExtend.annex.check1 = false;
        this.form.goodsExtend.annex.check2 = true
      },
      addOneAnnex() {//扩展属性
        this.form.goodsExtend.annex.push({name: '', value: ''});
      },
      getUnitSelect(e) {//创建商品单位获取
        this.form.unit = e;
      },
      getCatSelect(e) {
        this.form.cat = e.cat;
        this.form.catName = e.catName;
        this.form.catId = e.catId;
      },
      getFileList(file) {//商品图片
        this.form.goodsExtend.imgs.push(file);
      },
      getSkuImg(file) {//sku图片
        this.form.skus[this.skuImgIndex].img = file.url;
      },
      removeFileList(file) {//商品移除某商品图片
        console.log('file',file)
        this.form.goodsExtend.imgs.splice(file, 1);
      },
      rememberIndex(scope) {//点击sku图片记录index
        this.skuImgIndex = scope.$index;
      },
      cancel() {
        this.$router.push('/goods/goodslist');
      },
      editorReady(editorInstance) {
        editorInstance.setContent(this.form.goodsExtend.content);
        editorInstance.addListener('contentChange', () => {
          this.form.goodsExtend.content = editorInstance.getContent()
        });
      },
      createGoodsDetail(tableMap, index) {
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
              mustBuyNum:'',
              retailPrice:'',
              emsPrice:'',
              count: '',
              title: ''
            };
            singleSku.sku = tableMap;
            this.form.skus.push(JSON.parse(JSON.stringify(singleSku)));
          }
        }
        this.getGoodsNumbers(this.form.skus.length);

      },
      submit() {//新增
        let self = this;
        let form = {
          brandName: '',//商品名称
          name: '',//品牌名称
          brand: '',
          brandId: '',
          cat: [],
          catId: '',
          catName: '',
          unit: '',
          number: '',
          spec: [],
          skus: [],

          goodsExtend: {
            imgs: [],
            content: '',
            annex: []
          },
          isPlatform: 0//是否为平台商品，1是0否
        };

        form = Object.assign({},self.form);
        for (let i = 0; i < form.spec.length; i++) {//商品规格
          self.$delete(form.spec[i], 'inputVisible');
        }
//        for(let i = 0;i<self.form.goodsSkuList.length;i++){
//          self.form.goodsSkuList[i].sku = JSON.stringify(self.form.goodsSkuList[i].sku)
//        }
        if (!form.brand) {
          self.$message({
            message: '请选择品牌',
            center: true
          });

          return
        }
        if (form.cat.length === 0) {
          self.$message({
            message: '请选择分类',
            center: true
          });

          return
        }
        form.cat = JSON.stringify(form.cat)
        if (form.spec.length === 0) {
          self.$message({
            message: '请加入规格',
            center: true
          });
          return
        }
//
//        if (self.inputValue.length === 0) {
//          self.$message({
//            message: '请加入规格属性',
//            center: true,
//          });
//          return
//        }
//        self.form.spec=[];
        form.spec = JSON.stringify(form.spec)
        form.skus = JSON.stringify(form.skus)
        form.brand = JSON.stringify(form.brand)
        form.goodsExtend = {annex:JSON.stringify(form.goodsExtend.annex),content:form.goodsExtend.content,imgs:JSON.stringify(form.goodsExtend.imgs)};
        let requestData = {
          goodsInfo: form,
        };
//        console.log(self.form)
//        return
        self.httpApi.goods.addGoods(requestData, function (data) {
          self.$router.push('/goods/goodslist');

        });
      },
      addSpec() {//添加规格
        this.form.spec.push({specName: '', specValue: [], inputVisible: false});
      },
      showInput(index) {//显示规格输入框
        this.form.spec[index].inputVisible = true;
      },
      handleInputConfirm(s) {//规格属性确定
        let inputValue = this.inputValue;
        if (inputValue) {
          s.specValue.push(this.inputValue);
        }
        s.inputVisible = false;
        let index = s.specValue.indexOf(this.inputValue);
        this.inputValue = '';
//        let self = this;
//        self.$nextTick(function () {
//          self.getGoodsNumbers(index);
//        })
      },
      handleClose(tag, index) {//删除某规格属性
        this.form.spec[index].specValue.splice(this.form.spec[index].specValue.indexOf(tag), 1);
      },
      deleteSpec(sindex) {//删除一条规格
        this.form.spec.splice(sindex, 1);
      },

    }
  }
</script>
