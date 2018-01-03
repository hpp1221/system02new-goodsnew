<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">组合营销列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item label="商品名称">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码">
          <el-input v-model="number"></el-input>
        </el-form-item>
        <el-form-item label="商品品牌">
          <brandselect @getBrandSelect="getBrandSelect" style="width:350px;"></brandselect>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-dropdown trigger="click">-->
        <!--<el-button>导入</el-button>-->
        <!--<el-dropdown-menu slot="dropdown">-->
        <!--<el-dropdown-item @click.native="multipleInputGoods">批量导入商品</el-dropdown-item>-->
        <!--<el-dropdown-item @click.native="multipleInputImgs">批量导入图片</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->

        <!--</el-form-item>-->
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
        <el-table-column prop="number" label="商品编码">

        </el-table-column>
        <el-table-column prop="name" label="商品名称">

        </el-table-column>
        <el-table-column prop="sku" label="规格">

        </el-table-column>
        <el-table-column prop="unit" label="单位">

        </el-table-column>
        <el-table-column prop="marketPrice" label="市场价">

        </el-table-column>
        <el-table-column prop="price" label="参考成本价">

        </el-table-column>
        <el-table-column prop="brandName" label="品牌">

        </el-table-column>
        <el-table-column prop="mustBuyNum" label="起订量">

        </el-table-column>
        <el-table-column prop="count" label="库存数量">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row.id,scope.row.goodsId)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="seeDetail(scope.row.id)">明细</el-dropdown-item>
                <!--<el-dropdown-item>删除</el-dropdown-item>-->
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
        tableData: [],
        brandNameSelectData:[],//商品品牌
        easyForm: {//简单查询
          cat: [],//所属仓库
          catId: '',
          catName: '',
          type: '',//1是上架，0是下架
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        multipleSelection: [],
        upOrDownIds:[],//上下架ids
        selectionObj: {},
        searchType: 1//1是简单搜索，2是高级搜索
      }
    },
    created() {

    },
    components: {
      'pagination': require('../../components/pagination'),
      'catselect': require('../../components/getcatselect'),
      'getcheckbox': require('../../components/getcheckbox'),
      'brandselect': require('../../components/getbrandselect'),
    },
    methods: {
      getBrandSelect(e) {
        console.log('ee',e)
      },
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.searchType === 1 ? this.select(page.size, page.num) : this.advanceSelect(page.size, page.num);
      },
      getCatSelect(e) {
        this.easyForm.cat = e.cat;
        this.easyForm.catId = e.catId,
          this.easyForm.catName = e.catName
      },
      getFormCatSelect(e) {
        this.form.cat = e.cat;
        this.form.catId = e.catId,
          this.form.catName = e.catName
      },
      seeDetail(id) {
        let url = '/goods/goodsDetail/' + id;
        this.$router.push(url);
      },
      select(size, num) {//查询
        let self = this;
        let requestData = {
          pageSize: size,
          pageNo: num,
          temp: JSON.stringify(self.selectionObj),
          goodsSkuRequest: self.easyForm,
        };
//        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        self.httpApi.goods.skuList(requestData, function (data) {
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
          self.searchType = 1;
          if (data.temp !== "{}") {
            let list = JSON.parse(data.temp);
            self.$nextTick(function () {
              self.toggleSelection(list[num]);
            })
          }
        });
      },
      advanceSelect(size, num) {
        let self = this;
        let requestData = {
          pageSize: size,
          pageNo: num,
          goodsSkuRequest: self.form
        };
//        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.goods.skuList(requestData, function (data) {
          self.advanceSearch = false;
          self.searchType = 2;
          self.tableData = data.data.list;
          self.totalPage = data.data.total;
        });
      },
      toggleSelection(rows) {
        if (rows) {
          let arr = [];
          for (let i = 0; i < this.tableData.length; i++) {
            for (let j = 0; j < rows.length; j++) {
              if (this.tableData[i].id === rows[j].id) {
                arr.push(this.tableData[i]);
              }
            }
          }
          arr.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        }
      },
      sureSetTags() {//确定设置标签

      },
      handleSelectionChange(val) {
        let self = this;
        for(let i = 0 ; i < val.length;i++){
          if(self.upOrDownIds.indexOf(self.upOrDownIds[i]) == -1){
            self.upOrDownIds.push(val[i].id);
          }

        }
        console.log('ids',self.upOrDownIds)

        console.log('vall',val)
        if (val.length > 0) {

          self.multipleSelection = val;
          self.selectionObj[self.pageNum] = val;

        }
      },
      update(id, goodsId) {//修改商品详情
        let url = '/goods/updateGoods/' + id + '/' + goodsId;
        this.$router.push(url);
      },
      createGoods() {
        this.$router.push('/goods/createGoods');
      },
      outputFile() {//导出
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
      },
      multipleInputGoods() {
        this.$router.push('/goods/multipleInputGoods');
      },
      multipleInputImgs() {
        this.$router.push('/goods/multipleInputImgs');
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
      deleteGoods() {//删除商品
        this.$confirm('请确认是否批量删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '您已成功删除!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消删除'
          });
        });
      },
      setTags() {//设置标签
        this.dialogTableVisible = true;
      },
      cancelSelect() {//取消选中
        this.$refs.multipleTable.clearSelection();
      }

    }
  }
</script>
