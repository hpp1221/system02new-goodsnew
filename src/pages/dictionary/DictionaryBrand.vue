<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品品牌</h3>
      <el-button @click="createUnit" style="float: right">新增</el-button>
      <!--新增弹框-->
      <el-dialog title="新增商品品牌" :visible.sync="dictionaryUnitCreate">
        <el-form :model="form">
          <el-form-item label="商品品牌" :label-width="formLabelWidth">
            <el-input v-model="form.brand_name"></el-input>
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
            <el-input v-model="updateForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateStoreHouseSure">确 定</el-button>
          <el-button @click="cancelUpdateStore">取 消</el-button>
        </div>
      </el-dialog>
      <div class="dictionaryclassify-main">
        <ul class="dictionarybrand-content">
          <li v-for="item in list" class="iconfont icon-erp-R">{{item.brand_name}}
            <el-button class="el-icon-delete icon-deletechilddependent" v-on:click="UpdateBrand(item)">修改
            </el-button>
            <el-button class="el-icon-delete icon-deletechilddependent" v-on:click="deleteUnit(item)">删除
            </el-button>
          </li>
        </ul>
      </div>
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
          brand_id:'',
          brand_name: '',
          company_id:''
        },
        updateForm: {//修改
          brand_id:'',
          brand_name: '',
          company_id:''
        },
        formLabelWidth: '80px'
      };
    },
    created(){
      this.getUnitList()
    },
    methods: {
      getUnitList() {//商品品牌列表
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
        };
        self.httpApi.brand.getBrandList(requestData, function (data) {
          console.log('brand',data)
          self.list = data.data
        });
      },
      createUnit() {//新增单元
        this.dictionaryUnitCreate = true;
        this.form = {data: {brand_name: '',brand_id:'',company_id:''}};
      },
      createSure() {//新增确定
        let self = this
        let requestData = {
          brandId:self.form.brand_id,
          brandName: self.form.brand_name,
          companyId:self.updateForm.company_id,
          token: window.localStorage.getItem('token')
        };
        self.httpApi.brand.createBrand(requestData, function (data) {
          self.dictionaryUnitCreate = false
          self.$message.success('添加成功')
          self.getUnitList()
        });
      },
      UpdateBrand(item){//修改
        this.updateStore = true
        this.updateForm = item
      },
      updateStoreHouseSure() {//修改确定
        let self = this
        let requestData = {
          brandId:self.updateForm.brand_id,
          brandName: self.updateForm.brand_name,
          companyId:self.updateForm.company_id,
          token: window.localStorage.getItem('token')
        };
        self.httpApi.brand.updateBrandByBrandId(requestData, function (data) {
          self.updateStore = false;
          self.$message.success('修改成功');
        });
      },
      cancelUpdateStore(){
        let self = this
        self.updateStore = false
        self.$message.success('已取消修改')
        self.getStoreHouseList(self.pageSize,self.pageNum)
      },
      deleteUnit(item){//删除
        let self = this;
        let params = {unitId: item.id};
        self.$confirm('请确认是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.httpApi.goodsCat.deleteUnit(requestData, function (data) {
            self.$message('删除成功');
            self.getUnitList(self.pageSize, self.pageNum)
          });
        })
      }
    }
  };
</script>
