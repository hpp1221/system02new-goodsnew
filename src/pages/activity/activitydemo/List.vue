<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">活动模块商品列表</h3>
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
            <img v-lazy="scope.row.bannerUrl"
                 style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
          </template>
        </el-table-column>
        <el-table-column label="活动图标图片">
          <template slot-scope="scope">
            <img v-lazy="scope.row.iconUrl"
                 style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="活动图标名称">

        </el-table-column>
        <el-table-column label="排序" prop="order">
        </el-table-column>
        <el-table-column label="品牌状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === '1'">正常</span>
            <span v-if="scope.row.status === '-1'">禁用</span>
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
      <el-dialog title="新增活动模块商品" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item label="活动图标">
            <el-select v-model="form.activityId" style="width:178px">
              <el-option :label="t.name" :key="t.id" :value="t.id" v-for="t in iconsList">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-radio v-model="form.isChoice" label="'1'">是</el-radio>
            <el-radio v-model="form.isChoice" label="'-1'">否</el-radio>
          </el-form-item>
          <el-form-item label="添加商品">
            <el-button @click="addGoodsCheck">添加</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="BrandAddCancel">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="商品" :visible.sync="dialogFormVisibleAddGoods">
        <el-form :model="form">
          <el-form-item label="活动图标">
            <el-select v-model="form.activityId" style="width:178px">
              <el-option :label="t.name" :key="t.id" :value="t.id" v-for="t in iconsList">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-radio v-model="form.isChoice" label="'1'">是</el-radio>
            <el-radio v-model="form.isChoice" label="'-1'">否</el-radio>
          </el-form-item>
          <el-form-item label="添加商品">
            <el-button @click="addGoodsCheck">添加</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="BrandAddCancel">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改广告栏" :visible.sync="dialogFormVisibleUpdate">
        <el-form :model="updateForm">

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
  export default {
    data() {
      return {
        iconsList: [],//图标列表不分页
        tableData: [],
        easyForm: {//简单查询
          name: '',//关键字查询
          brandStatus: '',//品牌状态
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        dialogFormVisibleAdd: false,//新增弹框
        dialogFormVisibleAddGoods: false,//新增goods弹框
        dialogFormVisibleUpdate: false,//修改弹框
        form: {
          activityId: '',
          isChoice: '',
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
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
        localStorage.setItem('pageSizeList', page.size);
        localStorage.setItem('pageNumList', page.num);
      },
      getIconSList() {
        let self = this;
        self.httpApi.activity.selectActivityListNotPage({}, function (data) {
          self.iconsList = data.data;
        })
      },//获取活动图标列表不分页
      select(size, num) {//查询
        let self = this;
        let requestData = {
          pageSize: size,
          pageNum: num,
          name: self.easyForm.name,
          status: self.easyForm.brandStatus,
        };
        self.httpApi.activity.selectActivityList(requestData, function (data) {
          self.tableData = data.data.pageInfo.list;
          self.totalPage = data.data.pageInfo.total;
        });
      },
      addBanner() {
        this.dialogFormVisibleAdd = true;
        this.form = {};
        this.getIconSList();
      },//新增
      onSubmit() {
        let self = this;
        self.httpApi.activity.addActivity(self.form, function (data) {
          self.dialogFormVisibleAdd = false;
          self.$message.success(data.message);
          self.select(self.pageSize, self.pageNum);
        })
      },//新增确定
      BrandAddCancel() {
        this.dialogFormVisibleAdd = false;
      },//新增取消
      addGoodsCheck() {
        this.dialogFormVisibleAddGoods = true;
      },//添加商品弹框
      update(row) {
        console.log('row', row);
        this.dialogFormVisibleUpdate = true;
        this.updateForm.id = row.id;
        this.updateForm = row;
      },
      onSubmitUpdate() {
        let self = this;
        self.httpApi.activity.updateActivityById(self.updateForm, function (data) {
          self.dialogFormVisibleUpdate = false;
          self.select(self.pageSize, self.pageNum);
        })
      },//修改确定
      updateCancel() {
        this.dialogFormVisibleUpdate = false;
      },//修改取消
      deleteActivity(id) {
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
          self.httpApi.activity.deleteActivityById(requestData, function (data) {
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
