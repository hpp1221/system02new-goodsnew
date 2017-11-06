<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品品牌</h3>
      <el-button @click="createUnit" style="float: right">新增</el-button>
      <!--新增弹框-->
      <el-dialog title="新增商品品牌" :visible.sync="dictionaryUnitCreate">
        <el-form :model="form">
          <el-form-item label="商品品牌" :label-width="formLabelWidth">
            <el-input v-model="form.brandName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createSure">确 定</el-button>
          <el-button @click="dictionaryUnitCreate = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--修改弹框-->
      <el-dialog title="修改商品品牌" :visible.sync="updateStore">
        <el-form :model="updateForm">
          <el-form-item label="商品品牌" :label-width="formLabelWidth">
            <el-input v-model="updateForm.brandName" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateStoreHouseSure">确 定</el-button>
          <el-button @click="cancelUpdateStore">取 消</el-button>
        </div>
      </el-dialog>
      <div class="dictionaryclassify-main">
        <ul class="dictionarybrand-content">
          <li v-for="item in list" class="iconfont icon-erp-R">{{item.brandName}}

            <el-button class="el-icon-delete icon-deletechilddependent" v-on:click="deleteUnit(item)">删除
            </el-button>
            <el-button class="el-icon-edit icon-deletechilddependent" v-on:click="UpdateBrand(item)">修改
            </el-button>
            <el-button class="iconfont icon-erp-zhiding- icon-deletechilddependent" style="font-size: 12px" v-on:click="setTop(item)">置顶
            </el-button>
          </li>
        </ul>
      </div>
      <pagination @setChanged="pageChanged" :totalPage="totalPage"></pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dictionaryUnitCreate: false,//新增
        updateStore: false,//修改
        list: [],
        form: {//新增
          brandId:'',
          brandName: '',
          companyId:''
        },
        updateForm: {//修改
          brandId:'',
          brandName: '',
          companyId:''
        },
        formLabelWidth: '80px',
        pageSize: 5,
        pageNum: 1,
        totalPage: 10
      };
    },
    components: {
      'pagination': require('../../components/pagination')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.getUnitList(page.size, page.num);
      },
      getUnitList(size,num) {//商品品牌列表
        let self = this
        let requestData = {
          pageSize: size,
          pageNum: num,
        };
        self.httpApi.brand.getBrandList(requestData, function (data) {
          self.list = data.data.list
          self.totalPage = data.data.total
        });
      },
      createUnit() {//新增单元
        this.dictionaryUnitCreate = true;
        this.form = {data: {brandName: '',brandId:'',companyId:''}};
      },
      createSure() {//新增确定
        let self = this
        let requestData = {
          brandId:self.form.brandId,
          brandName: self.form.brandName,
          companyId:self.updateForm.companyId,
        };
        self.httpApi.brand.createBrand(requestData, function (data) {
          self.dictionaryUnitCreate = false
          self.$message.success('添加成功')
          self.getUnitList(self.pageSize,self.pageNum)
        });
      },
      UpdateBrand(item){//修改
        this.updateStore = true
        this.updateForm = item
      },
      updateStoreHouseSure() {//修改确定
        let self = this
        let requestData = {
          brandId:self.updateForm.brandId,
          brandName: self.updateForm.brandName,
          companyId:self.updateForm.companyId,
        };
        self.httpApi.brand.updateBrandByBrandId(requestData, function (data) {
          self.updateStore = false;
          self.$message.success('修改成功');
        });
      },
      cancelUpdateStore(){//取消修改
        let self = this
        self.updateStore = false
        self.$message.success('已取消修改')
        self.getUnitList(self.pageSize,self.pageNum)
      },
      deleteUnit(item){//删除
        let self = this;
        console.log('brandid',item)
        let requestData = {
          brandId: item.brandId
        };
        self.$confirm('请确认是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.brand.deleteBrandByBrandId(requestData, function (data) {
            self.$message({
              type: 'success',
              message: '已成功删除!'
            });
            self.getUnitList(self.pageSize,self.pageNum)
          });
        })
      },
      setTop(item){
        let self = this;
        let requestData = {
          brandId: item.brandId
        };
        self.$confirm('请确认是否置顶？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.brand.setTop(requestData, function (data) {
            self.$message({
              type: 'success',
              message: '已成功置顶!'
            });
            self.getUnitList(self.pageSize,self.pageNum)
          });
        })
      },
    }
  };
</script>
