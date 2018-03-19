<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">临时商品列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline class="request-form">
        <el-form-item label="商品分类">
          <catselect @getCatSelect="getCatSelect"></catselect>
        </el-form-item>
        <el-form-item label="商品编码">
         <el-input v-model.trim="easyForm.number"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model.trim="easyForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="select(pageSize,pageNum)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="createGoods">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img v-lazy="scope.row.url" alt=""
                 style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="商品编码">

        </el-table-column>
        <el-table-column prop="name" label="商品名称">

        </el-table-column>
        <el-table-column prop="price" label="价格">

        </el-table-column>
        <el-table-column prop="hot" label="热度">

        </el-table-column>
        <el-table-column prop="catPname" label="一级分类">

        </el-table-column>
        <el-table-column prop="catName" label="二级分类">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row.id)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="deleteTemporary(scope.row.id)">删除</el-dropdown-item>
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
          name:'',//商品名称
          number:'',//商品编码
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
        multipleSelection: [],
      }
    },
    created() {
    },
    components: {
      'pagination': require('../../components/pagination'),
      'catselect': require('../../components/getcatselect'),
    },
    activated(){
      this.select(localStorage.getItem('pageSizeList'),localStorage.getItem('pageNumList'))
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.select(page.size, page.num);
        localStorage.setItem('pageSizeList',page.size);
        localStorage.setItem('pageNumList',page.num);
      },
      getCatSelect(e) {
        this.easyForm.cat = e.cat;
        this.easyForm.catId = e.catId,
        this.easyForm.catName = e.catName
      },
      deleteTemporary(id) {//删除单条商品
        let self = this;
        self.$confirm('请确认是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.httpApi.temporary.deleteFalseGoodsById({id:id}, function (data) {
            self.select(self.pageSize,self.pageNum);
          });
          self.$message({
            type: 'success',
            message: '您已成功删除!'
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '您已取消删除'
          });
        });
      },
      select(size, num) {//查询
        let self = this;
        let requestData = {
          pageSize: size,
          pageNo: num,
          catId:self.easyForm.catId,
          catName:self.easyForm.catName,
          name:self.easyForm.name,
          number:self.easyForm.number
        };
//        requestData = Object.assign(requestData, self.shallowCopy(self.easyForm));
        self.httpApi.temporary.selectFalseGoodsList(requestData, function (data) {
          self.tableData = data.data.pageInfo.list;
          self.totalPage = data.data.pageInfo.total;
        });
      },
      handleSelectionChange(val) {
      },
      update(id) {//修改商品详情
        let url = '/temporary/update/' + id;
        this.$router.push(url);
      },
      createGoods() {
        this.$router.push('/temporary/create');
      },

    }
  }
</script>
