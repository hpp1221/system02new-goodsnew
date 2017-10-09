<template>
  <div class="container">
    <div class="wrapper">
      <h4 class="client-management-title">供应商管理</h4>
      <h5 class="client-management-clientlist">供应商商品列表</h5>
      <el-form ref="form" :model="form" inline class="request-form">
        <el-form-item label="供应商名称" style="margin-left: 50px;">
          <el-input v-model="input" placeholder="请输入供应商名称" style="margin-right: 15px;width:160px"></el-input>
          <el-input placeholder="请输入联系电话/手机/编码" class="fast-query" icon="search"
                    :on-icon-click="select" style="width:230px">
          </el-input>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-dropdown trigger="click">
            <el-button>导入</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="multipleInputGoods">批量导入商品</el-dropdown-item>
              <el-dropdown-item @click.native="multipleInputImgs">批量导入图片</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button @click="outputSupplier">导出</el-button>
          <el-button @click="createSupplier">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="multipleTable" border tooltip-effect="dark" style="width: 100%"
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
              <el-button type="text" icon="more"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="updateSupplier(scope.row.id)">修改</el-dropdown-item>
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
  let self = this;
  export default {
    data() {
      return {
        tableData: [],
        input: '',
        input2: '',
        multipleSelection: [],
        supplierIdVal: [],
        pageSize: 5,
        pageNum: '',
        totalPage: 10
      }
    },
    created() {
      this.getSupplierGoodsList()
    },
    components: {
      'pagination': require('../../../components/pagination')
    },
    methods: {
      pageChanged(page) {
        this.select(page.size, page.num);
      },
      getSupplierGoodsList() { //供应商商品管理列表
        let self = this
        let params = {
          rows: self.pageNum,
          page: self.pageSize
        };
        self.$http.post('/ui/supplierGoodsList', self.qs.stringify(params)).then(function (response) {
          console.log('0929', response)
          if (response.data.code === 10000) {
            self.tableData = response.data.data.list
            self.totalPage = response.data.data.total
          }

        }).catch(function (error) {
          console.log(error);
        })
      },
//      select(size, num) { //查询
//        let self = this
//        let requestData = {
//          token: window.localStorage.getItem('token')
//          id: self.input2,//id是后台给的url后跟的参数
//          rows: num,
//          page: size
//        }
//        self.$http.post('/ui/list', self.qs.stringify(requestData)).then(function (response) {
//          let data = response.data;
//          console.log('list', response)
//          if (data.code == 10000) {
//            self.tableData = data.data
//          }
//        }).catch(function (error) {
//          console.log(error);
//        });
//      },
      updateSupplier(supplierId) { //修改供应商商品详情
        this.$router.push({
          path: '/goods/updategoods',
          query: {
            id: supplierId
          }
        });
      },
      outputSupplier() { //导出供应商商品
//				this.$router.push('/')
      },
      handleSelectionChange(val) {
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
      multipleInputGoods() { //批量导入供应商商品
        this.$router.push('/goods/multipleInputGoods');
      },
      multipleInputImgs() {//批量导入图片
        this.$router.push('/goods/multipleInputImgs');
      }
    }
  }
</script>
