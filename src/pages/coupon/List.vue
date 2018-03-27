<template>
  <div class="container">
    <div class="wrapper">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" class="menuline">优惠券配置</el-menu-item>
        <el-menu-item index="2" class="menuline">金额规则配置</el-menu-item>
        <el-menu-item index="3" class="menuline">品类规则配置</el-menu-item>
      </el-menu>
      <!--  -------------------  优惠券配置部分 start --------------------------------------->
      <el-form ref="formCoupon" v-if="activeIndex === '1'" :model="formCoupon" inline class="couponselect"
               label-width="100px">
        <el-form-item label="优惠券ID">
          <el-input v-model="formCoupon.id" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="优惠券名称">
          <el-autocomplete
            v-model="formCoupon.name"
            :fetch-suggestions="querySearchAsyncCoupon"
            placeholder="单行输入"
            @select="handleSelect"
          >
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="addButtonAndSelect">
          <el-button @click="select">查询</el-button>
          <el-button @click="couponAdd">新增</el-button>
        </el-form-item>
        <br>
        <el-table
          :data="tableDataCoupon"
          border
          style="width: 75%">
          <el-table-column
            prop="couponId"
            label="优惠券ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="优惠券名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address1"
            label="优惠券规则">
          </el-table-column>
          <el-table-column
            prop="address1"
            label="金额规则">
          </el-table-column>
          <el-table-column
            prop="address1"
            label="有效期">
          </el-table-column>
        </el-table>
      </el-form>
      <!--新增弹框-->
      <el-dialog title="新增优惠券配置" :visible.sync="dialogFormVisibleCoupon">
        <el-form :model="formCouponAdd">
          <el-form-item label="优惠券名称" :label-width="formLabelWidth">
            <el-input v-model="formCouponAdd.name" auto-complete="off" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="优惠券规则" :label-width="formLabelWidth">
            <el-radio v-model="formCouponAdd.radioCoupon" label="1">品类规则</el-radio>
            <el-radio v-model="formCouponAdd.radioCoupon" label="2">品牌规则</el-radio>
            <el-radio v-model="formCouponAdd.radioCoupon" label="3">通用规则</el-radio>
          </el-form-item>
          <el-form-item label="品类规则" :label-width="formLabelWidth" v-if="formCouponAdd.radioCoupon === '1'||formCouponAdd.radioCoupon === '3'">
            <el-select v-model="formCouponAdd.region" placeholder="请选择" class="form-input">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌规则" :label-width="formLabelWidth" v-if="formCouponAdd.radioCoupon === '2'||formCouponAdd.radioCoupon === '3'">
            <el-select v-model="formCouponAdd.region" placeholder="请选择" class="form-input">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额规则" :label-width="formLabelWidth">
            <el-select v-model="formCouponAdd.region" placeholder="请选择" class="form-input">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效期规则" :label-width="formLabelWidth">
            <el-radio v-model="formCouponAdd.radioTime" label="1">固定时间段</el-radio>
            <el-radio v-model="formCouponAdd.radioTime" label="2">固定天数</el-radio>
          </el-form-item>
          <el-form-item label="有效期" :label-width="formLabelWidth" v-if="formCouponAdd.radioTime === '1'">
            <el-date-picker
              v-model="formCouponAdd.time"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="有效期" :label-width="formLabelWidth" v-if="formCouponAdd.radioTime === '2'">
            <el-input v-model="formCouponAdd.name" auto-complete="off" class="form-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleCoupon = false">取 消</el-button>
          <el-button type="primary" @click="couponAddSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--  -------------------  优惠券配置部分 end--------------------------------------->
      <!--  -------------------  金额规则配置部分 start --------------------------------------->
      <el-form ref="formMoney" v-if="activeIndex === '2'" :model="formMoney" inline class="couponselect"
               label-width="100px">
        <el-form-item label="规则名称">
          <el-autocomplete
            v-model="formMoney.name"
            :fetch-suggestions="querySearchAsync"
            placeholder="单行输入"
            @select="handleSelect"
          >
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="优惠类型">
          <el-select v-model="formMoney.type" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="addButtonAndSelect">
          <el-button @click="select">查询</el-button>
          <el-button @click="moneyAdd">新增</el-button>
        </el-form-item>
        <br>
        <el-table
          :data="tableDataMoney"
          border
          style="width: 75%">
          <el-table-column
            prop="couponId"
            label="规则名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="优惠类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address1"
            label="优惠金额">
          </el-table-column>
          <el-table-column
            prop="address1"
            label="计算金额">
          </el-table-column>
          <el-table-column
            prop="address1"
            label="创建时间">
          </el-table-column>
        </el-table>
      </el-form>
      <!--新增弹框-->
      <el-dialog title="新增金额规则配置" :visible.sync="dialogFormVisibleMoney">
        <el-form :model="formMoneyAdd">
          <el-form-item label="规则名称" :label-width="formLabelWidth">
            <el-input v-model="formMoneyAdd.name" auto-complete="off" class="form-input" placeholder="单行输入"></el-input>
          </el-form-item>
          <el-form-item label="优惠类型" :label-width="formLabelWidth">
            <el-select v-model="formMoneyAdd.type" placeholder="请选择" class="form-input">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <!--根据选择的优惠类型来显示不同的设置-->
          <el-form-item :label-width="formLabelWidth">
            <span>满</span>
            <el-input v-model="formMoneyAdd.name" auto-complete="off" style="width: 130px;"></el-input>
            <span>减</span>
            <el-input v-model="formMoneyAdd.name" auto-complete="off" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <span>立减</span>
            <el-input v-model="formMoneyAdd.name" auto-complete="off" style="width: 270px;"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <span>折扣</span>
            <el-input v-model="formMoneyAdd.name" auto-complete="off" style="width: 270px;"></el-input>
          </el-form-item>
          <el-form-item label="计算金额" :label-width="formLabelWidth">
            <el-select v-model="formMoneyAdd.region" placeholder="请选择" class="form-input">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleMoney = false">取 消</el-button>
          <el-button type="primary" @click="moneyAddSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--  -------------------  金额规则配置部分 end--------------------------------------->
      <!--  -------------------  品类规则配置部分 start --------------------------------------->
      <el-form ref="formCategory" v-if="activeIndex === '3'" :model="formCategory" inline class="couponselect"
               label-width="100px">
        <el-form-item label="规则名称">
          <el-autocomplete
            v-model="formCategory.name"
            :fetch-suggestions="querySearchAsync"
            placeholder="单行输入"
            @select="handleSelect"
          >
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="addButtonAndSelect">
          <el-button @click="select">查询</el-button>
          <el-button @click="categoryAdd">新增</el-button>
        </el-form-item>
        <br>
        <el-table
          :data="tableDataCategory"
          border
          style="width: 50%">
          <el-table-column
            prop="couponId"
            label="组合名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="品类"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="address1"
            label="创建时间"
          >
          </el-table-column>
        </el-table>
      </el-form>
      <!--新增弹框-->
      <el-dialog title="新增品类规则配置" :visible.sync="dialogFormVisibleCategory">
        <el-form :model="formCategoryAdd">
          <el-form-item label="组合名称" :label-width="formLabelWidth">
            <el-input v-model="formCategoryAdd.name" auto-complete="off" class="form-input"
                      placeholder="单行输入"></el-input>
          </el-form-item>
          <el-form-item label="品类" :label-width="formLabelWidth">
            <el-button @click="addOneAnnex">添加</el-button>
          </el-form-item>
          <div v-for="(item,index) in formCategoryAdd.class" :key="item.value" class="createClass">
            <i class="el-icon-minus" @click="deleteOneAnnex(index)"></i>
            <el-select v-model="item.name" placeholder="请选择" class="form-input">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </div>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleCategory = false">取 消</el-button>
          <el-button type="primary" @click="categoryAddSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--  -------------------  品类规则配置部分 end--------------------------------------->
    </div>
  </div>
</template>
<script>
  export default {

    data() {
      return {
        activeIndex: '1',//菜单切换
        /*优惠券配置部分 start*/
        tableDataCoupon: [],//优惠券list
        formCoupon: {//优惠券搜索条件form
          id: '',//优惠券ID
          name: '',//优惠券名称
        },
        dialogFormVisibleCoupon: false,//优惠券新增弹框
        formLabelWidth: '120px',
        formCouponAdd: {//优惠券新增form
          name: '',
          region: '',
          time: '',
          radioCoupon: '1',//优惠券规则
          radioTime: '1',//有效期规则
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        /*优惠券配置部分 end*/
        /*金额规则配置部分 start*/
        tableDataMoney: [],//金额规则list
        formMoney: {//金额规则搜索条件form
          name: '',//规格名称
          type: '',//优惠类型
        },
        dialogFormVisibleMoney: false,//金额规则新增弹框
        formMoneyAdd: {//金额规则新增form
          name: '',
          region: '',
          time: '',
        },
        /*金额规则配置部分 end*/
        /*品类规则配置部分 start*/
        tableDataCategory: [],//品类规则list
        formCategory: {//品类规则搜索条件form
          name: '',//组合名称
        },
        dialogFormVisibleCategory: false,//品类规则新增弹框
        formCategoryAdd: {//品类规则新增form
          name: '',
          type: '',
          class: [],//添加的总品类
        },

        /*品类规则配置部分 end*/
      }
    },
    mounted() {
      this.restaurants = this.loadAll();//从服务器获取数据输入框搜索
    },
    methods: {
      /*  -------------------  优惠券配置部分 start -------------------------------*/
      loadAll() {//从服务器获取数据输入框搜索
        return this.tableDataCoupon;
        // return this.tableDataMoney;
        // return this.tableDataCategory;
      },
      querySearchAsyncCoupon(queryString, cb) {//输入框过滤
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {//以服务器数组的对象中的value进行
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handleSelect(key, keyPath) {//以keyPath进行菜单切换的回调
        this.activeIndex = key;
      },
      select() {//简单查询

      },
      couponAdd() {//优惠券新增弹框
        this.dialogFormVisibleCoupon = true;
      },
      couponAddSure() {//优惠券新增确定

      },
      /*  -------------------  优惠券配置部分 end -------------------------------*/
      /*  -------------------  金额规则配置部分 start -------------------------------*/
      querySearchAsync(queryString, cb) {//输入框过滤
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      moneyAdd() {//金额规则新增弹框
        this.dialogFormVisibleMoney = true;
      },
      moneyAddSure() {//金额规则弹窗确定

      },
      /*  -------------------  金额规则配置部分 end -------------------------------*/
      /*  -------------------  品类规则配置部分 start -------------------------------*/
      categoryAdd() {//品类规则新增弹框
        this.dialogFormVisibleCategory = true;
      },
      categoryAddSure() {//品类规则新增确定

      },
      addOneAnnex() {//新增品类规则中的添加类目
        this.formCategoryAdd.class.push({name: ''});
      },
      deleteOneAnnex(index) {//删除一个类目
        this.formCategoryAdd.class.splice(index, 1);
      },
      /*  -------------------  品类规则配置部分 end -------------------------------*/

    },
  }
</script>

