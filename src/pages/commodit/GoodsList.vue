<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品列表</h3>
      <el-form ref="form" :model="form" inline class="request-form">
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
            @change="GoodListCatListChange"
            :clearable="true"
            :change-on-select=true
            filterable
            style="width: 160px"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select placeholder="商品状态" v-model="form.status" style="width: 130px">
            <el-option label="全部" :value="''"></el-option>
            <el-option label="上架" :value="1"></el-option>
            <el-option label="下架" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品品牌">
          <brandselect @getBrandSelect="getBrandSelect" :clearable="true" style="width: 150px"></brandselect>
        </el-form-item>
        <el-form-item label="贸易形态">
          <gradetypeselect @getGradeTypeSelect="getGradeTypeSelect" :clearable="true" :selectAllVisible="true" style="width: 150px"></gradetypeselect>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <!--     <el-form-item>
             <el-dropdown trigger="click">
             <el-button>导入</el-button>
             <el-dropdown-menu slot="dropdown">
             <el-dropdown-item @click.native="multipleInputGoods">批量导入商品</el-dropdown-item>
             <el-dropdown-item @click.native="multipleInputImgs">批量导入图片</el-dropdown-item>
             </el-dropdown-menu>
             </el-dropdown>

             </el-form-item>-->
        <el-form-item>
          <el-button @click="outputFile">导出</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="createGoods">新增</el-button>
        </el-form-item>
      </el-form>
      <div class="goodslist-check-div" v-if="multipleSelection.length > 0">
        <el-button icon="close" type="text" @click="cancelSelect"></el-button>
        <span>已选择{{multipleSelection.length}}项</span>
        <el-button icon="check" @click="putOnSale">上架</el-button>
        <el-button icon="close" @click="downSale">下架</el-button>
        <!--<el-button icon="delete" @click="deleteGoods">删除</el-button>-->
        <!--<el-button icon="setting" @click="setTags">设置标签</el-button>-->
      </div>
      <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img v-lazy="scope.row.img" alt=""
                 style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="商品编码" width="200">

        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="180">

        </el-table-column>
        <!--        <el-table-column prop="sku" label="规格">

                </el-table-column>-->
        <el-table-column prop="firstCategoryName" label="一级分类" width="120">

        </el-table-column>
        <el-table-column prop="twoCategoryName" label="二级分类" width="120">

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
                <el-dropdown-item @click.native="update(scope.row.id,scope.row.goodsId)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="seeDetail(scope.row.id)">明细</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float:right"></pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {//简单查询
          number: '',//商品编号
          brandId: '',//商品品牌id
          firstCategoryId: '',//一级类目id
          twoCategoryId: '',//二级类目id
          supplierId: '',//供应商id
          tradeType: '',//交易形态id
          title:'',//商品名称
          status: '',//1是上架，0是下架

        },
        goodListCatList: [],//商品分类数组
        tableData: [],//商品列表
        totalPage: 10,
        pageSize: 5,
        pageNum: 1,
        multipleSelection: [],//选择上下架
        upOrDownIds: [],//上下架ids
      }
    },
    components: {
      'pagination': require('../../components/pagination'),
      'gradetypeselect': require('../../components/getgradetypeselect'),
      'brandselect': require('../../components/getbrandselect')
    },
    activated() {
      this.select(localStorage.getItem('pageSizeList'), localStorage.getItem('pageNumList'));
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
      getGradeTypeSelect(e){
        this.form.tradeType = e.gradeType.value;
      },//贸易形态
      getGoodListCatList() {//商品列表中的商品分类级联选择器
        let self = this;
        let requestData = {};
        self.httpApi.goodsCat.selectCategoryTreeNode(requestData, function (data) {
          self.goodListCatList = data.data;
        });
      },//商品类目列表
      GoodListCatListChange(val) {//商品列表中的商品分类级联选择器回调函数
        this.form.firstCategoryId = val[0];
        this.form.twoCategoryId = val[1];
      },//商品分类函数
      getBrandSelect(e) {
        this.form.brandId = e.id;
      },//商品品牌函数
      seeDetail(id) {
        let url = '/commodit/goodsDetail/' + id;
        this.$router.push(url);
      },//查看商品详情
      select(size, num) {
        let self = this;
        let requestData = {
          pageSize: size,
          pageNo: num,
          title:self.form.title,
          number:self.form.number,
          firstCategoryId:self.form.firstCategoryId,
          twoCategoryId:self.form.twoCategoryId,
          supplierId:self.form.supplierId,
          tradeType:self.form.tradeType,
          status:self.form.status,
          brandId:self.form.brandId,
        };
//        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        self.httpApi.commodit.selectGoodsSkuList(requestData, function (data) {
          self.tableData = data.data.pageInfo.list;
          self.totalPage = data.data.pageInfo.total;
        });
      },//查询列表
      handleSelectionChange(val) {
        let self = this;
        for (let i = 0; i < val.length; i++) {
          if (self.upOrDownIds.indexOf(self.upOrDownIds[i]) == -1) {
            self.upOrDownIds.push(val[i].id);
          }
        }
        if (val.length > 0) {
          self.multipleSelection = val;
          self.selectionObj[self.pageNum] = val;
        }
      },//点击选择上下架
      update(id,goodsId) {
        let url = '/commodit/updateGoods/' + id + '/' + goodsId;
        this.$router.push(url);
      },//修改商品详情
      createGoods() {
        this.$router.push('/commodit/createGoods');
      },//新增
      outputFile() {
        let arr = [];
        for (let i in this.selectionObj) {
          for (let j = 0; j < this.selectionObj[i].length; j++) {
            arr.push(this.selectionObj[i][j].id);
          }
        }
        let url = 'admin/goods/exportGoods?token=' + localStorage.getItem('token');
//        let url = 'admin/goods/exportGoods?token=' + localStorage.getItem('token');
        let str = '';
        if (arr.length === 0) {
          if (this.searchType === 1) {
            str = '&catId=' + JSON.stringify(this.easyForm.catId) + '&type=' + this.easyForm.type;
          } else {
            str = '&keyword=' + this.form.keyword +
              '&catId=' + JSON.stringify(this.form.catId) +
              '&brandId=' + this.form.brandId +
              '&upLimit=' + this.form.upLimit +
              '&downLimit=' + this.form.downLimit +
              '&zero=' + this.form.zero +
              '&type' + this.form.type +
              '&source' + this.form.source;
          }
          this.$confirm('此操作将导出全部数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            location.href = url + str;
            this.$message({
              type: 'success',
              message: '导出成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消导出'
            });
          });

        } else {
          this.$confirm('此操作将导出已选数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            location.href = url + '&skuList=' + JSON.stringify(arr);
            this.$message({
              type: 'success',
              message: '导出成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消导出'
            });
          });

        }
      },//导出
      multipleInputGoods() {
        this.$router.push('/commodit/multipleInputGoods');
      },
      multipleInputImgs() {
        this.$router.push('/commodit/multipleInputImgs');
      },
      putOnSale() {//上架
        let self = this;
        self.$confirm('请确认是否批量上架？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            skuList: JSON.stringify(self.upOrDownIds),
            type: 1
          };
          self.httpApi.goods.upOrDownGoods(requestData, function (data) {
            self.$message.success('操作成功');
            setTimeout(function () {
              self.$router.go(0);
            }, 500);
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '您已取消上架'
          });
        });
      },
      downSale() {//下架
        let self = this;
        self.$confirm('请确认是否批量下架？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            skuList: JSON.stringify(self.upOrDownIds),
            type: 0
          };
          self.httpApi.goods.upOrDownGoods(requestData, function (data) {
            self.$message.success('操作成功');
            setTimeout(function () {
              self.$router.go(0);
            }, 500);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消下架'
          });
        });
      },
      cancelSelect() {//取消选中
        this.$refs.multipleTable.clearSelection();
      }

    }
  }
</script>
