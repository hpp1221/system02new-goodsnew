<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">新增门店调拨单</h3>
      <el-form ref="form" :model="form" class="request-form" label-width="80px" inline>
        <el-form-item label="调拨单号">
          {{form.tradeNo}}
        </el-form-item>
        <el-form-item label="调入门店">
          <el-select placeholder="请选择门店" v-model="form.inPutAddressId" style="width: 130px">
            <el-option v-for="item in storeIds" :key="item.id" :label="item.name" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调出门店">
          <el-select placeholder="请选择门店" v-model="form.outPutAddressId" style="width: 130px">
            <el-option v-for="item in storeIds" :key="item.id" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="要货人">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-table :data="form.getGoodsRecordDetails" v-if="form.outPutAddressId">
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <el-table-column width="70">
            <template scope="scope">
              <i class="el-icon-plus" @click="addLine"></i>
              <i class="el-icon-minus" @click="deleteLine(scope.$index)"></i>
            </template>
          </el-table-column>
          <el-table-column label="主图" width="80" prop="img">
            <template scope="scope">
              <img :src="scope.row.img" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>
            </template>
          </el-table-column>
          <el-table-column label="商品编码  商品名称" width="150">
            <template scope="scope">
              <el-autocomplete v-on:click.native="handleClick(scope.$index)" v-model="scope.row.combination"
                               :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select="handleSelect"
                               :props="{value:'combination',label:'combination'}">
              </el-autocomplete>
            </template>
          </el-table-column>

          <el-table-column label="规格" prop="goodsSpec" width="120">

          </el-table-column>
          <el-table-column label="调入门店库存" prop="inStoreHouseNum" width="120">

          </el-table-column>
          <el-table-column label="调出门店库存" prop="outStoreHouseNum" width="120">

          </el-table-column>
          <el-table-column label="要货数量" prop="count">
            <template scope="scope">
              <el-input v-model="scope.row.count" @keyup.native="judgeNum(scope.row.count,scope.$index)"
                        @afterpaste.native="judgeNum(scope.row.count,scope.$index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="goodsUnit">

          </el-table-column>
          <el-table-column label="单价" prop="price">

          </el-table-column>
          <el-table-column label="金额" prop="sum" width="120px">
          </el-table-column>
          <el-table-column label="备注" prop="remark">
            <template scope="scope">
              <el-input v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item class="createstoregetgoods-operation">
          <el-button @click="getGoodsSubmit">确定</el-button>
          <el-button @click="editDeliveryVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        storeIds: [],
        storeHouseIds: [],
        form: {
          tradeNo: '',
          name: '',
          inPutAddressId: '',
          outPutAddressId: '',
          inPutAddress: '',
          outPutAddress: '',
          goodsSkuId: '',
          getGoodsRecordDetails: [{
            number: '',//商品编号
            goodsName: '',//商品名
            goodsSpec: '',//规格
            inStoreHouseNum: '',//调入门店库存
            outStoreHouseNum: '',//调出门店库存
            count: '',//数量
            img: '',
            goodsUnit: '',//单位
            price: '',//价格
            priceFen: '',
            sum: 0,//金额
            combination: '',//编号和名称组合
            goodsSkuId: '',
            remark: '',//备注
          }],
        },
        listIndex: '',//现在正在添加的某个list的下标
        goodsInfoList: [],
      }
    },
    created() {
      this.getStoreList()//要货门店
      this.getTradeNumber()//调拨单号
    },
    computed: {
      userinfo: function () {
        return JSON.parse(window.localStorage.getItem('userinfo'));
      },
    },
    methods: {
      getTradeNumber() {//调拨单号
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token')
        }
        self.$http.post('/ui/createAllocationRecordNumber', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('number000', response);
          if (data.code == 10000) {
            let list = data.data;
            self.form.tradeNo = list.tradeNo;
            self.form.name = list.name;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getGoodsSubmit() {//提交门店调拨单
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          inPutAddressId: self.form.inPutAddressId,
          outPutAddressId:self.form.outPutAddressId
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.$http.post('/ui/createStoreAllocation', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('createStoreAllocation', response)
          if (data.code == 10000) {
            self.$router.push('/store/storemanagement/storeallocation/list');
          }
        }).catch(function (error) {
          console.log(error);
        });

      },
      getStoreList() {//要货门店
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
        }
        self.$http.post('/ui/storeList', self.qs.stringify(requestData)).then(function (response) {
          console.log('store', response.data.data[0].name)
          let data = response.data;
          if (data.code == 10000) {
            self.storeIds = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      judgeNum(value, index) {//判断数量是否为整数
        if (value === '') {
          this.form.getGoodsRecordDetails[index].sum = 0.00;
          return;
        }
        this.form.getGoodsRecordDetails[index].count = value.replace(/\D/g, '');
        this.form.getGoodsRecordDetails[index].sum = "";
        let price = JSON.stringify(this.form.getGoodsRecordDetails[index].count * this.form.getGoodsRecordDetails[index].priceFen);
        let size = price.length;
        price = price.substring(0, size - 2) + "." + price.substring(size - 2, size);
        this.form.getGoodsRecordDetails[index].sum = price;
      },
      querySearchAsync(queryString, cb) {//商品关键字查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          keyword: queryString,
          inPutAddressId: self.form.inPutAddressId.id,
          outPutAddressId: self.form.outPutAddressId.id
        }
        self.$http.post('/ui/selectStoreGoodsInfo', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log(response.data);
          if (data.code == 10000) {
            let list = data.data;
            for (let i = 0, listLength = list.length; i < listLength; i++) {
              list[i].combination = list[i].number + '  ' + list[i].goodsName;
              list[i].sum = '';
            }
            self.goodsInfoList = list;
            // 调用 callback 返回建议列表的数据
            cb(self.goodsInfoList);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      handleSelect(item) {//判断是否已选该商品
        let list = this.form.getGoodsRecordDetails;
        for (let i = 0; i < list.length; i++) {
          if (item.number === list[i].number) {
            this.$message.error('已有此类商品');
            this.form.getGoodsRecordDetails[this.listIndex].combination = ''
            return
          }
        }
        this.form.getGoodsRecordDetails[this.listIndex] = item
        this.form.getGoodsRecordDetails[this.listIndex].storeHouseId = ''
      },
      handleClick(index) {//存商品index
        this.listIndex = index
      },
      addLine() {//添加一行
        this.form.getGoodsRecordDetails.push({
          number: '',//商品编号
          goodsName: '',//商品名
          sku: '',//规格
          storeHouseName: '',//要货仓库
          storeHouseId: '',//要货仓库id
          storeInStoreHouse: '',//门店库存
          storeOnTheWay: '',//门店在途量
          inStoreHouse: '',//仓库库存
          onTheWay: '',//仓库在途量
          count: '',//数量
          img: '',
          unit: '',//单位
          price: '',//价格
          sum: '',//金额
          combination: '',//编号和名称组合
          remark: '',//备注
        })
      },
      deleteLine(index) {
        this.form.getGoodsRecordDetails.length === 1 ? this.$message('请至少选择一个商品') : this.form.getGoodsRecordDetails.splice(index, 1);
      },
    }
  }
</script>
