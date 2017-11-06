<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">销售退货单列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item label="订单状态">
          <el-select placeholder="全部订单" v-model="easyForm.orderStatus" multiple>
            <el-option :label="t.name" :key="t.id" :value="t.id" v-for="t in totalOrderStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户">
          <el-input placeholder="请输入供应商名称" v-model="easyForm.partnerName" class="long-input"></el-input>
        </el-form-item>
        <el-form-item label="退单号">
          <el-input placeholder="请输入退单号" v-model="easyForm.orderNumber" class="long-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="createPurchaseReturn">新增</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" class="request-form" label-width="100px">
          <el-form-item label="退货单号">
            <el-input placeholder="请输入退货单号" v-model="form.orderNumber" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker
              type="daterange"
              placeholder="选择日期范围"
              v-model="form.dateRange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input placeholder="请输入客户名称/退单号" v-model="form.partnerName" class="long-input"></el-input>
          </el-form-item>
          <el-form-item label="退单状态">
            <getcheckbox @getCheckList="getCheckList" :dataList="totalOrderStatus"></getcheckbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
            <el-button @click="advanceSearch = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-table :data="tableData">
        <el-table-column prop="orderNumber" label="退单号">

        </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column prop="partnerName" label="客户名称">

        </el-table-column>
        <el-table-column prop="orderAmount" label="金额">

        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.orderStatus == o.id" v-for="o in totalOrderStatus">{{o.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeDetail(scope.row.returnOrderId)">退单详情</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.orderStatus == 2 || scope.row.orderStatus == 3"
                                  @click.native="verify(scope.row.returnOrderId)">审核
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
  export default{
    data(){
      return {
        tableData: [],
        checkAllOrderStatus: false,
        advanceSearch: false,
        searchType: 1,
        form: {
          orderNumber: '',
          orderStatus: [],
          partnerName: '',
          dateRange: null,
          startTime: '',
          endTime: ''
        },
        easyForm: {//简单查询
          partnerName: '',
          orderStatus: [],
          orderNumber: ''
        },
        totalOrderStatus: [
          {
            name: '已作废',
            id: 1
          },
          {
            name: '待退单审核',
            id: 2
          },
          {
            name: '待退款确认',
            id: 3
          },
          {
            name: '已完成',
            id: 4
          },
        ],//订单状态
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
      }
    },
    components: {
      'pagination': require('../../../components/pagination'),
      'getcheckbox': require('../../../components/getcheckbox'),
    },
    methods: {
      getCheckList(e){
        this.form.orderStatus = e;
      },
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.searchType === 1 ? this.select(page.size, page.num) : this.advanceSelect(page.size, page.num);
      },
      createPurchaseReturn(){//新增
        this.$router.push('/order/salereturn/add');
      },
      seeDetail(id){
        let url = '/order/salereturn/detail/' + id;
        this.$router.push(url);
      },
      verify(id){
        let url = '/order/salereturn/verify/' + id;
        this.$router.push(url);
      },
      select(size, num){//查询
        let self = this;
        let requestData = {
          pageSize: size,
          pageNo: num,
          type: 2,//1是采购退货，2是销售退货
          //  searchReturnOrderVO: JSON.stringify(self.easyForm)
        };

        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        self.httpApi.returnOrder.selectReturnOrderListPage(requestData, function (data) {
          self.searchType = 1;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      advanceSelect(size, num){
        let self = this;
        let requestData = {
          pageSize: size,
          pageNo: num,
          type: 2//1是采购退货，2是销售退货
        };
        self.form.startTime = self.form.dateRange === null ? '' : self.form.dateRange[0];
        self.form.endTime = self.form.dateRange === null ? '' : self.form.dateRange[1];
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.returnOrder.selectReturnOrderListPage(requestData, function (data) {
          self.searchType = 2;
          self.advanceSearch = false;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
    }
  }
</script>
