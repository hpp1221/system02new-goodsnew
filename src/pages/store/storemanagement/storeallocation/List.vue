<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">门店调拨</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="调入门店">
          <el-select v-model="easyForm.inputAddressId">
            <el-option :label="item.name" :key="item.name" :value="item.id" v-for="item in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调出门店">
          <el-select v-model="easyForm.outputAddressId">
            <el-option :label="item.name" :key="item.name" :value="item.id" v-for="item in totalStores"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="storeAllocationAdd">新增</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData">
        <el-table-column prop="tradeNo" label="调拨单号">

        </el-table-column>
        <el-table-column prop="inPutAddress" label="调入门店">

        </el-table-column>
        <el-table-column prop="outPutAddress" label="调出门店">

        </el-table-column>
        <el-table-column prop="outPutTime" label="出货时间">
          <template slot-scope="scope">
            <span>{{moment(scope.row.outPutTime).format('YYYY-MM-DD  HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="inPutTime" label="收货时间">
          <template slot-scope="scope">
            <span v-if="scope.row.inPutTime">{{moment(scope.row.inPutTime).format('YYYY-MM-DD  HH:mm:ss')}}</span>
            <span v-else>还未收货</span>
          </template>
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人">

        </el-table-column>
        <el-table-column prop="type" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.type == '0'">已完成</span>
            <span v-if="scope.row.type == '1'">待审核通过</span>
            <span v-if="scope.row.type == '2'">待发货确认</span>
            <span v-if="scope.row.type == '3'">待收货确认</span>
            <span v-if="scope.row.type == '4'">作废</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form :model="form" ref="form" v-if="advanceSearch">
          <el-form-item label="调拨单号">
            <el-input placeholder="请输入调拨单号" v-model="form.tradeNo" style="width: 68%;">

            </el-input>
          </el-form-item>
          <el-form-item label="出货时间">
            <el-date-picker
              v-model="form.outputDateRange"
              type="datetimerange"
              placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入货时间">
            <el-date-picker
              v-model="form.inputDateRange"
              type="datetimerange"
              placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="调入门店">
            <el-select v-model="form.inputAddressId">
              <el-option :label="item.name" :key="item.name" :value="item.id" v-for="item in totalStores"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调出门店">
            <el-select v-model="form.outputAddressId">
              <el-option :label="item.name" :key="item.name" :value="item.id" v-for="item in totalStores"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="form.Type" @change="handleCheckedCitiesChange">
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
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right"></pagination>
    </div>
  </div>
</template>

<script>
  const cityOptions = ['0', '1', '2', '3', '4'];
  export default {
    data() {
      return {
        tableData: [],
        checkAll: false,//全选
        typeLists: cityOptions,//状态列表
        isIndeterminate: false,
        easyForm: {
          inputAddressId: '',
          outputAddressId: '',
        },
        form: {
          tradeNo: '',//调拨单号
          outputDateRange: ["", ""],
          inputDateRange: ["", ""],
          outPutStartDate: '',
          outPutEndDate: '',
          inPutStartDate: '',
          inPutEndDate: '',
          inputAddressId: '',
          outputAddressId: '',
          Type: [],//状态
        },
        totalStores: [],
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        advanceSearch: false,
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
    created() {
      this.getStoreList()
    },
    components: {
      'pagination': require('../../../../components/pagination')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
      handleCheckAllChange(event) {//全选
        this.form.Type = event ? cityOptions : [];
        this.isIappndeterminate = false;
      },
      handleCheckedCitiesChange(value) {//状态列表
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.typeLists.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.typeLists.length;
      },
      getStoreList() {//要货门店
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
        }
        self.httpApi.store.storeList(requestData, function (data) {
          self.totalStores = data.data
        })
      },
      select(size,num) {//查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          status: 2,
          pageSize:size,
          pageNo:num
        }
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.httpApi.store.storeAllocationList(requestData, function (data) {
          console.log('storeAllocationList',data)
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        })
      },
      advanceSelect(size,num) {//高级查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          status: 2,
          pageSize:size,
          pageNo:num
        };
        self.form.outPutStartDate = self.form.outputDateRange[0]
        self.form.outPutEndDate = self.form.outputDateRange[1]
        self.form.inPutStartDate = self.form.inputDateRange[0]
        self.form.inPutEndDate = self.form.inputDateRange[1]
        requestData = Object.assign(requestData, self.shallowCopy(self.form))
        self.httpApi.store.storeAllocationList(requestData, function (data) {
          self.advanceSearch = false
          self.tableData = data.data.list
          self.totalPage = data.data.total;
        })
      },
      resetGetGoodsForm() {//高级搜索的清空
        let self = this
        self.form.tradeNo = ''
        self.form.outputDateRange = ["", ""],
        self.form.inputDateRange = ["", ""],
        self.form.inputAddressId = '',
        self.form.outputAddressId = '',
        self.form.Type = [],
        self.checkAll = false
      },
      storeAllocationAdd() {//新增
        this.$router.push('/store/storemanagement/storeallocation/allocationadd')
      },
      getGoodsExamine(id) {//审核
        this.$router.push({path: '/store/storemanagement/storeallocation/examine', query: {allocationId: id}});
      },
      getGoodsNumberDetail(id) {//详情
        this.$router.push({path: '/store/storemanagement/storeallocation/detail', query: {allocationId: id}});
      },
      cancelGetGoods(row) { //作废
        console.log('row',row)
        let self = this;
        if(row.type == "1" || row.type == "2"){
          let requestData = {
            token: window.localStorage.getItem('token'),
            allocationRecordId: row.id,
            status:row.status,
            tradeNo:row.tradeNo
          };
          self.$confirm('确认将此门店要货单作废？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            self.httpApi.store.storeAllocationRecordCancel(requestData, function (data) {
              self.$message({
                type: 'success',
                message: '已成功作废!'
              });
              self.select(self.pageSize,self.pageNum)
            });
          })
        }else {
          self.$message('您已确认发货，无法作废!')
        }

      },
    }
  }
</script>
