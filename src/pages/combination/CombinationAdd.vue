<template>
  <div class="container">
    <div class="wrapper">
      <!--添加组合营销三步骤-->
      <div class="addGoods-top">
        <h4 class="addGoods-top-title">添加组合营销</h4>
        <el-steps :space="200" :active="active" finish-status="success" class="addGoods-top-detp" align-center>
          <el-step title="选择商品组合" class="addGoods-top-step1" style="font-size: 12px"></el-step>
          <el-step title="添加信息/销售属性" class="addGoods-top-step1"></el-step>
          <el-step title="上架" class="addGoods-top-step1"></el-step>
        </el-steps>
      </div>
      <div class="add-comName">
        组合名称 :
        <el-input v-model="name" style="width: 300px"></el-input>
      </div>
      <div class="add-comClassify">
        <div class="addGoods-classify addCombination-classify" v-if="active == 1">
          <h4 class="addGoods-classify-title">选择商品组合</h4>
          <ul class="classify-list classify-list-com" style="float: left">
            <li v-for="it in catData" @click="getNextCat(it.id)" :getNextCatVisibl="false">{{it.name}}</li>
          </ul>
          <ul class="classify-list classify-list-com" style="float: left" v-if="getNextCatVisibl == true">
            <li v-for="it in catData1" @click="getNextCatSecond(it.id)">{{it.name}}</li>
          </ul>
          <div class="addGoods-search-goods">
            <el-input
              placeholder="搜索商品"
              v-model="searchGoods"
            class="searchGoods-input">
            </el-input>
            <el-button class="el-icon-search"></el-button>
            <div class="addGoods-search-goodsImgs">
              <el-table :data="tableDataImg" @selection-change="handleSelectionChange" ref="multipleTable">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column label="商品图片">
                  <template slot-scope="scope">
                    <img v-lazy="scope.row.img" alt=""
                         style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称">

                </el-table-column>
              </el-table>

            </div>

          </div>
          <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float:right;width: 45%;"></pagination>
        </div>
        <div style="overflow: hidden" v-if="active == 1">
          <span style="margin-left: 222px;float: left;">您当前选择的是 : </span><span
          style="color: #f40">{{catFirst + catDataName}}</span>
          <el-button style="margin: 12px 420px 0px 0px;float: right" @click="nextFirst(pageSize,pageNo)">下一步</el-button>
          <el-button style="margin: 12px 30px 0px 0px;float: right" @click="cancelFirst">取消</el-button>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
 export default {
   data(){
     return {
       name:'',//组合名称
       active: 1,
       catData: [],//一级类目
       getNextCatVisibl:false,
       catData1: [],//二级类目
       catFirst:'',//选择的一级类目名称
       catDataName: '',//选择的二级类目名称
       searchGoods:'',//搜索商品
       tableDataImg:[],//选择商品1、2列表
       pageSize: 5,
       pageNo: 1,
       totalPage: 10,
     }
   },
   created(){
     this.getCatList();
   },
   components: {
     'uploadmultipleimg': require('../../components/uploadmultipleimg'),
     'uploadoneimg': require('../../components/uploadoneimg'),
     'catselect': require('../../components/getcatselect'),
     'pagination': require('../../components/pagination'),
   },
   methods:{
     handleSelectionChange(){

     },
     pageChanged(page) {
       this.pageSize = page.size;
       this.pageNo = page.num;
       this.getGoodsImgs(page.size, page.num)
     },
     getGoodsImgs(){
       let self = this;
       let requestData = {
         goodsSkuRequest: {catId: self.NextCatSecondId},
         pageNo: self.pageNo,
         pageSize: self.pageSize
       };
       self.httpApi.goods.skuList(requestData, function (data) {
         console.log('sku', data)
         self.tableDataImg= data.data.list;
         self.totalPage = data.data.total;
       });
     },
     getCatList() {//分类列表
       let self = this;
       let requestData = {
         catId: -1
       }
       self.httpApi.goods.catList(requestData, function (data) {
         console.log('cat1', data)
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
       for (let i = 0; i < self.catData1.length; i++) {
         if (self.catData1[i].id == id) {
           self.catDataName = self.catData1[i].name;
         }
       }
//       self.getGoodsImgs(self.pageNo,self.pageSize);
       let requestData = {
         goodsSkuRequest: {catId:id},
         pageNo: self.pageNo,
         pageSize: self.pageSize
       };
       self.httpApi.goods.skuList(requestData, function (data) {
         console.log('sku', data)
         self.tableDataImg= data.data.list;
         self.totalPage = data.data.total;
       });
     },
   },
 }
</script>
