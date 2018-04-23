<template>
  <div class="container">
    <div class="wrapper" style="overflow: hidden">
      <div class="addGoods-top">
        <h4 class="addGoods-top-title">添加商品</h4>
        <el-steps :space="200" :active="active" finish-status="success" class="addGoods-top-detp">
          <el-step title="选择分类" class="addGoods-top-step1" style="font-size: 12px"></el-step>
          <el-step title="添加信息" class="addGoods-top-step1"></el-step>
          <el-step title="上架" class="addGoods-top-step1"></el-step>
        </el-steps>
      </div>
      <!--active:1的选择分类和规格-->
      <div class="addGoods-classify" v-if="active == 1">
        <h4 class="addGoods-classify-title">选择分类</h4>
        <div class="addGoods-classify-title-left">
          <ul class="classify-list" style="float: left;font-size: 15px;">
            <li v-for="it in catData" @click="getNextCat(it)" :getNextCatVisibl="false">{{it.name}}</li>
          </ul>
          <ul class="classify-list" style="float: left;font-size: 15px;" v-if="getNextCatVisibl == true">
            <li v-for="it in catData1" @click="getNextCatSecond(it)">{{it.name}}</li>
          </ul>
          <ul class="classify-list" style="float: left;font-size: 15px;">
            <li v-for="it in catDataSpec" @click="getNextCatSecondSpec(it)">{{it.name}}</li>
          </ul>
        </div>
      </div>
      <br>
      <div v-if="active == 1">
        <p style="margin-left: 222px;float: left;">您当前选择的是 : <span style="color: #f40">{{catFirst + catDataName + catDataSpecName}}</span>
        </p>
        <el-button style="margin: 12px 420px 0px 0px;float: right" @click="nextFirst">下一步</el-button>
      </div>
    </div>
    <!--添加基本信息-->
    <div class="addGoods-info" v-if="active == 2">
      <p class="addGoods-info-title">添加商品基本信息</p>
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
        <el-form-item label="商品编码" class="addGoods-info-main-item1">
          <el-input v-model="form.number" :disabled="true" class="basicinfo-five"></el-input>
        </el-form-item>

        <el-form-item label="商品类目" class="addGoods-info-main-item1">
          <el-cascader
            :options="catDataSecond"
            :props="props"
            v-if="totalCatId"
            v-model="totalCatId"
            class="basicinfo-five"
            :disabled="true"
          ></el-cascader>
        </el-form-item>
        <el-form-item label=" 规格值  " class="addGoods-info-main-item1">
          <el-input v-model="catSecondSpecName" :disabled="true" class="basicinfo-five"></el-input>
        </el-form-item>
        <el-form-item label="商品品牌" class="addGoods-info-main-item1">
          <brandselect @getBrandSelect="getBrandSelect" class="basicinfo-five"></brandselect>
        </el-form-item>
        <el-form-item label="计量单位" class="addGoods-info-main-item1">
          <el-select v-model="form.unit" placeholder="请选择" class="basicinfo-five">
            <el-option :label="item.name" :value="item.name" v-for="item in unitList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="贸易形态" class="addGoods-info-main-item1">
          <gradetypeselect @getGradeTypeSelect="getGradeTypeSelect" :selectAllVisible="false"
                           class="basicinfo-five"></gradetypeselect>
        </el-form-item>
        <el-form-item label="标签" class="addGoods-info-main-item1">
          <el-checkbox-group v-model="checkListTag">
            <el-checkbox :label="item.name" v-for="item in tagsList" :key="item.id"
                         @change="checkTags(item)"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <br>
        <el-form-item label="商品标题" class="addGoods-info-main-item1">
          <el-input v-model="form.name" placeholder="单行输入" style="width: 900px;"></el-input>
          <em style="color: #aab1c7;padding-left: 15px;font-family: normal">0/60</em>
        </el-form-item>
        <br>
        <el-form-item label="商品描述" class="addGoods-info-main-item1">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="form.describe"
            style="width: 590px;">
          </el-input>
        </el-form-item>
        <br>
        <el-form-item label="商品基本属性 ( 根据二级类目 )" class="addGoods-info-main-item1">
        </el-form-item>
        <!--<br>-->
        <ul style="padding:10px 95px;">

          <li v-for="(item,index) in form.mustBasicInfo" style="margin-bottom: 20px;display: block;">
            <div v-if="item.input === 1">
              <p class="basicInfo">{{item.name}} : </p>
              <el-input type="text" class="item.num1 form-input" v-model="item.value" placeholder="请输入属性值"
                        @change="getmustBasicInfo(item)"></el-input>
              <br>
            </div>
            <div v-if="item.checkbox === 1">
              <p class="basicInfo">{{item.name}} : </p>
              <el-select v-model="item.value" placeholder="请选择" style="width: 300px;" @change="getmustBasicInfo(item)">
                <el-option v-for="item1 in item.children" :key="item1.id" :label="item1.name"
                           :value="item1.id"></el-option>
              </el-select>
              <br>
            </div>
          </li>
        </ul>
        <el-form-item label="销售属性 ( 规格 )" class="addGoods-info-main-item1"></el-form-item>
        <br>
        <div style="margin:20px 0px  10px 100px;" v-for="(s,sindex) in form.mustSpec" :key="sindex"
             v-if="form.mustSpec.length > 0">
          <span style="font-size: 15px;margin:20px 20px 0px 20px;">{{s.name}}</span>
          <el-checkbox :label="v.id" style="width: 100px;" v-for="v in s.children" :key="v.id"
                       @change="getSpecChange(s,v)">{{v.name}}
          </el-checkbox>
        </div>
        <el-form-item>
          <el-table
            :data="form.skus"
            v-if="form.skus.length > 0"
            style="width: 1520px;overflow: auto"
          >
            <el-table-column
              label="是否上架"
              width="180">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isUp" true-label="1" false-label="0"></el-checkbox>
              </template>
            </el-table-column>
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
              v-for="s in lastChecked"
              :key="s.specName">
              <template slot-scope="scope">
                <span>{{scope.row.sku[s.id].name}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="SKU编码"
              width="250">
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
              label="物流运费"
              width="180">
              <template slot-scope="scope">
                <el-input v-model="scope.row.emsPrice">

                </el-input>
              </template>
            </el-table-column>

          </el-table>

        </el-form-item>
        <el-form-item label="商品图片" class="addGoods-info-main-item1">
          <br>

        </el-form-item>

        <div class="addGoods-info-goodsimgs" style="overflow: hidden">
          <div>
            <div>
              <el-checkbox v-model="checked" class="isOrNotCommon">是否公用组图</el-checkbox>
              <span class="addGoods-info-five">(最多上传5张)</span>
            </div>
            <br>


            <!--<uploadmultipleimg-->
            <!--v-if="checked === true"-->
            <!--:fileList="form.goodsExtend.imgs"-->
            <!--@getFileList="getFileListIsCommon"-->
            <!--@removeFile="removeFileListIsCommon"-->
            <!--style="margin:20px 0px 0px 10px">-->
            <!--</uploadmultipleimg>-->
            <el-upload
              action="http://upload.qiniu.com/"
              list-type="picture-card"
              :data="key"
              :limit="5"
              :file-list="fileList"
              :before-upload="beforeUploadImgCommon"
              :on-success="handleSuccessImgCommon"
              :on-remove="handleRemoveImgCommon"
              v-if="key.token && checked === true"
              style="margin:20px 0px 0px 10px">
              <i class="el-icon-plus"></i>
            </el-upload>


          </div>
          <br>

          <el-form-item>
            <el-table
              :data="form.skus"
              v-if="form.skus.length > 0 && checked === false"
              border
              style="width: 100%;">
              <el-table-column
                :label="s.specName"
                width="80"
                v-for="s in lastChecked"
                :key="s.specName">
                <template slot-scope="scope">
                  <span>{{scope.row.sku[s.id].name}}</span>
                </template>
              </el-table-column>
              <!--<el-table-column-->
              <!--label="SKU编码"-->
              <!--width="300">-->
              <!--<template slot-scope="scope">-->
              <!--<el-input v-model="scope.row.number">-->

              <!--</el-input>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                label="图片"
                width="800"
              >
                <template slot-scope="scope">
                  <uploadoneimg
                    :fileList="scope.row.img"
                    @getFileList="getSkuImgNot"
                    @click.native="rememberIndexNot(scope)"
                    style="float: left;">
                  </uploadoneimg>
                  <uploadoneimg
                    :fileList="scope.row.img"
                    @getFileList="getSkuImgNot"
                    @click.native="rememberIndexNot(scope)"
                    style="float: left;">
                  </uploadoneimg>
                  <uploadoneimg
                    :fileList="scope.row.img"
                    @getFileList="getSkuImgNot"
                    @click.native="rememberIndexNot(scope)"
                    style="float: left;">
                  </uploadoneimg>
                  <uploadoneimg
                    :fileList="scope.row.img"
                    @getFileList="getSkuImgNot"
                    @click.native="rememberIndexNot(scope)"
                    style="float: left;">
                  </uploadoneimg>
                  <uploadoneimg
                    :fileList="scope.row.img"
                    @getFileList="getSkuImgNot"
                    @click.native="rememberIndexNot(scope)"
                    style="float: left;">
                  </uploadoneimg>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
        <br>
        <el-form-item label="商品详情" class="addGoods-info-main-item1" style="overflow: hidden">
          <quill-editor
            v-if="active === 2"
            v-model="form.goodsExtend.content"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
            class="quill-editor">
          </quill-editor>
          <el-upload
            action="http://upload.qiniu.com/"
            :before-upload='beforeUpload'
            :data="key"
            :on-success='handleSuccess'
            v-if="key.token"
            ref="upload"
            style="display:none">
            <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <br><br>
        <el-form-item label="扩展属性" class="addGoods-info-main-item1">
          <ul>
            <i class="el-icon-plus" @click="addOneAnnex"></i> <br>

            <li v-for="(item,index) in form.goodsExtend.annex">
              <i class="el-icon-minus" @click="deleteOneAnnex(index)"></i>
              <el-input type="text" class="item.num1 form-input" v-model="item.name"
                        placeholder="请输入属性名称" style="margin: 0px 10px 10px 0px"></el-input>
              <el-input type="text" class="item.num1 form-input" v-model="item.value"
                        placeholder="请输入属性值" style="margin: 0px 10px 10px 0px"></el-input>
            </li>
          </ul>
        </el-form-item>

      </el-form>
      <div style="float: right;margin:20px">
        <el-button @click="cancelSecond">取消</el-button>
        <el-button @click="returnFirst">返回上一步</el-button>
        <el-button @click="gobackThree">下一步</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor';

  let toolbarOptions = {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{'header': 1}, {'header': 2}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{'direction': 'rtl'}],
      [{'size': ['small', false, 'large', 'huge']}],
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'color': []}, {'background': []}],
      [{'font': []}],
      [{'align': []}],
      ['clean'],
      ['link', 'image', 'video']
    ]
  };
  export default {
    data() {
      return {
        /*vue quill-editor start*/
        editorOption: {
          theme: 'snow', //主题
          modules: {
            toolbar: toolbarOptions,  //工具栏
          },
          placeholder: "请输入商品详情......",
          readOnly: false,
        },
        addRange: [],
        uploadData: {},
        photoUrl: '', // 上传图片地址
        uploadType: '',// 上传的文件类型（图片、视频）
        key: {
          token: '',
          file: ''
        },
        /*vue quill-editor end*/
        active: 1,//本页面分三部分
        props: {
          children: 'children',
          label: 'name',
          value: 'id',
        },
        /*类目和规格*/
        catDataSecond: [],//添加商品时已选择过的类目列表
        totalCatId: [],//添加商品时已选择过的类目总id
        getNextCatVisibl: false,//点击一级类目后才会出现二级类目
        catData: [],//一级类目
        catData1: [],//二级类目
        catDataSpec: [],//二级类目下的规格
        catFirstId: '',//选择的一级类目id
        catFirst: '',//选择的一级类目名称
        catDataNameId: '',//选择的二级类目id
        catSecondName: '',//选择的二级类目name
        catDataName: '',//选择的二级类目name带>的
        catDataSpecNameId: '',//选择的二级类目下规格值id
        catSecondSpecName: '',//选择的二级类目下规格值name
        catDataSpecName: '',//选择的二级类目下规格值name带()的
        unitList: [],//单位列表
        tagsList: [],//标签列表
        checkListTag: [],//标签多选时的数组
        /*类目和规格*/
        // valSpec: {},
        // svlSpec: {},
        // specArr: {},
        // specArrKey: {},
        // specArrValue: {},
        // specTrueOrFalse: '',
        checkedList: [],
        form: {//添加商品form
          brandId: '',//品牌id
          brandName: '',//品牌name
          brand: '',//品牌name和id
          name: '',//商品标题
          describe: '',//商品描述
          mustBasicInfo: [],//商品已有的基本属性数组
          attributes: {},//商品基本属性集合
          status: '',//贸易形态
          gradeType: '',
          tradeName: '',
          tradeType: '',
          unit: '',
          number: '',//自动生成商品编码
          spec: [],//必有规格
          mustSpec: [],//必有规格
          skus: [],
          goodsExtend: {
            imgs: [],
            content: '',
            annex: []
          },
        },
        dynamicTags: [],
        dialogFormVisible: false,//新增
        updateStoreLabel: false,//修改
        inputValue: '',
        skuImgIndex: 0,
        skuImgIndexNot: 0,
        skuImgIndexIsCommon: 0,
        skuImgIndexIsNotCommon: 0,
        originCat: '',
        dictionaryUnitCreate: false,
        formLabelWidth: '80px',
        tableData: [],//添加图片列表
        fileList: [],
        /*商品图片*/
        checked: true,
        images: {},
        imgFileArr: [],
        /* 商品图片*/
        /* skus*/
        skusArrNew: [],//后台需要的参数sku
        idArr: [],
        /* skus*/
        /*扩展属性*/

        /*扩展属性*/
      }
    },
    components: {
      quillEditor,
      'uploadmultipleimg': require('../../components/uploadmultipleimg'),
      'uploadoneimg': require('../../components/uploadoneimg'),
      'unitselect': require('../../components/getunitselect'),
      'gradetypeselect': require('../../components/getgradetypeselect'),
      // 'catselect': require('../../components/getcatselect'),
      'pagination': require('../../components/pagination'),
      'brandselect': require('../../components/getbrandselect'),
    },
    created() {
      let self = this;
      self.getCatList()//分类列表
      self.key.file = "";
      self.fullscreenLoading = true
      if (self.fileList) {
        self.key.file = self.fileList;
      }
      let requestData = {
        token: window.localStorage.getItem('token'),
        bucketName: 'management'
      };
      self.httpApi.aliyun.imgSignature(requestData, function (data) {
        self.key.token = data.data;
      });
    },
    methods: {

      /* 富文本编辑器 start*/
      // 图片上传之前调取的函数
      beforeUpload(file) {
        let checkFormat = this.checkImg(file);
        if (!checkFormat) return false;
        if (!this.key.token) return false;
      },
      // 图片上传成功回调 插入到编辑器中
      handleSuccess(response, file, fileList) {
        let self = this;
        let url = '';
        self.fullscreenLoading = false;
        // 获得文件上传后的URL地址
        if (file.name.indexOf('.') > -1) {
          url = file.name.substring(file.name.indexOf('.'));
        }
        self.key.file = self.imgDomain + response.key;
        if (self.key.file != null && self.key.file.length > 0) { // 将文件上传后的URL地址插入到编辑器文本中
          let value = self.key.file;
          // self.$nextTick(function () {
          // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
          self.addRange = self.$refs.myQuillEditor.quill.getSelection();
          value = value.indexOf('http') !== -1 ? value : 'http:' + value;
          console.log('value', value);
          self.$refs.myQuillEditor.quill.insertEmbed(self.addRange.index, self.uploadType, value) // 调用编辑器的 insertEmbed 方法，插入URL
        } else {
          self.$message.error(`${self.uploadType}插入失败`)
        }
        self.$refs['upload'].clearFiles() // 插入成功后清除input的内容
      },
      onEditorChange({editor, html, text}) {
        this.form.goodsExtend.content = html;
      },
      /* 富文本编辑器 end*/
      getGradeTypeSelect(e) {//贸易形态
        this.form.gradeType = e.gradeType;
        this.form.tradeName = e.tradeName;
        this.form.tradeType = e.gradeType.value;
      },
      handleSelectionChange() {
      },
      getCatSelect(e) {
        this.form.cat = e.cat;
        this.form.catName = e.catName;
        this.form.catId = e.catId;
      },//分类
      getUnitList() {
        let self = this;
        self.httpApi.goodsCat.selectUnitList({}, function (data) {
          self.unitList = data.data.list;
        })
      },//计量单位
      getTagsList() {
        let self = this;
        self.httpApi.goodsCat.selectTagList({}, function (data) {
          self.tagsList = data.data.list;
        })
      },//标签
      checkTags(val) {
        console.log('val-tag', val);

      },//勾选标签
      /*组图*/
      beforeUploadImgCommon(file) {
        let checkFormat = this.checkImg(file);
        if (!checkFormat) return false;
        if (!this.key.token) return false;
      },
      handleSuccessImgCommon(response, file, fileList) {
        let suffix = '';
        if (file.name.indexOf('.') > -1) {
          suffix = file.name.substring(file.name.indexOf('.'));
        }
        this.fileList.push({
          name: file.name,
          url: this.imgDomain + response.key
        })
      },
      handleRemoveImgCommon(file, fileList) {
        this.fileList = fileList;
      },
      rememberIndex(scope) {//点击sku图片记录index
        this.skuImgIndex = scope.$index;
      },
      getSkuImg(file) {//sku图片
        this.form.skus[this.skuImgIndex].img = file.url;
      },
      getSkuImgNot(file) {//sku图片
        console.log('file-----1', file);
        this.form.skus[this.skuImgIndexNot].images.push(file);
        console.log('images', this.form.skus[this.skuImgIndexNot].images);
      },
      rememberIndexNot(scope) {//点击sku图片记录index
        this.skuImgIndexNot = scope.$index;
      },
      //sku编码
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
          let randomNum = Math.floor(Math.random() * 100000000);
          currentStr += randomNum.toString().substr(0, 6);
          this.form.skus[i].number = currentStr;
          this.form.skus[i].images = []
        }
      },
      /*组图*/
      // 图片上传之前调取的函数
      basicSpecAnnex() {//g规格
        let self = this;
        let requestData = {
          categoryId: self.catDataNameId
        }
        self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData, function (data) {
          self.form.mustSpec = data.data;
          self.form.mustSpec.map(value => {
            self.checkedList.push({
              id: value.id,
              specName: value.name,
              specValue: []
            })
            self.idArr.push({
              specName: value.id.toString(),
              specValue: []
            })
            /*self.checkedList.push({
              id: value.id,
              specName: value.name,
              specValue: []
            })*/
          })
          // console.log(self.form.mustSpec)
        });
      },
      createGoodsDetail(tableMap, index) {
        let size = this.lastChecked.length;
        let tableKey = this.lastChecked[index].id;
        for (let i = 0; i < this.lastChecked[index].specValue.length; i++) {//颜色
          tableMap[tableKey] = this.lastChecked[index].specValue[i];
          // tableMapImg
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
              mustBuyNum: '',
              retailPrice: '',
              emsPrice: '',
              count: '',
              title: '',
              images: []
            };
            singleSku.sku = tableMap;
            // singleSku.images = tableMapImg;
            this.form.skus.push(JSON.parse(JSON.stringify(singleSku)));
          }
        }
        this.getGoodsNumbers(this.form.skus.length);
      },
      getSpecChange(svl, val) {//点击规格多选框回调函数
        // console.log('changeva1l111', svl)
        // console.log('changeval11232', val)
        // console.log('list', this.form.mustSpec)
        let item = this.checkedList.find(n => n.id === svl.id);
        let clickItem = item.specValue.findIndex(n => n.id === val.id);
        if (clickItem !== -1) {//点击后再点击已是取消时发生的状态
          item.specValue.splice(clickItem, 1);
        } else {
          item.specValue.push(val);
        }
        let arr = [];
        this.checkedList.map(value => {
          if (value.specValue.length > 0) {
            arr.push(value);
          }
        });
        this.lastChecked = arr;
        // console.log('last', this.lastChecked);
        this.form.skus = [];
        this.createGoodsDetail({}, 0);
        // console.log('this.form.skus', this.form.skus);
        let item1 = this.idArr.find(n => n.specName === svl.id.toString());
        let clickItem1 = item1.specValue.findIndex(n => n === val.id.toString());
        if (clickItem1 !== -1) {
          item1.specValue.splice(clickItem1, 1);
        } else {
          item1.specValue.push(val.id.toString());
        }
        let arr1 = [];
        this.idArr.map(value => {
          if (value.specValue.length > 0) {
            arr1.push(value);
          }
        });
        this.skusArrNew = arr1;
        // console.log('this.skusArrNew',this.skusArrNew);

        /* let valSpec = val; //规格值
         let svlSpec = svl; //规格名
         //构造map数据的 K
         let specArrKey = {};
         specArrKey[svlSpec.id] = svlSpec.name;
         //构造map数据的 v 中的一条数据  v是数组
         let specVal = {};//规格值K V
         specVal[valSpec.id] = valSpec.name;
        if(this.specTrueOrFalse) {
          if (this.specArr.hasOwnProperty(JSON.stringify(specArrKey)) === false) {
            let specArrItem = [];
            specArrItem.push(specVal);
            this.specArr[JSON.stringify(specArrKey)] = specArrItem;
          } else {
            let specArrItem = this.specArr[JSON.stringify(specArrKey)]; //获取规格值数组
            specArrItem.push(specVal);
            this.specArr[JSON.stringify(specArrKey)] = specArrItem;
          }
        }else{
          let specArrItem = this.specArr[JSON.stringify(specArrKey)]; //获取规格值数组
          let index = specArrItem.indexOf(specVal);
          specArrItem.splice(index, 1);
          if(specArrItem.length==0){
            delete this.specArr[JSON.stringify(specArrKey)];
          }else {
            this.specArr[JSON.stringify(specArrKey)] = specArrItem;
          }
        }
         console.log("this.specArr", this.specArr);
        //map对象转数组
        let specArr = this.specArr;

        let resSpec = [];
         for(let specArrKey in specArr){
           let spec = {};
           spec[specArrKey] = specArr[specArrKey];
           resSpec.push(spec);
         }
         //渲染结果
       console.log("resSpec",resSpec);
        //遍历规格名  初始化数据集合 KEY起始位置 初始化结果
         this.skus = [];//初始化
        this.getSku(resSpec,0,{});
        console.log("this.skus",this.skus);
        //转换
         let skusspec = [];
        for (let i = 0 ; i < this.skus.length;i++){
          skusspec.push(JSON.parse(this.skus[i]));
        }
        this.skus = skusspec;

         console.log('this.skus----------------skusspec',this.skus);
        // for(let i = 0 ; i < this.skus.length;i++){
        // for(let key in this.skus[i]){
        //   this.form.spec.push({name:JSON.parse(key)});
        // }
        //
        // }
        console.log('this.form.spec',this.form.spec)
       },
       getSku(resSpec,specIndex,sku){
         let specLen = resSpec.length;
         if(specIndex+1 > specLen){
           this.skus.push(JSON.stringify(sku));
           return;
         }
         let specMap = resSpec[specIndex];
         let specItemArr = [];
         for(let key in specMap){
           specItemArr = specMap[key];
           let specItemArrLen = specItemArr.length;
             for(let i = 0;i<specItemArr.length;i++){
               let resSku = sku;
               resSku[key] = specItemArr[i];
               this.getSku(resSpec,specIndex+1,resSku);
             }
           }*/
      },
      basicOneAnnex() {//基本属性
        let self = this;
        let requestData = {
          categoryId: self.catDataNameId
        }
        self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData, function (data) {
          self.form.mustBasicInfo = data.data;
        });
      },
      getmustBasicInfo(item) {
        this.form.attributes[item.id] = item.value.toString();
        // this.form.attributes = JSON.stringify(this.form.attributes);

      },
      /*扩展属性*/
      button2() {//扩展属性
        this.form.goodsExtend.annex.check1 = false;
        this.form.goodsExtend.annex.check2 = true

      },
      addOneAnnex() {
        this.form.goodsExtend.annex.push({name: '', value: ''});
      },
      deleteOneAnnex(index) {//扩展属性删除
        this.form.goodsExtend.annex.splice(index, 1);
      },
      /*扩展属性*/
      getCatList() {//分类列表
        let self = this;
        let requestData = {}
        self.httpApi.goodsCat.selectCategoryTreeList(requestData, function (data) {
          self.catData = data.data;
        });
      },
      getNextCat(it) {//点击一级类目
        let self = this;
        self.catFirst = it.name;
        self.catFirstId = it.id;
        let requestData = {
          id: it.id
        }
        self.httpApi.goodsCat.selectCategoryListNodeById(requestData, function (data) {
          self.getNextCatVisibl = true;
          self.catData1 = data.data;
          self.catDataName = '';
          self.catDataSpec = '';
          self.catDataSpecName = '';
        });
      },
      getNextCatSecondSpec(it) {//点击二级类目下规格
        let self = this;
        self.catDataSpecName = '(' + it.name + ')';
        self.catDataSpecNameId = it.id;
        self.catSecondSpecName = it.name;
      },
      getNextCatSecond(it) {//点击二级类目
        let self = this;
        self.catDataName = '>' + it.name;
        self.catDataNameId = it.id;
        self.catSecondName = it.name;
        let requestData = {
          categoryId: it.id
        }
        self.httpApi.commodit.selectSpecItemListByCategoryId(requestData, function (data) {
          self.catDataSpec = data.data;
          self.catDataSpecName = '';
        });
      },
      getBrandSelect(e) {//商品品牌
        console.log('ee', e);
        this.form.brandId = e.id;
        this.form.brandName = e.nameCn;
        this.form.brand = e.brand;
      },

      nextFirst() {//选择分类中的下一步
        let self = this;
        if (self.catDataName == '') {
          self.$message('请选择下一级类目')
        } else {
          self.active = 2;
          self.catDataSecond = self.catData;
          self.totalCatId.push(self.catFirstId, self.catDataNameId);
          self.basicOneAnnex()//基本属性列表
          self.basicSpecAnnex()//规格列表
          self.getUnitList()//单位列表
          self.getTagsList()//标签列表
          //自动生成商品编码
          //p开头 年月日时分秒一位或者两位数字
          //商品编码
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
          let currentStr = str;
          let randomNum = Math.floor(Math.random() * 100000000);
          currentStr += randomNum.toString().substr(0, 6);
          self.form.number = currentStr;
          //富文本编辑器
          self.$nextTick(function () {
            let imgHandler = async function (value) {
              self.addRange = self.$refs.myQuillEditor.quill.getSelection();
              if (value) {
                let fileInput = document.getElementById('imgInput') //隐藏的file文本ID
                fileInput.click() //加一个触发事件
              }
              self.uploadType = 'image'
            };
            /*  let linkHandler = async function (value) {
                if (value) {
                  let href = prompt('Enter the URL');
                  console.log("hrefhref", href);
                  self.quill.format('link', href);
                } else {
                  self.quill.format('link', false);
                }
              }
              self.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("link", linkHandler); //添加自定义的 链接方法*/
            self.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", imgHandler); //添加自定义的 上传图片方法
          })
          //富文本编辑器
        }

      },
      gobackSecond() {//选择分类中的下一步
        this.active++;
      },
      cancelFirst() {//选择分类的取消

      },
      cancelSecond() {//添加信息中的取消

      },
      returnFirst() {//添加信息中的返回上一步
        this.active--;
      },
      gobackThree() {//添加信息中的下一步  &&  商品新增确定
        let self = this;
        let imgobj = {};
        for (let i = 0; i < self.form.skus.length; i++) {
          for (let key in self.form.skus[i].sku) {
            self.form.skus[i].sku[key] = self.form.skus[i].sku[key].id;
            imgobj[self.form.skus[i].number] = self.form.skus[i].images;
          }
        }
        let requestData = {};
        if (self.checked === true) {
          requestData = {
            brandId: self.form.brandId,
            brandName: self.form.brandName,
            categoryId: self.catDataNameId,
            categoryName: self.catSecondName,
            name: self.form.name,
            describe: self.form.describe,
            number: self.form.number,
            specId: self.catDataSpecNameId,
            specName: self.catSecondSpecName,
            tradeName: self.form.tradeName,
            tradeType: self.form.tradeType,
            attributes: JSON.stringify(self.form.attributes),
            content: self.form.goodsExtend.content,
            annex: JSON.stringify(self.form.goodsExtend.annex),
            skus: JSON.stringify(self.skusArrNew),
            skuList: JSON.stringify(self.form.skus),
            shareImg: 1,
            images: JSON.stringify(self.fileList),
            // tags:
            // unit:
          };
        } else {
          requestData = {
            brandId: self.form.brandId,
            brandName: self.form.brandName,
            categoryId: self.catDataNameId,
            categoryName: self.catSecondName,
            name: self.form.name,
            describe: self.form.describe,
            number: self.form.number,
            specId: self.catDataSpecNameId,
            specName: self.catSecondSpecName,
            tradeName: self.form.tradeName,
            tradeType: self.form.tradeType,
            attributes: JSON.stringify(self.form.attributes),
            content: self.form.goodsExtend.content,
            annex: JSON.stringify(self.form.goodsExtend.annex),
            skus: JSON.stringify(self.skusArrNew),
            skuList: JSON.stringify(self.form.skus),
            shareImg: 0,
            images: JSON.stringify(imgobj),
            // tags:
            // unit:
          };
        }
        self.httpApi.commodit.addGoods(requestData, function (data) {
          console.log('goods-create', data);
        })
        // self.active++;
      },
      //      cancelUpdateLabel() {//取消修改
//        let self = this;
//        self.updateStoreLabel = false;
//        self.$message.success('已取消修改');
//        self.getStoreLabel();
//      },
//      storeEditLabel(tag) {//修改弹框
//        this.updateForm = tag
//        this.updateStoreLabel = true
//      },
//      updateLabelSure() {//修改弹框确定
//        let self = this
//        let requestData = {
//          id: self.updateForm.id,
//          name: self.updateForm.name,
//        };
//        self.httpApi.goodsCat.editTag(requestData, function (data) {
//          self.updateStoreLabel = false;
//          self.$message.success('修改成功');
//        });
//      },
//      showDialog() {//新增弹框
//        if (this.dynamicTags.length >= 5) {
//          this.$message({
//            message: '最多设置5个标签',
//            type: 'warning'
//          });
//        } else {
//          this.dialogFormVisible = true;
//          this.dialogForm = {data: {name: ''}};
//        }
//      },
//      handleAdd() {//添加
//        let self = this
//        let requestData = {
//          tagName: self.dialogForm.name
//        };
//        self.httpApi.goodsCat.addTag(requestData, function (data) {
//          self.dialogFormVisible = false;
//          self.$message.success('添加成功');
//          self.getStoreLabel();
//        });
//      },
//      getStoreLabel() {//标签列表
//        let self = this
//        let requestData = {};
//        self.httpApi.goods.tagList(requestData, function (data) {
//          self.dynamicTags = data.data
//        });
//      },
//      handleClose(tag) {
//        console.log('tag', tag)
//        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
//      },
    }
  }
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .storeLabel {
    padding: 50px 0px 0px 20px;
  }

  .quill-editor {
    width: 80%;
    /*height: 500px;*/
    border-bottom: 1px solid #ccc;
  }

  .ql-container {
    height: 680px;
  }

  .ql-snow .ql-editor img {
    max-width: 480px;
  }

  .ql-editor .ql-video {
    max-width: 480px;
  }
</style>
