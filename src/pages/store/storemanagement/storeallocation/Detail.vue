<template>
  <div class="container">
    <div class="wrapper allocationwrapper">
      <h3 class="page-title">门店调拨单详情</h3>
      <div class="storegetgoodsdetail-title-right">
        <el-button type="text"
                   class="iconfont icon-erp-dayin storegetgoodsdetail-titleoperation">打印
        </el-button>
        <el-button type="text"
                   class="iconfont icon-erp-daochu storegetgoodsdetail-titleoperation">导出
        </el-button>
        <el-button type="text" @click="cancelGetGoods"
                   class="iconfont icon-erp-yizuofeiicon storegetgoodsdetail-titleoperation">作废
        </el-button>

        <el-button v-model="type" v-if="item.value == form.type" @click="getGoodsExaminePass" v-for="item in typeLists" :label="item.value" :key="item.value">
          {{item.label}}
        </el-button>
      </div>

        <!--<el-button  @click="getGoodsExaminePass" v-model="type">-->
          <!--<template scope="scope">-->
            <!--<span v-if="scope.row.type == '0'">已完成</span>-->
            <!--<span v-if="scope.row.type == '1'">待审核通过</span>-->
            <!--<span v-if="scope.row.type == '2'">待发货确认</span>-->
            <!--<span v-if="scope.row.type == '3'">待收货确认</span>-->
            <!--<span v-if="scope.row.type == '4'">作废</span>-->
          <!--</template>-->
        <!--</el-button>-->
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
          <el-table-column label="规格" prop="goodsSpec" width="200">

          </el-table-column>
          <el-table-column label="调入门店库存" prop="inStoreHouseNum" width="120">

          </el-table-column>
          <el-table-column label="调出门店库存" prop="outStoreHouseNum" width="120">

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
          createUseraName: '',

        },
        type: '',
        getGoodsRecordDetails: [],
        rules: {},
        listIndex: '',//现在正在添加的某个list的下标
        typeLists: [//高级查询的单据状态
          {
            value: '4',
            label: "作废"
          },
          {
            value: '1',
            label: "待审核确认"
          },
          {
            value: '2',
            label: "待发货审核"
          },
          {
            value: '0',
            label: "已完成"
          },
          {
            value: '3',
            label: "待收货确认"
          },
        ],
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
          console.log('detailtype', response.data.data.type);
          if (data.code == 10000) {
            self.form = data.data
            self.type = data.data.type
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
          type: 2,
          tradeId: self.getGoodsRecordDetails[0].getGoodsRecordId
        }
        self.$confirm('确认要通过该审核？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.$http.post('/ui/examine', self.qs.stringify(requestData)).then((res) => {
            if (res.data.code == 10000) {
              self.$message({
                type: 'success',
                message: '已通过该审核!'
              });
              this.$router.push('/store/storemanagement/storegetgoods/storegetgoodslist');
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
        let params = {
          token: window.localStorage.getItem('token'),
          id: self.form.id
        };
        self.$confirm('确认将此门店要货单作废？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.$http.post('/ui/setInvalid', self.qs.stringify(params)).then((res) => {
            console.log('set', res)
            if (res.data.code == 10000) {
              self.$message({
                type: 'success',
                message: '已成功作废!'
              });
              self.$router.push('/store/storemanagement/storegetgoods/storegetgoodslist');
            } else {
              self.$message({
                type: 'info',
                message: '已取消'
              });
            }
          })

        })
      },
      outputGetGoods() {
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
    }
  }
</script>
