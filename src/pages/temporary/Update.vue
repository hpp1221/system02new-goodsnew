<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">修改临时商品</h3>
      <el-tabs v-model="activeName">
        <el-tab-pane label="修改商品" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="120px">
            <el-form-item label="商品图片">
              <uploadoneimg
                v-if="form.id"
                :fileList="form.url"
                @getFileList="getSkuImg"
              >
              </uploadoneimg>
            </el-form-item>
            <br>
            <el-form-item label="商品名称">
              <el-input placeholder="请输入商品名称" v-model="form.name" class="form-input" style="margin:0;width:350px;">
              </el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <!--<catselect @getCatSelect="getCatSelect" style="width:350px;"></catselect>-->
              <el-cascader
                :options="totalCatList"
                v-if="totalCatList.length > 0"
                v-model="catIdArr"
                @change="handleChange">
              </el-cascader>
              <!--@active-item-change="getCatList"-->
              <!--<catselect-->
              <!--@getCatSelect="getGoodsFormCatSelect"-->
              <!--:outCat="cat"-->
              <!--style="margin:0;width:350px;"-->
              <!--&gt;-->
              <!--</catselect>-->
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input placeholder="请输入商品价格" v-model="form.price" class="form-input" style="margin:0;width:350px;">
              </el-input>
            </el-form-item>
            <el-form-item label="商品热度">
              <el-input placeholder="请输入商品热度" v-model="form.hot" class="form-input" style="margin:0;width:350px;">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="sureUpdate" type="primary">创建</el-button>
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
        form: {
          id: '',
          name: '',//商品名称
          catPid: '',//一级类目id
          catPname: '',//一级类目name
          catId: '',//二级类目id
          catName: '',//二级类目name
          number: '',//商品编码
          url: '',//商品图片
          price: '',//价格
          hot: '',//热度
        },
        catAll: [],//分类树的回调
        totalCatList: [],//级联选择器的options
        catIdArr: [],//根据id传回的一级类目和二级类目的id数组
        rules: {},
        activeName: 'first',
        formLabelWidth: '80px',
      }
    },
    components: {
      'uploadoneimg': require('../../components/uploadoneimg'),
    },
    created() {
      this.getCatList();
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    methods: {
      getCatList() {
        let self = this
        let requestData = {}
        self.httpApi.temporary.getGoodsCatTree(requestData, function (data) {
          self.totalCatList = data.data.goodsCatTrees;
        });
      },
      getSkuImg(file) {//商品图片
        this.form.url = file.url;
      },
      cancel() {
        this.$router.push('/temporary/list');
      },
      select(id) {//详情接口
        let self = this
        let requestData = {
          id: id
        }
        self.httpApi.temporary.selectFalseGoodsById(requestData, function (data) {
          self.form = data.data;
          self.catIdArr.push(self.form.catPid);
          self.catIdArr.push(self.form.catId);
        });
      },
      handleChange(val) {
        let self = this;
        self.catAll = val;
        for(let i = 0 ; i < self.totalCatList.length;i++){
          if(self.catAll[0] == self.totalCatList[i].value){
            self.form.catPname = self.totalCatList[i].label;
            for(let j = 0 ; j<self.totalCatList[i].children.length; j++ ){
              if(self.catAll[1] == self.totalCatList[i].children[j].value){
                self.form.catName = self.totalCatList[i].children[j].label;
              }
            }
          }

        }
      },
      sureUpdate() {//修改确认
        let self = this;
        let requestData = {
          id:self.form.id,
          catPid: self.catAll[0],
          catPname: self.form.catPname,
          catId: self.catAll[1],
          catName: self.form.catName,
          name:self.form.name,
          url:self.form.url,
          price:self.form.price,
          hot:self.form.hot,
          number:self.form.number,
        }
        self.httpApi.temporary.updateFalseGoodsById(requestData, function (data) {
          self.$router.push('/temporary/list')
        });
      },
    }
  }
</script>
