<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">门店库存</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item>
          <el-radio class="radio" v-model="easyForm.goodsStatus" label="0">按商品合并</el-radio>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            :options="totalCategories"
            v-model="easyForm.cat"
            @active-item-change="getCatList"
            placeholder="商品分类"
            :props="props"
            @click.native="getCat">
          </el-cascader>
        </el-form-item>
        <el-form-item label="门店">
          <el-select placeholder="全部门店" v-model="easyForm.storeId">
            <el-option v-for="item in storeIds" :key="item.name" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>

      </el-form>

      <el-table :data="tableData">
        <el-table-column prop="goodsName" label="商品图片">

        </el-table-column>
        <el-table-column prop="goodsSpec" label="商品编码">

        </el-table-column>
        <el-table-column prop="goodsSpec" label="商品名称">

        </el-table-column>
        <el-table-column prop="goodsSpec" label="规格">

        </el-table-column>
        <el-table-column prop="unit" label="单位">

        </el-table-column>

        <el-table-column prop="upLimit" label="库存上限">

        </el-table-column>
        <el-table-column prop="downLimit" label="库存下限">

        </el-table-column>
        <el-table-column prop="preOrder" label="预购量">

        </el-table-column>

        <el-table-column prop="inStoreHouse" label="库存量">

        </el-table-column>
        <el-table-column prop="inStoreHouse" label="所属门店">

        </el-table-column>
        <el-table-column prop="onTheWay" label="在途量">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form" label-width="80px">
          <el-form-item label="关键词">
            <el-input
              placeholder="请输入商品名称/编码/条形码"
              v-model="form.keyword" class="long-input">
            </el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              :options="totalCategories"
              v-model="form.cat"
              @active-item-change="getCatList"
              placeholder="商品分类"
              :props="props"
              @click.native="getCat">
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌">
            <brandselect @getBrandSelect="getBrandSelect"></brandselect>
            <!--<el-select-->
            <!--placeholder="请选择商品品牌"-->
            <!--v-model="form.brandName"-->
            <!--value-key="name"-->
            <!--filterable-->
            <!--:loading="brandLoading"-->
            <!--@visible-change="getBrand">-->
            <!--<el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalBrandList"></el-option>-->
            <!--</el-select>-->
          </el-form-item>
          <el-form-item label="门店">
            <el-select placeholder="全部门店" v-model="easyForm.storeId">
              <el-option v-for="item in storeIds" :key="item.name" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <!--<el-select-->
            <!--placeholder="全部仓库"-->
            <!--v-model="form.address"-->
            <!--multiple-->
            <!--filterable-->
            <!--:loading="addressLoading"-->
            <!--@visible-change="getAddress">-->3v
            <!--<el-option :label="t.name" :key="t.id" :value="t.name" v-for="t in totalStores"></el-option>-->
            <!--</el-select>-->
          </el-form-item>
          <el-form-item label="商品标签">
            <el-checkbox-group v-model="form.tagId">
              <el-checkbox :label="t.id" v-for="t in tagIds" :key="t.id">{{t.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="库存状态">
            <el-checkbox v-model="form.storeStatus" label="高于库存上限值" :true-label="1" :false-label="0">高于库存上限值
            </el-checkbox>
            <el-checkbox v-model="form.storeStatus" label="低于库存下限值" :true-label="1" :false-label="0">低于库存下限值
            </el-checkbox>
            <el-checkbox v-model="form.storeStatus" label="库存<=0商品" :true-label="1" :false-label="0">库存<=0商品
            </el-checkbox>
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
        storeIds: [],
        advanceSearch: false,
        form: {
          brand: '',
          brandName: '',
          brandId: '',//商品品牌
          address: '',//所属门店
          tagId: [],//商品标签
          goodsStatus: '',//商品状态
          keyword: '',//关键词
          storeStatus: '',//库存上下限
          series: '',//商品分类
          cat: []
        },
        easyForm: {//简单查询
          cat: [],//商品分类
          storeId: []//所属门店
        },
        storeIds: [],//门店列表
        totalCategories: [],//分类列表
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        tagIds: [],//商品标签列表
        addressLoading: false,//仓库列表加载图片
        brandLoading: false,//品牌列表加载图片
      }
    },

    created(){
      this.select();
    },
    components: {
      'pagination': require('../../../../components/pagination'),
      'brandselect': require('../../../../components/getbrandselect')
    },
    methods: {
      getBrandSelect(e){
        this.form.brand = e.brand;
        this.form.brandName = e.brandName;
        this.form.brandId = e.brandId;
      },
      getAddress(type){//所属门店
        if (type && this.totalStores.length === 0) {
          this.addressLoading = true;
          let self = this;
          self.getAddressList(function (data) {
            self.totalStores = data;
            self.addressLoading = false;
          });
        }
      },
      getCat(){
        if (this.totalCategories.length === 0) {
          this.getCatList();//获取分类列表
        }
      },

//      startAdvanceSearch(){
//        let self = this;
//        self.advanceSearch = true;
//        if (self.goodsTags.length === 0) {
//          self.getTagList(function (data) {
//            self.goodsTags = data;
//          });//获取标签列表
//        }
//        if (self.totalStores.length === 0) {
//          self.getAddressList(function (data) {
//            self.totalStores = data;
//          });
//        }
//      },

      select(){//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          type: 2
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        self.$http.post('/ui/list', self.qs.stringify(requestData)).then(function (response) {
          console.log('list', response)
          let data = response.data;
          if (data.code === 10000) {

            self.tableData = data.data.list;
          }
        }).catch(function (error) {
          console.log(error);
        });
        self.$http.post('/ui/storeList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          if (data.code == 10000) {
            self.storeIds = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      advanceSelect() {//高级查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          type: 2
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.form))
        self.httpApi.stock.list(requestData,function (data) {
          self.advanceSearch = false
          self.tableData = data.data.list
          self.totalPage = data.data.total
        })
      },
      getCatList(val){
        let self = this;
        var requestData;
        if (val === undefined) {
          requestData = {token: window.localStorage.getItem('token')};
        } else {
          requestData = {token: window.localStorage.getItem('token'), catId: val[val.length - 1].id};
        }
        self.$http.get('/ui/catList', requestData).then(function (response) {
          let data = response.data;
          if (data.code === 10000) {
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
