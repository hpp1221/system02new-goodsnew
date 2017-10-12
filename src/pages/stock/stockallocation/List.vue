<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">库存调拨</h3>
      <el-form ref="form" :model="form" inline>
        <el-form-item label="调入仓">
          <el-select
            v-model="easyForm.to"
            value-key="id"
            :loading="addressLoading"
            @visible-change="getAddress">
            <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调出仓">
          <el-select
            v-model="easyForm.from"
            value-key="id"
            :loading="addressLoading"
            @visible-change="getAddress">
            <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调入时间">
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围"
            v-model="easyForm.dateRange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="调出时间">
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围"
            v-model="easyForm.dateRange">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
          <el-button @click="add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form">
          <el-form-item label="调拨单号">
            <el-input placeholder="请输入调拨单号" v-model="form.keyword" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="制单人">
            <el-input placeholder="请输入制单人名称" v-model="form.keyword" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="调出仓">
            <el-select
              v-model="form.from"
              value-key="id"
              :loading="addressLoading"
              @visible-change="getAddress">
              <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调入仓">
            <el-select
              v-model="form.to"
              value-key="id"
              :loading="addressLoading"
              @visible-change="getAddress">
              <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
            </el-select>
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
          <el-form-item label="所属供应商">
            <el-input placeholder="请输入供应商名称" class="form-input" v-model="form.supplierName"></el-input>
          </el-form-item>
          <el-form-item label="商品标签">
            <el-checkbox-group v-model="form.tags">
              <el-checkbox :label="t.id" v-for="t in goodsTags" :key="t.id">{{t.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="所属仓库">
            <el-checkbox-group v-model="form.addressList">
              <el-checkbox :label="t" v-for="t in totalAddressList" :key="t.id">{{t.address}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="库存状态">
            <el-checkbox v-model="form.upLimit" label="高于库存上限值" :true-label="1" :false-label="0"></el-checkbox>
            <el-checkbox v-model="form.downLimit" label="低于库存下限值" :true-label="1" :false-label="0"></el-checkbox>
            <el-checkbox v-model="form.zero" label="库存<=0商品" :true-label="1" :false-label="0"></el-checkbox>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-radio class="radio" v-model="form.type" :label="-1">全部</el-radio>
            <el-radio class="radio" v-model="form.type" :label="1">上架</el-radio>
            <el-radio class="radio" v-model="form.type" :label="0">下架</el-radio>
          </el-form-item>
          <el-form-item label="商品来源">
            <el-radio class="radio" v-model="form.source" :label="-1">全部</el-radio>
            <el-radio class="radio" v-model="form.source" :label="0">手动新增</el-radio>
            <el-radio class="radio" v-model="form.source" :label="1">批量导入</el-radio>
          </el-form-item>
        </el-form>
        <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
        <el-button @click="advanceSearch = false">取消</el-button>
      </el-dialog>
      <el-table :data="tableData">
        <el-table-column prop="tradeNo" label="调拨单号">

        </el-table-column>
        <el-table-column prop="outPutAddress" label="调出仓库">

        </el-table-column>
        <el-table-column prop="inPutAddress" label="调入仓库">

        </el-table-column>
        <el-table-column prop="" label="调出时间">

        </el-table-column>
        <el-table-column prop="" label="调入时间">

        </el-table-column>
        <el-table-column prop="createUserName" label="制单人">

        </el-table-column>
        <el-table-column prop="" label="状态">

        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" @click="seeDetail(scope.row.id)">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tableData: [],
        easyForm:{
          to:'',
          from:'',
          dateRange:'',

        },
        form: {},
        addressLoading: false,
        totalStores: [],
        advanceSearch: false,
      }
    },
    created(){
      this.select()
    },
    methods: {
      getAddress(type){//点击时获取地址列表
        if (type && this.totalStores.length === 0) {
          this.addressLoading = true;
          let self = this;
          self.getAddressList(function (data) {
            self.totalStores = data;
            self.addressLoading = false;
          });
        }
      },

      select(){//查询
        let self = this
        let requestData = {token: window.localStorage.getItem('token')}
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.$http.post('/ui/allocationRecordList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('allocationRecordList', response)
          if (data.code == 10000) {
            self.tableData = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      advanceSelect(){

      },
      add(){
        this.$router.push('/stock/stockallocation/add')
      },
      seeDetail(id){
        this.$router.push({path: '/stock/stockallocation/detail', query: {id: id}})
      }
    }
  }
</script>

<style>
</style>
