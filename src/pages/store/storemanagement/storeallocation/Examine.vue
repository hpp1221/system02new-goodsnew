<template>
  <div class="container">
    <div class="wrapper">
      <el-form ref="titleForm" :model="titleForm" class="storegetgoods-nav storegetgoodsdetail-title">
        <el-form-item class="storegetgoodsdetail-title-left">
          <h3>门店调拨单详情</h3>
        </el-form-item>
        <el-form-item class="storegetgoodsdetail-title-right">
          <el-button type="text" @click="leadInSupplier"
                     class="iconfont icon-erp-dayin storegetgoodsdetail-titleoperation">打印
          </el-button>
          <el-button type="text" @click="outputGetGoods"
                     class="iconfont icon-erp-daochu storegetgoodsdetail-titleoperation">导出
          </el-button>
          <el-button type="text" @click="cancelGetGoods"
                     class="iconfont icon-erp-yizuofeiicon storegetgoodsdetail-titleoperation">作废
          </el-button>
          <el-button @click="getGoodsExaminePass">通过</el-button>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" :rules="rules" class="request-form storegetgoods-nav" label-width="80px"
               inline>
        <el-form-item label="调拨单号">
          {{form.tradeNo}}
        </el-form-item>
        <el-form-item label="调入门店" v-model="form.inPutAddressId">
          <el-input v-model="form.inPutAddress" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="调出门店" v-model="form.outPutAddressId">
          <el-input v-model="form.outPutAddress" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="要货人">
          <el-input v-model="form.createUserName" :disabled="true"></el-input>
        </el-form-item>
        <el-table :data="getGoodsRecordDetails" ref="multipleTable" tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" prop="goodsSkuId">
          </el-table-column>
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <el-table-column label="主图" width="80" props="img">
            <template scope="scope">
              <img :src="scope.row.img" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>
            </template>
          </el-table-column>
          <el-table-column label="商品编码" prop="number">

          </el-table-column>
          <el-table-column label="商品名称" prop="goodsName">

          </el-table-column>
          <el-table-column label="规格" prop="goodsSpec">

          </el-table-column>
          <el-table-column label="调入门店库存" prop="inStoreHouseNum">

          </el-table-column>
          <el-table-column label="调出门店库存" prop="outStoreHouseNum">

          </el-table-column>
          <el-table-column label="要货数量" prop="num">
          </el-table-column>
          <el-table-column label="单位" prop="goodsUnit">

          </el-table-column>
          <el-table-column label="单价" prop="price">

          </el-table-column>
          <el-table-column label="金额" prop="sum">

          </el-table-column>
          <el-table-column label="备注" prop="remark">
          </el-table-column>
        </el-table>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          id: '',
          tradeNo: '',
          inPutAddressId: '',
          inPutAddress: '',
          outPutAddressId: '',
          outPutAddress: '',
          createUseraName: ''
        },
        getGoodsRecordDetails: [],
        rules: {},
        listIndex: '',//现在正在添加的某个list的下标
      }
    },
    created() {
      this.$route.query.allocationId ? this.select(this.$route.query.allocationId) : this.$router.push('/error');
    },
    methods: {
      select(id) {//详情列表
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          allocationId: id,
        }
        self.$http.post('/ui/storeAllocationInfo', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('detail', response);
          if (data.code == 10000) {
            self.form = data.data
            self.getGoodsRecordDetails = data.data.allocationRecordGoodslist
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getGoodsExaminePass() {//通过
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          status: 2,
          allocationRecordId: self.form.id
        }
        self.$confirm('确认要通过该审核？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.$http.post('/ui/storeAllocationRecordAdopt', self.qs.stringify(requestData)).then((res) => {
            console.log('deta', res)
            if (res.data.code == 10000) {
              self.$message({
                type: 'success',
                message: '已通过该审核!'
              });
              this.$router.push('/store/storemanagement/storeallocation/list');
            } else {
              self.$message({
                type: 'info',
                message: '已取消'
              });
            }
          })
        })
        self.$confirm('确认要通过该审核？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.$http.post('/ui/storeAllocationRecordSendAdopt', self.qs.stringify(requestData)).then((res) => {
            console.log('deta', res)
            if (res.data.code == 10000) {
              self.$message({
                type: 'success',
                message: '已通过该审核!'
              });
              this.$router.push('/store/storemanagement/storeallocation/list');
            } else {
              self.$message({
                type: 'info',
                message: '已取消'
              });
            }
          })
        })
        self.$confirm('确认要通过该审核？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.$http.post('/ui/storeAllocationRecordReceiveAdopt', self.qs.stringify(requestData)).then((res) => {
            console.log('deta', res)
            if (res.data.code == 10000) {
              self.$message({
                type: 'success',
                message: '已通过该审核!'
              });
              this.$router.push('/store/storemanagement/storeallocation/list');
            } else {
              self.$message({
                type: 'info',
                message: '已取消'
              });
            }
          })
        })
      },
      cancelGetGoods() { //作废
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          id: self.form.id
        };
        self.$confirm('确认将此门店要货单作废？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.store.setInvalid(requestData, function (data) {
            self.$message({
              type: 'success',
              message: '已成功作废!'
            });
            self.$router.push('/store/storemanagement/storegetgoods/storegetgoodslist');
          });
        })
      },
    }
  }
</script>
