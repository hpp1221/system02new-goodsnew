<template>
  <div class="container">
    <div class="wrapper allocationwrapper">
      <h3 class="page-title">门店调拨单详情</h3>
      <div class="storegetgoodsdetail-title-right">
        <el-button v-if="type != 4">导出
        </el-button>
        <el-button v-if="type == 1 || type == 2" type="text" @click="cancelGetGoods">作废
        </el-button>
        <el-button v-model="type" v-if="item.value == form.type" @click="getGoodsExaminePass" v-for="item in typeLists"
                   :label="item.value" :key="item.value">
          {{item.label}}
        </el-button>
      </div>
      <el-form ref="form" :model="form" :rules="rules" class="request-form storegetgoods-nav" label-width="80px" inline
               style="margin-top: 75px">
        <el-form-item label="调拨单号">
          {{form.tradeNo}}
        </el-form-item>
        <el-form-item label="调入门店:" v-model="form.inPutAddressId">
          {{form.inPutAddress}}
        </el-form-item>
        <el-form-item label="调出门店:" v-model="form.outPutAddressId">
          {{form.outPutAddress}}
        </el-form-item>
        <el-form-item label="要货人:">
          {{form.createUserName}}
        </el-form-item>
        <el-table :data="getGoodsRecordDetails" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column
            type="index"
            width="70" prop="goodsSkuId">
          </el-table-column>
          <el-table-column label="主图" width="80" props="img">
            <template slot-scope="scope">
              <img v-lazy="scope.row.img" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>
            </template>
          </el-table-column>
          <el-table-column label="商品编码" prop="number">

          </el-table-column>
          <el-table-column label="商品名称" prop="goodsName">

          </el-table-column>
          <el-table-column label="规格" prop="goodsSpec" width="150">

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
          type: ''
        },
        type: '',
        getGoodsRecordDetails: [],
        rules: {},
        listIndex: '',//现在正在添加的某个list的下标
        typeLists: [//高级查询的单据状态
          {
            value: '4',
            label: "返回"
          },
          {
            value: '1',
            label: "审核"
          },
          {
            value: '2',
            label: "确认发货"
          },
          {
            value: '0',
            label: "返回"
          },
          {
            value: '3',
            label: "确认收货"
          },
        ],
      }
    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    methods: {
      select(id) {//详情列表
        let self = this;
        let requestData = {
          allocationId: id,
        }
        self.httpApi.store.storeAllocationInfo(requestData, function (data) {
          self.form = data.data
          self.type = data.data.type
          self.getGoodsRecordDetails = data.data.allocationRecordGoodslist
        })
      },
      getGoodsExaminePass() {//通过
        let self = this;
        let requestData = {
          status: 2,
          allocationRecordId: self.form.id
        }
        if (self.type == "1") {
          self.$confirm('确认要通过该审核？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            self.httpApi.store.storeAllocationRecordAdopt(requestData, function (data) {
              self.$router.push('/store/management/allocation/list');
            })
          })
        } else if (self.type == "2") {
          self.$confirm('确认要通过该审核？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            self.httpApi.store.storeAllocationRecordSendAdopt(requestData, function (data) {
              self.$router.push('/store/management/allocation/list');
            })
          })
        } else if (self.type == "3") {
          self.$confirm('确认要通过该审核？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            self.httpApi.store.storeAllocationRecordReceiveAdopt(requestData, function (data) {
              self.$router.push('/store/management/allocation/list');
            })
          })
        } else if (self.type == "4" || self.type == "0") {
          self.$router.push('/store/management/allocation/list');
        }


      },
      cancelGetGoods() { //作废
        let self = this;
        let requestData = {
          allocationRecordId: self.form.id,
          status: self.form.type,
          tradeNo: self.form.tradeNo
        };
        self.$confirm('确认将此门店要货单作废？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.store.storeAllocationRecordCancel(requestData, function (data) {
            self.$message({
              type: 'success',
              message: '已成功作废!'
            });
            self.$router.push('/store/management/allocation/list');
          });
        })
      },
    }
  }
</script>
