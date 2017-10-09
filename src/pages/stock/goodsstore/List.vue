<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品库存</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item>
          <el-select placeholder="全部仓库" v-model="easyForm.address" multiple>
            <el-option :label="t.address" :key="t.id" :value="t.address" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="按商品名称/编码/规格/条形码/关键字搜索" icon="search" v-model="easyForm.keyword" class="long-input">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData">
        <el-table-column prop="goodsName" label="商品名称" sortable>

        </el-table-column>
        <el-table-column prop="goodsSpec" label="规格">

        </el-table-column>
        <el-table-column prop="unit" label="单位">

        </el-table-column>
        <el-table-column prop="storeHouseAddress" label="所属仓库">

        </el-table-column>
        <el-table-column prop="upLimit" label="库存上限">

        </el-table-column>
        <el-table-column prop="downLimit" label="库存下限">

        </el-table-column>
        <el-table-column prop="preOrder" label="预购量" sortable>

        </el-table-column>
        <el-table-column prop="onTheWay" label="在途量">

        </el-table-column>
        <el-table-column prop="inStoreHouse" label="库存量" sortable>

        </el-table-column>
        <el-table-column label="操作">
          <el-button type="text">查看明细</el-button>
        </el-table-column>
      </el-table>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form" label-width="80px">
          <el-form-item label="关键词">
            <el-input placeholder="请输入商品名称/编码/按商品合并/关键字/条形码" v-model="form.keyword" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              :options="totalCategories"
              v-model="form.cat"
              @active-item-change="getCatList"
              placeholder="商品分类"
              :props="props">
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌">
            <el-select placeholder="请选择商品品牌" v-model="form.brand" value-key="name">
              <el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalBrandList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属仓库">
            <el-checkbox-group v-model="form.addressList">
              <el-checkbox :label="t" v-for="t in totalAddressList" :key="t.id">{{t.address}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品标签">
            <el-checkbox-group v-model="form.tagList">
              <el-checkbox :label="t.id" v-for="t in goodsTags" :key="t.id">{{t.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="库存状态">
            <el-checkbox v-model="form.upLimit" label="高于库存上限值" :true-label="1" :false-label="0"></el-checkbox>
            <el-checkbox v-model="form.downLimit" label="低于库存下限值" :true-label="1" :false-label="0"></el-checkbox>
            <el-checkbox v-model="form.zero" label="库存<=0商品" :true-label="1" :false-label="0"></el-checkbox>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-radio class="radio" v-model="form.goodsStatus" label="0">全部</el-radio>
            <el-radio class="radio" v-model="form.goodsStatus" label="1">上架</el-radio>
            <el-radio class="radio" v-model="form.goodsStatus" label="-1">下架</el-radio>
          </el-form-item>
        </el-form>
        <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
        <el-button @click="advanceSearch = false">取消</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tableData: [],
        advanceSearch: false,
        form: {
          brandName: '',//商品品牌
          address: [],//所属仓库
          tagList: [],//商品标签
          goodsStatus: '',//商品状态
          keyword: '',//关键词
          series: '',//商品分类
          upLimit: 0,
          downLimit: 0,
          zero: 0,
          cat:[]
        },
        easyForm: {//简单查询
          address: [],//所属仓库
          keyword: '',//关键词
        },
        totalAddressList: [],//仓库列表
        totalCategories: [],//分类列表
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        totalBrandList: [],//品牌列表
        goodsTags:[],//商品标签
      }
    },

    created(){
      let self = this;
      self.select();
      self.getBrandList(function (data) {
        self.totalBrandList = data;
      });//获取品牌列表
      self.getTagList(function (data) {
        self.goodsTags = data;
      });//获取标签列表
      self.getAddressList(function (data) {
        self.totalAddressList = data.data;
      });
      self.getCatList();//获取分类列表
    },
    methods: {
      select(){//查询
        let self = this;
        let requestData = {token: window.localStorage.getItem('token')};
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        self.$http.post('/ui/list', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('list', response)
          if (data.code == 10000) {
            self.tableData = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      advanceSelect(){
        let self = this;
        let requestData = {token: window.localStorage.getItem('token')};
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.$http.post('/ui/list', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('list', response)
          if (data.code == 10000) {
            self.tableData = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCatList(val){
        let self = this;
        var requestData;
        if (val === undefined) {
          requestData = {params: {token: window.localStorage.getItem('token')}};
        } else {
          requestData = {params: {token: window.localStorage.getItem('token'), catId: val[val.length - 1].id}};
        }
        self.$http.get('/ui/catList', requestData).then(function (response) {
          let data = response.data;
          console.log('catList', response)
          if (data.code == 10000) {
            for (let i = 0; i < data.data.length; i++) {
              data.data[i].res = JSON.parse(data.data[i].res);
              if (parseInt(data.data[i].hasChild) > 0) {
                data.data[i].children = [];
              }
            }
            if (val === undefined) {
              self.totalCategories = data.data;
            } else {
              self.insertCat(self.totalCategories, val, data.data, 0);
            }
          }
        }).catch(function (error) {
          console.log(error);
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
    }
  }
</script>

<style>
</style>
