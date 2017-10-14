<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">采购退货单列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item label="订单状态">
          <el-select placeholder="商品状态" v-model="easyForm.type">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="已完成" value="1"></el-option>
            <el-option label="待审核通过" value="2"></el-option>
            <el-option label="待退款确认" value="3"></el-option>
            <el-option label="已作废" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input placeholder="请输入供应商名称/退单号" v-model="easyForm.supplier"></el-input>
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
            <el-input placeholder="请输入退货单号" v-model="form.keyword" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker
              v-model="form.orderTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="供应商名称">
            <el-select placeholder="请选择商品品牌" v-model="form.brand" value-key="name">
              <el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalBrandList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退单状态">
            <el-input placeholder="请输入供应商名称" class="form-input" v-model="form.supplierName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
            <el-button @click="advanceSearch = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-table :data="tableData">
        <el-table-column label="退单号">
          <template scope="scope">
            <img v-lazy="scope.row.img" alt=""
                 style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="下单时间">

        </el-table-column>
        <el-table-column prop="name" label="供应商名称">

        </el-table-column>
        <el-table-column prop="sku" label="金额">

        </el-table-column>
        <el-table-column prop="unit" label="状态">

        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="seeDetail(scope.row.id,scope.row.goodsId)">退单详情</el-dropdown-item>
                <el-dropdown-item @click.native="verify(scope.row.id,scope.row.goodsId)">审核</el-dropdown-item>
                <el-dropdown-item @click.native="seeDetail(scope.row.id,scope.row.goodsId)">作废</el-dropdown-item>
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
        advanceSearch: false,
        form: {},
        easyForm: {//简单查询

        },
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
    created(){
      let self = this;
    },
    components: {
      'pagination': require('../../../components/pagination')
    },
    methods: {
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
      createPurchaseReturn(){//新增
        this.$router.push('/order/purchasereturn/add');
      },
      seeDetail(id){
        let url = '/order/purchasereturn/detail/' + id;
        this.$router.push(url);
      },
      verify(id){
        let url = '/order/purchasereturn/verify/' + id;
        this.$router.push(url);
      },
      select(size, num){//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));

        self.$http.post('/ui/returnOrder/selectReturnOrderListPage', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('skuList', response)
          if (data.code == 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      advanceSelect(size, num){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.$http.post('/ui/returnOrder/selectReturnOrderListPage', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('skuList', response)
          if (data.code == 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },

      sureSetTags(){//确定设置标签

      },
      handleSelectionChange(val){
        this.multipleSelection = val;
        console.log('10101', val);
      },
      update(id, goodsId){//修改商品详情
        this.$router.push({path: '/goods/updateGoods', query: {id: id, goodsId: goodsId}});
      },
      createGoods(){
        this.$router.push('/goods/createGoods');
      },
      outputFile(){//导出
        console.log(this.multipleSelection)
        let skuList = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          skuList.push(this.multipleSelection[i].id);
        }

        location.href = 'ui/exportGoods?skuList=' + JSON.stringify(skuList);
      },
      multipleInputGoods(){
        this.$router.push('/goods/multipleInputGoods');
      },
      multipleInputImgs(){
        this.$router.push('/goods/multipleInputImgs');
      },
      cancelSelect(){//取消选中
        this.$refs.multipleTable.clearSelection();
      }

    }
  }
</script>

<style>
</style>
