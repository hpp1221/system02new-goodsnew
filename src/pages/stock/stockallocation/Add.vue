<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">添加库存调拨</h3>
      <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="80px">
        <el-form-item label="调出仓" prop="fromAddress">
          <el-select
            v-model="form.fromAddress"
            value-key="id"
            :loading="addressLoading"
            @visible-change="getAddress">
            <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="调入仓" prop="selfAddress">
          <el-select
            v-model="form.selfAddress"
            value-key="id"
            :loading="addressLoading"
            @visible-change="getAddress">
            <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="调拨时间">
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            v-model="form.createTime"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item v-if="form.selfAddress && form.fromAddress">
          <el-table :data="form.data" border>
            <el-table-column
              type="index"
              width="70"
            >
            </el-table-column>
            <el-table-column width="70">
              <template slot-scope="scope">
                <i class="el-icon-plus" @click="addLine"></i>
                <i class="el-icon-minus" @click="deleteLine(scope.$index)"></i>
              </template>
            </el-table-column>
            <el-table-column label="商品编码  商品名称">
              <template slot-scope="scope">
                <el-autocomplete v-on:click.native="handleClick(scope.$index)" v-model="scope.row.combination"
                                 :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select="handleSelect"
                                 :props="{value:'combination',label:'combination'}">
                </el-autocomplete>
              </template>
            </el-table-column>

            <el-table-column label="规格" prop="goodsSpec">

            </el-table-column>
            <el-table-column label="单位" prop="goodsUnit">

            </el-table-column>
            <el-table-column label="调拨数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.num" type="number"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="调拨单号" prop="tradeNo">
          {{form.tradeNo}}
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark" class="form-input" autosize resize="none"></el-input>
        </el-form-item>
        <el-form-item label="经办人">
          <el-input class="form-input" v-model="form.tradeNoHandler"></el-input>
        </el-form-item>
        <el-form-item label="制单人">
          {{userinfo.name}}
        </el-form-item>
        <el-form-item>
          <el-button @click="save('form')">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        form: {
          fromAddress: '',//调出仓
          selfAddress: '',//调入仓
          createTime: '',//调拨日期
          data: [{
            goodsNo: '',//商品编号
            goodsName: '',//商品名
            goodsSpec: '',//规格
            goodsUnit: '',
            num: '',
            combination: '',//编号和名称组合
            goodsSkuId: '',//规格id
          }],
          tradeNo: '',//入库单号
          remark: '',//备注
          createUserName: '',//制单人
          tradeNoHandler: '',//经办人
          status: 1
        },
        rules: {
          fromAddress: [
            {required: true, message: '请选择调出仓'},
          ],
          selfAddress: [
            {required: true, message: '请选择调出仓'}
          ],
          tradeNo: [
            {required: true, message: '请输入调拨单号', trigger: 'change'}
          ],
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        totalStores: [],
        addressLoading: false,
        goodsInfoList: [],
        listIndex: '',//现在正在添加的某个list的下标
      }
    },
    created(){
      this.createTradeNo();
    },
    computed: {
      'userinfo': function () {
        return JSON.parse(window.localStorage.getItem('userinfo'));
      }
    },
    methods: {
      getAddress(type){//点击时获取地址列表
        if (type && this.totalStores.length === 0) {
          this.addressLoading = true;
          let self = this;
          self.getAddressList(function (data) {
            self.totalStores = data;
            self.addressLoading = false;
          });
        }
      },

      createTradeNo(){//创建调拨单号
        let str = 'DB-';
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1;
        if (month < 10) month = '0' + month;
        let day = nowDate.getDate();
        if (day < 10) day = '0' + day;
        let hour = nowDate.getHours();
        if (hour < 10) hour = '0' + hour;
        let minutes = nowDate.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        let seconds = nowDate.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;
        str = str + year + month + day + hour + minutes + seconds;
        for (let i = 0; i < 6; i++) {
          str += Math.floor(Math.random() * 10);
        }
        this.form.tradeNo = str;
      },
      save(formName){//保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let self = this;
            let requestData = {token: window.localStorage.getItem('token')};
            for (let i = 0; i < self.form.data.length; i++) {
              self.$delete(self.form.data[i], 'combination')
            }
            requestData = Object.assign(requestData, self.shallowCopy(self.form))
            self.httpApi.stock.addAllocationRecord(requestData, function (data) {
              self.$router.push('/stock/stockallocation/list');
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleSelect(item){
        this.form.data[this.listIndex] = item
      },
      handleClick(index){
        this.listIndex = index
      },
      querySearchAsync(queryString, cb){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          keyword: queryString,
          fromAddress: JSON.stringify(self.form.fromAddress)
        };
        self.httpApi.stock.goodsInfo(requestData, function (data) {
          let list = data.data
          for (let i = 0, listLength = list.length; i < listLength; i++) {
            list[i].combination = list[i].goodsNo + list[i].goodsName
          }
          self.goodsInfoList = list
          // 调用 callback 返回建议列表的数据
          cb(self.goodsInfoList);
        });
      },
      cancel(){//取消
        this.$router.push('/stock/stockallocation/list')
      },
      addLine(){
        this.form.data.push({
          goodsNo: '',//商品编号
          goodsName: '',//商品名
          goodsSpec: '',//规格
          goodsUnit: '',
          num: '',
          combination: '',//编号和名称组合
          goodsSkuId: '',//规格id
        })
      },
      deleteLine(index){
        this.form.data.length === 1 ? this.$message('请至少调拨一个商品') : this.form.data.splice(index, 1)
      },
    }
  }
</script>
