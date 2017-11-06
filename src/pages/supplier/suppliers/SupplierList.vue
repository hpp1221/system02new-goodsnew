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
                <el-dropdown-item v-if="scope.row.platform == 1" @click.native="updateSupplier(scope.row.supplierId)">详情</el-dropdown-item>
                <el-dropdown-item v-else @click.native="updateSupplier(scope.row.supplierId)">修改</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.platform == 1" @click.native="deleteSupplier(scope.row)"></el-dropdown-item>
                <el-dropdown-item v-else @click.native="deleteSupplier(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage">
      </pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        supplierIdVal: [],
        supplierString: [],
        selectionObj: {},
        pageSize: 5,
        pageNum: 1,
        totalPage: 0,
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
      select(size, num) { //查询
        let self = this;
        let requestData = {
          pageNo: num,
          pageSize: size,
          query: self.form.query,
          selectedSupplierIds: JSON.stringify(self.selectionObj)
        };
        self.httpApi.supplier.listByPageAndQuery(requestData, function (data) {
          self.tableData = data.data;
          if (data.selectedSupplierIds !== "{}") {
            let list = JSON.parse(data.selectedSupplierIds);
            self.$nextTick(function () {
              self.toggleSelection(list[num])
            })
          }
        });
        self.httpApi.supplier.getSupplierCountByQuery(requestData, function (data) {
          console.log('supplier',data)
          self.totalPage = data.data;
        });

      },
      handleSelectionChange(val) {
        if (this.selectionObj[this.pageNum] !== undefined && val.length === 0) {
        } else {
          this.multipleSelection = val
          this.selectionObj[this.pageNum] = val;
        }
      },
      toggleSelection(rows) {
        if (rows) {
          let arr = [];
          for (let i = 0; i < this.tableData.length; i++) {
            for (let j = 0; j < rows.length; j++) {
              if (this.tableData[i].supplierId === rows[j].supplierId) {
                arr.push(this.tableData[i]);
              }
            }
          }
          arr.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        }
      },
      outputSupplier() { //导出供应商
        let list = this.selectionObj === '{}'?[]:this.selectionObj;
        let arr = [];
        for(let i in list){
          for(let j = 0;j < list[i].length;j++){
            arr.push(list[i][j]);
          }
        }
        let supplierString = ''
        for (let i = 0; i < arr.length; i++) {
          supplierString += ',' + arr[i].supplierId
        }
        supplierString = supplierString.substring(1,supplierString.length)
        location.href = '/ui/supplier/exportSupplierGoods?supplierIds=' + supplierString + '&token=' + window.localStorage.getItem('token') + '&query=' + this.form.query;
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
            self.select(self.pageSize,self.pageNum);
          });
        })
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
