<template>
  <div class="container">
    <div class="wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="sku详情" name="first">
          <div style="width: 28%;">
            <el-carousel indicator-position="outside" ref="carousel" :autoplay="false" style="width: 450px;"
                         height="450px">
              <el-carousel-item v-for="(item,index) in goodsForm.goodsImgsList" :key="item.id" name="index">
                <img :src="item.imgUrl" @click="picClick(index)" class="oneImgClass">
              </el-carousel-item>
            </el-carousel>
            <div>
              <ul class="lunBo-fuDong">
                <li v-for="(item1,index1) in goodsForm.goodsImgsList" :key="item1.id">
                  <img :src="item1.imgUrl" @click="picClick(index1)">
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="second">

        </el-tab-pane>
      </el-tabs>
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
        },//sku  form
        goodsForm: {
          brandId: '',//品牌id
          brandName: '',//品牌name
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
        othersForm: {
          imgSList: [],//主图加上单个sku的组图的总图用于显示走马灯
        }//others form
      }
    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    components: {},
    methods: {
      picClick(index) {
        this.$refs.carousel.setActiveItem(index);
      },
      select(skuId) {
        let self = this;
        let imgObj = {};
        let requestData = {skuId: skuId};
        self.httpApi.commodit.selectGoodsInfoBySkuId(requestData, function (data) {
          self.skuForm = data.data.goodsSkuVO;
          self.goodsForm = data.data.goodsVO;
          imgObj['id'] = self.skuForm.id;
          imgObj['imgUrl'] = self.skuForm.img;
          self.goodsForm.goodsImgsList.unshift(imgObj);
          console.log('self.goodsForm.goodsImgsList', self.goodsForm.goodsImgsList);
        })
      },

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
