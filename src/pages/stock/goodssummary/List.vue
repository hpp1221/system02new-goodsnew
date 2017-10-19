<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品收发汇总</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item>
          <el-select
            v-model="easyForm.addressId"
            filterable
            :loading="addressLoading"
            @visible-change="getAddress">
            <el-option label="全部仓库" :value="-1"></el-option>
            <el-option :label="t.name" :key="t.id" :value="t.name" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            type="daterange"
            placeholder="选择日期范围"
            v-model="easyForm.dateRange">
          </el-date-picker>
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

      <el-row :gutter="0" style="margin-bottom: 20px;">
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <div class="goodssummary first">
            <p class="first-p">0.00</p>
            <p class="second-p">期初成本金额</p>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <div class="goodssummary second">
            <p class="first-p">0.00</p>
            <p class="second-p">入库成本金额</p>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <div class="goodssummary third">
            <p class="first-p">0.00</p>
            <p class="second-p">出库成本金额</p>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <div class="goodssummary fourth">
            <p class="first-p">0.00</p>
            <p class="second-p">期末成本金额</p>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" border>
        <el-table-column prop="tradeNo" label="商品编码">

        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称">

        </el-table-column>
        <el-table-column prop="goodsSpec" label="规格">

        </el-table-column>
        <el-table-column prop="unit" label="所属仓库">

        </el-table-column>
        <el-table-column prop="unit" label="单位">

        </el-table-column>

        <el-table-column prop="createUserName" label="期初">
          <el-table-column label="数量">

          </el-table-column>
          <el-table-column label="成本金额">

          </el-table-column>
        </el-table-column>
        <el-table-column prop="createUserName" label="入库">
          <el-table-column label="数量">

          </el-table-column>
          <el-table-column label="成本金额">

          </el-table-column>
        </el-table-column>
        <el-table-column prop="createUserName" label="出库">
          <el-table-column label="数量">

          </el-table-column>
          <el-table-column label="成本金额">

          </el-table-column>
        </el-table-column>
        <el-table-column prop="createUserName" label="期末">
          <el-table-column label="数量">

          </el-table-column>
          <el-table-column label="成本金额">

          </el-table-column>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="text">查看明细</el-button>
        </el-table-column>
      </el-table>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form">
          <el-form-item label="商品信息">
            <el-input placeholder="请输入商品名称/编码/按商品合并/关键字/条形码" v-model="form.keyword" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.series">
              <el-option label="分类1" value="1">

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品品牌">
            <el-input placeholder="请选择商品品牌" v-model="form.brandName" class="form-input">
            </el-input>
          </el-form-item>
          <el-form-item label="所属仓库">
            <el-checkbox-group v-model="form.address">
              <el-checkbox label="全选"></el-checkbox>
              <el-checkbox label="深圳仓"></el-checkbox>
              <el-checkbox label="上海仓"></el-checkbox>
              <el-checkbox label="北京仓"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="时间选择">
            <el-date-picker
              type="daterange"
              placeholder="选择日期范围"
              v-model="form.dateRange">
            </el-date-picker>
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
        form: {
          type: -1,
          addressId: '',
          dateRange: ''
        },
        advanceSearch: false,
        easyForm: {
          keyword: '',
          addressId: -1,
          series: '',
          brandName: '',
        },
        totalStores:[],
        addressLoading:false,
      }
    },
    created(){
      this.select()
    },
    methods: {
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
      select(){//查询
        let self = this
        let dateRange = self.form.dateRange
        let requestData = {token: window.localStorage.getItem('token')}
        if (typeof(self.form.dateRange) === 'object') {
          requestData.startDate = self.form.dateRange[0].getTime()
          requestData.endDate = self.form.dateRange[1].getTime()
        }
        requestData = Object.assign(requestData, self.shallowCopy(self.form))
        self.form.dateRange = dateRange;
        self.httpApi.stock.recordList(requestData, function (data) {
          self.tableData = data.data
        });
      },
      advanceSelect(){//高级搜索

      }
    }
  }
</script>

<style scoped="scoped">
  .goodssummary {
    height: 100px;
    text-align: center;
    color: white;
    padding-top: 24px;
  }

  .first {
    background-color: #f77686;
  }

  .second {
    background-color: #2da9f1;
  }

  .third {
    background-color: #9674cc;
  }

  .fourth {
    background-color: #f9a38b;
  }

  .first-p {
    font-size: 24px;
  }

  .second-p {

  }
</style>
