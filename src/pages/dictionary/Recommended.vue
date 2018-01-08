<template>
  <div class="container">
    <div class="wrapper">
      <div class="addGoods-top">
        <h4 class="addGoods-top-title">为你推荐</h4>
        <el-steps :space="200" :active="active" finish-status="success" class="addGoods-top-detp" align-center>
          <el-step title="选择分类" class="addGoods-top-step1" style="font-size: 12px"></el-step>
          <el-step title="添加商品" class="addGoods-top-step1"></el-step>
          <el-step title="完成" class="addGoods-top-step1"></el-step>
        </el-steps>
      </div>
      <div class="addGoods-classify" v-if="active == 1">
        <!--<div class="addGoods-classify-left">-->
        <h4 class="addGoods-classify-title">选择分类</h4>
        <div class="addGoods-classify-title-left">
          <ul class="classify-list" style="float: left">
            <li v-for="it in catData" @click="getNextCat(it.id)" :getNextCatVisibl="false">{{it.name}}</li>
          </ul>
          <ul class="classify-list" style="float: left" v-if="getNextCatVisibl == true">
            <li v-for="it in catData1" @click="getNextCatSecond(it.id)">{{it.name}}</li>
          </ul>
          <!--</div>-->
        </div>

      </div>
      <div class="addGoods-classify" v-if="active == 2">
        <h4 class="addGoods-classify-title">增加商品图片</h4>
        <div style="overflow: hidden">
          <el-checkbox label="t.id" v-for="t in tableData" :key="t.id" @change="checkImgChange(t.id)" style="margin-left: 30px">
            <img v-lazy="t.img" style="width: 150px;float:left;">
          </el-checkbox>
          <!--<el-checkbox v-model="checked4" label="2" border></el-checkbox>-->
        </div>
        <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float:right"></pagination>
      </div>
      <div class="addGoods-classify" v-if="active == 3">
        <el-table :data="tableDataImg" @selection-change="handleSelectionChange" ref="multipleTable">
          <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
          <!--</el-table-column>-->
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img v-lazy="scope.row.img" alt=""
                   style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="商品名称">

          </el-table-column>
          <el-table-column prop="price" label="单价">

          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="overflow: hidden" v-if="active == 1">
      <span style="margin-left: 222px;float: left;">您当前选择的是 : </span><span style="color: #f40">{{catFirst + catDataName}}</span>
      <el-button style="margin: 12px 420px 0px 0px;float: right" @click="nextFirst(pageSize,pageNo)">下一步</el-button>
      <!--<el-button style="margin: 12px 30px 0px 0px;float: right" @click="cancelFirst">取消</el-button>-->
    </div>
    <div style="overflow: hidden" v-if="active == 2">
      <el-button style="margin: 12px 420px 0px 0px;float: right" @click="nextSecond">下一步</el-button>
      <el-button style="margin: 12px 30px 0px 0px;float: right" @click="gobackSecond">返回上一步</el-button>
      <el-button style="margin: 12px 30px 0px 0px;float: right" @click="cancelFirst">取消</el-button>
    </div>
    <div v-if="active == 3">
      <el-button style="margin: 12px 420px 0px 0px;float: right" @click="cancelFirst">返回</el-button>
    </div>
    <!--<div class="addGoods-info" v-if="active == 2">-->
    <!--<p class="addGoods-info-title">添加商品基本信息</p>-->
    <!--<div class="addGoods-info-main-operation">-->
    <!--<el-button @click="cancelSecond">取消</el-button>-->
    <!--<el-button @click="returnFirst">返回上一步</el-button>-->
    <!--<el-button @click="gobackThree">下一步</el-button>-->
    <!--</div>-->

    <!--</div>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 1,
        catData: [],//一级类目
        catData1: [],//二级类目
        catFirst: '',//选择的一级类目名称
        getNextCatVisibl: false,
        formLabelWidth: '80px',
        catDataName: '',//选择的二级类目名称
        NextCatSecondId: '',//选择的二级类目id
        tableData: [],//添加图片列表
        pageSize: 5,
        pageNo: 1,
        totalPage: 10,
        checkImgId: [],//选择添加图片的id
        tableDataImg: [],//添加商品图片后的商品列表
      }
    },
    components: {
      'uploadmultipleimg': require('../../components/uploadmultipleimg'),
      'uploadoneimg': require('../../components/uploadoneimg'),
      'catselect': require('../../components/getcatselect'),
      'pagination': require('../../components/pagination'),
    },
    created() {
      this.getCatList()//分类列表
    },
    methods: {
      checkImgChange(imgId) {
        let self = this;
        for (let i = 0; i < self.tableData.length; i++) {
          if (self.tableData[i].id == imgId) {
            self.checkImgId.push(self.tableData[i].id);
          }
        }
      },
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNo = page.num;
        this.nextFirst(page.size, page.num)
      },
      getCatList() {//分类列表
        let self = this;
        let requestData = {
          catId: -1
        }
        self.httpApi.goods.catList(requestData, function (data) {
          self.catData = data.data;
        });
      },
      getNextCat(id) {//点击一级类目
        let self = this;
        let requestData = {
          catId: id
        }
        self.httpApi.goods.catList(requestData, function (data) {
          self.getNextCatVisibl = true;
          self.catData1 = data.data;
          self.catFirst = data.data[0].parentIds.split('/')[0] + '>';
        });
      },
      getNextCatSecond(id) {//点击二级类目

        let self = this;
        self.NextCatSecondId = id;
        for (let i = 0; i < self.catData1.length; i++) {
          if (self.catData1[i].id == id) {
            self.catDataName = self.catData1[i].name;
          }
        }
      },
      nextFirst(size, num) {//选择分类中的下一步
        let self = this;
        if (self.catDataName == '') {
          self.$message('请选择下一级类目')
        } else {
          self.active = 2;
          let requestData = {
            goodsSkuRequest: {catId: self.NextCatSecondId},
            pageNo: num,
            pageSize: size
          };
          self.httpApi.goods.skuList(requestData, function (data) {
            console.log('sku', data)
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
          });
        }

      },
      nextSecond() {//添加商品active:2中的下一步
        let self = this;
        let requestData = {
          count: 10,
          skuIds: self.checkImgId
        }
        self.httpApi.goodsCat.addRecommendedForYouGoods(requestData, function (data) {
          if(self.tableData.length > 0) {
            self.active++;
            self.$message('添加成功');
            self.getImgs();
          }else{
            self.$message('暂无商品');
          }
        });
      },
      getImgs() {//完成后的列表页
        let self = this;
        let requestData = {
          pageNum: 1,
          pageSize: 10
        }
        self.httpApi.goodsCat.recommendedForYou(requestData, function (data) {
          if(self.tableData.length > 0){
            self.tableDataImg = data.data.list;
          }
        });
      },
      cancelFirst() {//选择分类的取消
        this.active = 1;
      },
      cancelSecond() {//添加信息中的取消
        this.active = 1;
      },
      gobackSecond() {//添加信息中的返回上一步
        this.active--;
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
</style>
