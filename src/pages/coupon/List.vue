<template>
  <div class="container">
    <div class="wrapper">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" class="menuline">优惠券配置</el-menu-item>
        <el-menu-item index="2" class="menuline">金额规则配置</el-menu-item>
        <el-menu-item index="3" class="menuline">品类规则配置</el-menu-item>
      </el-menu>
      <!--  -------------------  优惠券配置部分 start --------------------------------------->
      <el-form ref="formCoupon" v-if="activeIndex === '1'" key="formCoupon" :model="formCoupon" inline
               class="couponselect"
               label-width="100px">
        <el-form-item label="优惠券ID">
          <el-input v-model="formCoupon.id" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="优惠券名称">
          <el-input v-model="formCoupon.name" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item class="addButtonAndSelect">
          <el-button @click="selectCoupon(pageSize,pageNum)">查询</el-button>
          <el-button @click="couponAdd">新增</el-button>
        </el-form-item>
        <br>
        <el-table
          :data="tableDataCoupon"
          border
          style="width: 75%">
          <el-table-column
            prop="id"
            label="优惠券ID"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="优惠券名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="type"
            label="优惠券规则">
            <template slot-scope="scope">
              <span v-if="scope.row.type === 'brand'">品牌规则</span>
              <span v-if="scope.row.type === 'category'">品类规则</span>
              <span v-if="scope.row.type === 'brand_and_category'">品牌和品类规则</span>
              <span v-if="scope.row.type === 'all'">通用券</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="amountRuleId"
            label="金额规则">
            <template slot-scope="scope">
              <span v-for="item in tableDataMoney" :key="item.id" v-if="scope.row.amountRuleId === item.id">{{item.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="days"
            label="有效期"
            width="350">
            <template slot-scope="scope">
              <span v-if="scope.row.dateRuleType === 'time-interval'">{{moment(scope.row.startTime).format('YYYY-MM-DD HH:mm:ss')}}--{{moment(scope.row.endTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
              <span v-if="scope.row.dateRuleType === 'fixed-days'">{{scope.row.days + '     ' + '天'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 0">禁用状态</span>
              <span v-if="scope.row.status === 1">启用状态</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <i class="iconfont icon-more" style="cursor: pointer"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="updateCoupon(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteCoupon(scope.row.id)">删除</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.status === 1" @click.native="close(scope.row)">禁用
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.status === 0" @click.native="open(scope.row)">启用
                  </el-dropdown-item>
                  <!--<el-dropdown-item>删除</el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <pagination @setChanged="pageChanged" :totalPage="totalPageCoupon"></pagination>
      </el-form>
      <!--新增弹框-->
      <el-dialog title="新增优惠券配置" :visible.sync="dialogFormVisibleCoupon">
        <el-form :model="formCouponAdd">
          <el-form-item label="优惠券名称" :label-width="formLabelWidth">
            <el-input v-model="formCouponAdd.name" auto-complete="off" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="优惠券规则" :label-width="formLabelWidth">
            <el-radio v-for="item in couponRules" :key="item.value" :label="item.value" v-model="formCouponAdd.type">
              {{item.name}}
            </el-radio>
          </el-form-item>
          <el-form-item label="品类规则" :label-width="formLabelWidth"
                        v-if="formCouponAdd.type === 'category'|| formCouponAdd.type === 'brand_and_category'">
            <el-select placeholder="请选择" class="form-input" filterable v-model="formCouponAdd.categoryRuleName"
                       @change="getCategoryRule">
              <el-option v-for="item in tableDataCategory" :key="item.id" :label="item.name"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌规则" :label-width="formLabelWidth"
                        v-if="formCouponAdd.type === 'brand'|| formCouponAdd.type === 'brand_and_category'">
            <brandselect @getBrandSelect="getBrandSelect" style="width:300px;"></brandselect>
          </el-form-item>
          <el-form-item label="金额规则" :label-width="formLabelWidth">
            <el-select v-model="formCouponAdd.amountRuleName" filterable placeholder="请选择" class="form-input"
                       @change="getMoneyRules">
              <el-option v-for="item in tableDataMoney" :key="item.id" :label="item.name" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效期规则" :label-width="formLabelWidth">
            <el-radio v-for="item in validTypes" :key="item.value" v-model="formCouponAdd.dateRuleType"
                      :label="item.value">{{item.name}}
            </el-radio>
          </el-form-item>
          <el-form-item label="有效期" :label-width="formLabelWidth" v-if="formCouponAdd.dateRuleType === 'time-interval'">
            <el-date-picker
              v-model="formCouponAdd.fixTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="有效期" :label-width="formLabelWidth" v-if="formCouponAdd.dateRuleType === 'fixed-days'">
            <el-input v-model="formCouponAdd.days" auto-complete="off" class="form-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleCoupon = false">取 消</el-button>
          <el-button type="primary" @click="couponAddSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改优惠券配置" :visible.sync="dialogFormVisibleCouponUpdate">
        <el-form :model="formCouponUpdate">
          <el-form-item label="优惠券名称" :label-width="formLabelWidth">
            <el-input v-model="formCouponUpdate.name" auto-complete="off" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="优惠券规则" :label-width="formLabelWidth">
            <el-radio v-for="item in couponRules" disabled :key="item.value" :label="item.value"
                      v-model="formCouponUpdate.type">
              {{item.name}}
            </el-radio>
          </el-form-item>
          <el-form-item label="品类规则" :label-width="formLabelWidth"
                        v-if="formCouponUpdate.type === 'category'|| formCouponUpdate.type === 'brand_and_category'">
            <el-select v-model="formCouponUpdate.categoryRuleName" filterable placeholder="请选择" class="form-input"
                       @change="updateCouponCatRule">
              <el-option v-for="item in tableDataCategoryAll" :key="item.id" :label="item.name"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌规则" :label-width="formLabelWidth"
                        v-if="formCouponUpdate.type === 'brand'|| formCouponUpdate.type === 'brand_and_category'">
            <el-select v-model="formCouponUpdate.brandRuleName" filterable placeholder="请选择" class="form-input"
                       @change="updateCouponBrandRule">
              <el-option v-for="item in couponBrandList" :key="item.brandDealerId" :label="item.name"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额规则" :label-width="formLabelWidth">
            <el-select v-model="formCouponUpdate.amountRuleId" filterable placeholder="请选择" class="form-input"
            >
              <el-option v-for="item in tableDataMoneyAll" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效期规则" :label-width="formLabelWidth">
            <el-radio v-for="item in validTypes" disabled :key="item.value" v-model="formCouponUpdate.dateRuleType"
                      :label="item.value">{{item.name}}
            </el-radio>
          </el-form-item>
          <el-form-item label="有效期" :label-width="formLabelWidth"
                        v-if="formCouponUpdate.dateRuleType === 'time-interval'">
            <el-date-picker
              @change="getFixedTime"
              v-model="fixTime"
              :clearable="false"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="有效期" :label-width="formLabelWidth" v-if="formCouponUpdate.dateRuleType === 'fixed-days'">
            <el-input v-model="formCouponUpdate.days" auto-complete="off" class="form-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="couponUpdateCancel">取 消</el-button>
          <el-button type="primary" @click="couponUpdateSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--  -------------------  优惠券配置部分 end--------------------------------------->
      <!--  -------------------  金额规则配置部分 start --------------------------------------->
      <el-form ref="formMoney" v-if="activeIndex === '2'" key="formMoney" :model="formMoney" inline class="couponselect"
               label-width="100px">
        <el-form-item label="规则名称">
          <el-input v-model="formMoney.name" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="优惠类型">
          <el-select v-model="formMoney.type" placeholder="请选择" class="form-input">
            <el-option v-for="ite in couponTypes" :key="ite.value" :value="ite.value" :label="ite.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="addButtonAndSelect">
          <el-button @click="selectMoney(pageSize,pageNum)">查询</el-button>
          <el-button @click="moneyAdd">新增</el-button>
        </el-form-item>
        <br>
        <el-table
          :data="tableDataMoney"
          border
          style="width: 75%">
          <el-table-column
            prop="name"
            label="规则名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="优惠类型"
            width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.type === 'minus'">立减</span>
              <span v-if="scope.row.type === 'full-cut'">满减</span>
              <span v-if="scope.row.type === 'discount'">折扣</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="deduction"
            label="优惠金额">
          </el-table-column>
          <el-table-column
            prop="total"
            label="满减上限额度">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
            <template slot-scope="scope">
              {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <i class="iconfont icon-more" style="cursor: pointer"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="updateMoney(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteMoney(scope.row.id)">删除</el-dropdown-item>
                  <!--<el-dropdown-item>删除</el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <pagination @setChanged="pageChanged" :totalPage="totalPageMoney"></pagination>
      </el-form>
      <!--新增弹框-->
      <el-dialog title="新增金额规则配置" :visible.sync="dialogFormVisibleMoney">
        <el-form :model="formMoneyAdd">
          <el-form-item label="规则名称" :label-width="formLabelWidth">
            <el-input v-model="formMoneyAdd.name" auto-complete="off" class="form-input" placeholder="单行输入"></el-input>
          </el-form-item>

          <el-form-item label="优惠类型" :label-width="formLabelWidth">
            <el-select v-model="formMoneyAdd.type" placeholder="请选择" class="form-input">
              <el-option v-for="ite in couponTypes" :key="ite.value" :value="ite.value" :label="ite.name"></el-option>
            </el-select>
          </el-form-item>
          <!--根据选择的优惠类型来显示不同的设置-->
          <el-form-item label="满减" :label-width="formLabelWidth" v-if="formMoneyAdd.type === 'full-cut'">
            <span>满</span>
            <el-input v-model="formMoneyAdd.amount" auto-complete="off" style="width: 130px;"></el-input>
            <span>减</span>
            <el-input v-model="formMoneyAdd.deduction" auto-complete="off" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item label="立减" :label-width="formLabelWidth" v-if="formMoneyAdd.type=== 'minus'">
            <el-input v-model="formMoneyAdd.deduction" auto-complete="off" style="width: 270px;"></el-input>
          </el-form-item>
          <el-form-item label="折扣" :label-width="formLabelWidth" v-if="formMoneyAdd.type=== 'discount'">
            <el-input v-model="formMoneyAdd.deduction" auto-complete="off" style="width: 270px;"></el-input>
          </el-form-item>
          <el-form-item label="满减上限额度" :label-width="formLabelWidth">
            <el-input v-model="formMoneyAdd.total" style="width: 300px;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleMoney = false">取 消</el-button>
          <el-button type="primary" @click="moneyAddSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改金额规则配置" :visible.sync="dialogFormVisibleMoneyUpdate">
        <el-form :model="formMoneyUpdate">
          <el-form-item label="规则名称" :label-width="formLabelWidth">
            <el-input v-model="formMoneyUpdate.name" auto-complete="off" class="form-input"
                      placeholder="单行输入"></el-input>
          </el-form-item>

          <el-form-item label="优惠类型" :label-width="formLabelWidth">
            <el-select :disabled="true" v-for="ite1 in couponTypes" :key="ite1.value"
                       v-if="formMoneyUpdate.type === ite1.value" v-model="ite1.name" placeholder="请选择"
                       class="form-input">
              <el-option v-for="ite in couponTypes" :key="ite.value" :value="ite.value" :label="ite.name"></el-option>
            </el-select>
          </el-form-item>
          <!--根据选择的优惠类型来显示不同的设置-->
          <el-form-item label="满减" :label-width="formLabelWidth" v-if="formMoneyUpdate.type === 'full-cut'">
            <span>满</span>
            <el-input v-model="formMoneyUpdate.amount" auto-complete="off" style="width: 130px;"></el-input>
            <span>减</span>
            <el-input v-model="formMoneyUpdate.deduction" auto-complete="off" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item label="立减" :label-width="formLabelWidth" v-if="formMoneyUpdate.type === 'minus'">
            <el-input v-model="formMoneyUpdate.deduction" auto-complete="off" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="折扣" :label-width="formLabelWidth" v-if="formMoneyUpdate.type === 'discount'">
            <el-input v-model="formMoneyUpdate.deduction" auto-complete="off" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="满减上限额度" :label-width="formLabelWidth">
            <el-input v-model="formMoneyUpdate.total" class="form-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="moneyUpdateCancel">取 消</el-button>
          <el-button type="primary" @click="moneyUpdateSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--  -------------------  金额规则配置部分 end--------------------------------------->
      <!--  -------------------  品类规则配置部分 start --------------------------------------->
      <el-form ref="formCategory" v-if="activeIndex === '3'" key="formCategory" :model="formCategory" inline
               class="couponselect"
               label-width="100px">
        <el-form-item label="规则名称">
          <el-input v-model="formCategory.name" placeholder="单行输入">
          </el-input>
        </el-form-item>
        <el-form-item class="addButtonAndSelect">
          <el-button @click="selectCategory(pageSize,pageNum)">查询</el-button>
          <el-button @click="categoryAdd">新增</el-button>
        </el-form-item>
        <br>
        <el-table
          :data="tableDataCategory"
          border
          style="width: 50%">
          <el-table-column
            prop="name"
            label="组合名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="categoryNames"
            label="品类"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
          >
            <template slot-scope="scope">
              {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <i class="iconfont icon-more" style="cursor: pointer"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="updateCategory(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteCategory(scope.row.id)">删除</el-dropdown-item>
                  <!--<el-dropdown-item>删除</el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <pagination @setChanged="pageChanged" :totalPage="totalPageCategory"></pagination>
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
          <div v-for="(item,index) in formCategoryAdd.class" :key="index" class="createClass">
            <i class="el-icon-minus" @click="deleteOneAnnex(index)"></i>
            <el-cascader
              :options="totalCatList"
              v-if="totalCatList.length > 0"
              v-model="item.cat"
              @active-item-change="getCatList"
              :show-all-levels="false"
              @change="getCat(item,index)"
              clearable
              :props="props"
              style="width:300px;"
            >
            </el-cascader>
            <!--<catselect @getCatSelect="getCatSelect" style="width:300px;"></catselect>-->
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleCategory = false">取 消</el-button>
          <el-button type="primary" @click="categoryAddSure">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改品类规则配置" :visible.sync="dialogFormVisibleCategoryUpdate">
        <el-form :model="formCategoryUpdate" v-if="formCategoryUpdate.id">
          <el-form-item label="组合名称" :label-width="formLabelWidth">
            <el-input v-model="formCategoryUpdate.name" auto-complete="off" class="form-input"
                      placeholder="单行输入"></el-input>
          </el-form-item>
          <div v-if="IdsList.length > 0" v-for="(it,index) in IdsList" :key="index" style="margin-left: 100px;">
            <i class="el-icon-minus" @click="deleteOneUpdate(index)"></i>
            <el-cascader
              :options="totalCatListAll"
              v-if="totalCatListAll.length > 0"
              :show-all-levels="false"
              v-model="it.ids"
              @change="getUpdateCatSelect(it.ids,index)"
              style="width:300px;margin-bottom: 20px;">
            </el-cascader>
          </div>
         <!-- <div v-for="item in classUpdate" :key="item.id" class="createClass">
            <i class="el-icon-minus" @click="deleteOneUpdate(index)"></i>
            <el-cascader
              :options="totalCatListUpdate"
              v-if="totalCatListUpdate.length > 0"
              v-model="item.cat"
              @active-item-change="getCatListUpdate"
              :show-all-levels="false"
              @change="getCatUpdate(item)"
              clearable
              :props="props"
              style="width:300px;"
            >
            </el-cascader>
          </div>
          <el-button @click="addOneUpdate" style="margin-left: 220px;">添加</el-button>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="categoryUpdateCancel">取 消</el-button>
          <el-button type="primary" @click="categoryUpdateSure">确 定</el-button>
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
        IdsList: [],
        activeIndex: '1',//菜单切换
        /*优惠券配置部分 start*/
        tableDataCoupon: [],//优惠券list
        formCoupon: {//优惠券搜索条件form
          id: '',//优惠券ID
          name: '',//优惠券名称
        },
        dialogFormVisibleCoupon: false,//优惠券新增弹框
        dialogFormVisibleCouponUpdate: false,//优惠券修改弹框
        formLabelWidth: '120px',
        fixTime: ['', ''],
        formCouponAdd: {//优惠券新增form
          name: '',//优惠券名称
          type: '',//优惠券规则
          dateRuleType: '',//有效期规则
          days: '',//有效天数
          fixTime: ['', ''],//固定时间
          startTime: '',//开始时间
          endTime: '',//结束时间
          amountRuleId: '',//金额规则id
          amountRuleName: '',//金额规则name
          brand: '',
          brandRuleId: '',
          brandRuleName: '',
          cat: '',
          categoryRuleName: '',
          categoryRuleId: '',
        },
        formCouponUpdate: {//优惠券修改form
          id: '',
          name: '',//优惠券名称
          type: '',//优惠券规则
          dateRuleType: '',//有效期规则
          days: '',//有效天数
          fixTime: [],//固定时间
          startTime: '',//开始时间
          endTime: '',//结束时间
          amountRuleId: '',//金额规则id
          amountRuleName: '',//金额规则name
          brandRuleId: '',
          brandRuleName: '',
          categoryRuleName: '',
          categoryRuleId: '',
        },
        couponRules: [],//优惠券规则select
        validTypes: [],//有效期
        couponBrandList: [],//品牌列表
        /*优惠券配置部分 end*/
        /*金额规则配置部分 start*/
        tableDataMoney: [],//金额规则list
        tableDataMoneyAll: [],//金额规则list不分页
        formMoney: {//金额规则搜索条件form
          name: '',//规格名称
          type: '',//优惠类型
        },
        dialogFormVisibleMoney: false,//金额规则新增弹框
        dialogFormVisibleMoneyUpdate: false,//金额规则修改弹框
        formMoneyAdd: {//金额规则新增form
          name: '',//金额规则类型name
          type: '',//金额优惠类型
          amount: '',//满足条件的 金额
          deduction: '',//满多少减多少的减多少或者立减或者折扣
          total: '',//计算金额
        },
        formMoneyUpdate: {//金额规则修改form
          name: '',//金额规则类型name
          type: '',//金额优惠类型
          amount: '',//满足条件的 金额
          deduction: '',//满多少减多少的减多少或者立减或者折扣
          total: '',//计算金额
        },
        couponTypes: [],//优惠类型
        /*金额规则配置部分 end*/
        /*品类规则配置部分 start*/
        tableDataCategory: [],//品类规则list
        tableDataCategoryAll: [],//品类规则list不分页
        formCategory: {//品类规则搜索条件form
          name: '',//组合名称
        },
        dialogFormVisibleCategory: false,//品类规则新增弹框
        dialogFormVisibleCategoryUpdate: false,//品类规则修改弹框
        formCategoryAdd: {
          name: '',
          cat: [],
          catId: [],
          catName: [],
          class: [],//添加的总品类
        },//品类规则新增form
        formCategoryUpdate: {
          name: '',
          id: '',
          categoryIds: '',
          categoryNames: '',
        },//品类规则修改form
/*        classUpdate:[],*/
        formCategoryUpdateSure: {
          ids: [],
          names: []
        },
        cat: [],
        catUpdateSure: [],
        totalCatList: [],
        totalCatListAll: [],
 /*       totalCatListUpdate: [],*/
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        outCat: {id: "2", name: '婴幼儿奶粉'},
        /*品类规则配置部分 end*/
        pageSize: 5,
        pageNum: 1,
        totalPageCoupon: 10,
        totalPageMoney: 10,
        totalPageCategory: 10,
      }
    },
    components: {
      'pagination': require('../../components/pagination'),
      'catselect': require('../../components/getcatselectupdate'),
      'catselect': require('../../components/getcatselect'),
      'brandselect': require('../../components/getbrandselect'),
    },
    activated() {
      this.selectCategory(localStorage.getItem('pageSizeList'), localStorage.getItem('pageNumList'));
    },
    created() {
      this.getMoneyType();
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        localStorage.setItem('pageSizeList', page.size);
        localStorage.setItem('pageNumList', page.num);
        this.selectCategory(page.size, page.num);
        this.selectMoney(page.size, page.num);
        this.selectCoupon(page.size, page.num);
      },
      handleSelect(key, keyPath) {//以keyPath进行菜单切换的回调
        this.activeIndex = key;
      },
      /*  -------------------  优惠券配置部分 start -------------------------------*/
      getCouponType() {
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'coupon_rule'}, function (data) {
          self.couponRules = data.data.list;
        })
      },//优惠券规则
      getValidTypes() {
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'coupon_date_rule'}, function (data) {
          self.validTypes = data.data.list;
        })
      },//有效期
      getBrandSelect(e) {
        this.formCouponAdd.brandRuleId = e.brandDealerId;
        this.formCouponAdd.brandRuleName = e.brandName;
      },//品牌
      getBrandSelectList() {
        let self = this;
        let requestData = {}
        self.httpApi.brand.selectBrandDealerAllList(requestData, function (data) {
          self.couponBrandList = data.data.list;
          console.log('self.couponBrandList', self.couponBrandList)
        });//获取品牌列表
      },//品牌列表
      getCatSelectCoupon(ee) {
        this.formCouponAdd.categoryRuleName = ee.catName;
        this.formCouponAdd.categoryRuleId = ee.catId;
      },//分类
      getMoneyRules(val) {
        console.log('money--44', val);
        this.formCouponAdd.amountRuleId = val.id;
        this.formCouponAdd.amountRuleName = val.name;
      },//选择好的金额规则id和name
      getCategoryRule(val) {
        this.formCouponAdd.categoryRuleId = val.id;
        this.formCouponAdd.categoryRuleName = val.name;
      },//新增中品类select
      couponAdd() {
        this.dialogFormVisibleCoupon = true;
        this.formCouponAdd = {//优惠券新增form
          name: '',//优惠券名称
          type: '',//优惠券规则
          dateRuleType: '',//有效期规则
          days: '',//有效天数
          fixTime: null,//固定时间
          startTime: '',//开始时间
          endTime: '',//结束时间
          amountRuleId: '',//金额规则id
          brandRuleId: '',
          brandRuleName: '',
          categoryRuleName: '',
          categoryRuleId: '',
        };
        this.getCouponType();//优惠券规则
        this.getValidTypes();//有效期
      },//优惠券新增弹框
      couponAddSure() {
        let self = this;
        self.formCouponAdd.startTime = self.formCouponAdd.fixTime === null ? '' : self.formCouponAdd.fixTime[0];
        self.formCouponAdd.endTime = self.formCouponAdd.fixTime === null ? '' : self.formCouponAdd.fixTime[1];
        self.httpApi.coupon.addCoupon(self.formCouponAdd, function (data) {
          self.dialogFormVisibleCoupon = false;
          self.$message.success('新增成功');
          self.selectCoupon(self.pageSize, self.pageNum);
        })
      },//优惠券新增确定
      selectCoupon(size, num) {
        let self = this;
        let requestData = {
          pageNo: num,
          pageSize: size,
          name: self.formCoupon.name,
          id: self.formCoupon.id,
        }
        self.httpApi.coupon.selectCouponList(requestData, function (data) {
          self.tableDataCoupon = data.data.pageInfo.list;
          self.totalPageCoupon = data.data.pageInfo.total;
        })
      },//优惠券查询列表
      updateCoupon(row) {
        this.dialogFormVisibleCouponUpdate = true;
        this.formCouponUpdate = row;
        let arr = [];
        arr.push(row.startTime);
        arr.push(row.endTime);
        this.fixTime = arr;
        this.getCouponType();
        this.getValidTypes();
        this.getBrandSelectList();
        this.selectCategoryAll();
        this.selectMoneyAll();
      },//打开修改弹框
      updateCouponCatRule(val) {
        this.formCouponUpdate.categoryRuleName = val.name;
        this.formCouponUpdate.categoryRuleId = val.id;
      },//修改品类规则
      updateCouponBrandRule(val) {
        this.formCouponUpdate.brandRuleName = val.name;
        this.formCouponUpdate.brandRuleId = val.brandDealerId;
      },//修改品牌规则
      updateCouponMoneyRule(val) {
        this.formCouponUpdate.amountRuleName = val.name;
        this.formCouponUpdate.amountRuleId = val.id;
        console.log("money", val);
      },//修改金额规则
      getFixedTime() {//时间日期选择器回调修改
        this.formCouponUpdate.startTime = this.fixTime[0];
        this.formCouponUpdate.endTime = this.fixTime[1];
      },
      couponUpdateSure() {
        let self = this;
        self.httpApi.coupon.updateCoupon(self.formCouponUpdate, function (data) {
          self.dialogFormVisibleCouponUpdate = false;
          self.$message.success('修改成功');
          self.selectCoupon(self.pageSize, self.pageNum);
        })
      },//修改确定
      couponUpdateCancel() {
        this.dialogFormVisibleCouponUpdate = false;
        this.selectCoupon(this.pageSize, this.pageNum);
      },//修改取消
      deleteCoupon(id) {
        let self = this;
        let requestData = {
          id: id,
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.coupon.deleteCoupon(requestData, function (data) {
            self.$message.success('删除成功');
            self.selectCoupon(self.pageSize, self.pageNum);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },//删除
      close(row) {
        let self = this;
        let requestData = {
          status: 0,
          id: row.id,
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.coupon.updateCouponStatus(requestData, function (data) {
            self.$message.success('已禁用');
            self.selectCoupon(self.pageSize, self.pageNum);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });
        });
      },//修改优惠券状态--禁用
      open(row) {
        let self = this;
        let requestData = {
          status: 1,
          id: row.id,
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.coupon.updateCouponStatus(requestData, function (data) {
            self.$message.success('已启用');
            self.selectCoupon(self.pageSize, self.pageNum);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启用'
          });
        });
      },//修改优惠券状态-启用
      /*  -------------------  优惠券配置部分 end -------------------------------*/
      /*  -------------------  金额规则配置部分 start -------------------------------*/
      getMoneyType() {
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'amount_rule_type'}, function (data) {
          self.couponTypes = data.data.list;
        })
      },//优惠类型
      moneyAdd() {
        this.dialogFormVisibleMoney = true;
        this.formMoneyAdd = {
          name: '',//金额规则类型name
          type: '',//金额优惠类型
          amount: '',//满足条件的 金额
          deduction: '',//满多少减多少的减多少或者立减或者折扣
          total: '',//计算金额
        }
      },//金额规则新增弹框
      moneyAddSure() {
        let self = this;
        let requestData = {
          amount: self.formMoneyAdd.amount,
          deduction: self.formMoneyAdd.deduction,
          name: self.formMoneyAdd.name,
          total: self.formMoneyAdd.total,
          type: self.formMoneyAdd.type,
        };
        self.httpApi.coupon.addCouponAmountRule(requestData, function (data) {
          self.dialogFormVisibleMoney = false;
          self.$message.success('新增成功');
          self.selectMoney(self.pageSize, self.pageNum);
        })
      },//金额规则弹窗确定
      selectMoney(size, num) {
        let self = this;
        let requestData = {
          pageNo: num,
          pageSize: size,
          name: self.formMoney.name,
          type: self.formMoney.type,
        }
        self.httpApi.coupon.selectCouponAmountRuleList(requestData, function (data) {
          self.tableDataMoney = data.data.pageInfo.list;
          self.totalPageMoney = data.data.pageInfo.total;
        })
      },//金额查询列表
      selectMoneyAll() {
        let self = this;
        let requestData = {};
        self.httpApi.coupon.selectCouponAmountRuleListAll(requestData, function (data) {
          self.tableDataMoneyAll = data.data;
        })
      },//金额查询列表不分页
      updateMoney(row) {
        this.dialogFormVisibleMoneyUpdate = true;
        this.formMoneyUpdate = row;
      },//打开修改弹框
      moneyUpdateSure() {
        let self = this;
        self.httpApi.coupon.updateCouponAmountRule(self.formMoneyUpdate, function (data) {
          self.dialogFormVisibleMoneyUpdate = false;
          self.$message.success('修改成功');
          self.selectMoney(self.pageSize, self.pageNum);
        })
      },//修改确定
      moneyUpdateCancel() {
        this.dialogFormVisibleMoneyUpdate = false;
        this.selectMoney(this.pageSize, this.pageNum);
      },//修改取消
      deleteMoney(id) {
        let self = this;
        let requestData = {
          id: id,
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.coupon.deleteCouponAmountRule(requestData, function (data) {
            self.$message.success('删除成功');
            self.selectMoney(self.pageSize, self.pageNum);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },//删除
      /*  -------------------  金额规则配置部分 end -------------------------------*/
      /*  -------------------  品类规则配置部分 start -------------------------------*/
      categoryAdd() {
        this.dialogFormVisibleCategory = true;
        this.formCategoryAdd = {//品类规则新增form
          name: '',
          cat: [],
          catId: [],
          catName: [],
          class: [],//添加的总品类
        },
          this.getCatList();
      },//品类规则新增弹框
      addOneAnnex() {
        this.formCategoryAdd.class.push({name: ''});
      },//新增品类规则中的添加类目
    /*  addOneUpdate() {
        this.classUpdate.push({id:'',cat:[]});
      },//修改品类规则中的添加类目*/
      getCatList(val) {
        let self = this;
        let requestData;
        if (val === undefined) {
          requestData = {catId: -1};
        } else {
          requestData = {catId: val[val.length - 1].id};
        }

        self.httpApi.goods.catList(requestData, function (data) {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].res = JSON.parse(data.data[i].res);
            if (parseInt(data.data[i].hasChild) > 0) {
              data.data[i].children = [];
            }
          }
          if (val === undefined) {
            self.totalCatList = data.data;
          } else {
            self.insertCat(self.totalCatList, val, data.data, 0);
          }
        });
      },
/*      getCatListUpdate(val) {
        let self = this;
        let requestData;
        if (val === undefined) {
          requestData = {catId: -1};
        } else {
          requestData = {catId: val[val.length - 1].id};
        }

        self.httpApi.goods.catList(requestData, function (data) {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].res = JSON.parse(data.data[i].res);
            if (parseInt(data.data[i].hasChild) > 0) {
              data.data[i].children = [];
            }
          }
          if (val === undefined) {
            self.totalCatListUpdate = data.data;
          } else {
            self.insertCat(self.totalCatListUpdate, val, data.data, 0);
          }
        });
      },//修改中的新增*/
      insertCat(arr, val, data, level) {//val:所有父级的数组,data:当前获取到的数据
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === val[level].id) {
            if (val.length === level + 1) {
              arr[i].children = data;
            } else {
              level++;
              this.insertCat(arr[i].children, val, data, level);
            }
          }
        }
      },
      getCat(val, index1) {
        let valT = val.cat[val.cat.length - 1];
        let index = index1;
        let obj = {};
        obj['index'] = index;
        obj['name'] = valT;
        let item = this.cat.findIndex(n => n.index === index);
        if (item !== -1) {
          for (let i = 0; i < this.cat.length; i++) {
            if (index === this.cat[i].index) {
              this.cat[i].name = valT;
            }
          }
        } else {
          this.cat.push(obj);
        }
      },
/*      getCatUpdate(val, index1) {
        console.log('val-update',val);
        console.log('this.IdsList-update',this.IdsList);
        let arr = [];
        for(let i = 0 ; i < val.cat.length;i++){
          arr.push(val.cat[i].id);
        }
        let objUpdate = {};
        objUpdate['ids'] = arr;
        objUpdate['name'] = val.cat[1].name;
        this.IdsList.push(objUpdate);
        console.log('objUpdate',objUpdate);
        return;
        let valT = val.cat[val.cat.length - 1];
        let index = index1;
        let obj = {};
        obj['index'] = index;
        obj['name'] = valT;
        let item = this.cat.findIndex(n => n.index === index);
        if (item !== -1) {
          for (let i = 0; i < this.cat.length; i++) {
            if (index === this.cat[i].index) {
              this.cat[i].name = valT;
            }
          }
        } else {
          this.cat.push(obj);
        }
      },//修改中的新增*/
      deleteOneAnnex(index) {
        this.formCategoryAdd.class.splice(index, 1);
        this.formCategoryAdd.catName.splice(index, 1);
        this.formCategoryAdd.catId.splice(index, 1);
      },//删除一个类目
      categoryAddSure() {
        let self = this;
        let ids = [];
        let names = [];
        for (let i = 0; i < this.cat.length; i++) {
          ids.push(this.cat[i].name.id);
          names.push(this.cat[i].name.name);
        }
        ;
        ids = ids.join(',');
        names = names.join(',');
        let requestData = {
          categoryIds: ids,
          categoryNames: names,
          name: self.formCategoryAdd.name
        };
        self.httpApi.coupon.addCouponCategoryRule(requestData, function (data) {
          self.dialogFormVisibleCategory = false;
          self.$message.success('新增成功');
          self.selectCategory(self.pageSize, self.pageNum);
        })
      },//品类规则新增确定
      selectCategory(size, num) {
        let self = this;
        let requestData = {
          pageNo: num,
          pageSize: size,
          name: self.formCategory.name,
        }
        self.httpApi.coupon.selectCouponCategoryRuleList(requestData, function (data) {
          self.tableDataCategory = data.data.pageInfo.list;
          self.totalPageCategory = data.data.pageInfo.total;
        })
      },//条件查询
      selectCategoryAll() {
        let self = this;
        let requestData = {};
        self.httpApi.coupon.selectCouponCategoryRuleListAll(requestData, function (data) {
          self.tableDataCategoryAll = data.data;
        })
      },//条件查询不分页
      updateCategory(row) {
        let self = this;
        self.IdsList = [];
        self.formCategoryUpdateSure.ids = [];
        self.formCategoryUpdateSure.names = [];
        self.dialogFormVisibleCategoryUpdate = true;
        self.getMapCatList();
      /*  self.getCatListUpdate();*/
        self.httpApi.goodsCat.getGoodsCatTree({}, function (data) {
          self.totalCatListAll = data.data.goodsCatTrees;
          if (self.totalCatListAll.length > 0) {
            let requestData = {
              id: row.id,
            };
            self.httpApi.coupon.selectCouponCategoryRuleById(requestData, function (data) {
              self.IdsList = data.data.categoryIdsList;
              self.formCategoryUpdate = data.data;
              if (self.mapCatList) {
                for (let j = 0; j < self.IdsList.length; j++) {
                  for (let key in self.mapCatList) {
                    if (key == self.IdsList[j].ids[1]) {
                      self.IdsList[j].name = self.mapCatList[key].name;
                    }
                  }

                }
              }
            })
          }
        })

      },//打开修改弹框
      getMapCatList() {
        let self = this;
        self.httpApi.goodsCat.selectGoodsCatMap({}, function (data) {
          self.mapCatList = data.data;
        })
      },
      getUpdateCatSelect(val, index2) {
        console.log('val', val);
        console.log('index2', index2);
        console.log('this.idsList', this.IdsList);
        for (let i = 0; i < this.IdsList.length; i++) {
          if (i === index2) {
            this.IdsList[i].ids = val;
            this.IdsList[i].name = this.mapCatList[val[1]].name;
          } else {
            this.IdsList[i].ids = this.IdsList[i].ids;
            this.IdsList[i].name = this.IdsList[i].name;
          }
        }
        console.log('this.IdsList-----3', this.IdsList);
        return;


        let self = this;
        let ids = val[1];
        let index = index2;
        let obj = {};
        obj['index'] = index;
        obj['id'] = ids;
        obj['name'] = self.mapCatList[ids].name;
        let item1 = self.catUpdateSure.findIndex(n => n.index === index);
        if (item1 !== -1) {
          for (let i = 0; i < self.catUpdateSure.length; i++) {
            if (index === self.catUpdateSure[i].index) {
              self.catUpdateSure[i].id = ids;
              self.catUpdateSure[i].name = self.mapCatList[ids].name;
            }
          }
        } else {
          self.catUpdateSure.push(obj);
        }
        console.log('self.catUpdateSure', self.catUpdateSure);
      },//修改类目
      categoryUpdateSure() {
        let self = this;
        for (let i = 0; i < self.IdsList.length; i++) {
          self.formCategoryUpdateSure.ids.push(self.IdsList[i].ids[1]);
          self.formCategoryUpdateSure.names.push(self.IdsList[i].name);
        }
        let requestData = {
          categoryIds: self.formCategoryUpdateSure.ids.join(','),
          categoryNames: self.formCategoryUpdateSure.names.join(','),
          id: self.formCategoryUpdate.id,
          name: self.formCategoryUpdate.name,
        };
        self.httpApi.coupon.updateCouponCategoryRule(requestData, function (data) {
          self.dialogFormVisibleCategoryUpdate = false;
          self.$message.success('修改成功');
          self.selectCategory(self.pageSize, self.pageNum);
          self.IdsList = [];
          self.formCategoryUpdateSure.ids = [];
          self.formCategoryUpdateSure.names = [];
        })
      },//修改确定
      categoryUpdateCancel() {
        this.dialogFormVisibleCategoryUpdate = false;
        this.selectCategory(this.pageSize, this.pageNum);
      },//修改取消
      deleteOneUpdate(index) {//修改中删除一条
        this.formCategoryAdd.class.splice(index, 1);
        this.IdsList.splice(index, 1);
      },
      deleteCategory(id) {
        let self = this;
        let requestData = {
          id: id,
        };
        self.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.coupon.deleteCouponCategoryRule(requestData, function (data) {
            self.$message.success('删除成功');
            self.selectCategory(self.pageSize, self.pageNum);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },//删除

      /*  -------------------  品类规则配置部分 end -------------------------------*/

    },
  }
</script>

