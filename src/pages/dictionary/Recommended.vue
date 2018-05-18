<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">为你推荐列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline>
        <el-form-item label="商品名称">
          <el-input v-model="easyForm.title" style="width: 170px;"></el-input>
        </el-form-item>
        <el-form-item label="商品编码">
          <el-input v-model="easyForm.number" style="width: 170px"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            :options="goodListCatList"
            :show-all-levels="false"
            @change="GoodListCatListChange"
            :clearable="true"
            :change-on-select=true
            filterable
            style="width: 160px"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品品牌">
          <brandselect @getBrandSelect="getBrandSelect" :clearable="true" style="width: 150px"></brandselect>
        </el-form-item>
        <el-form-item label="贸易形态">
          <gradetypeselect @getGradeTypeSelect="getGradeTypeSelect" :clearable="true" :selectAllVisible="true"
                           style="width: 150px"></gradetypeselect>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
          <el-button @click="recommedAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border v-if="tableData.length>0">
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img v-lazy="scope.row.img" alt=""
                 style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="商品编码" width="200">

        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="150">

        </el-table-column>
        <el-table-column label="分类" width="130">
          <template slot-scope="scope">
            <span>{{scope.row.firstCategoryName+'/'+scope.row.twoCategoryName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="marketPrice" label="市场价">

        </el-table-column>
        <el-table-column prop="referencePrice" label="参考价">

        </el-table-column>
        <el-table-column prop="retailPrice" label="零售价">

        </el-table-column>
        <el-table-column prop="brandName" label="品牌">

        </el-table-column>
        <el-table-column prop="mustBuyNum" label="起订量">

        </el-table-column>
        <el-table-column prop="count" label="库存数量">

        </el-table-column>
        <el-table-column prop="transportationPrice" label="物流运费">

        </el-table-column>
        <el-table-column prop="tradeName" label="贸易形态">

        </el-table-column>
        <el-table-column prop="status" label="上下架">
          <template slot-scope="scope">
            <span v-if="scope.row.status === '0'">下架</span>
            <span v-if="scope.row.status === '1'">上架</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="deleteRecommed(scope.row.id)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right"></pagination>
      <el-dialog title="未推荐列表" :visible.sync="dialogTableVisible" :fullscreen=true>
        <el-form ref="form" :model="form" inline>
          <el-form-item label="商品名称">
            <el-input v-model="form.title" style="width: 170px;"></el-input>
          </el-form-item>
          <el-form-item label="商品编码">
            <el-input v-model="form.number" style="width: 170px"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              :options="goodListCatList"
              :show-all-levels="false"
              @change="GoodListCatListChangeNot"
              :clearable="true"
              :change-on-select=true
              filterable
              style="width: 160px"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌">
            <brandselect @getBrandSelect="getBrandSelectNot" :clearable="true" style="width: 150px"></brandselect>
          </el-form-item>
          <el-form-item label="贸易形态">
            <gradetypeselect @getGradeTypeSelect="getGradeTypeSelectNot" :clearable="true" :selectAllVisible="true"
                             style="width: 150px"></gradetypeselect>
          </el-form-item>
          <el-form-item>
            <el-button @click="selectNot(pageSize,pageNum)">查询</el-button>
            <el-button @click="addMulti">批量加入推荐</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableNotData" border style="height: 80%" v-if="tableNotData.length>0"
                  @selection-change="handleSelectionChange" ref="multipleTable" v-loading="loading" :row-key="getRowKeys">
          <el-table-column
            type="selection"
            width="55"
            prop="id"
            :reserve-selection="true">
          </el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img v-lazy="scope.row.img" alt=""
                   style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="商品编码" width="200">

          </el-table-column>
          <el-table-column prop="title" label="商品名称" width="150">

          </el-table-column>
          <!--        <el-table-column prop="sku" label="规格">

                  </el-table-column>-->
          <el-table-column prop="firstCategoryName" label="分类" width="130">
            <template slot-scope="scope">
              <span>{{scope.row.firstCategoryName+'/'+scope.row.twoCategoryName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="marketPrice" label="市场价">

          </el-table-column>
          <el-table-column prop="referencePrice" label="参考价">

          </el-table-column>
          <el-table-column prop="retailPrice" label="零售价">

          </el-table-column>
          <el-table-column prop="brandName" label="品牌">

          </el-table-column>
          <el-table-column prop="mustBuyNum" label="起订量">

          </el-table-column>
          <el-table-column prop="count" label="库存数量">

          </el-table-column>
          <el-table-column prop="transportationPrice" label="物流运费">

          </el-table-column>
          <el-table-column prop="tradeName" label="贸易形态">

          </el-table-column>
          <el-table-column prop="status" label="上下架">
            <template slot-scope="scope">
              <span v-if="scope.row.status === '0'">下架</span>
              <span v-if="scope.row.status === '1'">上架</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click.native="addRecommed(scope.row)">加入推荐</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination @setChanged="pageChangedNot" :totalPage="totalPageNot" style="float: right"></pagination>
      </el-dialog>
      <el-dialog title="新增未推荐" :visible.sync="dialogTableVisibleRecommed" width="35%">
        <el-form :model="addForm">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            {{addForm.name}}
          </el-form-item>
          <el-form-item label="商品排序" :label-width="formLabelWidth">
            <el-input v-model="addForm.order" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisibleRecommed = false">取 消</el-button>
          <el-button type="primary" @click="addRecommedSure">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="批量新增未推荐" :visible.sync="dialogTableVisibleRecommedMulti" width="35%" :show-close=false>
        <el-form :model="addForm">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
           <span v-for="item in selectedDataArr" :key="item.id" style="color: #f40;">{{item.title + '  '+ '   '}}</span>
          </el-form-item>
          <el-form-item label="商品排序" :label-width="formLabelWidth">
            <el-input v-model="addForm.orderMulti" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addRecommedMultiCancel">取 消</el-button>
          <el-button type="primary" @click="addRecommedMultiSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodListCatList: [],//商品分类数组
        tableData: [],//列表
        tableNotData: [],//列表
        loading: false,
        // 获取row的key值
        getRowKeys(row) {
          return row.id;
        },
        selectedData:[],//多选的
        selectedDataArr:[],//多选的
        easyForm: {
          brandId: '',
          firstCategoryId: '',
          number: '',
          pageNo: '',
          pageSize: '',
          status: '',
          title: '',
          tradeType: '',
          twoCategoryId: ''
        },//推荐查询
        form: {
          brandId: '',
          firstCategoryId: '',
          number: '',
          pageNo: '',
          pageSize: '',
          status: '',
          title: '',
          tradeType: '',
          twoCategoryId: ''
        },//未推荐查询
        addForm: {
          name: '',
          order: '',
          orderMulti:'',
          skuId: ''
        },//add form
        pageSize: 5,
        pageSizeNot: 5,
        pageNum: 1,
        pageNumNot: 1,
        totalPage: 10,
        totalPageNot: 10,
        dialogTableVisible: false,
        dialogTableVisibleRecommed: false,
        dialogTableVisibleRecommedMulti: false,
        formLabelWidth: '120px'
      }
    },
    components: {
      'pagination': require('../../components/pagination'),
      'gradetypeselect': require('../../components/getgradetypeselect'),
      'brandselect': require('../../components/getbrandselect')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        localStorage.setItem('pageSizeList', page.size);
        localStorage.setItem('pageNumList', page.num);
        this.getGoodListCatList();
        this.select(page.size, page.num);
      },
      getGoodListCatList() {
        let self = this;
        let requestData = {};
        self.httpApi.goodsCat.selectCategoryTreeNode(requestData, function (data) {
          self.goodListCatList = data.data;
        });
      },//为你推荐列表中的商品分类级联选择器
      GoodListCatListChange(val) {
        this.easyForm.firstCategoryId = val[0];
        this.easyForm.twoCategoryId = val[1];
      },//为你推荐列表中的商品分类级联选择器回调函数
      getBrandSelect(e) {
        this.easyForm.brandId = e.id;
      },//商品品牌函数
      getGradeTypeSelect(e) {
        this.easyForm.tradeType = e.gradeType.value;
      },//贸易形态
      select(size, num) {
        let self = this;
        let requestData = {
          brandId: self.easyForm.brandId,
          firstCategoryId: self.easyForm.firstCategoryId,
          twoCategoryId: self.easyForm.twoCategoryId,
          title: self.easyForm.title,
          number: self.easyForm.number,
          tradeType: self.easyForm.tradeType,
          pageNo: num,
          pageSize: size,
        };
        self.httpApi.recommed.selectGoodsSkuRecommendList(requestData, function (data) {
          self.tableData = data.data.pageInfo.list;
          self.totalPage = data.data.pageInfo.total;
        })
      },//为你推荐列表
      deleteRecommed(id) {
        let self = this;
        let requestData = {
          skuId: id
        };
        self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          self.httpApi.recommed.deleteGoodsRecommendBySkuId(requestData, function (data) {
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
      },//删除
      /*------------------------------------------------未推荐---------------------------------------------------------*/
      pageChangedNot(page) {
        this.pageSizeNot = page.size;
        this.pageNumNot = page.num;
        localStorage.setItem('pageSizeList', page.size);
        localStorage.setItem('pageNumList', page.num);
        this.selectNot(page.size, page.num);
      },
      recommedAdd() {
        this.dialogTableVisible = true;
        this.selectNot(this.pageSize, this.pageNum);
      },//打开未推荐列表弹框
      getBrandSelectNot(e) {
        this.form.brandId = e.id;
      },//商品品牌函数
      getGradeTypeSelectNot(e) {
        this.form.tradeType = e.gradeType.value;
      },//贸易形态
      GoodListCatListChangeNot(valNot) {
        this.form.firstCategoryId = valNot[0];
        this.form.twoCategoryId = valNot[1];
      },////未推荐列表中的商品分类级联选择器回调函数
      selectNot(size, num) {
        let self = this;
        let requestData = {
          brandId: self.form.brandId,
          firstCategoryId: self.form.firstCategoryId,
          twoCategoryId: self.form.twoCategoryId,
          title: self.form.title,
          number: self.form.number,
          tradeType: self.form.tradeType,
          pageNo: num,
          pageSize: size,
        };
        self.httpApi.recommed.selectNotGoodsRecommendList(requestData, function (data) {
          self.tableNotData = data.data.pageInfo.list;
          self.totalPageNot = data.data.pageInfo.total;
        })
      },//未推荐列表
      addRecommed(row) {
        this.dialogTableVisibleRecommed = true;
        this.addForm.name = row.title;
        this.addForm.skuId = row.id;
        this.addForm.order='';
      },//打开新增未推荐弹框
      addRecommedSure() {
        let self = this;
        self.httpApi.recommed.addGoodsRecommend(self.addForm, function (data) {
          self.dialogTableVisibleRecommed = false;
          self.dialogTableVisible = false;
          self.select(self.pageSize, self.pageNum);

        })
      },//新增未推荐弹框确定
      handleSelectionChange(rows) {
        this.selectedData = [];
        if (rows) {
          rows.forEach(row => {
            if (row) {
              this.selectedData.push(row.id);
            }
          });
        }
      },
      addMulti(){
        let self = this;
        if(JSON.stringify(self.selectedData) === "[]"){
          self.$message.info('请选择未推荐商品!')
        }else{
          self.dialogTableVisibleRecommedMulti = true;
          for(let i=0;i<self.tableNotData.length;i++){
            for(let j=0;j<self.selectedData.length;j++){
              if(self.tableNotData[i].id === self.selectedData[j]){
                self.selectedDataArr.push({
                  'skuId':self.tableNotData[i].id,
                  'title':self.tableNotData[i].title
                });
              }
            }
          }
        }
      },
      addRecommedMultiCancel(){
        this.selectedDataArr = [];
        this.dialogTableVisibleRecommedMulti = false;
      },//批量加入取消
      addRecommedMultiSure(){
        let self = this;
        for(let y=0;y<self.selectedDataArr.length;y++){
          self.selectedDataArr[y].order = self.addForm.orderMulti
        }
        self.httpApi.recommed.addGoodsRecommendList(self.selectedDataArr, function (data) {
          self.dialogTableVisibleRecommedMulti = false;
          self.dialogTableVisible = false;
          self.$message.success(data.message);
          self.select(self.pageSize, self.pageNum);
        })
      }//批量加入确定
  }
  }
</script>
<style>
</style>
