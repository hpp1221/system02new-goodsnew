<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">添加出库</h3>
      <el-form ref="form" :model="form" :rules="rules" class="request-form" label-width="80px">
        <el-form-item label="仓库" prop="selfAddress">
          <addressselect @getAddressSelect="getAddressSelect" :selectAllVisible="false"></addressselect>
        </el-form-item>
        <el-form-item label="出库日期">
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            v-model="form.createTime"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="form.selfAddress">
          <el-table :data="form.data" border :span-method="arraySpanMethod">
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
            <el-table-column label="主图" width="80">
              <template slot-scope="scope">
                <img v-lazy="scope.row.url" alt="" style="width: 40px;height: 40px;margin-top: 7px;"
                     v-if="scope.row.url"/>
              </template>
            </el-table-column>
            <el-table-column label="商品编码" width="80">
              <template slot-scope="scope">
                <el-autocomplete
                  v-on:click.native="handleClick(scope.$index)"
                  v-model="scope.row.combination"
                  :trigger-on-focus="false"
                  :fetch-suggestions="querySearchAsync"
                  @select="handleSelect"
                  value-key="combination">
                </el-autocomplete>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" width="80">

            </el-table-column>

            <el-table-column label="规格" prop="goodsSpec">

            </el-table-column>
            <el-table-column label="单位" prop="goodsUnit">

            </el-table-column>
            <el-table-column label="出库数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.num" type="number"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="出库单号" prop="tradeNo">
          {{form.tradeNo}}
        </el-form-item>
        <el-form-item label="出库类型">
          <el-select class="form-input" v-model="form.type" placeholder="选择出库类型">
            <el-option v-for="tt in totalTypes"
                       :label="tt.name"
                       :key="tt.id"
                       :value="tt.id"></el-option>
          </el-select>
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
          type: '',
          selfAddress: '',//仓库
          createTime: '',//出库日期
          tradeNo: '',//出库单号
          data: [{
            url: '',
            goodsNo: '',//商品编号
            goodsName: '',//商品名
            goodsSpec: '',//规格
            goodsUnit: '',
            num: '',
            combination: '',//编号和名称组合
            goodsSkuId: '',//规格id
          }],
          remark: '',//备注
          createUserName: '',//制单人
          tradeNoHandler: '',//经办人
          status: -1,//1是入库,-1是出库
        },
        rules: {
          selfAddress: [
            {required: true, message: '请选择出库仓库'}
          ],
          tradeNo: [
            {required: true, message: '请输入出库单号', trigger: 'change'}
          ],
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        totalTypes: [
          {
            name: '销售出库',
            id: 6
          },
          {
            name: '盘亏',
            id: 8
          },
          {
            name: '采购退回',
            id: 9
          },
          {
            name: '其他出库',
            id: 10
          },
        ],
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
    components: {
      'addressselect': require('../../../components/getaddressselect')
    },
    methods: {
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 3) {
          return [1, 2];
        } else if (columnIndex === 4) {
          return [0, 0];
        }
      },
      getAddressSelect(e){
        this.form.selfAddress = e.address;
      },

      createTradeNo(){
        let str = 'OUT-';
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
              self.$delete(self.form.data[i], 'combination');
            }
            requestData = Object.assign(requestData, self.shallowCopy(self.form));
            self.httpApi.stock.addRecord(requestData, function (data) {
              self.$router.push('/stock/goodsout/list');
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      cancel(){//取消
        this.$router.push('/stock/goodsout/list');
      },

      querySearchAsync(queryString, cb){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          keyword: queryString,
          fromAddress: JSON.stringify(self.form.selfAddress),
        };
        self.httpApi.stock.outPutGoodsInfo(requestData, function (data) {
          let list = data.data;
          for (let i = 0, listLength = list.length; i < listLength; i++) {
            list[i].combination = list[i].goodsNo + list[i].goodsName;
          }
          self.goodsInfoList = list;
          // 调用 callback 返回建议列表的数据
          cb(self.goodsInfoList);
        });
      },

      handleSelect(item){
        this.form.data[this.listIndex] = item;
      },

      handleClick(index){
        this.listIndex = index;
      },

      addLine(){
        this.form.data.push({
          url: '',
          goodsNo: '',//商品编号
          goodsName: '',//商品名
          goodsSpec: '',//规格
          goodsUnit: '',
          num: '',
          combination: '',//编号和名称组合
          goodsSkuId: '',//规格id
        });
      },

      deleteLine(index){
        this.form.data.length === 1 ? this.$message('请至少出库一个商品') : this.form.data.splice(index, 1);
      },
    }
  }
</script>

<style>
</style>
