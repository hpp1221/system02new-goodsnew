<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">新增临时商品</h3>
      <el-tabs v-model="activeName">
        <el-tab-pane label="创建商品" name="first">
          <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="120px">
            <el-form-item label="商品图片">
              <uploadoneimg
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
                v-model="cat"
                @active-item-change="getCatList"

                :props="props"
              >
              </el-cascader>
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
        form: {
          name: '',//商品名称
          catPid:'',//一级类目id
          catPname:'',//一级类目name
          catId: '',//二级类目id
          catName: '',//二级类目name
          number: '',//商品编码
          url:'',//商品图片
          price:'',//价格
          hot:'',//热度
        },
        cat: [],
        catAll:[],
        totalCatList: [],
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        rules: {},
        activeName: 'first',
        formLabelWidth: '80px',
      }
    },
    components: {
      'uploadoneimg': require('../../components/uploadoneimg'),
      'catselect': require('../../components/getcatselect'),
    },
    created() {
      this.getCatList();
    },
    methods: {
      getCatList(val){
        let self = this;
        self.catAll = val;
        var requestData;
        if (val === undefined) {
          requestData = {catId:-1};
        } else {
          requestData = {catId: val[val.length - 1].id};
        }
        self.httpApi.goods.catList(requestData, function (data) {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].res = JSON.parse(data.data[i].res);
            if (parseInt(data.data[i].hasChild) > 0) {
              data.data[i].children = [];
            }
          }
          if (val === undefined) {
            self.totalCatList = data.data;
          } else {
            self.insertCat(self.totalCatList, val, data.data, 0);
          }
        });
      },
      insertCat(arr, val, data, level){//val:所有父级的数组,data:当前获取到的数据
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === val[level].id) {
            if (val.length === level + 1) {
              arr[i].children = data;
            } else {
              level++;
              this.insertCat(arr[i].children, val, data, level);
            }
          }
        }
      },
      getSkuImg(file) {//商品图片
          this.form.url = file.url;
      },
      cancel() {
        this.$router.push('/temporary/list');
      },
      submit() {//新增
        let self = this;
        let requestData = {
          name:self.form.name,
          url:self.form.url,
          price:self.form.price,
          hot:self.form.hot,
          number:self.form.number,
        catPid:self.catAll[0].id,
      catPname:self.catAll[0].name,
       catId: self.catAll[1].id,
      catName: self.catAll[1].name,
        }
        self.httpApi.temporary.insertFalseGoods(requestData, function (data) {
          self.$router.push('/temporary/list');
        });
      },

    }
  }
</script>
