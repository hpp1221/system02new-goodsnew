<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">门店要货单详情</h3>
      <div class="storegetgoodsdetail-title-right">
        <!--<el-button v-if="type != 4" style="display: none" type="text"-->
        <!--class="iconfont icon-erp-dayin storegetgoodsdetail-titleoperation">打印-->
        <!--</el-button>-->
        <el-button v-if="type != 4">导出
        </el-button>
        <!--<el-button v-if="type == 4 || type == 0" type="text" style="display: none" @click="cancelGetGoods"-->
        <!--class="iconfont icon-erp-yizuofeiicon storegetgoodsdetail-titleoperation">作废-->
        <!--</el-button>-->
        <el-button v-if="type == 1 || type == 2" type="text" @click="cancelGetGoods">作废
        </el-button>
        <el-button v-model="type" v-if="item.value == form.type" @click="getGoodsExaminePass" v-for="item in typeLists"
                   :label="item.value" :key="item.value">
          {{item.label}}
        </el-button>
      </div>
      <el-form ref="form" :model="form" class="request-form" label-width="80px"
               inline style="margin-top: 75px">
        <el-form-item label="单据编码:">
          {{form.tradeNumber}}
        </el-form-item>
        <el-form-item label="要货门店:">
          {{form.storeName}}
        </el-form-item>
        <el-form-item label="要货人:">
          {{form.createUserName}}
        </el-form-item>
        <el-table :data="getGoodsRecordDetails" style="width: 100%">
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <el-table-column label="主图" width="80" props="img">
            <template slot-scope="scope">
              <img v-lazy="scope.row.img" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>
            </template>
          </el-table-column>
          <el-table-column label="商品编码" prop="goodsNumber">

          </el-table-column>
          <el-table-column label="商品名称" prop="goodsName">

          </el-table-column>
          <el-table-column label="规格" prop="goodsSpec">

          </el-table-column>
          <el-table-column label="要货仓库" prop="storeHouseName">

          </el-table-column>
          <el-table-column label="门店库存" prop="storeInStoreHouse">

          </el-table-column>
          <el-table-column label="门店在途量" prop="storeOnTheWay">

          </el-table-column>
          <el-table-column label="仓库库存" prop="inStoreHouse">

          </el-table-column>
          <el-table-column label="仓库在途量" prop="onTheWay">

          </el-table-column>
          <el-table-column label="要货数量" prop="count">
          </el-table-column>
          <el-table-column label="单位" prop="unit">

          </el-table-column>
          <el-table-column label="单价" prop="price">

          </el-table-column>
          <el-table-column label="金额" prop="sum">

          </el-table-column>
          <el-table-column label="备注" prop="remark">
          </el-table-column>
        </el-table>
        <!--<el-form-item>-->
        <!--<h4 class="el-icon-arrow-down" style="margin-top: 30px">操作日志</h4>-->
        <!--</el-form-item>-->
        <div class="goodsinout-detail-bottom">
          <p>操作日志
            <el-switch
              v-model="operationLogVisible"
              on-text=""
              off-text="">
            </el-switch>
          </p>
        </div>
        <el-table v-if="operationLogVisible" :data="tableData" style="width: 100%">
          <el-table-column prop="time" label="操作时间">
            <template slot-scope="scope">
              <span>{{moment(scope.row.time).format('YYYY-MM-DD  HH:mm:ss')}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="操作人">
          </el-table-column>
          <el-table-column prop="type" label="状态">

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
          tradeNumber: '',
          storeId: '',
          storeName: '',
          createUseraName: '',
          type: ''
        },
        type: '',
        tableData: [],
        operationLogVisible: false,
        getGoodsRecordDetails: [],
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
        listIndex: '',//现在正在添加的某个list的下标
      }
    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    methods: {
      select(id) {//详情列表
        let self = this;
        let requestData = {
          id: id,
        };
        self.httpApi.store.getGoodsRecordDetail(requestData, function (data) {
          self.form = data.data;
          self.type = data.data.type;
          self.getGoodsRecordDetails = data.data.list;
          self.tableData = data.data.flowList;
        })
      },
      getGoodsExaminePass() {//通过
        let self = this;
        if (self.type == 0 || self.type == 4) {
          self.$router.push('/store/management/getgoods/list');
        } else {
          let requestData = {
            type: self.type,
            tradeId: self.getGoodsRecordDetails[0].getGoodsRecordId
          };
          self.$confirm('确认要通过该审核？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            self.httpApi.store.examine(requestData, function (data) {
              self.$router.push('/store/management/getgoods/list');
            })
          })
        }
      },
      cancelGetGoods() { //作废
        let self = this;
        let requestData = {
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
            self.$router.push('/store/management/getgoods/list');
          });
        })
      },
    }
  }
</script>
