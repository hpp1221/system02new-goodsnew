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
                :options="editorOption"
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
          <el-form :inline="true" :model="goodsForm" ref="goodsForm" class="demo-form-inline" style="overflow: hidden">
            <p class="addGoods-info-title">修改商品基本信息</p>
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
              <el-select v-model="goodsForm.goodsVO.brandName" filterable @change="clickBrand">
                <el-option
                  v-for="item in otherForm.brandList"
                  :key="item.id"
                  :label="item.nameCn"
                  :value="item.id+','+item.nameCn">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计量单位" class="addGoods-info-main-item1">
              <el-select v-model="goodsForm.goodsVO.unit" @change="clickUnit">
                <el-option :label="item1.name" :value="item1.name" v-for="item1 in otherForm.unitList" :key="item1.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="贸易形态" class="addGoods-info-main-item1">
              <el-select v-model="goodsForm.goodsVO.tradeName" @change="clickTrade">
                <el-option :label="item1.name" :value="item1" v-for="item1 in otherForm.tradeList" :key="item1.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签" class="addGoods-info-main-item1">
              <el-checkbox-group v-model="otherForm.checkListIds">
                <el-checkbox :label="item.name" v-for="item in otherForm.tagsList" :key="item.id"
                             @change="changeTag(item)"></el-checkbox>
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
            <div style="padding:10px 95px;" v-for="s1 in otherForm.mustBasicInfoNew" :key="s1.id">
              <div v-if="s1.checkbox === 1">
                <div style="margin-bottom: 20px;display: block;" v-for="ss1 in goodsForm.goodsVO.goodsAttributeList"
                     :key="ss1.attributeId" v-if="ss1.attributeId === s1.id">
                  <p class="basicInfo">{{s1.name}} : </p>
                  <el-select v-model="ss1.attributeItemName" filterable
                             @change=changeBasicSelect(s1.id,ss1.attributeItemName) style="width: 300px;">
                    <el-option v-for="item in s1.children" :key="item.id" :label="item.name"
                               :value="item.id+','+item.name">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div v-if="s1.input === 1">
                <div style="margin-bottom: 20px;display: block;" v-for="ss1 in goodsForm.goodsVO.goodsAttributeList"
                     :key="ss1.attributeId" v-if="ss1.attributeId === s1.id">
                  <p class="basicInfo">{{s1.name}} : </p>
                  <el-input v-model="ss1.attributeItemName" @change=changeBasicInput(s1.id,s1.name,ss1.attributeItemName)
                            type="text" class="item.num1 form-input">
                  </el-input>
                </div>
              </div>
            </div>
            <div style="padding:10px 95px;" v-for="(s2,index) in updateForm.goodsAttributeListNew" :key="s2.id">
              <div v-if="s2.checkbox === 1">
                <div style="margin-bottom: 20px;display: block;" v-for="ss2 in updateForm.goodsAttributeList"
                     :key="ss2.attributeId" v-if="ss2.attributeId === s2.id">
                  <p class="basicInfo">{{s2.name}} : </p>
                  <el-select v-model="ss2.attributeItemName" filterable
                             @change=changeBasicSelectNew(s2.id,s2.name,ss2.attributeItemName,index)
                             style="width: 300px;">
                    <el-option v-for="item in s2.children" :key="item.id" :label="item.name"
                               :value="item.id+','+item.name">
                    </el-option>
                  </el-select>
                </div>
              </div>

              <div v-if="s2.input === 1">
                <div style="margin-bottom: 20px;display: block;" v-for="ss2 in updateForm.goodsAttributeList"
                     :key="ss2.attributeId" v-if="ss2.attributeId === s2.id">
                  <p class="basicInfo">{{s2.name}} : </p>
                  <el-input v-model="ss2.attributeItemName"
                            @change=changeBasicInputNew(s2.id,s2.name,ss2.attributeItemName,index) type="text"
                            class="item.num1 form-input">
                  </el-input>
                </div>
              </div>
            </div>
            <el-form-item label="销售属性 ( 规格 )" class="addGoods-info-main-item1">
            </el-form-item>
            <br>
            <div v-for="(s,sindex) in form.mustSpec" :key="sindex" v-if="form.mustSpec.length > 0"
                 style="overflow: hidden;margin: 15px 0 15px 80px">
              <span style="font-size: 15px;margin-right:20px;float: left">{{s.name}}</span>
              <el-checkbox-group v-model="goodsForm.skuIds" style="float: left">
                <el-checkbox :label="v.id" style="width: 100px;" v-for="v in s.children" :key="v.id"
                             @change="getSpecChange(s,v,sindex)">{{v.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <el-form-item>
              <el-table
                :data="goodsForm.goodsSkuVOList"
                v-if="goodsForm.goodsSkuVOList.length > 0"
                style="width: 1520px;overflow: auto">
                <el-table-column
                  label="是否上架"
                  width="180">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.status" true-label="1" false-label="0">
                    </el-checkbox>
                  </template>
                </el-table-column>
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
                  v-for="s in lastChecked"
                  :key="s.id"
                  width="100">
                  <template slot-scope="scope">
                    <span>{{scope.row.skuShow[s.id].name}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="SKU编码"
                  width="250">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.number" :disabled="true">
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
            <el-form-item class="addGoods-info-main-item1">
              <br>
            </el-form-item>
            <div class="addGoods-info-goodsimgs" style="overflow: hidden">
              <div v-if="goodsForm.isShareImg === 1">
                <div>
                  <el-checkbox v-model="updateForm.shareImg1" class="isOrNotCommon" @change="getCommonIsNotComm">是否公用组图
                  </el-checkbox>
                  <span class="addGoods-info-five">(最多上传5张)</span>
                </div>
                <br>
                <el-upload
                  style="margin-top: 15px;"
                  action="http://upload.qiniu.com/"
                  list-type="picture-card"
                  :data="key"
                  :file-list="updateForm.images"
                  :before-upload="beforeUploadCommonPicNotCommon"
                  :on-success="handleSuccessCommonPicNotCommon"
                  :on-remove="handleRemoveCommonPicNotCommon"
                  :limit="5"
                  v-if="key.token && updateForm.shareImg1 === true">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <br>
                <el-table
                  :data="goodsForm.goodsSkuVOList"
                  v-if="goodsForm.goodsSkuVOList.length > 0 && updateForm.shareImg1 === false"
                  border
                  style="width: 100%;">
                  <el-table-column
                    :label="s.specName"
                    v-for="s in lastChecked"
                    :key="s.id"
                    width="100">
                    <template slot-scope="scope">
                      <span> {{scope.row.skuShow[s.id].name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="图片"
                    width="1000">
                    <template slot-scope="scope">
                      <el-upload
                        action="http://upload.qiniu.com/"
                        list-type="picture-card"
                        :data="key"
                        :file-list="scope.row.images"
                        :before-upload="beforeUploadIsNotCommonPic"
                        :on-success="handleSuccessNotIsCommonPic"
                        :on-remove="handleRemoveNotIsCommonPic"
                        @click.native="rememberIndexIsCommonPic(scope)"
                        :limit="5"
                        v-if="key.token">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-if="goodsForm.isShareImg === 0">
                <div>
                  <el-checkbox class="isOrNotCommon" v-model="updateForm.shareImg2" @change="getNotCommonIsCommon">
                    是否公用组图
                  </el-checkbox>
                  <span class="addGoods-info-five">(最多上传5张)</span>
                  <br>
                  <el-table
                    :data="goodsForm.goodsSkuVOList"
                    v-if="goodsForm.goodsSkuVOList.length > 0 && updateForm.shareImg2 === false"
                    border
                    style="width: 100%;">
                    <el-table-column
                      :label="s.specName"
                      v-for="s in lastChecked"
                      :key="s.id"
                      width="100">
                      <template slot-scope="scope">
                        <span> {{scope.row.skuShow[s.id].name}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="图片"
                      width="1000">
                      <template slot-scope="scope">
                        <el-upload
                          action="http://upload.qiniu.com/"
                          list-type="picture-card"
                          :data="key"
                          :file-list="scope.row.images"
                          :before-upload="beforeUploadCommonPic"
                          :on-success="handleSuccessCommonPic"
                          :on-remove="handleRemoveCommonPic"
                          :limit="5"
                          @click.native="rememberIndexCommonPic(scope)"
                          v-if="key.token">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div>
                  <el-upload
                    action="http://upload.qiniu.com/"
                    list-type="picture-card"
                    :data="key"
                    :file-list="updateForm.images"
                    :before-upload="beforeUploadCommonPicIsCommon"
                    :on-success="handleSuccessCommonPicIsCommon"
                    :on-remove="handleRemoveCommonPicIsCommon"
                    :limit="5"
                    v-if="key.token && updateForm.shareImg2 === true">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </div>
            </div>
            <br>
            <el-form-item label="商品详情" class="addGoods-info-main-item1" style="overflow: hidden">
              <quill-editor
                v-model="goodsForm.goodsVO.goodsExtendWithBLOBs.content"
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
                <i class="el-icon-plus" @click="addOneAnnex"></i><br>
                <li v-for="(item,index) in goodsForm.goodsVO.goodsExtendWithBLOBs.annex">
                  <i class="el-icon-minus" @click="deleteOneAnnex(index)"></i>
                  <el-input type="text" class="item.num1 form-input" v-model="item.name"
                            placeholder="请输入属性名称" style="margin: 0px 10px 10px 0px">
                  </el-input>
                  <el-input type="text" class="item.num1 form-input" v-model="item.value"
                            placeholder="请输入属性值" style="margin: 0px 10px 10px 0px">
                  </el-input>
                </li>
              </ul>
            </el-form-item>
          </el-form>
          <div style="float: right;margin-right: 18%">
            <el-button @click="updateGoodsSure">确定</el-button>
            <el-button @click="cancelUpdateGoods">取消</el-button>
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
          isShareImg: '',//是否是共用组图
        },//goods form
        otherForm: {
          brandList: [],//品牌列表
          unitList: [],//单位列表
          tradeList: [],//贸易形态列表
          tagsList: [],//标签列表
          checkListIds: [],//标签选择后的id数组
          mustBasicInfo: [],//基本属性数组
          mustBasicInfoNew: [],//基本属性数组
          checkList: [],
          // imgCommonChecked: true,//是否是共用组图 1\0
          imgCommonArr: [],//由map改变后的img数组 isShareImg---1
          imgNotCommonArr: [],//由map改变后的img数组 isShareImg---0
          imgNotCommonArrNew: [],//由map改变后的img数组 isShareImg---0
          //update form
          basicInfoObj: {},//基本属性map
          isCommon: false,//非公用变成公用时的单选框
          indexIsCommon: 0,//共用组图点击图片记录index
          checkboxMust: [],//规格可显示的name
          BasicInputNewObj: {},//修改基本属性中的新增
        },
        updateForm: {
          goodsAttributeList: [],//基本属性
          goodsAttributeListNew: [],//基本属性
          annex: [],//扩展属性
          shareImg1: true,//共用转不共用
          shareImg2: false,//与上面相反
          images: [],//共用转非共用images
          skuVOList: [],
          newBasicValue: '',
        },//update form
        fileList: [],
        form: {
          spec: [],//必有规格
          mustSpec: [],//必有规格
          skus: [],
          skuMust: [],
        },
        checkedList: [],
        categoryId: '',
        lastChecked: [],
        beforeChangeSku: [],
        skuImgIndex: 0,
        skuStr: {},//后台需要的sku类型
        commonPicIndex: 0,//非共用组图点击图片记录index
      }
    },
    created() {
      let self = this;
      self.$route.params.id ? self.select(self.$route.params.id) : self.$router.push('/error');
      self.key.file = "";
      self.fullscreenLoading = true;
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
      quillEditor,
      'uploadoneimg': require('../../components/uploadoneimg'),
      'uploadmultipleimg': require('../../components/uploadmultipleimg'),
      'brandselect': require('../../components/getbrandselect'),
    },
    watch: {
      tabName: function (newVal, oldVal) {
        if (newVal === 'first') {
          this.select(this.$route.params.id);
        } else if (newVal === 'second') {
          this.selectGoods(this.$route.params.goodsId);
          this.otherForm.mustBasicInfoNew = [];
          // this.updateForm.goodsAttributeListNew = [];
          this.getBrandList();//品牌接口
          this.getUnitList();//单位接口
          this.getTradeList();//贸易形态接口
          this.getTagsList();//标签接口

        }
      },
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
        this.goodsForm.goodsVO.goodsExtendWithBLOBs.content = html;
      },
      /* 富文本编辑器 end*/
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
      /* -------------------------------------------------修改goods显示-----------------------------------------------*/
      getTagsList() {
        let self = this;
        self.httpApi.goodsCat.selectTagList({}, function (data) {
          self.otherForm.tagsList = data.data.list;
        })
      },//标签
      selectGoods(goodsId) {
        let self = this;
        let ids = [];
        let requestData = {
          goodsId: goodsId
        };
        self.httpApi.commodit.selectGoodsInfoById(requestData, function (data) {
          self.goodsForm = data.data;
          let goodsSkuVOList = self.goodsForm.goodsSkuVOList;
          if (self.goodsForm.isShareImg === 1) {
            for (let i = 0; i < goodsSkuVOList.length; i++) {
              goodsSkuVOList[i].images = goodsSkuVOList[i].goodsImgsList;
            }
            for (let i = 0; i < goodsSkuVOList.length; i++) {
              for (let j = 0; j < goodsSkuVOList[i].images.length; j++) {
                goodsSkuVOList[i].images[j].url = goodsSkuVOList[i].images[j].imgUrl;
              }
            }
            self.updateForm.images = goodsSkuVOList[0].images;
          }
          if (self.goodsForm.isShareImg === 0) {
            for (let i = 0; i < goodsSkuVOList.length; i++) {
              goodsSkuVOList[i].images = goodsSkuVOList[i].goodsImgsList;
            }
            for (let i = 0; i < goodsSkuVOList.length; i++) {
              for (let j = 0; j < goodsSkuVOList[i].goodsImgsList.length; j++) {
                goodsSkuVOList[i].images[j].url = goodsSkuVOList[i].images[j].imgUrl;
              }
            }
          }
          self.goodsForm.goodsSkuVOList = goodsSkuVOList;
          //
          self.goodsForm.goodsVO.goodsExtendWithBLOBs.annex = JSON.parse(self.goodsForm.goodsVO.goodsExtendWithBLOBs.annex);
          self.goodsForm.goodsVO.goodsTagList.map(function (value) {
            self.otherForm.checkListIds.push(value.tagName);
          });//标签ids
          for (let i = 0; i < self.goodsForm.goodsSkuVOList.length; i++) {
            self.goodsForm.goodsSkuVOList[i].sku = JSON.parse(self.goodsForm.goodsSkuVOList[i].sku);
            self.goodsForm.goodsSkuVOList[i].images = self.goodsForm.goodsSkuVOList[i].goodsImgsList;
            let obj = {};
            for (let j = 0; j < self.goodsForm.goodsSkuVOList[i].skuSpecInfos.length; j++) {
              let objNew = self.goodsForm.goodsSkuVOList[i].skuSpecInfos[j];
              objNew['id'] = self.goodsForm.goodsSkuVOList[i].skuSpecInfos[j].specItemId;
              objNew['name'] = self.goodsForm.goodsSkuVOList[i].skuSpecInfos[j].specItemName;
              obj[self.goodsForm.goodsSkuVOList[i].skuSpecInfos[j].specId] = objNew;
              self.goodsForm.goodsSkuVOList[i].skuShow = obj;
            }
          }
          self.beforeChangeSku = self.goodsForm.goodsSkuVOList;
          for (let i = 0; i < self.goodsForm.goodsVO.goodsSpecInfoList.length; i++) {
            self.lastChecked.push({
              'id': self.goodsForm.goodsVO.goodsSpecInfoList[i].specId,
              'specName': self.goodsForm.goodsVO.goodsSpecInfoList[i].specName,
              'specValue': self.goodsForm.goodsVO.goodsSpecInfoList[i].specItemVOList,
            })
          }
          //规格列表
          let requestData1 = {
            categoryId: self.goodsForm.goodsVO.categoryId
          };
          self.httpApi.commodit.selectCategoryAttributeListByCategoryId(requestData1, function (data) {
            self.otherForm.mustBasicInfo = data.data;
            let mustBasicInfo = self.otherForm.mustBasicInfo;
            let goodsAttributeList = self.goodsForm.goodsVO.goodsAttributeList;
            for (let y = 0; y < mustBasicInfo.length; y++) {
              for (let r = 0; r < goodsAttributeList.length; r++) {
                if (mustBasicInfo[y].id === goodsAttributeList[r].attributeId) {
                  if (mustBasicInfo[y].checkbox === 1) {
                    goodsAttributeList[r].attributeType = 'checkbox';
                  }
                  if (mustBasicInfo[y].input === 1) {
                    goodsAttributeList[r].attributeType = 'input';
                  }
                }
              }
            }
            for (let yy = 0; yy < mustBasicInfo.length; yy++) {
              let obj = mustBasicInfo[yy];
              let num = obj.id;
              let isExist = false;
              for (let bb = 0; bb < goodsAttributeList.length; bb++) {
                let aj = goodsAttributeList[bb];
                let n = aj.attributeId;
                if (n === num) {
                  isExist = true;
                  break;
                }
              }
              if (isExist) {
                self.otherForm.mustBasicInfoNew.push(obj);
                console.log("self.otherForm.mustBasicInfoNew", self.otherForm.mustBasicInfoNew);
              }
              if (!isExist) {
                self.updateForm.goodsAttributeListNew.push(obj);
                console.log("self.updateForm.goodsAttributeListNew", self.updateForm.goodsAttributeListNew);
              }
            }
            for (let rr = 0; rr < self.updateForm.goodsAttributeListNew.length; rr++) {
              self.updateForm.goodsAttributeList.push({
                'attributeId': self.updateForm.goodsAttributeListNew[rr].id,
                'attributeName': self.updateForm.goodsAttributeListNew[rr].name,
                'attributeItemId': '',
                'attributeItemName': '',
              })
            }
          });//基本属性接口
          self.httpApi.commodit.selectCategorySpecListByCategoryId(requestData1, function (data) {
            self.form.mustSpec = data.data;
            self.form.mustSpec.map(value => {
              self.checkedList.push({
                id: value.id,
                specName: value.name,
                specValue: []
              });
            });
            for (let i = 0; i < self.goodsForm.goodsVO.goodsSpecInfoList.length; i++) {
              for (let j = 0; j < self.checkedList.length; j++) {
                if (self.goodsForm.goodsVO.goodsSpecInfoList[i].specId === self.checkedList[j].id) {
                  self.checkedList[j].specValue = self.goodsForm.goodsVO.goodsSpecInfoList[i].specItemVOList;
                }
              }
            }
          });
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
          });
          //富文本编辑器
        });
      },//sku列表
      getGoodsNumbers(skuNum) {//自动生成商品编码//p开头 年月日时分秒一位或者两位数字
        let self = this;
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
          self.goodsForm.goodsSkuVOList[i].number = currentStr;
        }
      },  //sku编码
      createGoodsDetail(tableMap, index, tableMap1) {
        let lastChecked = this.lastChecked;
        let size = lastChecked.length;
        let tableKey = lastChecked[index].id;
        for (let i = 0; i < lastChecked[index].specValue.length; i++) {//颜色
          tableMap[tableKey] = lastChecked[index].specValue[i].id;
          tableMap1[tableKey] = lastChecked[index].specValue[i];
          if (index < size - 1) {
            index++;
            this.createGoodsDetail(tableMap, index, tableMap1);
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
            singleSku.skuShow = tableMap1;
            this.goodsForm.goodsSkuVOList.push(JSON.parse(JSON.stringify(singleSku)));
          }
        }
        this.getGoodsNumbers(this.goodsForm.goodsSkuVOList.length);
      },//递归  笛卡儿积
      getSpecChange(svl, val, index) {
        let self = this;
        let item = self.checkedList.find(n => n.id === svl.id);
        let clickItem = item.specValue.findIndex(n => n.id === val.id);
        if (clickItem !== -1) {//点击后再点击已是取消时发生的状态
          item.specValue.splice(clickItem, 1);
        } else {
          item.specValue.push(val);
        }
        let arr = [];
        self.checkedList.map(value => {
          if (value.specValue.length > 0) {
            arr.push(value);
          }
        });
        self.lastChecked = arr;
        self.goodsForm.goodsSkuVOList = [];
        self.createGoodsDetail({}, 0, {});
        for (let i = 0; i < self.goodsForm.goodsSkuVOList.length; i++) {
          for (let j = 0; j < self.beforeChangeSku.length; j++) {
            //比较sku
            let skus = self.goodsForm.goodsSkuVOList[i].sku;
            let beforeChangeSku = self.beforeChangeSku[j].sku;
            if (self.compare(skus, beforeChangeSku)) {
              self.goodsForm.goodsSkuVOList[i] = self.beforeChangeSku[j];
            }
          }
        }
      },//点击规格多选框回调函数
      //----------------------------------------------------比较sku-----------------------------------------------------
      compare(objA, objB) {
        if (!this.isObj(objA) || !this.isObj(objB)) return false; //判断类型是否正确
        if (this.getLength(objA) != this.getLength(objB)) return false; //判断长度是否一致
        return this.compareObj(objA, objB, true); //默认为true
      },
      compareObj(objA, objB, flag) {
        for (var key in objA) {
          if (!flag) //跳出整个循环
            break;
          if (!objB.hasOwnProperty(key)) {
            flag = false;
            break;
          }
          if (!this.isArray(objA[key])) { //子级不是数组时,比较属性值
            if (objB[key] != objA[key]) {
              flag = false;
              break;
            }
          } else {
            if (!this.isArray(objB[key])) {
              flag = false;
              break;
            }
            var oA = objA[key],
              oB = objB[key];
            if (oA.length != oB.length) {
              flag = false;
              break;
            }
            for (var k in oA) {
              if (!flag) //这里跳出循环是为了不让递归继续
                break;
              flag = this.CompareObj(oA[k], oB[k], flag);
            }
          }
        }
        return flag;
      },
      isObj(object) {
        return object && typeof(object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
      },
      isArray(object) {
        return object && typeof(object) == 'object' && object.constructor == Array;
      },
      getLength(object) {
        var count = 0;
        for (var i in object) count++;
        return count;
      },
      //------------------------------------------------------比较sku---------------------------------------------------
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
      /* -------------------------------------------------修改goods确定-----------------------------------------------*/
      clickBrand(item) {
        let item1 = item.split(',');
        this.goodsForm.goodsVO.brandId = item1[0];
        this.goodsForm.goodsVO.brandName = item1[1];
      },//修改品牌
      clickUnit(unit) {
        this.goodsForm.goodsVO.unit = unit;
      },//修改单位
      clickTrade(trade) {
        this.goodsForm.goodsVO.tradeType = trade.value;
        this.goodsForm.goodsVO.tradeName = trade.name;
      },//修改贸易形态
      changeTag(tag) {
        let self = this;
        let tagSArr = [];
        for (let i = 0; i < self.otherForm.tagsList.length; i++) {
          for (let j = 0; j < self.otherForm.checkListIds.length; j++) {
            if (self.otherForm.tagsList[i].name === self.otherForm.checkListIds[j]) {
              tagSArr.push({
                'tagId': self.otherForm.tagsList[i].id,
                'tagName': self.otherForm.tagsList[i].name,
              });
            }
          }
        }
        self.goodsForm.goodsVO.goodsTagList = tagSArr;
      },//修改标签
      getSkuImg2(file) {
        this.goodsForm.goodsSkuVOList[this.skuImgIndex].img = file.url;
      },//商品,sku图片
      rememberIndex(scope) {
        this.skuImgIndex = scope.$index;
      },//点击sku图片记录index
      changeBasicSelect(parentIdSelect, infoSelect) {
        let self = this;
        let infoBasic = infoSelect.split(',');
        for (let i = 0; i < self.goodsForm.goodsVO.goodsAttributeList.length; i++) {
          if (self.goodsForm.goodsVO.goodsAttributeList[i].attributeId === parentIdSelect) {
            self.goodsForm.goodsVO.goodsAttributeList[i].attributeItemId = infoBasic[0];
            self.goodsForm.goodsVO.goodsAttributeList[i].attributeItemName = infoBasic[1];
            self.goodsForm.goodsVO.goodsAttributeList[i].attributeType = 'checkbox';
          }
        }
      },//基本属性select
      changeBasicInput(parentIdInput, parentNameInput, infoInput) {
        for (let i = 0; i < this.goodsForm.goodsVO.goodsAttributeList.length; i++) {
          if (this.goodsForm.goodsVO.goodsAttributeList[i].attributeId === parentIdInput) {
            this.goodsForm.goodsVO.goodsAttributeList[i].attributeType = 'input';
          }
        }
      },//基本属性input
      changeBasicSelectNew(parentIdNew, parentNameNew, infoNew, indexInputNew) {
        let self = this;
        let infoNewS = infoNew.split(',');
        let childrenObj = {};
        childrenObj['attributeId'] = parentIdNew;
        childrenObj['attributeName'] = parentNameNew;
        childrenObj['attributeItemId'] = infoNewS[0];
        childrenObj['attributeItemName'] = infoNewS[1];
        childrenObj['attributeType'] = 'checkbox';
        self.otherForm.BasicInputNewObj[indexInputNew] = childrenObj;
      },//基本属性新增
      changeBasicInputNew(parentIdNew, parentNameNew, infoNew, indexInputNew) {
        let self = this;
        let childrenObj = {};
        childrenObj['attributeId'] = parentIdNew;
        childrenObj['attributeName'] = parentNameNew;
        childrenObj['attributeItemName'] = infoNew;
        childrenObj['attributeType'] = 'input';
        self.otherForm.BasicInputNewObj[indexInputNew] = childrenObj;
      },//基本属性新增
      rememberIndexCommonPic(scope) {
        this.commonPicIndex = scope.$index;
      },//非公用组图修改
      beforeUploadCommonPic(file) {
        let checkFormat = this.checkImg(file);
        if (!checkFormat) return false;
        if (!this.key.token) return false;
      },//非公用组图修改
      handleSuccessCommonPic(response, file, fileList) {
        this.goodsForm.goodsSkuVOList[this.commonPicIndex].images.push({
          'name': file.name,
          'url': this.imgDomain + response.key
        });
      },//非公用组图修改
      handleRemoveCommonPic(file, fileList) {
        if (this.imageNum > 3) {
          this.imageNum--;
          return
        }
        this.imageNum--;
        let fileDelete1 = {
          name: file.name,
          url: file.url
        };
        for (let i = 0; i < this.goodsForm.goodsSkuVOList[this.commonPicIndex].images.length; i++) {
          if (this.goodsForm.goodsSkuVOList[this.commonPicIndex].images[i].url === fileDelete1.url) {
            this.goodsForm.goodsSkuVOList[this.commonPicIndex].images.splice(i, 1);
          }
        }
      },//非公用组图修改
      getNotCommonIsCommon(val) {
        if (val === true) {
          this.updateForm.images = [];
        }
      },//本为不共用，点击要变为共用；
      beforeUploadCommonPicIsCommon(file) {
        let checkFormat = this.checkImg(file);
        if (!checkFormat) return false;
        if (!this.key.token) return false;
      },//非公用组图变公用
      handleSuccessCommonPicIsCommon(response, file, fileList) {
        this.updateForm.images.push({
          'name': file.name,
          'url': this.imgDomain + response.key
        });
      },//非公用组图变公用
      handleRemoveCommonPicIsCommon(file, fileList) {
        if (this.imageNum > 3) {
          this.imageNum--;
          return
        }
        this.imageNum--;
        let fileDelete = {
          name: file.name,
          url: file.url
        };
        for (let i = 0; i < this.updateForm.images.length; i++) {
          if (this.updateForm.images[i].name === fileDelete.name) {
            this.updateForm.images.splice(i, 1);
          }
        }
      },//非公用组图变公用
      beforeUploadCommonPicNotCommon(file) {
        let checkFormat = this.checkImg(file);
        if (!checkFormat) return false;
        if (!this.key.token) return false;
      },//公用组图修改
      handleSuccessCommonPicNotCommon(response, file, fileList) {
        this.updateForm.images.push({
          'name': file.name,
          'url': this.imgDomain + response.key
        });
      },//公用组图修改
      handleRemoveCommonPicNotCommon(file, fileList) {
        if (this.imageNum > 3) {
          this.imageNum--;
          return
        }
        this.imageNum--;
        this.updateForm.images = fileList;
      },//公用组图修改
      getCommonIsNotComm(val) {
        if (val === false) {
          for (let i = 0; i < this.goodsForm.goodsSkuVOList.length; i++) {
            this.goodsForm.goodsSkuVOList[i].images = [];
          }
        }
      },//本为共用，点击要变为不共用；
      rememberIndexIsCommonPic(scope) {
        this.otherForm.indexIsCommon = scope.$index;
      },//记录图片index
      beforeUploadIsNotCommonPic(file) {
        let checkFormat = this.checkImg(file);
        if (!checkFormat) return false;
        if (!this.key.token) return false;
      },//公用组图变非公用
      handleSuccessNotIsCommonPic(response, file, fileList) {
        this.goodsForm.goodsSkuVOList[this.otherForm.indexIsCommon].images.push({
          'name': file.name,
          'url': this.imgDomain + response.key
        });
      },//公用组图变非公用
      handleRemoveNotIsCommonPic(file, fileList) {
        if (this.imageNum > 3) {
          this.imageNum--;
          return
        }
        this.imageNum--;
        let fileDelete = {
          name: file.name,
          url: file.url
        };
        for (let i = 0; i < this.goodsForm.goodsSkuVOList[this.otherForm.indexIsCommon].images.length; i++) {
          if (this.goodsForm.goodsSkuVOList[this.otherForm.indexIsCommon].images[i].name === fileDelete.name) {
            this.goodsForm.goodsSkuVOList[this.otherForm.indexIsCommon].images.splice(i, 1);
          }
        }
      },//公用组图变非公用
      addOneAnnex() {
        this.goodsForm.goodsVO.goodsExtendWithBLOBs.annex.push({name: '', value: ''});
      },//扩展属性add
      deleteOneAnnex(index) {
        this.goodsForm.goodsVO.goodsExtendWithBLOBs.annex.splice(index, 1);
      },//扩展属性删除
      updateGoodsSure() {
        let self = this;
        let requestData = {};
        let goodsAttributeListNew = [];
        let goodsSkuVOList = self.goodsForm.goodsSkuVOList;
        if (typeof (goodsSkuVOList[0].sku) === "object") {
          for (let t = 0; t < goodsSkuVOList.length; t++) {
            goodsSkuVOList[t].sku = JSON.stringify(goodsSkuVOList[t].sku)
          }
        }//sku JSON.stringify
        let newBasicInfo = [];
        for (let t in self.otherForm.BasicInputNewObj) {
          newBasicInfo.push(self.otherForm.BasicInputNewObj[t])
        }
        for (let p = 0; p < self.goodsForm.goodsVO.goodsAttributeList.length; p++) {
          if (goodsAttributeListNew.indexOf(self.goodsForm.goodsVO.goodsAttributeList[p]) === -1) {
            goodsAttributeListNew.push(self.goodsForm.goodsVO.goodsAttributeList[p]);
          }
        }  //基本属性
        goodsAttributeListNew = goodsAttributeListNew.concat(newBasicInfo);
        // self.skuStr
        for (let i = 0; i < self.lastChecked.length; i++) {
          let idsArrP = [];
          for (let j = 0; j < self.lastChecked[i].specValue.length; j++) {
            idsArrP.push(self.lastChecked[i].specValue[j].id);
            self.skuStr[self.lastChecked[i].id] = JSON.stringify(idsArrP);
          }
        }
        if (self.goodsForm.isShareImg === 1) {
          if (self.updateForm.shareImg1 === true) {
            self.updateForm.shareImg = 1;
          }
          if (self.updateForm.shareImg1 === false) {
            self.updateForm.shareImg = 0;
          }
          requestData = {
            annex: JSON.stringify(self.goodsForm.goodsVO.goodsExtendWithBLOBs.annex),
            brandId: self.goodsForm.goodsVO.brandId,
            brandName: self.goodsForm.goodsVO.brandName,
            categoryId: self.goodsForm.goodsVO.categoryId,
            categoryName: self.goodsForm.goodsVO.categoryName,
            categoryPId: self.goodsForm.goodsVO.categoryPId,
            categoryPName: self.goodsForm.goodsVO.categoryPName,
            content: self.goodsForm.goodsVO.goodsExtendWithBLOBs.content,
            describe: self.goodsForm.goodsVO.goodsExtendWithBLOBs.describe,
            goodsAttributeList: goodsAttributeListNew,
            id: self.goodsForm.goodsVO.id,
            images: self.updateForm.images,
            name: self.goodsForm.goodsVO.name,
            number: self.goodsForm.goodsVO.number,
            shareImg: self.updateForm.shareImg,
            skuVOList: self.goodsForm.goodsSkuVOList,
            skus: JSON.stringify(self.skuStr),
            specId: self.goodsForm.goodsVO.specId,
            specName: self.goodsForm.goodsVO.specName,
            supplierId: '',
            tags: self.goodsForm.goodsVO.goodsTagList,
            tradeName: self.goodsForm.goodsVO.tradeName,
            tradeType: self.goodsForm.goodsVO.tradeType,
            unit: self.goodsForm.goodsVO.unit,
          };
          self.httpApi.commodit.updateGoodsV1(requestData, function (data) {
            self.$message.success(data.message);
            self.$router.push('/commodit/goodslist');
          });
        }
        if (self.goodsForm.isShareImg === 0) {
          if (self.updateForm.shareImg2 === true) {
            self.updateForm.shareImg = 1;
          }
          if (self.updateForm.shareImg2 === false) {
            self.updateForm.shareImg = 0;
          }
          requestData = {
            annex: JSON.stringify(self.goodsForm.goodsVO.goodsExtendWithBLOBs.annex),
            brandId: self.goodsForm.goodsVO.brandId,
            brandName: self.goodsForm.goodsVO.brandName,
            categoryId: self.goodsForm.goodsVO.categoryId,
            categoryName: self.goodsForm.goodsVO.categoryName,
            categoryPId: self.goodsForm.goodsVO.categoryPId,
            categoryPName: self.goodsForm.goodsVO.categoryPName,
            content: self.goodsForm.goodsVO.goodsExtendWithBLOBs.content,
            describe: self.goodsForm.goodsVO.goodsExtendWithBLOBs.describe,
            goodsAttributeList: goodsAttributeListNew,
            id: self.goodsForm.goodsVO.id,
            images: self.updateForm.images,
            name: self.goodsForm.goodsVO.name,
            number: self.goodsForm.goodsVO.number,
            shareImg: self.updateForm.shareImg,
            skuVOList: self.goodsForm.goodsSkuVOList,
            skus: JSON.stringify(self.skuStr),
            specId: self.goodsForm.goodsVO.specId,
            specName: self.goodsForm.goodsVO.specName,
            supplierId: '',
            tags: self.goodsForm.goodsVO.goodsTagList,
            tradeName: self.goodsForm.goodsVO.tradeName,
            tradeType: self.goodsForm.goodsVO.tradeType,
            unit: self.goodsForm.goodsVO.unit,
          };
          self.httpApi.commodit.updateGoodsV1(requestData, function (data) {
            self.$message.success(data.message);
            self.$router.push('/commodit/goodslist');
          });
        }
      },//修改确定
      cancelUpdateGoods(){
        this.$router.push('/commodit/goodslist');
      },//修改取消
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
