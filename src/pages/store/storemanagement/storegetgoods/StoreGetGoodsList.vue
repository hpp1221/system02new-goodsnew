<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">门店要货</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form storegetgoods-nav">
        <el-form-item label="单据状态">
          <el-select v-model="easyForm.typeList" placeholder="全部">
            <el-option v-for="item in easyTypeLists" :label="item.label" :value="item.value" :key="item.value">
              {{item.label}}
            </el-option>
          </el-select>
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
            <el-checkbox-group v-model="form.typeList">
              <el-checkbox v-for="item in typeLists" :label="item.value" :value="item.value" :key="item.value">
                {{item.label}}
              </el-checkbox>
            </el-checkbox-group>
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
        <el-table-column prop="storeName" label="要货门店">
        </el-table-column>
        <el-table-column prop="createUserName" label="要货人">
        </el-table-column>
        <el-table-column prop="type" label="单据状态">
          <template scope="scope">
            <span v-if="scope.row.type == '0'">已完成</span>
            <span v-if="scope.row.type == '1'">待审核通过</span>
            <span v-if="scope.row.type == '2'">待发货确认</span>
            <span v-if="scope.row.type == '3'">待收货确认</span>
            <span v-if="scope.row.type == '4'">作废</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="getGoodsNumberDetail(scope.row.id)">单据详情</el-dropdown-item>
                <el-dropdown-item @click.native="getGoodsExamine(scope.row.id)">审核</el-dropdown-item>
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
  export default {
    data() {
      return {
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
          typeList: [],
          storeId: ''
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        storeIds: [],
        easyTypeLists: [//简单查询的单据状态
          {
            value: '',
            label: "全部"
          },
          {
            value: '["4"]',
            label: "作废"
          },
          {
            value: '["1"]',
            label: "待审核通过"
          },
          {
            value: '["2"]',
            label: "待发货确认"
          },
          {
            value: '["0"]',
            label: "已完成"
          },
          {
            value: '["3"]',
            label: "待收货确认"
          },
        ],
        typeLists: [//高级查询的单据状态
          {
            value: '',
            label: "全选"
          },
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
        ],

      }
    },
    created() {
      this.getGoodsList();//获取分类列表
    },
    components: {
      'pagination': require('../../../../components/pagination')
    },
    methods: {
      getGoodsExamine(id){//审核
        this.$router.push({path: '/store/storemanagement/storegetgoods/storegetgoodsexamine', query: {id: id}});
      },
      getGoodsNumberDetail(id) {//要货单详情
        this.$router.push({path: '/store/storemanagement/storegetgoods/storegetgoodsdetail', query: {id: id}});
      },
      select(size, num) {//简单查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num,
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.$http.post('/ui/getGoodsRecordList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          if (data.code == 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
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
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
//        this.select(page.size, page.num);
//        this.advanceSelect(page.size, page.num)
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
          if (data.code == 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      createGoods() {//新增
        this.$router.push('/store/storemanagement/storegetgoods/creategetgoods');
      },
      cancelGetGoods(row) { //作废
        let self = this;
        let params = {
          token:window.localStorage.getItem('token'),
          id: row.id
        };
        self.$confirm('确认将此门店要货单作废？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.$http.post('/ui/setInvalid', self.qs.stringify(params)).then((res) => {
            console.log('set',res)
            if (res.data.code == 10000) {
              self.$message({
                type: 'success',
                message: '已成功作废!'
              });
              this.getGoodsList()
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
