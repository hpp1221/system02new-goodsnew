<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品库存</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item>
          <el-select
            placeholder="全部仓库"
            v-model="easyForm.address"
            multiple
            filterable
            :loading="addressLoading"
            @visible-change="getAddress"
            value-key="id">
            <el-option :label="t.name" :key="t.id" :value="t.name" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="按商品名称/编码/规格/条形码/关键字搜索" icon="search" v-model="easyForm.keyword" class="long-input">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="startAdvanceSearch">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData">
        <el-table-column prop="goodsName" label="商品名称">

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
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row.id,scope.row.upLimit,scope.row.downLimit)">修改
                </el-dropdown-item>
                <el-dropdown-item @click.native="seeDetail(scope.row.id)">明细</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改库存信息" :visible.sync="updateVisible">
        <el-form :model="updateForm" class="request-form" label-width="80px">
          <el-form-item label="库存上限">
            <el-input type="number" v-model="updateForm.upLimit" class="form-input">
            </el-input>
          </el-form-item>
          <el-form-item label="库存下限">
            <el-input type="number" v-model="updateForm.downLimit" class="form-input">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="sureUpdate()">确定</el-button>
            <el-button @click="updateVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" class="request-form" label-width="80px">
          <el-form-item label="关键词">
            <el-input
              placeholder="请输入关键词"
              v-model="form.keyword" class="form-input">
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
            <el-select
              placeholder="请选择商品品牌"
              v-model="form.brandName"
              value-key="name"
              filterable
              :loading="brandLoading"
              @visible-change="getBrand">
              <el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalBrandList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属仓库">
            <el-select
              placeholder="全部仓库"
              v-model="form.address"
              multiple
              filterable
              :loading="addressLoading"
              @visible-change="getAddress">
              <el-option :label="t.name" :key="t.id" :value="t.name" v-for="t in totalStores"></el-option>
            </el-select>
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
          <el-form-item>
            <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
            <el-button @click="advanceSearch = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <pagination @setChanged="pageChanged" :totalPage="totalPage"></pagination>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tableData: [],
        advanceSearch: false,
        updateVisible: false,//修改库存上下限
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
          cat: [],
          type: 1//1是库存，2是门店
        },
        updateForm: {
          id: '',
          upLimit: '',
          downLimit: ''
        },
        easyForm: {//简单查询
          address: [],//所属仓库
          keyword: '',//关键词,
          type: 1//1是库存，2是门店
        },
        totalStores: [],//仓库列表
        totalCategories: [],//分类列表
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        totalBrandList: [],//品牌列表
        goodsTags: [],//商品标签
        addressLoading: false,//仓库列表加载图片
        brandLoading: false,//品牌列表加载图片
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
      }
    },
    components: {
      'pagination': require('../../../components/pagination')
    },
    methods: {
      getBrand(type){
        if (type && this.totalBrandList.length === 0) {
          this.brandLoading = true;
          let self = this;
          self.getBrandList(function (data) {
            self.totalBrandList = data;
            self.brandLoading = false;
          });//获取品牌列表
        }
      },
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
      getAddress(type){
        if (type && this.totalStores.length === 0) {
          this.addressLoading = true;
          let self = this;
          self.getAddressList(function (data) {
            self.totalStores = data;
            self.addressLoading = false;
          });
        }
      },
      seeDetail(id){

      },
      getCat(){
        if (this.totalCategories.length === 0) {
          this.getCatList();//获取分类列表
        }
      },

      startAdvanceSearch(){
        let self = this;
        self.advanceSearch = true;
        if (self.goodsTags.length === 0) {
          self.getTagList(function (data) {
            self.goodsTags = data;
          });//获取标签列表
        }
        if (self.totalStores.length === 0) {
          self.getAddressList(function (data) {
            self.totalStores = data;
          });
        }
      },

      select(size, num){//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNum: num
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        self.$http.post('/ui/list', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('list', response)
          if (data.code === 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
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
          if (data.code === 10000) {
            self.advanceSearch = false;
            self.tableData = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      update(id, upLimit, downLimit){
        this.updateVisible = true;
        this.updateForm.id = id;
        this.updateForm.upLimit = upLimit ? upLimit : '';
        this.updateForm.downLimit = downLimit ? downLimit : '';
      },
      sureUpdate(){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.updateForm));
        self.$http.post('/ui/editStoreHouseLimit', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('editStoreHouseLimit', response)
          if (data.code === 10000) {
            self.updateVisible = false;
            self.$message.success('修改成功');
            setTimeout(function () {
              self.$router.go(0);
            }, 500);
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
