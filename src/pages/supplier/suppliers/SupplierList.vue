<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">供应商列表</h3>
      <el-form ref="form" :model="form" inline class="request-form">
        <el-form-item label="快速查询">
          <el-input placeholder="请输入供应商名称/联系电话/手机/编码" class="fast-query" prefix-icon="el-icon-search"
                    v-model="form.query" :on-icon-click="handleIconClick">
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
          <template scope="scope">
            <span>{{moment(scope.row.createdTime).format('YYYY-MM-DD  HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
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
        input2: '',
        multipleSelection: [],
        supplierIdVal: [],
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        form: {
          query: ''
        }
      }
    },
    created() {
      this.getSupplierList()
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
        let params = {
          token: window.localStorage.getItem('token'),
          pageSize: self.pageSize,
          pageNo: self.pageNum
        };
        self.$http.post('/ui/supplier/listByPage', self.qs.stringify(params)).then(function (response) {
          console.log(response)
          console.log('code', response.data.data)

          if (response.data.code === 10000) {
            self.tableData = response.data.data
          }
        }).catch(function (error) {
          console.log(error);
        })

        self.$http.post('/ui/supplier/getSupplierCountByQuery').then(res => {
          self.totalPage = res.data.data
        })
      },
      select(size, num) { //查询
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageNo: num,
          pageSize: size,
          query: self.form.query
        }
        self.$http.post('/ui/supplier/listByPageAndQuery', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('list', response)
          if (data.code == 10000) {
            self.tableData = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
        self.$http.post('/ui/supplier/getSupplierCountByQuery', self.qs.stringify(requestData)).then(res => {
          console.log('926', res)
          if (res.data.code == 10000) {
            self.totalPage = res.data.data
          }

        })
      },
      handleIconClick(ev) {
        this.select();
      },
      updateSupplier(supplierId) { //修改供应商详情
        this.$router.push({
          path: '/supplier/suppliers/updatesupplier',
          query: {
            supplierId: supplierId
          }
        });
      },
      deleteSupplier(row) { //删除单个供应商详情
        let self = this;
        let params = {
          supplierId: row.supplierId
        };
        self.$confirm('请确认是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.$http.post('/ui/supplier/deleteSupplierBySupplierId', self.qs.stringify(params)).then((res) => {
            if (res.data.code == 10000) {
              self.$message({
                type: 'success',
                message: '您已成功删除!'
              });
              this.getSupplierList()
            } else {
              self.$message({
                type: 'info',
                message: '您已取消删除'
              });
            }
          })

        })
      },
      outputSupplier() { //导出供应商
        let self = this
        let supplierString = ''
        for (let i = 0; i < self.multipleSelection.length; i++) {
          supplierString += ',' + self.multipleSelection[i].supplierId
        }
          supplierString = supplierString.substring(1, supplierString.length)
          let requestData = {
            params: {
              supplierIds: supplierString
            }
          };
          location.href = '/ui/supplier/exportSupplierGoods?supplierIds=' + supplierString;
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
