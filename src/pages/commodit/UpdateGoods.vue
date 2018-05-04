<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">修改商品详情</h3>
      <el-tabs v-model="tabName">
        <el-tab-pane label="修改sku" name="first">
          <el-form ref="skuForm" :model="skuForm" class="request-form" label-width="120px" style="overflow: hidden">
            <h4 class="item-title">基本信息</h4>
            <el-form-item label="商品名称">
              {{skuForm.goodsVO.name}}
            </el-form-item>
            <el-form-item label="商品品牌">
              {{skuForm.goodsVO.brandName}}
            </el-form-item>
            <el-form-item label="商品分类">
              {{skuForm.goodsVO.categoryPName+'/'+skuForm.goodsVO.categoryName}}
            </el-form-item>
            <el-form-item label="计量单位">
              {{skuForm.goodsVO.unit}}
            </el-form-item>
            <el-form-item label="贸易形态">
              {{skuForm.goodsVO.tradeName}}
            </el-form-item>
            <el-form-item label="活动标签">
              <span v-for="item in skuForm.goodsVO.goodsTagList" :key="item.id">{{item.tagName + '   '}}</span>
            </el-form-item>
            <h4 class="item-title">商品规格</h4>

            <el-form-item label="商品规格">
              <div v-for="s in skuForm.goodsSkuVO.skuSpecInfos" :key="s.specId">
                {{s.specName}}:
                <el-tag
                  :closable="false"
                  :close-transition="false"
                  style="margin-left: 10px">
                  {{s.specItemName}}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item>
              <el-table
                :data="skuForm.skuFormArr"
                border
                v-if="skuForm.skuFormArr.length > 0"
                style="width: 100%">
                <el-table-column
                  label="是否上架"
                  width="180">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.status" true-label="1" false-label="0"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  label="主图"
                  width="180">
                  <template slot-scope="scope">
                    <uploadoneimg
                      :fileList="scope.row.img"
                      @getFileList="getSkuImg">
                    </uploadoneimg>
                  </template>
                </el-table-column>
                <el-table-column
                  label="规格"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px" v-for="s in skuForm.goodsSkuVO.skuSpecInfos"
                          :key="s.specId">{{s.specItemName}}</span>
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
                  width="450">
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
                    <el-input v-model="scope.row.referencePrice">

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
                    <el-input v-model="scope.row.transportationPrice">

                    </el-input>
                  </template>
                </el-table-column>

              </el-table>
            </el-form-item>
            <h4 class="item-title">商品图片</h4>
            <el-form-item>
              <img v-lazy="f.imgUrl" v-for="f in skuForm.goodsSkuVO.goodsImgsList" :key="f.id"
                   style="width: 200px;height:200px;margin-right: 30px">
            </el-form-item>
            <h4 class="item-title">商品描述</h4>
            <el-form-item>
              <quill-editor
                v-model="skuForm.goodsVO.goodsExtendWithBLOBs.content"
                :options="otherForm.editorOption"
                class="quill-editor"
                :disabled="true">
              </quill-editor>
            </el-form-item>
            <h4 class="item-title">扩展属性</h4>
            <el-form-item v-for="item in skuForm.goodsVO.goodsExtendWithBLOBs.annex" :key="item.name">
              属性名称 :
              <el-input v-model="item.name" class="form-input" style="padding:0px 10px" :disabled="true"></el-input>
              属性值 :
              <el-input v-model="item.value" class="form-input" style="padding:0px 10px" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item style="float: right;margin-right: 18%;">
              <el-button @click="updateSku">确定</el-button>
              <el-button @click="cancelSku">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改商品" name="second">
          <p class="addGoods-info-title">修改商品基本信息</p>
          <el-form :inline="true" :model="goodsForm" ref="goodsForm" class="demo-form-inline" style="overflow: hidden">
            <el-form-item label="商品编码" class="addGoods-info-main-item1">
              <el-input v-model="goodsForm.goodsVO.number" :disabled="true" class="basicinfo-five"></el-input>
            </el-form-item>
            <el-form-item label="商品类目" class="addGoods-info-main-item1">
              <el-input
                v-model="goodsForm.goodsVO.categoryPName + '/'+goodsForm.goodsVO.categoryName"
                style="width: 220px;"
                :disabled="true">
              </el-input>
            </el-form-item>
            <el-form-item label=" 规格值  " class="addGoods-info-main-item1">
              <el-input v-model="goodsForm.goodsVO.specName" :disabled="true" class="basicinfo-five">
              </el-input>
            </el-form-item>
            <el-form-item label="商品品牌" class="addGoods-info-main-item1">
              <el-select v-model="goodsForm.goodsVO.brandName" filterable>
                <el-option
                  v-for="item in otherForm.brandList"
                  :key="item.id"
                  :label="item.nameCn"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计量单位" class="addGoods-info-main-item1">
              <el-select v-model="goodsForm.goodsVO.unit">
                <el-option :label="item1.name" :value="item1" v-for="item1 in otherForm.unitList" :key="item1.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="贸易形态" class="addGoods-info-main-item1">
              <el-select v-model="goodsForm.goodsVO.tradeName">
                <el-option :label="item1.name" :value="item1" v-for="item1 in otherForm.tradeList" :key="item1.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签" class="addGoods-info-main-item1">
              <el-checkbox-group v-model="otherForm.checkListIds">
                <el-checkbox :label="item.name" v-for="item in otherForm.tagsList" :key="item.id"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <br>
            <el-form-item label="商品标题" class="addGoods-info-main-item1">
              <el-input v-model="goodsForm.goodsVO.name" placeholder="单行输入" style="width: 900px;"></el-input>
              <em style="color: #aab1c7;padding-left: 15px;font-family: normal">0/60</em>
            </el-form-item>
            <br>
            <el-form-item label="商品描述" class="addGoods-info-main-item1">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="goodsForm.goodsVO.goodsExtendWithBLOBs.describe"
                style="width: 590px;">
              </el-input>
            </el-form-item>
            <br>
            <el-form-item label="商品基本属性 ( 根据二级类目 )" class="addGoods-info-main-item1">
            </el-form-item>
            <br>
            <ul style="padding:10px 95px;">
              <li v-for="(item,index) in otherForm.mustBasicInfo" style="margin-bottom: 20px;display: block;">
                <div v-if="item.input === 1">
                  <p class="basicInfo">{{item.name}} : </p>
                  <el-input type="text" class="item.num1 form-input"
                            v-for="(s,index) in goodsForm.goodsVO.goodsAttributeList" :key="s.attributeId"
                            v-if="s.attributeId === item.id"
                            v-model="s.attributeItemName" placeholder="请输入属性值">
                  </el-input>
                  <br>
                </div>
                <div v-if="item.checkbox === 1">
                  <p class="basicInfo">{{item.name}} : </p>
                  <el-select
                    style="width: 300px;"
                    v-for="(s,index) in goodsForm.goodsVO.goodsAttributeList" :key="s.attributeId"
                    v-if="s.attributeId === item.id"
                    v-model="s.attributeItemName">
                    <el-option v-for="item1 in item.children" :key="item1.id" :label="item1.name"
                               :value="item1.id">
                    </el-option>
                  </el-select>
                  <br>
                </div>
              </li>
            </ul>
            <el-form-item label="销售属性 ( 规格 )" class="addGoods-info-main-item1"></el-form-item>
            <br>
            <div style="margin:20px 0px  10px 100px;" v-for="(s,sindex) in otherForm.mustSpec" :key="sindex"
                 v-if="otherForm.mustSpec.length > 0">
              <span style="font-size: 15px;margin:20px 20px 0px 20px;">{{s.name}}</span>
              <el-checkbox :label="v.id" style="width: 100px;" v-for="v in s.children" :key="v.id"
                           @change="getSpecChange(s,v,sindex)" v-model="v.checked">{{v.name}}
              </el-checkbox>
            </div>
            <el-form-item>
              <el-table
                :data="goodsForm.goodsSkuVOList"
                v-if="goodsForm.goodsSkuVOList.length > 0"
                style="width: 1520px;overflow: auto"
              >
                <el-table-column
                  label="是否上架"
                  width="180">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.status" true-label="1" false-label="0"></el-checkbox>
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
                  label="规格"
                  width="100">
                  <template slot-scope="scope">
                    <span v-for="s in scope.row.skuSpecInfos" :key="s.specId">{{s.specItemName+ '  '}}</span>
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
                    <el-input v-model="scope.row.referencePrice">

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
                    <el-input v-model="scope.row.transportationPrice">

                    </el-input>
                  </template>
                </el-table-column>

              </el-table>

            </el-form-item>
            <!-- <div style="margin:20px 0px  10px 100px;" v-for="(s,sindex) in otherForm.mustSpec" :key="sindex"
                  v-if="otherForm.mustSpec.length > 0">
               <div style="margin:20px 20px 0px 20px;overflow:hidden;">
                 <span style="font-size: 15px;float: left;margin-right: 15px">{{s.name}}</span>
                 <el-checkbox-group v-model="otherForm.checkList" style="float: left">
                   <el-checkbox :label="v.id" style="width: 100px;" v-for="v in s.children" :key="v.id">{{v.name}}
                   </el-checkbox>
                 </el-checkbox-group>
               </div>
             </div>-->
            <el-form-item class="addGoods-info-main-item1">
              <br>
            </el-form-item>
            <div class="addGoods-info-goodsimgs" style="overflow: hidden">
              <div v-if="goodsForm.isShareImg === 1">
                <div>
                  <el-checkbox v-model="otherForm.imgCommonChecked"
                               class="isOrNotCommon">是否公用组图
                  </el-checkbox>
                  <span class="addGoods-info-five">(最多上传5张)</span>
                </div>
                <br>
                <uploadmultipleimg
                  :fileList="otherForm.imgCommonArr"
                  @getFileList="getFileList2"
                  @removeFile="removeFileList"
                  style="margin-top: 7px">
                </uploadmultipleimg>
                <!--  <el-upload
                    action="http://upload.qiniu.com/"
                    list-type="picture-card"
                    :data="key"
                    :limit="5"
                    :file-list="fileList"
                    :before-upload="beforeUploadImgCommon"
                    :on-success="handleSuccessImgCommon"
                    :on-remove="handleRemoveImgCommon"
                    v-if="key.token && goodsForm.isShareImg === 1"
                    style="margin:20px 0px 0px 10px">
                    <i class="el-icon-plus"></i>
                  </el-upload>-->
              </div>
              <br>
              <el-form-item v-if="goodsForm.isShareImg === 0">
                <div>
                  <el-checkbox
                    class="isOrNotCommon">是否公用组图
                  </el-checkbox>
                  <span class="addGoods-info-five">(最多上传5张)</span>
                </div>
                <el-table
                  :data="goodsForm.goodsSkuVOList"
                  v-if="goodsForm.goodsSkuVOList.length > 0"
                  border
                  style="width: 100%;">
                  <el-table-column
                    label="规格"
                    width="120">
                    <template slot-scope="scope">
                      <span v-for="s in scope.row.skuSpecInfos" :key="s.specId">{{s.specItemName+ '  '}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="图片"
                    width="1000">
                    <template slot-scope="scope">
                      <uploadmultipleimg
                        :fileList="scope.row.goodsImgsList"
                        style="float: left;">
                      </uploadmultipleimg>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </div>
            <br>
            <el-form-item label="商品详情" class="addGoods-info-main-item1" style="overflow: hidden">
              <quill-editor
                v-model="goodsForm.goodsVO.goodsExtendWithBLOBs.content"
                ref="myQuillEditor"
                :options="otherForm.editorOption"
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

                <li v-for="(item,index) in goodsForm.goodsVO.goodsExtendWithBLOBs.annex">
                  <i class="el-icon-minus" @click="deleteOneAnnex(index)"></i>
                  <el-input type="text" class="item.num1 form-input" v-model="item.name"
                            placeholder="请输入属性名称" style="margin: 0px 10px 10px 0px"></el-input>
                  <el-input type="text" class="item.num1 form-input" v-model="item.value"
                            placeholder="请输入属性值" style="margin: 0px 10px 10px 0px"></el-input>
                </li>
              </ul>
            </el-form-item>
          </el-form>
          <div style="float: right;margin-right: 18%">
            <el-button>确定</el-button>
            <el-button>取消</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
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
        tabName: 'first',//当前选中的tab
        skuForm: {
          goodsImgsList: [],//走马灯图片数组
          goodsSkuVO: {
            barCode: '',//条形码
            goodsId: '',//商品id
            id: '',//skuId
            img: '',//主图图片url
            marketPrice: '',//市场价格
            mustBuyNum: '',//起订量
            number: '',//商品编码
            referencePrice: '',//参考价格
            retailPrice: '',//零售价格
            sku: '',//规格只有id
            skuSpecInfos: '',//规格数组id和name
            status: '',//上下架状态
            title: '',//关键词
            transportationPrice: '',//运费
            skuAllName: '',//规格名
          },//sku
          goodsVO: {
            brandId: '',//品牌id
            brandName: '',//品牌name
            categoryPId: '',//一级分类id
            categoryPName: '',//一级分类name
            categoryId: '',//二级分类id
            categoryName: '',//二级分类name
            goodsAttributeList: [],//基本属性
            goodsExtendWithBLOBs: {},//扩展属性和富文本编辑器
            goodsImgsList: [],//走马灯图片数组
            goodsSpecInfoList: [],//规格数组id和name
            goodsTagList: [],//标签数组
            id: '',//商品id
            name: '',//商品名称
            number: '',//商品编码
            skus: '',//规格
            specId: '',//选择分类后下的规格id
            specName: '',//选择分类后下的规格name
            supplierId: '',//供应商id
            tradeName: '',//贸易形态name
            tradeType: '',//贸易形态id
            unit: '',//单位
          },//goods
          skuFormArr: [],//sku商品列表
          skuImgIndex: 0,//点击sku图片记录index
        },//sku  form
        goodsForm: {
          goodsSkuVOList: [],//商品列表
          goodsVO: {
            brandId: '',//品牌id
            brandName: '',//品牌name
            categoryPId: '',//一级分类id
            categoryPName: '',//一级分类name
            categoryId: '',//二级分类id
            categoryName: '',//二级分类name
            goodsAttributeList: [],//基本属性
            goodsExtendWithBLOBs: {},//扩展属性和富文本编辑器
            goodsSpecInfoList: [],//规格数组id和name
            goodsTagList: [],//标签数组
            id: '',//商品id
            name: '',//商品名称
            number: '',//商品编码
            skus: '',//规格
            specId: '',//选择分类后下的规格id
            specName: '',//选择分类后下的规格name
            supplierId: '',//供应商id
            tradeName: '',//贸易形态name
            tradeType: '',//贸易形态id
            unit: '',//单位
          },//eg category brand
          skuIds: [],//后台传回的规格勾选的ids


        },//goods form
        otherForm: {
          brandList: [],//品牌列表
          unitList: [],//单位列表
          tradeList: [],//贸易形态列表
          tagsList: [],//标签列表
          checkListIds: [],//标签选择后的id数组
          mustBasicInfo: [],//基本属性数组
          mustSpec: [],//必有规格
          checkedList: [],//修改--规格选择后的id数组
          checkList: [],
          idArr: [],
          lastChecked: [],
          skusArrNew: [],
          skuMust: [],
          imgCommonChecked: true,//是否是共用组图 1\0
          imgCommonArr: [],//由map改变后的img数组 isShareImg---1
          imgNotCommonArr: [],//由map改变后的img数组 isShareImg---0
          imgNotCommonArrNew: [],//由map改变后的img数组 isShareImg---0
          editorOption: {
            theme: 'snow', //主题
            modules: {
              toolbar: toolbarOptions,  //工具栏
            },
            placeholder: "请输入商品详情......",
            readOnly: false,
          },
        },
        isShareImg: '',//是否是共用组图
        key: {
          token: '',
          file: ''
        },
      }
    },
    created() {
      let self = this;
      self.$route.params.id ? self.select(self.$route.params.id) : self.$router.push('/error');
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
    components: {
      'uploadoneimg': require('../../components/uploadoneimg'),
      'uploadmultipleimg': require('../../components/uploadmultipleimg'),
    },
    watch: {
      tabName: function (newVal, oldVal) {
        if (newVal === 'first') {
          this.select(this.$route.params.id);
        } else if (newVal === 'second') {
          this.selectGoods(this.$route.params.goodsId);
          this.getBrandList();//品牌接口
          this.getUnitList();//单位接口
          this.getTradeList();//贸易形态接口
          this.getTagsList();//标签接口
        }
      },
    },
    methods: {
/* -------------------------------------------------修改sku-----------------------------------------------------*/
      select(id) {
        let self = this;
        let selectArr = [];
        let requestData = {
          skuId: id
        };
        self.httpApi.commodit.selectGoodsInfoBySkuId(requestData, function (data) {
          self.skuForm = data.data;
          selectArr.push(self.skuForm.goodsSkuVO);
          self.skuForm.skuFormArr = selectArr;
          self.skuForm.goodsVO.goodsExtendWithBLOBs.annex = JSON.parse(self.skuForm.goodsVO.goodsExtendWithBLOBs.annex);
        })
      },//sku列表
      getSkuImg(file) {
        this.skuForm.goodsSkuVO.img = file.url;
      },//sku,sku图片
      updateSku() {
        let self = this;
        self.httpApi.commodit.updateSkuById(self.skuForm.goodsSkuVO, function (data) {
          self.$message.success(data.message);
          self.$router.push('/commodit/goodslist');
        })
      },//修改sku确定
      cancelSku() {
        this.$router.push('/commodit/goodslist');
      },////修改sku取消
/* -------------------------------------------------修改goods---------------------------------------------------*/
      selectGoods(goodsId) {
        let self = this;
        let ids = [];
        let requestData = {
          goodsId: goodsId
        };
        self.httpApi.commodit.selectGoodsInfoById(requestData, function (data) {
          self.goodsForm = data.data;
          self.goodsForm.goodsVO.goodsExtendWithBLOBs.annex = JSON.parse(self.goodsForm.goodsVO.goodsExtendWithBLOBs.annex);
          self.goodsForm.goodsVO.goodsTagList.map(function (value) {
            self.otherForm.checkListIds.push(value.tagName);
          });//标签ids
          let requestData = {
            categoryId: self.goodsForm.goodsVO.categoryId
          };
          self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData, function (data) {
            self.otherForm.mustBasicInfo = data.data;
          });//基本属性接口
          self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData, function (data) {
            self.otherForm.mustSpec = data.data;
            self.otherForm.mustSpec.map(value => {
              self.otherForm.checkedList.push({
                id: value.id,
                specName: value.name,
                specValue: []
              });
              self.otherForm.idArr.push({
                specName: value.id.toString(),
                specValue: []
              })
            });
            let skuIds = self.goodsForm.skuIds;
            let mustSpec = self.otherForm.mustSpec;
            for (let j = 0; j < mustSpec.length; j++) {
              for (let z = 0; z < mustSpec[j].children.length; z++) {
                for (let i = 0; i < skuIds.length; i++) {
                  if (mustSpec[j].children[z].id === skuIds[i]) {
                    mustSpec[j].children[z].checked = true;
                  }
                }
              }
            }
          });//规格列表
          let goodsSkuVOList = self.goodsForm.goodsSkuVOList;
          if (self.goodsForm.isShareImg === 1) {
            for (let i = 0; i < goodsSkuVOList[0].goodsImgsList.length; i++) {
              self.otherForm.imgCommonArr.push({
                'id': goodsSkuVOList[0].goodsImgsList[i].id,
                'url': goodsSkuVOList[0].goodsImgsList[i].imgUrl,
              })
            }
          }
          if (self.goodsForm.isShareImg === 0) {
            for (let i = 0; i < goodsSkuVOList.length; i++) {
              for (let j = 0; j < goodsSkuVOList[i].goodsImgsList.length; j++) {
                goodsSkuVOList[i].goodsImgsList[j].url = goodsSkuVOList[i].goodsImgsList[j].imgUrl;
              }
            }
          }
        });
      },//sku列表
      getBrandList() {
        let self = this;
        self.httpApi.brands.selectBrandAllList({}, function (data) {
          self.otherForm.brandList = data.data.list;
        })
      },//商品品牌
      getUnitList() {
        let self = this;
        self.httpApi.goodsCat.selectUnitList({}, function (data) {
          self.otherForm.unitList = data.data.list;
        })
      },//计量单位
      getTradeList() {
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'trade_type'}, function (data) {
          self.otherForm.tradeList = data.data.list;
        })
      },//贸易形态
      getTagsList() {
        let self = this;
        self.httpApi.goodsCat.selectTagList({}, function (data) {
          self.otherForm.tagsList = data.data.list;
        })
      },//标签
      // rememberIndex(scope) {//点击sku图片记录index
      //   this.skuImgIndex = scope.$index;
      // },
      // getSkuImg(file) {//sku图片
      //   this.form.skus[this.skuImgIndex].img = file.url;
      // },
      // getSkuImgNot(file) {//sku图片
      //   this.form.skus[this.skuImgIndexNot].images.push(file);
      //   console.log('images', this.form.skus[this.skuImgIndexNot].images);
      // },
      getGoodsNumbers(skuNum) {//自动生成商品编码 //p开头 年月日时分秒一位或者两位数字
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
          this.otherForm.skus[i].number = currentStr;
          this.otherForm.skus[i].images = []
        }
      },
      createGoodsDetail(tableMap, index) {
        let lastChecked = this.otherForm.lastChecked;
        let size = lastChecked.length;
        let tableKey = lastChecked[index].id;
        for (let i = 0; i < lastChecked[index].specValue.length; i++) {//颜色
          tableMap[tableKey] = lastChecked[index].specValue[i];
          // tableMapImg
          if (index < size - 1) {
            index++;
            this.createGoodsDetail(tableMap, index);
            index--;
          } else {
            let singleSku = {
              sku: {},
              skuShow: {},
              marketPrice: '',
              referencePrice: '',
              img: '',
              number: '',
              barCode: '',
              status: 0,
              isNew: 1,
              mustBuyNum: '',
              retailPrice: '',
              transportationPrice: '',
              count: '',
              title: '',
              images: []
            };
            singleSku.sku = tableMap;
            singleSku.skuShow = tableMap;
            // singleSku.images = tableMapImg;
            this.form.skus.push(JSON.parse(JSON.stringify(singleSku)));
          }
        }
        this.getGoodsNumbers(this.form.skus.length);
      },
      getSpecChange(svl, val, index) {
        console.log("val", val);
        // val.checked = false;
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
        this.form.skuMust = this.form.skus;
      },//点击规格多选框回调函数
      getFileList2(file) {
        this.otherForm.imgCommonArr.push(file);
      },//商品，商品多图片
      removeFileList(file) {
        this.otherForm.imgCommonArr.splice(file, 1);
      },//商品移除某商品图片
      /* 富文本编辑器 start*/
      // 图片上传之前调取的函数
      beforeUpload(file) {
        let checkFormat = this.checkImg(file);
        if (!checkFormat) return false;
        if (!this.key.token) return false;
      },
      // 图片上传成功回调 插入到编辑器中
      handleSuccess(response, file, fileList) {
        console.log('fileList', fileList)
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
        this.goodsForm.goodsVO.goodsExtendWithBLOBs.content = html;
      },
      /* 富文本编辑器 end*/
      button2() {//扩展属性
        this.form.goodsExtend.annex.check1 = false;
        this.form.goodsExtend.annex.check2 = true

      },
      addOneAnnex() {
        this.goodsForm.goodsVO.goodsExtendWithBLOBs.annex.push({name: '', value: ''});
      },
      deleteOneAnnex(index) {//扩展属性删除
        this.goodsForm.goodsVO.goodsExtendWithBLOBs.annex.splice(index, 1);
      },
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
    border-bottom: 1px dashed #ccc;
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
