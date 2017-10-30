<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item label="商品分类">
          <catselect @getCatSelect="getCatSelect"></catselect>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select placeholder="商品状态" v-model="easyForm.type">
            <el-option label="全部" :value="''"></el-option>
            <el-option label="上架" :value="1"></el-option>
            <el-option label="下架" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-dropdown trigger="click">
            <el-button>导入</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="multipleInputGoods">批量导入商品</el-dropdown-item>
              <el-dropdown-item @click.native="multipleInputImgs">批量导入图片</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-form-item>
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
        <el-button icon="setting" @click="setTags">设置标签</el-button>
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
        <el-table-column prop="inStoreHouse" label="库存数量">

        </el-table-column>
        <el-table-column prop="supplierName" label="所属供应商">

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
      <el-dialog title="高级搜索" :visible.sync="advanceSearch">
        <el-form ref="form" :model="form" class="request-form">
          <el-form-item label="关键词">
            <el-input placeholder="请输入商品名称/编码/按商品合并/关键字/条形码" v-model="form.keyword" class="long-input">

            </el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <catselect @getCatSelect="getFormCatSelect"></catselect>
          </el-form-item>
          <el-form-item label="商品品牌">
            <brandselect @getBrandSelect="getBrandSelect" :outBrand="form.brand" :isClickFetch="false"></brandselect>
          </el-form-item>
          <el-form-item label="所属供应商">
            <supplierselect @getSupplierSelect="getSupplierSelect" :outSupplier="form.supplier"
                            :isClickFetch="false"></supplierselect>
          </el-form-item>
          <el-form-item label="商品标签">
            <getcheckbox
              @getCheckList="getTagsCheckList"
              :dataList="goodsTags">
            </getcheckbox>
          </el-form-item>
          <el-form-item label="所属仓库">
            <getcheckbox
              @getCheckList="getAddressCheckList"
              :dataList="totalAddressList">
            </getcheckbox>
          </el-form-item>
          <el-form-item label="库存状态">
            <el-checkbox v-model="form.upLimit" label="高于库存上限值" :true-label="1" :false-label="0"></el-checkbox>
            <el-checkbox v-model="form.downLimit" label="低于库存下限值" :true-label="1" :false-label="0"></el-checkbox>
            <el-checkbox v-model="form.zero" label="库存<=0商品" :true-label="1" :false-label="0"></el-checkbox>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-radio class="radio" v-model="form.type" :label="''">全部</el-radio>
            <el-radio class="radio" v-model="form.type" :label="1">上架</el-radio>
            <el-radio class="radio" v-model="form.type" :label="0">下架</el-radio>
          </el-form-item>
          <el-form-item label="商品来源">
            <el-radio class="radio" v-model="form.source" :label="''">全部</el-radio>
            <el-radio class="radio" v-model="form.source" :label="0">手动新增</el-radio>
            <el-radio class="radio" v-model="form.source" :label="1">批量导入</el-radio>
          </el-form-item>
        </el-form>
        <el-button @click="advanceSelect(pageSize,pageNum)">确定</el-button>
        <el-button @click="advanceSearch = false">取消</el-button>
      </el-dialog>
      <el-dialog title="批量设置标签" :visible.sync="dialogTableVisible">
        <el-table :data="multipleSelection">
          <el-table-column label="商品编码" prop="barCode">

          </el-table-column>
          <el-table-column label="商品名称" prop="name">

          </el-table-column>
          <el-table-column label="规格" prop="sku">

          </el-table-column>
          <el-table-column label="商品上架">
            <template slot-scope="scope">
              <el-checkbox>新品上架</el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="sureSetTags">确定</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </el-dialog>
      <pagination @setChanged="pageChanged" :totalPage="totalPage"></pagination>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tableData: [],
        advanceSearch: false,
        form: {
          //        storeHouseAddress: '',//所属仓库
//          storeStatus: -1,
//          tagId: '',//商品标签
          //       goodsStatus: '',//商品状态
          keyword: '',//关键词
          //       series: '',//商品分类
          cat: [],
          brand: '',
          brandName: '',
          brandId: '',
          supplier: '',
          supplierName: '',//供应商名称
          supplierId: '',//供应商名称
          tags: [],//标签
          source: '',//商品来源,全部是-1，手动新增0，批量导入1
          type: '',//1是上架，0是下架
          upLimit: 0,
          downLimit: 0,
          zero: 0,
          addressList: [],//所属仓库
        },
        easyForm: {//简单查询
          cat: [],//所属仓库
          type: '',//1是上架，0是下架
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        multipleSelection: [],
        selectionObj: {},
        dialogTableVisible: false,//设置标签表格是否可见
        totalAddressList: [],
        goodsTags: [],
        searchType: 1//1是简单搜索，2是高级搜索
      }
    },
    created(){
      let self = this;
      self.getTagList(function (data) {
        self.goodsTags = data;
      });//获取标签列表
      self.getAddressList(function (data) {
        self.totalAddressList = data;
      });
    },
    components: {
      'pagination': require('../../components/pagination'),
      'brandselect': require('../../components/getbrandselect'),
      'supplierselect': require('../../components/getsupplierlistselect'),
      'catselect': require('../../components/getcatselect'),
      'getcheckbox': require('../../components/getcheckbox')
    },
    methods: {
      getBrandSelect(e){
        this.form.brand = e.brand;
        this.form.brandName = e.brandName;
        this.form.brandId = e.brandId;
      },
      getTagsCheckList(e){
        this.form.tags = e;
      },
      getAddressCheckList(e){
        this.form.addressList = e;
      },
      pageChanged(page){
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.searchType === 1 ? this.select(page.size, page.num) : this.advanceSelect(page.size, page.num);
      },
      getSupplierSelect(e){
        this.form.supplier = e.supplier;
        this.form.supplierName = e.supplierName;
        this.form.supplierId = e.supplierId;
      },
      getCatSelect(e){
        this.easyForm.cat = e.cat;
      },
      getFormCatSelect(e){
        this.form.cat = e.cat;
      },
      seeDetail(id){
        let url = '/goods/goodsDetail/' + id;
        this.$router.push(url);
      },
      select(size, num){//查询
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num,
          temp: JSON.stringify(self.selectionObj)
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
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
      advanceSelect(size, num){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize: size,
          pageNo: num
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
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
      sureSetTags(){//确定设置标签

      },
      handleSelectionChange(val){
        if (val.length > 0) {
          this.multipleSelection = val;
          this.selectionObj[this.pageNum] = val;
        }
      },
      update(id, goodsId){//修改商品详情
        let url = '/goods/updateGoods/' + id + '/' + goodsId;
        this.$router.push(url);
      },
      createGoods(){
        this.$router.push('/goods/createGoods');
      },
      outputFile(){//导出

        let arr = [];
        for (let i in this.selectionObj) {
          for (let j = 0; j < this.selectionObj[i].length; j++) {
            arr.push(this.selectionObj[i][j].id);
          }
        }
        let url = 'ui/exportGoods?token=' + localStorage.getItem('token');
        let str = '';
        if (arr.length === 0) {
          if (this.searchType === 1) {
            str = '&cat=' + JSON.stringify(this.easyForm.cat) + '&type=' + this.easyForm.type;
          } else {
            str = '&keyword=' + this.form.keyword +
              '&cat=' + JSON.stringify(this.form.cat) +
              '&brandName=' + this.form.brandName +
              '&supplierName=' + this.form.supplierName +
              '&tags' + JSON.stringify(this.form.goodsTags) +
              '&addressList=' + JSON.stringify(this.form.addressList) +
              '&upLimit=' + this.form.upLimit +
              '&downLimit=' + this.form.downLimit +
              '&zero=' + this.form.zero +
              '&type' + this.form.type +
              '&source' + this.form.source;
          }
          location.href = url + str;
        } else {
          location.href = url + '&skuList=' + JSON.stringify(arr);
        }
      },
      multipleInputGoods(){
        this.$router.push('/goods/multipleInputGoods');
      },
      multipleInputImgs(){
        this.$router.push('/goods/multipleInputImgs');
      },
      putOnSale(){//上架
        let self = this;
        self.$confirm('请确认是否批量上架？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            token: window.localStorage.getItem('token'),
            skuList: JSON.stringify(self.multipleSelection),
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
      downSale(){//下架
        let self = this;
        self.$confirm('请确认是否批量下架？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            token: window.localStorage.getItem('token'),
            skuList: JSON.stringify(self.multipleSelection),
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
      deleteGoods(){//删除商品
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
      setTags(){//设置标签
        this.dialogTableVisible = true;
      },
      cancelSelect(){//取消选中
        this.$refs.multipleTable.clearSelection();
      }

    }
  }
</script>
