<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">供应商商品列表</h3>
      <el-form ref="form" :model="form" inline class="request-form">
        <el-form-item label="供应商名称">
          <el-input v-model="form.supplierName" placeholder="请输入供应商名称"></el-input>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input placeholder="请输入联系电话/手机/编码" icon="search" class="fast-query" v-model="form.query">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-dropdown trigger="click">
            <el-button>导入</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="multipleInputGoods">批量导入商品</el-dropdown-item>
              <el-dropdown-item @click.native="multipleInputImgs">批量导入图片</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item>

          <el-button @click="outputSupplier">导出</el-button>
          <el-button @click="createSupplier">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="multipleTable" style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" prop="supplierId">
        </el-table-column>
        <el-table-column prop="supplierName" label="供应商名称">

        </el-table-column>

        <el-table-column prop="img" label="商品图片">
          <template slot-scope="scope">
            <img v-lazy="scope.row.img.url" alt=""
                 style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称">

        </el-table-column>
        <el-table-column prop="catName" label="商品分类">

        </el-table-column>
        <el-table-column prop="brandName" label="商品品牌">

        </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <!--<el-dropdown-item @click.native="updateSupplier(scope.row.id,scope.row.goodsId)">修改</el-dropdown-item>-->
                <el-dropdown-item @click.native="seeDetail(scope.row.id,scope.row.goodsId)">明细</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right">
      </pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        form: {
          supplierName: '',
          supplierId: '',
          query: '',
        },
        multipleSelection: [],
        supplierIdVal: [],
        pageSize: 5,
        pageNum: 1,
        totalPage: 10
      }
    },
    components: {
      'pagination': require('../../../components/pagination')
    },
    created() {
      this.getSupplierGoodsList()
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
//        this.select(page.size, page.num);
      },
      getSupplierGoodsList() { //供应商商品管理列表
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          supplierName: self.form.supplierName,
          supplierId: self.form.supplierId,
          rows: self.pageSize,
          page: self.pageNum
        };
        self.httpApi.goods.supplierGoodsList(requestData, function (data) {
          self.tableData = data.data.list;
          for (let i = 0; i < data.data.list.length; i++) {
            data.data.list[i].img = data.data.list[i].img !== ""?  JSON.parse(data.data.list[i].img):"";
          }
          self.totalPage = data.data.total;
        })
      },
      select(size, num) { //查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          supplierName: self.form.supplierName,
          query: self.form.query,
          pageNo: num,
          pageSize: size
        };
        self.httpApi.supplier.supplierGoodslistByPageAndQuery(requestData, function (data) {
          console.log('supplierGoodslistByPageAndQuery', data)
          if(data.data){
            self.tableData = data.data
            self.getSupplierGoodsList()
          }else {
            self.tableData = data.data.data.list;
            self.totalPage = data.data.data.total;
            self.getSupplierGoodsList()
          }
        })
      },
      updateSupplier(supplierId) { //修改供应商商品详情
        let url = '/goods/updategoods/' + supplierId;
        this.$router.push(url);
      },
      outputSupplier() { //导出供应商商品
        if (this.multipleSelection.length === 0) {
          this.$message.error('请选中要导出的项');
          return;
        }
        let list = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          list.push(this.multipleSelection[i].id);
        }
        location.href = '/ui/exportSupplierGoodsInfo?list=' + JSON.stringify(list)+ '&supplierName='+this.form.supplierName + '&supplierId='+this.form.supplierId + '&token=' + window.localStorage.getItem('token');
      },
      handleSelectionChange(val) {
        console.log('val', val)
        this.multipleSelection = val;
      },
      toggleSelection(rows) {
        if (rows) {
          console.log('rows', rows)
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      createSupplier() { //新增供应商商品
        this.$router.push('/goods/creategoods');
      },
      seeDetail() {//明细

      },
      multipleInputGoods() { //批量导入供应商商品
        this.$router.push('/goods/multipleInputGoods');
      },
      multipleInputImgs() {//批量导入图片
        this.$router.push('/goods/multipleInputImgs');
      }
    }
  }
</script>
