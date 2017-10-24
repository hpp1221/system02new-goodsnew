<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">供应商列表</h3>
      <el-form ref="form" :model="form" inline class="request-form">
        <el-form-item label="快速查询">
          <el-input placeholder="请输入供应商名称/联系电话/手机/编码" class="fast-query" prefix-icon="el-icon-search"
                    v-model="form.query">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button @click="leadInSupplier">导入</el-button>
          <el-button plain @click="outputSupplier">导出</el-button>
          <el-button @click="createSupplier">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" prop="supplierId">
        </el-table-column>
        <el-table-column prop="name" label="供应商名称">

        </el-table-column>

        <el-table-column prop="number" label="供应商编码">

        </el-table-column>
        <el-table-column prop="tel" label="联系电话">

        </el-table-column>
        <el-table-column prop="address" label="地址">

        </el-table-column>
        <el-table-column prop="phone" label="手机">

        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{moment(scope.row.createdTime).format('YYYY-MM-DD  HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="updateSupplier(scope.row.supplierId)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="deleteSupplier(scope.row)">删除</el-dropdown-item>
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
        multipleSelection: [],
        supplierIdVal: [],
        supplierString: [],
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        form: {
          query: ''
        }
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
      getSupplierList() { //供应商管理列表
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: self.pageSize,
          pageNo: self.pageNum
        };
        self.httpApi.supplier.listByPage(requestData, function (data) {
          self.tableData = data.data
        });
        self.httpApi.supplier.getSupplierCountByQuery(requestData, function (data) {
          self.totalPage = data.data
        });
      },
      select(size, num) { //查询
        let self = this;
//        for (let i = 0; i < this.multipleSelection.length; i++) {
//          self.supplierString.push(this.multipleSelection[i].supplierId)
//        }
//        console.log('888',self.supplierString)
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageNo: num,
          pageSize: size,
          query: self.form.query,
          selectedSupplierIds: self.supplierString
        };
        self.httpApi.supplier.listByPageAndQuery(requestData, function (data) {
          self.tableData = data.data;
        });
        self.httpApi.supplier.getSupplierCountByQuery(requestData, function (data) {
          self.totalPage = data.data;
        });
      },
      updateSupplier(supplierId) { //修改供应商详情
        this.$router.push({path: '/supplier/suppliers/updatesupplier', query: {supplierId: supplierId}});
      },
      deleteSupplier(row) { //删除单个供应商详情
        let self = this;
        let requestData = {
          supplierId: row.supplierId
        };
        self.$confirm('请确认是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.supplier.deleteSupplierBySupplierId(requestData, function (data) {
            self.$message({
              type: 'success',
              message: '您已成功删除!'
            });
            self.getSupplierList();
          });
        })
      },
      outputSupplier() { //导出供应商
        if (this.multipleSelection.length === 0) {
          this.$message.error('请选中要导出的项');
          return;
        }
//        let supplierString = []
//        for (let i = 0; i < this.multipleSelection.length; i++) {
//          supplierString.push(this.multipleSelection[i].supplierId)
//        }
//        location.href = '/ui/supplier/exportSupplierGoods?supplierIds=' + JSON.stringify(supplierString);
//        let self = this
//        let supplierString = ''
//        for (let i = 0; i < self.multipleSelection.length; i++) {
//          self.supplierString += ',' + self.multipleSelection[i].supplierId
//        }
//        self.supplierString = self.supplierString.substring(1, self.supplierString.length)
//        console.log('111', self.supplierString)
        location.href = '/ui/supplier/exportSupplierGoods?supplierIds=' + self.supplierString;
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

      createSupplier() { //新增供应商
        this.$router.push('/supplier/suppliers/createsupplier');
      },
      leadInSupplier() { //导入供应商
        this.$router.push('/supplier/suppliers/leadin');
      }
    }
  }
</script>
