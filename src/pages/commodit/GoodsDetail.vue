<template>
  <div class="container">
    <div class="wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="sku详情" name="first" class="tab-1">
          <div class="tab-1-div1">
            <el-carousel indicator-position="outside" ref="carousel" :autoplay="false" height="450px"
                         class="carousel-width">
              <el-carousel-item v-for="(item,index) in goodsForm.goodsImgsList" :key="item.id" name="index">
                <img :src="item.imgUrl" @mouseenter="picMouseenter(index)" class="oneImgClass">
              </el-carousel-item>
            </el-carousel>
            <div class="carousel-width">
              <ul class="lunBo-fuDong">
                <li v-for="(item1,index1) in goodsForm.goodsImgsList" :key="item1.id">
                  <img :src="item1.imgUrl" @mouseenter="picMouseenter(index1)">
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-1-div3"></div>
          <div class="tab-1-div2">
            <h3>{{skuForm.title}}</h3>
            <p><span>sku规格 ：</span>{{skuForm.skuAllName}}</p>
            <p v-if='skuForm.status === "1"'><span>sku状态 ：</span>已上架</p>
            <p v-if='skuForm.status === "0"'><span>sku状态 ：</span>未上架</p>
            <p><span>sku条码 ：</span>{{skuForm.barCode}}</p>
            <p><span>sku编码 ：</span>{{skuForm.number}}</p>
            <p><span>起订数量 ：</span>{{skuForm.mustBuyNum}}</p>
            <p><span>sku库存 ：</span>{{skuForm.count}}</p>
            <p><span>市场价格 ：</span>{{skuForm.marketPrice}}</p>
            <p><span>参考价格 ：</span>{{skuForm.referencePrice}}</p>
            <p><span>零售价格 ：</span>{{skuForm.retailPrice}}</p>
            <p><span>物流运费 ：</span>{{skuForm.transportationPrice}}</p>
            <p>活动标签 ：<span class="huo-dong-tag" v-for="item in goodsForm.goodsTagList" :key="item.id">{{item.tagName + '  '}}</span></p>
          </div>

        </el-tab-pane>
        <div class="goods-info-can">
          <p><span>商品名称 ：</span>{{goodsForm.name}}</p> <br/>
          <div class="goods-info-all">
            <p class="goods-info-word">商品信息 ：</p>
            <p class="goods-info-word-p">
              <span>商品品牌：{{goodsForm.brandName}}</span>
              <span>商品分类：{{goodsForm.categoryPName+'/'+goodsForm.categoryName}}</span>
              <span>规格值 ：{{goodsForm.specName}}</span>
              <br>
              <span>贸易形态：{{goodsForm.tradeName}}</span>
              <span>商品单位：{{goodsForm.unit}}</span>
              <span>编码：{{goodsForm.number}}</span>
            </p>
          </div>
          <div class="goods-info-all">
            <p class="goods-info-word">基本属性 ：</p>
            <p class="goods-info-word-p" >
              <span v-for="item in goodsForm.goodsAttributeList" :key="item.attributeId">{{item.attributeName}}：{{item.attributeItemName}}</span>
            </p>
          </div>
          <div class="goods-info-all">
            <p class="goods-info-word">扩展属性：</p>
            <p class="goods-info-word-p" >
              <span v-for="item1 in goodsForm.goodsExtendWithBLOBs.annex" :key="item1.name">{{item1.name}}：{{item1.value}}</span>
            </p>
          </div>
          <div class="goods-info-all">
            <p class="goods-info-word">商品描述：</p>
            <p class="goods-info-word-p goods-info-word-p-detail" >
              <span v-html="goodsForm.goodsExtendWithBLOBs.describe"></span>
            </p>
          </div>
          <div class="goods-info-all">
            <p class="goods-info-word">商品详情：</p>
            <p class="goods-info-word-p goods-info-word-p-detail" >
              <span v-html="goodsForm.goodsExtendWithBLOBs.content"></span>

            </p>
          </div>
        </div>

      </el-tabs>
      <div class="goods-detail-last">
        <el-button class="goods-detail-return" @click="returnList">返回</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',//当前选中的tab
        skuForm: {
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
        },//sku  form
        goodsForm: {
          brandId: '',//品牌id
          brandName: '',//品牌name
          categoryPId: '',//一级分类id
          categoryPName: '',//一级分类name
          categoryId: '',//二级分类id
          categoryName: '',//二级分类name
          goodsAttributeList: [],//基本属性
          goodsExtendWithBLOBs: [],//扩展属性和富文本编辑器
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
        },//goods form
      }
    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    components: { },
    methods: {
      picMouseenter(index) {
        this.$refs.carousel.setActiveItem(index);
      },//走马灯鼠标hover事件
      select(skuId) {
        let self = this;
        let imgObj = {};
        let skuAllName = '';
        let requestData = {skuId: skuId};
        self.httpApi.commodit.selectGoodsInfoBySkuId(requestData, function (data) {
          self.skuForm = data.data.goodsSkuVO;
          self.goodsForm = data.data.goodsVO;
          self.goodsForm.goodsImgsList = data.data.goodsImgsList;
          self.goodsForm.goodsExtendWithBLOBs.annex = JSON.parse(self.goodsForm.goodsExtendWithBLOBs.annex);
          imgObj['id'] = self.skuForm.id;
          imgObj['imgUrl'] = self.skuForm.img;
          self.goodsForm.goodsImgsList.unshift(imgObj);//走马灯总图片
          self.skuForm.skuSpecInfos.map(function (value, key) {
            skuAllName += value.specItemName + ' '
          });
          self.skuForm.skuAllName = skuAllName;//规格名
        })
      },//查询列表
      returnList(){
        this.$router.push('/commodit/goodslist');
      }//返回
    }
  }
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .lunBo-fuDong {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .lunBo-fuDong > li {
    width: 13%;
    height: 66px;
    float: left;
    border: 1px solid #ccc;
    margin-right: 20px;
    padding: 5px;
  }

  .lunBo-fuDong > li > img {
    width: 100%;
    height: 100%;
  }

  .oneImgClass {
    width: 100%;
    height: 100%;
    border: 1px solid #b4bccc;
  }
</style>
