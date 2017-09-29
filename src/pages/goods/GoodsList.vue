<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">商品列表</h3>
      <el-form ref="easyForm" :model="easyForm" inline v-if="!advanceSearch" class="request-form">
        <el-form-item>
          <el-cascader
            :options="totalCategories"
            v-model="easyForm.cat"
            @active-item-change="getCatChild"
            placeholder="商品分类"
            :props="props">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="商品状态" v-model="easyForm.type">
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="advanceSearch = true">高级搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
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
      <el-form ref="form" :model="form" v-if="advanceSearch" class="request-form">
        <el-form-item label="关键词">
          <el-input placeholder="请输入商品名称/编码/按商品合并/关键字/条形码" v-model="form.keyword" class="long-input">

          </el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            :options="totalCategories"
            v-model="form.cat"
            @active-item-change="getCatChild"
            placeholder="商品分类"
            :props="props">
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品品牌">
          <el-select placeholder="请选择商品品牌" v-model="form.brand" value-key="name">
            <el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalBrandList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属供应商">
          <el-input placeholder="请输入供应商名称" class="form-input" v-model="form.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="商品标签">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox :label="t" v-for="t in goodsTags" :key="t.id">{{t.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="所属仓库">
          <el-checkbox-group v-model="form.addressList">
            <el-checkbox :label="t" v-for="t in totalAddressList" :key="t.id">{{t.address}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="库存状态">
          <el-checkbox label="高于库存上限值" v-model="form.upLimit" :true-label="1" :false-label="0"></el-checkbox>
          <el-checkbox label="低于库存下限值" v-model="form.downLimit" :true-label="1" :false-label="0"></el-checkbox>
          <el-checkbox label="库存<=0商品" v-model="form.zero" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-radio class="radio" v-model="form.type" :label="-1">全部</el-radio>
          <el-radio class="radio" v-model="form.type" :label="1">上架</el-radio>
          <el-radio class="radio" v-model="form.type" :label="0">下架</el-radio>
        </el-form-item>
        <el-form-item label="商品来源">
          <el-radio class="radio" v-model="form.source" :label="-1">全部</el-radio>
          <el-radio class="radio" v-model="form.source" :label="0">手动新增</el-radio>
          <el-radio class="radio" v-model="form.source" :label="1">批量导入</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button @click="select">查询</el-button>
          <el-button type="text" @click="advanceSearch = false">取消高级搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="goodslist-check-div" v-if="multipleSelection.length > 0">
        <el-button icon="close" type="text" @click="cancelSelect"></el-button>
        <span>已选择{{multipleSelection.length}}项</span>
        <el-button icon="check" @click="putOnSale">上架</el-button>
        <el-button icon="close" @click="downSale">下架</el-button>
        <el-button icon="delete" @click="deleteGoods">删除</el-button>
        <el-button icon="setting" @click="setTags">设置标签</el-button>
      </div>
      <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="商品图片">
          <template scope="scope">
            <img :src="scope.row.img" alt="" style="width: 60px;height: 60px;vertical-align: middle;text-align: center;"/>
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
          <template scope="scope">
            <el-dropdown trigger="click">
              <el-button type="text" icon="more"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="update(scope.row.id,scope.row.goodsId)">修改</el-dropdown-item>
                <el-dropdown-item>明细</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="批量设置标签" v-model="dialogTableVisible">
        <el-table :data="multipleSelection">
          <el-table-column label="商品编码" prop="barCode">

          </el-table-column>
          <el-table-column label="商品名称" prop="name">

          </el-table-column>
          <el-table-column label="规格" prop="sku">

          </el-table-column>
          <el-table-column label="商品上架">
            <template scope="scope">
              <el-checkbox>新品上架</el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="sureSetTags">确定</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </el-dialog>
      <pagination @getPageSize="getPageSize" @getPageNum="getPageNum" :totalPage="totalPage"></pagination>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tableData:[
          {
            goodsName:'辣条',
            goodsSpec:'ns123as',

          },
          {
            goodsName:'饼干',
            goodsSpec:'ab321gs',

          },
        ],
        advanceSearch:false,
        form:{
          storeHouseAddress:'',//所属仓库
          tagId:'',//商品标签
          storeStatus:'',//库存状态
          goodsStatus:'',//商品状态
          keyword:'',//关键词
          series:'',//商品分类
          cat:[],
          brand:'',//商品品牌
          supplierName:'',//供应商名称
          tags:[],//标签
          source:-1,//商品来源,全部是-1，手动新增0，批量导入1
          type:-1,//商品状态
          upLimit:1,
          downLimit:1,
          zero:1,
          addressList:[],//所属仓库
        },
        easyForm:{//简单查询
          cat:[],//所属仓库
          type:'',//1是上架，0是下架
        },
        pageSize:5,
        pageNum:1,
        totalPage:10,
        multipleSelection: [],//选中项
        dialogTableVisible:false,//设置标签表格是否可见
        totalCategories:[],//分类列表
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        totalBrandList:[],
        totalAddressList:[]

      }
    },
    watch:{
      advanceSearch:function(){//点击高级搜索和取消时重新查询
        this.select();
      },
      pageSize:function(newVal,oldVal){
        this.select();
      },
      pageNum:function(newVal,oldVal){
        this.select();
      }
    },
    created(){
      let self = this;
      self.select();
      self.getBrandList(function(data){
        self.totalBrandList = data;
      });//获取品牌列表
      self.getTagList(function(data){
        self.goodsTags = data;
        self.form.tags = data;
      });//获取标签列表
      self.getAddressList(function(data){
        self.totalAddressList = data.data;
        self.form.addressList = data.data;
      });
      self.getCatList();//获取分类列表
    },
    components:{
      'pagination':require('../../components/pagination')
    },
    methods:{
      getPageSize(val){
        this.pageSize = val;
      },
      getPageNum(val){
        this.pageNum = val;
      },
      select(){//查询
        let self = this;

        let requestData = {
          token: window.localStorage.getItem('token'),
          pageSize:self.pageSize,
          pageNo:self.pageNum
        };

        if(self.advanceSearch){//高级搜索
          requestData = Object.assign(requestData,self.shallowCopy(self.form));
        }else{//简单搜索
          requestData = Object.assign(requestData,self.shallowCopy(self.easyForm));
        }

        self.$http.post('/ui/skuList',self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('skuList',response)
          if(data.code == 10000){
            self.tableData = data.data.list;
            self.totalPage = data.data.total;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCatList(){//获取分类最外层列表
        let self = this;
        let requestData = {params:{token: window.localStorage.getItem('token')}};
        self.$http.get('/ui/catList',requestData).then(function (response) {
          let data = response.data;
          console.log('catList',response)
          if(data.code == 10000){
            for(let i = 0;i < data.data.length;i++){
              if(parseInt(data.data[i].hasChild) > 0){
                data.data[i].children = [];
              }
            }
            self.totalCategories = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCatChild(val) {//获取子集分类
        let self = this;
        let requestData = {params:{token: window.localStorage.getItem('token'),catId:JSON.parse(val).id}};
        self.$http.get('/ui/catList',requestData).then(function (response) {
          let data = response.data;
          console.log(data);
          if(data.code == 10000){
            for(let i = 0;i < self.totalCategories.length;i++){
              if(self.totalCategories[i].id === JSON.parse(val).id){
                for(let j = 0;j < data.data.length;j++){
                  if(parseInt(data.data[j].hasChild) > 0){
                    data.data[j].children = [];
                  }
                }
                self.totalCategories[i].children = data.data;
              }
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      sureSetTags(){//确定设置标签

      },
      handleSelectionChange(val){
        this.multipleSelection = val;
        console.log(val);
      },
      update(id,goodsId){//修改商品详情
        this.$router.push({path:'/goods/updateGoods',query:{id:id,goodsId:goodsId}});
      },
      createGoods(){
        this.$router.push('/goods/createGoods');
      },
      outputFile(){//导出

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
          console.log('123')
          let requestData = {
            token: window.localStorage.getItem('token'),
            skuList:JSON.stringify(self.multipleSelection),
            type:1
          };
          self.$http.post('/ui/upOrDownGoods',self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            console.log(data);
            if(data.code == 10000){
              self.$router.go(0);
            }
          }).catch(function (error) {
            console.log(error);
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
            skuList:JSON.stringify(self.multipleSelection),
            type:0
          };
          self.$http.post('/ui/upOrDownGoods',self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            console.log(data);
            if(data.code == 10000){
              self.$router.go(0);
            }
          }).catch(function (error) {
            console.log(error);
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

<style>
</style>
