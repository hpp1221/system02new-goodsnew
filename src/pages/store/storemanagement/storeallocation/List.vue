<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">门店调拨</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="调入门店">
          <el-select
            v-model="easyForm.to"
            value-key="id"
            :loading="addressLoading"
            @visible-change="getAddress">
            <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调出门店">
          <el-select
            v-model="easyForm.from"
            value-key="id"
            :loading="addressLoading"
            @visible-change="getAddress">
            <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form">
          <el-form-item label="调拨单号">
            <el-input placeholder="请输入调拨单号" v-model="form.keyword" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="出货时间">
            <el-date-picker
              type="daterange"
              placeholder="选择日期范围"
              v-model="form.dateRange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入货时间">
            <el-date-picker
              type="daterange"
              placeholder="选择日期范围"
              v-model="form.dateRange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="调入门店">
            <el-select
              v-model="form.to"
              value-key="id"
              :loading="addressLoading"
              @visible-change="getAddress">
              <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调出门店">
            <el-select
              v-model="form.from"
              value-key="id"
              :loading="addressLoading"
              @visible-change="getAddress">
              <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.typeList" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in typeLists" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
        <el-button @click="advanceSearch = false">取消</el-button>
        <el-button @click="resetGetGoodsForm">清空</el-button>
      </el-dialog>
      <el-table :data="tableData">
        <el-table-column prop="tradeNo" label="调拨单号">

        </el-table-column>
        <el-table-column prop="outPutAddress" label="调入门店">

        </el-table-column>
        <el-table-column prop="inPutAddress" label="调出门店">

        </el-table-column>
        <el-table-column prop="" label="出货时间">

        </el-table-column>
        <el-table-column prop="" label="收货时间">

        </el-table-column>
        <el-table-column prop="createUserName" label="创建人">

        </el-table-column>
        <el-table-column prop="" label="状态">

        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" @click="seeDetail(scope.row.id)">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right"></pagination>
    </div>
  </div>
</template>

<script>
  const cityOptions = ['0', '1', '2', '3', '4'];
  export default{
    data(){
      return {
        tableData: [],
        checkAll: false,//全选
        typeLists: cityOptions,//状态列表
        isIndeterminate: false,
        easyForm:{

        },
        form: {
          keyword:'',//调拨单号
          dateRange:'',//日期范围
          to:'',//调入门店
          from:'',//调出门店
          typeList:[],//状态
        },
        addressLoading: false,
        totalStores: [],
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        advanceSearch: false,
        typeLists:[//高级查询的单据状态
          {
            value: '4',
            label: "作废"
          },
          {
            value: '1',
            label: "待确认审核"
          },
          {
            value: '2',
            label: "待发货审核"
          },
          {
            value: '0',
            label: "已完成"
          },
          {
            value: '3',
            label: "待收货确认"
          },
        ]
      }
    },
    created(){
      this.select()
    },
    components: {
      'pagination': require('../../../../components/pagination')
    },
    methods: {
      handleCheckAllChange(event) {//全选
        this.form.typeList = event ? cityOptions : [];
        this.isIappndeterminate = false;
      },
      handleCheckedCitiesChange(value) {//状态列表
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.typeLists.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.typeLists.length;
      },
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
      advanceSelect(size, num) {//高级查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        if (self.advanceSearch) {//高级搜索
          if (self.form.dateRange instanceof Array) {
            self.form.startTime = self.form.dateRange[0]
            self.form.endTime = self.form.dateRange[1]
          }
          requestData = Object.assign(requestData, self.shallowCopy(self.form))
        }
        self.$http.post('/ui/getGoodsRecordList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          if (data.code == 10000) {
            self.advanceSearch = false
            self.tableData = data.data.list
            self.totalPage = data.data.total
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      resetGetGoodsForm() {//高级搜索的清空
        let self = this
        self.form.keyword = ''
        self.form.dateRange = '',
        self.form.to = '',
        self.form.from = '',
        self.form.typeList = [],
        self.checkAll = false
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
