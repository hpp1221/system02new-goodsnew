<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">门店要货</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form storegetgoods-nav">
        <el-form-item label="单据状态">
          <!--<template scope="scope">-->
          <!--<el-select v-model="easyForm.typeList" placeholder="全部">-->
          <!--<el-option v-for="t in totalGetGoodsStatus" :key="t.value" :label="t.value"></el-option>-->
          <!--</el-select>-->
          <!--</template>-->
        </el-form-item>
        <el-form-item label="要货门店">
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
        <el-form-item class="storegoodslist-create">
          <el-button @click="createGoods">新增</el-button>
        </el-form-item>
      </el-form>
      <!--高级搜索列表-->
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form :model="form" ref="form" v-if="advanceSearch">
          <el-form-item label="单据编码">
            <el-input placeholder="请输入单据编码" v-model="form.tradeNumber" class="long-input" style="width: 80%">
            </el-input>
          </el-form-item>
          <el-form-item label="要货时间">
            <el-date-picker
              v-model="form.dateRange"
              type="datetimerange"
              placeholder="选择时间范围"
              style="width: 80%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="要货门店">
            <el-input placeholder="请输入要货门店名称" class="form-input" v-model="form.storeId"
                      style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="单据状态">
            <template scope="scope">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
              </el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </template>
            <!--<template scope="scope">-->
            <!--<el-checkbox-group v-model="form.typeList">-->
            <!--<el-checkbox v-for="t in totalGetGoodsStatus" :key="t.value" :label="t.value">-->
            <!--</el-checkbox>-->
            <!--</el-checkbox-group>-->
            <!--</template>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="advanceSelect(pageSize,pageNum)">确 定</el-button>
          <el-button @click="advanceSearch = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--要货表格-->
      <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable"
                class="storegetgoodstable">
        <el-table-column prop="tradeNumber" label="单据编号">
        </el-table-column>
        <el-table-column prop="createTime" label="要货时间">
          <template scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD  HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="storeId" label="要货门店">
        </el-table-column>
        <el-table-column prop="companyId" label="要货人">
        </el-table-column>
        <el-table-column prop="type" label="单据状态">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="getGoodsNumberDetail(scope.row.id)">单据详情</el-dropdown-item>
                <el-dropdown-item @click.native="deleteSupplier(scope.row)">审核</el-dropdown-item>
                <el-dropdown-item @click.native="cancelGetGoods(scope.row)">作废</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right"></pagination>
    </div>
  </div>
</template>

<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checkAll: true,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        tableData: [],
        advanceSearch: false,
        form: {//高级搜索
          dateRange: '',
          tradeNumber: '',
          storeId: '',
          typeList: [],
          startTime: '',
          endTime: ''
        },
        easyForm: {//简单查询
          typeList: '',
          store: []
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        storeIds:''
//        totalGetGoodsStatus: [//单据状态
//          {
//            value:'',
//            label: "全选"
//          },
//          {
//            value:'4',
//            label: "作废"
//          },
//          {
//            value:'1',
//            label: "待确认审核"
//          },
//          {
//            value:'2',
//            label: "待发货审核"
//          },
//          {
//            value:'0',
//            label: "已完成"
//          },
//          {
//            value:'3',
//            label: "待收货确认"
//          },
//        ],

      }
    },
    created() {
      this.getGoodsList();//获取分类列表
    },
    components: {
      'pagination': require('../../../../components/pagination')
    },
    methods: {
      handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
//      select(size,num){
//        let self = this
//        let requestData = {
//          token: window.localStorage.getItem('token'),
//          pageSize: size,
//          pageNo: num,
//        };
//        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
//        self.$http.post('/ui/getGoodsRecordList', self.qs.stringify(requestData)).then(function (response) {
//          console.log('goodssss',response)
//          let data = response.data;
//          if (data.code == 10000) {
//            self.tableData = data.data.list;
//            console.log('list', self.tableData)
//            self.totalPage = data.data.total;
//          }
//        }).catch(function (error) {
//          console.log(error);
//        });
//      },
      advanceSelect(size, num) {//查询
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
        } else {//简单搜索
          requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        }
        self.$http.post('/ui/getGoodsRecordList', self.qs.stringify(requestData)).then(function (response) {
          console.log('goodssss', response)
          let data = response.data;

          if (data.code == 10000) {
            self.advanceSearch = false
            self.tableData = data.data.list;
            console.log('list', self.tableData)
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.getGoodsList(page.size, page.num);
      },
      getGoodsList(size, num) {//要货单列表
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        self.$http.post('/ui/getGoodsRecordList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('getgoodslist', response)
          if (data.code == 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
        self.$http.post('/ui/storeList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('aaaaa', response)
          if (data.code == 10000) {
            for (let i = 0; i < data.data.length; i++) {
              self.storeIds = data.data[i].name;
            }
          }
          console.log('bbbb', self.storeIds)
        }).catch(function (error) {
          console.log(error);
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('10101', val);
      },
      getGoodsNumberDetail(id) {//要货单详情
        this.$router.push({path: '/store/storemanagement/storegetgoods/storegetgoodsdetail', query: {id: id}});
      },
      createGoods() {//新增
        this.$router.push('/store/storemanagement/storegetgoods/creategetgoods');
      },
      cancelGetGoods(row) { //作废
        let self = this;
        let params = {
          id: row.id
        };
        self.$confirm('确认将此门店要货单作废？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.$http.post('/ui/setInvalid', self.qs.stringify(params)).then((res) => {
            if (res.data.code == 10000) {
              self.$message({
                type: 'success',
                message: '已成功作废!'
              });
              this.getSupplierList()
            } else {
              self.$message({
                type: 'info',
                message: '已取消'
              });
            }
          })

        })
      },
    }
  }
</script>

<style>
</style>
