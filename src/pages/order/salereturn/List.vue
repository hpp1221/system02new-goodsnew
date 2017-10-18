<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">销售退货单列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline v-if="!advanceSearch" class="request-form">
        <el-form-item label="订单状态">
          <el-select placeholder="商品状态" v-model="easyForm.type">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="已完成" value="1"></el-option>
            <el-option label="待审核通过" value="2"></el-option>
            <el-option label="待退款确认" value="3"></el-option>
            <el-option label="已作废" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户">
          <el-input placeholder="请输入客户名称/销售订单号" v-model="easyForm.client" class="long-input"></el-input>
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
        <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form">
          <el-form-item label="销售单号">
            <el-input placeholder="请输入销售单号" v-model="form.keyword" class="long-input">

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
          <el-form-item label="客户名称">
            <el-input v-model="form.clientName" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="退单状态">
            <el-checkbox v-model="checkAllOrderStatus" @change="orderStatusAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="form.orderStatus" @change="orderStatusChange"
                               style="display: inline;margin-left: 30px">
              <el-checkbox
                v-for="t in totalOrderStatus"
                :key="t.id"
                :label="t.id">
                {{t.name}}
              </el-checkbox>
            </el-checkbox-group>
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
                <el-dropdown-item @click.native="update(scope.row.id,scope.row.goodsId)">退单详情</el-dropdown-item>
                <el-dropdown-item @click.native="seeDetail(scope.row.id,scope.row.goodsId)">审核</el-dropdown-item>
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
        checkAllOrderStatus: false,
        advanceSearch: false,
        form: {
          orderStatus: []
        },
        easyForm: {//简单查询

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
    watch: {
      advanceSearch: function () {//点击高级搜索和取消时重新查询
        this.select();
      },
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
      select(size, num){//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num,
          type: 2//1是采购退货，2是销售退货
        };

        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));

        self.$http.post('/ui/returnOrder/selectReturnOrderListPage', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectReturnOrderListPage', response)
          if (data.code === 10000) {
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
          pageNo: num,
          type: 2//1是采购退货，2是销售退货
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.$http.post('/ui/returnOrder/selectReturnOrderListPage', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectReturnOrderListPage', response)
          if (data.code === 10000) {
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCatList(val){
        let self = this;
        var requestData;
        if (val === undefined) {
          requestData = {params: {token: window.localStorage.getItem('token')}};
        } else {
          requestData = {params: {token: window.localStorage.getItem('token'), catId: val[val.length - 1].id}};
        }
        self.$http.get('/ui/catList', requestData).then(function (response) {
          let data = response.data;
          console.log('catList', response)
          if (data.code == 10000) {
            for (let i = 0; i < data.data.length; i++) {
              data.data[i].res = JSON.parse(data.data[i].res);
              if (parseInt(data.data[i].hasChild) > 0) {
                data.data[i].children = [];
              }
            }
            if (val === undefined) {
              self.totalCategories = data.data;
            } else {
              self.insertCat(self.totalCategories, val, data.data, 0);
            }

          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      insertCat(arr, val, data, level){//val:所有父级的数组,data:当前获取到的数据
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === val[level].id) {
            if (val.length === level + 1) {
              arr[i].children = data;
            } else {
              level++;
              this.insertCat(arr[i].children, val, data, level);
            }
          }
        }
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
      putOnSale(){//上架
        let self = this;
        self.$confirm('请确认是否批量上架？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('123')
          let requestData = {
            token: window.localStorage.getItem('token'),
            skuList: JSON.stringify(self.multipleSelection),
            type: 1
          };
          self.$http.post('/ui/upOrDownGoods', self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            console.log(data);
            if (data.code == 10000) {
              self.$router.go(0);
            }
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '您已取消上架'
          });
        });
      },
      downSale(){//下架
        let self = this;
        self.$confirm('请确认是否批量下架？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            token: window.localStorage.getItem('token'),
            skuList: JSON.stringify(self.multipleSelection),
            type: 0
          };
          self.$http.post('/ui/upOrDownGoods', self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            console.log(data);
            if (data.code == 10000) {
              self.$router.go(0);
            }
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消下架'
          });
        });
      },
      deleteGoods(){//删除商品
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
      setTags(){//设置标签
        this.dialogTableVisible = true;
      },
      cancelSelect(){//取消选中
        this.$refs.multipleTable.clearSelection();
      },
      orderStatusAllChange(event){//订单checkbox全选按钮
        this.form.orderStatus = [];
        if (event) {
          for (let i = 0; i < this.totalOrderStatus.length; i++) {
            this.form.orderStatus.push(this.totalOrderStatus[i].id);
          }
        }
      },
      orderStatusChange(value){//订单checkbox单个按钮
        let checkedCount = value.length;
        this.checkAllOrderStatus = checkedCount === this.totalOrderStatus.length;
      },

    }
  }
</script>

<style>
</style>
