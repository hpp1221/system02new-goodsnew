<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">新增门店调拨单</h3>
      <el-form ref="form" :model="form" class="request-form" label-width="80px" inline>
        <el-form-item label="调拨单号">
          {{form.tradeNo}}
        </el-form-item>
        <el-form-item label="调入门店">
          <el-select placeholder="请选择门店" v-model="inputAdress" style="width: 130px" @change="selectOne">
            <el-option v-for="item in storeIds" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调出门店">
          <el-select placeholder="请选择门店" v-model="outputAdress" style="width: 130px" @change="selectTwo">
            <el-option v-for="item in storeIds" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="要货人">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-table :data="form.getGoodsRecordDetails" v-if="form.outPutAddress">
          <el-table-column
            type="index"
            width="70">
          </el-table-column>
          <el-table-column width="70">
            <template slot-scope="scope">
              <i class="el-icon-plus" @click="addLine"></i>
              <i class="el-icon-minus" @click="deleteLine(scope.$index)"></i>
            </template>
          </el-table-column>
          <el-table-column label="主图" width="80" prop="img">
            <template slot-scope="scope">
              <img v-lazy="scope.row.img" alt="" style="width: 40px;height: 40px;margin-top: 7px;"/>
            </template>
          </el-table-column>
          <el-table-column label="商品编码  商品名称" width="150">
            <template slot-scope="scope">
              <el-autocomplete v-on:click.native="handleClick(scope.$index)" v-model="scope.row.combination"
                               :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select="handleSelect"
                               value-key="combination">
              </el-autocomplete>
            </template>
          </el-table-column>

          <el-table-column label="规格" prop="goodsSpec" width="120">

          </el-table-column>
          <el-table-column label="调入门店库存" prop="inStoreHouseNum" width="120">

          </el-table-column>
          <el-table-column label="调出门店库存" prop="outStoreHouseNum" width="120">

          </el-table-column>
          <el-table-column label="要货数量" prop="num">
            <template slot-scope="scope">
              <el-input v-model="scope.row.num" @keyup.native="judgeNum(scope.row.num,scope.$index)"
                        @afterpaste.native="judgeNum(scope.row.num,scope.$index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="goodsUnit">

          </el-table-column>
          <el-table-column label="单价" prop="price">

          </el-table-column>
          <el-table-column label="金额" prop="sum" width="120px">
          </el-table-column>
          <el-table-column label="备注" prop="remark">
            <template slot-scope="scope">
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
        inputAdress: '',
        outputAdress: '',
        form: {
          tradeNo: '',
          name: '',
          inPutAddress: '',
          outPutAddress: '',
          goodsSkuId: '',
          getGoodsRecordDetails: [{
            number: '',//商品编号
            goodsName: '',//商品名
            goodsSpec: '',//规格
            inStoreHouseNum: '',//调入门店库存
            outStoreHouseNum: '',//调出门店库存
            num: '',//数量
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
      selectOne: function(val1){
        console.log(val1);
        this.inputAdress = val1;
        for(let i=0;i<this.storeIds.length;i++){
          if(this.storeIds[i].id == val1){
            this.form.inPutAddress = this.storeIds[i];
          }
        }
        console.log(this.form.inPutAddress);
      },
      selectTwo(val2){
        this.outputAdress = val2;
        for(let i=0;i<this.storeIds.length;i++){
          if(this.storeIds[i].id == val2){
            this.form.outPutAddress = this.storeIds[i];
          }
        }
      },
      getTradeNumber() {//调拨单号
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token')
        }
        self.httpApi.store.createAllocationRecordNumber(requestData, function (data) {
          let list = data.data;
          self.form.tradeNo = list.tradeNo;
          self.form.name = list.name;
        });
      },
      getGoodsSubmit() {//提交门店调拨单
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          inPutAddress: self.form.inPutAddress,
          outPutAddress: self.form.outPutAddress
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.store.createStoreAllocation(requestData,function (data) {
          self.$router.push('/store/management/allocation/list');
        })
      },
      getStoreList() {//要货门店
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
        }
        self.httpApi.store.storeList(requestData,function (data) {
          self.storeIds = data.data
        })
      },
      judgeNum(value, index) {//判断数量是否为整数
        if (value === '') {
          this.form.getGoodsRecordDetails[index].sum = 0.00;
          return;
        }
        this.form.getGoodsRecordDetails[index].num = value.replace(/\D/g, '');
        this.form.getGoodsRecordDetails[index].sum = "";
        let price = JSON.stringify(this.form.getGoodsRecordDetails[index].num * this.form.getGoodsRecordDetails[index].priceFen);
        let size = price.length;
        price = price.substring(0, size - 2) + "." + price.substring(size - 2, size);
        this.form.getGoodsRecordDetails[index].sum = price;
      },
      querySearchAsync(queryString, cb) {//商品关键字查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          keyword: queryString,
          inPutAddressId: self.form.inPutAddress.id,
          outPutAddressId: self.form.outPutAddress.id
        }
        self.httpApi.store.selectStoreGoodsInfo(requestData, function (data) {
          let list = data.data;
//          if(list){
//            self.$message.message('没有该商品')
//          }
          for (let i = 0, listLength = list.length; i < listLength; i++) {
            list[i].combination = list[i].number + '  ' + list[i].goodsName;
            list[i].sum = '';
          }
          self.goodsInfoList = list;
          // 调用 callback 返回建议列表的数据
          cb(self.goodsInfoList);
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
          goodsSpec: '',//规格
          inStoreHouseNum: '',//调入门店库存
          outStoreHouseNum: '',//调出门店库存
          num: '',//数量
          img: '',
          goodsUnit: '',//单位
          price: '',//价格
          priceFen: '',
          sum: 0,//金额
          combination: '',//编号和名称组合
          goodsSkuId: '',
          remark: '',//备注
        })
      },
      deleteLine(index) {
        this.form.getGoodsRecordDetails.length === 1 ? this.$message('请至少选择一个商品') : this.form.getGoodsRecordDetails.splice(index, 1);
      },
    }
  }
</script>
