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
        <el-form.item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form.item>

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
          <template scope="scope">
            <img :src="scope.row.img" alt=""/>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称">

        </el-table-column>
        <el-table-column prop="catName" label="商品分类">

        </el-table-column>
        <el-table-column prop="brandName" label="商品品牌">

        </el-table-column>
        <el-table-column label="编辑">
          <template scope="scope">
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
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
      },
//      getSupplierGoodsList() { //供应商商品管理列表
//        let self = this
//        let params = {
//          token: window.localStorage.getItem('token'),
//          rows: self.pageNum,
//          page: self.pageSize
//        };
//        self.$http.post('/ui/supplierGoodsList', self.qs.stringify(params)).then(function (response) {
//          console.log('0929', response)
//          if (response.data.code === 10000) {
//            self.tableData = response.data.data.list
//            self.totalPage = response.data.data.total
//          }
//
//        }).catch(function (error) {
//          console.log(error);
//        })
//      },
      select(size, num) { //查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          query: self.form.query,//id是后台给的url后跟的参数
          supplierName: self.form.supplierName,
          pageNo: num,
          pageSize: size
        }
        self.$http.post('/ui/supplier/supplierGoodslistByPageAndQuery', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('list', response)
          if (data.code == 10000) {
            self.form = data.data
            self.tableData = data.data.list
            self.totalPage = data.data.total
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      updateSupplier(id, goodsId) { //修改供应商商品详情
        this.$router.push({path: '/goods/updateGoods', query: {id: id, goodsId: goodsId}});
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
        location.href = '/ui/exportSupplierGoodsInfo?list=' + JSON.stringify(list);
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
