<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">品牌</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="请输入品牌名称 : ">
          <el-input icon="search" v-model="easyForm.brandName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <el-button @click="brandAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="品牌Logo">
          <template slot-scope="scope">
            <img v-lazy="scope.row.brandLogo" alt=""
                 style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
          </template>
        </el-table-column>
        <el-table-column prop="brandName" label="品牌名称">

        </el-table-column>
        <el-table-column prop="remark" label="备注">

        </el-table-column>

        <el-table-column>
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row.brandId)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="seeDetail(scope.row.brandId)">详情</el-dropdown-item>
                <!--<el-dropdown-item>删除</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right"></pagination>
    </div>
  </div>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    data() {
      return {
        regionList:[],
        tableData: [],
        selectedOptions2: [],
        addressData: [],
        easyForm: {//简单查询
          brandName: '',//品牌名称,
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,

      }
    },
    created() {
//      this.select();
    },
    components: {
      'pagination': require('../../components/pagination'),
    },
    methods: {
      brandAdd() {//品牌商新增
        this.$router.push('/brand/add');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      pageChanged(page) {//页码
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num)
      },
      select(size, num) {//查询
        let self = this;
        let requestData = {
          pageSize: size,
          pageNo: num,
          brandName: self.easyForm.brandName,//品牌名称,
        };
//        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm))
        self.httpApi.brand.selectBrandList(requestData, function (data) {
          self.tableData = data.data.pageInfo.list;
          self.totalPage = data.data.pageInfo.total;
        });
      },
      seeDetail(id) {
        let url = '/brand/detail/' + id;
        this.$router.push(url);
      },
      update(id){
        let url = '/brand/update/' + id;
        this.$router.push(url);
      }
    }
  }
</script>
