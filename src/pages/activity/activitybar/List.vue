<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">活动栏列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="请输入名称 : ">
          <el-input icon="search" v-model="easyForm.name">
          </el-input>
        </el-form-item>
        <el-form-item label="品牌状态">
          <el-select v-model="easyForm.brandStatus" style="width:155px">
            <el-option :value="'1'">正常</el-option>
            <el-option :value="'-1'">禁用</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告栏状态">
          <el-select v-model="easyForm.bannerStatus" style="width:155px">
            <el-option :label="t.name" :key="t.id" :value="t.value" v-for="t in bannerType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <el-button @click="addBanner">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="广告栏图片">
          <template slot-scope="scope">
            <img v-lazy="scope.row.imgUrl" style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="广告栏名称">

        </el-table-column>
        <el-table-column label="广告栏url">
          <template slot-scope="scope">
            <span>{{scope.row.routeUrl}}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === '1'">正常</span>
            <span v-if="scope.row.status === '-1'">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="广告栏状态">
          <template slot-scope="scope">
            <span v-for="item in bannerType" :key="item.id" v-if="scope.row.type === item.value">{{item.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="deleteActivity(scope.row.id)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right">
      </pagination>
      <el-dialog title="新增广告栏" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item label="广告栏图片">
            <uploadoneimg
              :fileList="form.imgUrl"
              @getFileList="getFileLogo"
              style="float: left">
            </uploadoneimg>
          </el-form-item>
          <el-form-item label="广告栏名称">
            <el-input v-model="form.name" style="width:25%"></el-input>
          </el-form-item>
          <el-form-item label="广告栏u r l">
            <el-input v-model="form.routeUrl" style="width:25%"></el-input>
          </el-form-item>
          <el-form-item label="广告栏排序">
            <el-input v-model="form.order" style="width:25%"></el-input>
          </el-form-item>
          <el-form-item label="广告栏状态">
            <el-select v-model="form.type" style="width:228px">
              <el-option :label="t.name" :key="t.id" :value="t.value" v-for="t in bannerType"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品 牌 状 态">
            <el-select v-model="form.status" style="width:228px">
              <el-option :label="t.name" :key="t.value" :value="t.value" v-for="t in brandType"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="BrandAddCancel">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改广告栏" :visible.sync="dialogFormVisibleUpdate">
        <el-form :model="updateForm">
          <el-form-item label="广告栏图片">
            <uploadoneimg
              :fileList="updateForm.imgUrl"
              @getFileList="getFileLogoUpdate"
              style="float: left">
            </uploadoneimg>
          </el-form-item>
          <el-form-item label="广告栏名称">
            <el-input v-model="updateForm.name" style="width:25%"></el-input>
          </el-form-item>
          <el-form-item label="广告栏u r l">
            <el-input v-model="updateForm.routeUrl" style="width:25%"></el-input>
          </el-form-item>
          <el-form-item label="广告栏排序">
            <el-input v-model="updateForm.order" style="width:25%"></el-input>
          </el-form-item>
          <el-form-item label="广告栏状态">
            <el-select v-model="updateForm.type" style="width:228px">
              <el-option :label="t.name" :key="t.id" :value="t.value" v-for="t in bannerType"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品 牌 状 态">
            <el-select v-model="updateForm.status" style="width:228px">
              <el-option :label="t.name" :key="t.value" :value="t.value" v-for="t in brandType"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateCancel">取 消</el-button>
          <el-button type="primary" @click="onSubmitUpdate">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    data() {
      return {
        bannerType: [],//types
        brandType: [
          {
            value: '1',
            name: '正常'
          },
          {
            value: '-1',
            name: '禁用'
          }
        ],
        tableData: [],
        easyForm: {//简单查询
          bannerStatus: '',//广告栏状态,
          name: '',//关键字查询
          brandStatus: '',//品牌状态
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        dialogFormVisibleAdd: false,//新增弹框
        dialogFormVisibleUpdate: false,//修改弹框
        form: {
          imgUrl: '',
          name: '',
          routeUrl: '',
          order: '',
          status: '',
          type: '',
        },//新增form
        updateForm: {
          imgUrl: '',
          name: '',
          routeUrl: '',
          order: '',
          status: '',
          type: '',
        },//修改form
        formLabelWidth: '120px'
      }
    },
    components: {
      'pagination': require('../../../components/pagination'),
      'uploadoneimg': require('../../../components/uploadoneimg'),
    },
    activated() {
      this.select(localStorage.getItem('pageSizeList'), localStorage.getItem('pageNumList'))
    },
    methods: {
      pageChanged(page) {//页码
        this.getBannerType();
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
        localStorage.setItem('pageSizeList', page.size);
        localStorage.setItem('pageNumList', page.num);
      },
      getBannerType() {
        let self = this;
        self.httpApi.dict.selectDictByType({type: 'banner_position_type'}, function (data) {
          self.bannerType = data.data.list;
        })
      },//获取广告栏的type
      getFileLogo(file) {
        this.form.imgUrl = file.url;
      },//广告栏图片
      select(size, num) {//查询
        let self = this;
        let requestData = {
          pageSize: size,
          pageNo: num,
          name: self.easyForm.name,
          type: self.easyForm.bannerStatus,
          status: self.easyForm.brandStatus,
        };
        self.httpApi.activity.selectBannerList(requestData, function (data) {
          self.tableData = data.data.pageInfo.list;
          self.totalPage = data.data.pageInfo.total;
        });
      },
      addBanner() {
        this.dialogFormVisibleAdd = true;
        this.form = {};
      },//新增
      onSubmit() {
        let self = this;
        self.httpApi.activity.addBanner(self.form, function (data) {
          self.dialogFormVisibleAdd = false;
          self.select(self.pageSize, self.pageNum);
        })
      },//新增确定
      BrandAddCancel() {
        this.dialogFormVisibleAdd = false;
      },//新增取消
      update(row) {
        console.log('row',row);
        this.dialogFormVisibleUpdate = true;
        this.updateForm.id = row.id;
        this.updateForm = row;
      },
      getFileLogoUpdate(file) {
        this.updateForm.imgUrl = file.url;
      },//广告栏图片
      onSubmitUpdate(){
        let self = this;
        self.httpApi.activity.updateBannerById(self.updateForm, function (data) {
          self.dialogFormVisibleUpdate = false;
          self.select(self.pageSize, self.pageNum);
        })
      },//修改确定
      updateCancel(){
        this.dialogFormVisibleUpdate = false;
      },//修改取消
      deleteActivity(id){
        let self = this;
        let requestData = {
          id: id
        };
        self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          self.httpApi.activity.deleteBannerById(requestData, function (data) {
            self.$message({
              type: 'success',
              message: '删除成功!'
            });
            self.select(self.pageSize, self.pageNum);
          })
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  }
</script>
