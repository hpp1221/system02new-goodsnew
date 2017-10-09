<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">门店要货</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form storegetgoods-nav">
        <el-form-item label="单据状态">
          <el-select v-model="easyForm.region" placeholder="全部">
            <el-option label="全部" value="shanghai"></el-option>
            <el-option label="已完成" value="beijing"></el-option>
            <el-option label="待审核通过" value="beijing"></el-option>
            <el-option label="待退款确认" value="beijing"></el-option>
            <el-option label="已作废" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="要货门店">
          <el-select placeholder="滨江店" v-model="easyForm.type">
            <el-option label="滨江店" value="-1"></el-option>
            <el-option label="江干店" value="1"></el-option>
            <el-option label="全部门店" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch">高级搜索</el-button>
        </el-form-item>
        <el-form-item class="storegoodslist-create">
          <el-button @click="createGoods">新增</el-button>
        </el-form-item>
      </el-form>
      <!--高级搜索列表-->
      <el-dialog title="高级搜索" :visible.sync="getGoodsSearchList">
        <el-form :model="form">
          <el-form-item label="单据编码">
            <el-input placeholder="请输入单据编码" v-model="form.keyword" class="long-input" style="width: 80%">
            </el-input>
          </el-form-item>
          <el-form-item label="要货时间">
            <el-date-picker
              v-model="value3"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 80%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="要货门店">
            <el-input placeholder="请输入供应商名称" class="form-input" v-model="form.supplierName" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="单据状态">
            <el-checkbox v-model="form.type0" :label="-1">全选</el-checkbox>
            <el-checkbox v-model="form.type1" :label="1">作废</el-checkbox>
            <el-checkbox v-model="form.type2" :label="0">待确认审核</el-checkbox>
            <el-checkbox v-model="form.type3" :label="-1">待发货审核</el-checkbox>
            <el-checkbox v-model="form.type" :label="1">已完成</el-checkbox>
            <el-checkbox v-model="form.type" :label="0">待收货确认</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="getGoodsSearchListSure">确 定</el-button>
          <el-button @click="getGoodsSearchList = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--要货表格-->
      <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable"
                class="storegetgoodstable">
        <el-table-column prop="tradeNumber" label="单据编号">
        </el-table-column>
        <el-table-column prop="createTime" label="要货时间">
          <template scope="scope">
            <span>{{moment(scope.row.create_time).format('YYYY-MM-DD  HH:mm:ss')}}</span>
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
              <el-button type="text" icon="more"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="updateSupplier(scope.row.supplierId)">单据详情</el-dropdown-item>
                <el-dropdown-item @click.native="deleteSupplier(scope.row)">审核</el-dropdown-item>
                <el-dropdown-item @click.native="deleteSupplier(scope.row)">作废</el-dropdown-item>
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
        getGoodsSearchList: false,
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        form: {
          storeHouseAddress: '',//所属仓库
          tagId: '',//商品标签
          storeStatus: '',//库存状态
          keyword: '',//关键词
          series: '',//商品分类
          cat: [],
          supplierName: '',//供应商名称
          tags: [],//标签
          source: -1,//商品来源,全部是-1，手动新增0，批量导入1
          type: -1,//商品状态
          upLimit: 1,
          downLimit: 1,
          zero: 1,
          addressList: [],//所属仓库
        },
        easyForm: {//简单查询
          cat: [],//所属仓库
          type: '',//1是上架，0是下架
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        multipleSelection: [],//选中项
        dialogTableVisible: false,//设置标签表格是否可见
        totalCategories: [],//分类列表
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        totalBrandList: [],
        totalAddressList: []

      }
    },
    created() {
      this.getGoodsList();//获取分类列表
    },
    components: {
      'pagination': require('../../../../components/pagination')
    },
    methods: {
      advanceSearch(){
        this.getGoodsSearchList = true
//        this.createForm = {data: {name: '', number: '', address: ''}};
      },
      getGoodsSearchListSure(){
        let self = this
        let requestData = {
          name: self.createForm.name,
          number: self.createForm.number,
          address: self.createForm.address,
          token: window.localStorage.getItem('token')
        };
        self.$http.post('/ui/createStoreHouse', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('storehouse', response)
          if (data.code == 10000) {
            self.createStore = false
            self.$message.success('添加成功')
            self.getStoreHouseList(self.pageSize,self.pageNum)
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
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
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('10101', val);
      },
      updateSupplier(id) {//要货单详情
        this.$router.push({path: '/store/storemanagement/storegetgoods/storegetgoodsdetail', query: {id: id}});
      },
      createGoods() {
        this.$router.push('/store/storemanagement/storegetgoods/creategetgoods');
      },
      deleteGoods() {//删除商品
        this.$confirm('请确认是否批量删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '您已成功删除!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消删除'
          });
        });
      },
    }
  }
</script>

<style>
</style>
