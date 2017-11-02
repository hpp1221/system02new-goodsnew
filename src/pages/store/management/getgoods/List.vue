<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">门店要货</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
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
        <el-form-item>
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
            <el-select placeholder="全部门店" v-model="form.storeId">
              <el-option v-for="item in storeIds" :key="item.name" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单据状态">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.typeList" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in typeLists" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="advanceSelect(pageSize,pageNum)">确 定</el-button>
          <el-button @click="advanceSearch = false">取 消</el-button>
          <el-button @click="resetGetGoodsForm">清空</el-button>
        </div>
      </el-dialog>
      <!--要货表格-->
      <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column prop="tradeNumber" label="单据编号">
        </el-table-column>
        <el-table-column prop="createTime" label="要货时间">
          <template slot-scope="scope">
            <span>{{moment(scope.row.createTime).format('YYYY-MM-DD  HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="storeName" label="要货门店">
        </el-table-column>
        <el-table-column prop="createUserName" label="要货人">
        </el-table-column>
        <el-table-column prop="type" label="单据状态">
          <template slot-scope="scope">
            <span v-if="scope.row.type == '0'">已完成</span>
            <span v-if="scope.row.type == '1'">待审核通过</span>
            <span v-if="scope.row.type == '2'">待发货确认</span>
            <span v-if="scope.row.type == '3'">待收货确认</span>
            <span v-if="scope.row.type == '4'">作废</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="getGoodsNumberDetail(scope.row.id)">单据详情</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.type != 0 && scope.row.type != 4 "
                                  @click.native="getGoodsExamine(scope.row)">审核
                </el-dropdown-item>
                <el-dropdown-item v-if="scope.row.type == 1 || scope.row.type == 2"
                                  @click.native="cancelGetGoods(scope.row)">作废
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage"></pagination>
    </div>
  </div>
</template>

<script>
  const cityOptions = ['0', '1', '2', '3', '4'];
  export default {
    data() {
      return {
        tableData: [],
        advanceSearch: false,//高级搜索
        searchType: 1,
        checkAll: false,//全选
        typeLists: cityOptions,//状态列表
        isIndeterminate: false,
        form: {//高级搜索
          dateRange: null,
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
      getGoodsExamine(row) {//审核
        let url = '/store/management/getgoods/examine/' + row.id;
        this.$router.push(url);
      },
      getGoodsNumberDetail(id) {//要货单详情
        let url = '/store/management/getgoods/detail/' + id;
        this.$router.push(url);
      },
      select(size, num) {//简单查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num,
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.httpApi.store.getGoodsRecordList(requestData, function (data) {
          self.searchType = 1;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        })
        self.httpApi.store.storeList(requestData, function (data) {
          self.storeIds = data.data
        })
      },
      resetGetGoodsForm() {//高级搜索的清空
        let self = this
        self.form.storeId = ''
        self.form.dateRange = '',
          self.form.tradeNumber = '',
          self.form.typeList = [],
          self.form.startTime = '',
          self.form.endTime = '',
          self.checkAll = false
      },
      advanceSelect(size, num) {//高级查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        self.form.startTime = self.form.dateRange === null ? '' : self.form.dateRange[0];
        self.form.endTime = self.form.dateRange === null ? '' : self.form.dateRange[1];
        requestData = Object.assign(requestData, self.shallowCopy(self.form))
        self.httpApi.store.getGoodsRecordList(requestData, function (data) {
          self.advanceSearch = false;
          self.searchType = 2;
          self.tableData = data.data.list
          self.totalPage = data.data.total
        })
      },
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.searchType === 1 ? this.select(page.size, page.num) : this.advanceSelect(page.size, page.num);

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      createGoods() {//新增
        this.$router.push('/store/management/getgoods/create');
      },
      cancelGetGoods(row) { //作废
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          id: row.id
        };
        self.$confirm('确认将此门店要货单作废？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.store.setInvalid(requestData, function (data) {
            self.$message({
              type: 'success',
              message: '已成功作废!'
            });
            self.select(self.pageSize, self.pageNum)
          });
        })
      },
    }
  }
</script>
