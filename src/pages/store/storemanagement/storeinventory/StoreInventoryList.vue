<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">门店盘点</h3>
      <el-steps :active="active">
        <el-step title="上传导入文件"></el-step>
        <el-step title="预览数据"></el-step>
        <el-step title="导入完成"></el-step>
      </el-steps>
      <el-form v-if="active == 1" label-width="150px">
        <el-form-item label="1、选择盘点门店">
          <el-select v-model="form.storeId">
            <el-option v-for="item in storeIds" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="2、商品库存数据下载">
          <!--<el-select v-model="form.catId">-->
          <!--<el-option v-for="tt in totalCategories"-->
          <!--:key="tt.id"-->
          <!--:value="tt.id"-->
          <!--:label="tt.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <el-cascader
            :options="totalCategories"
            v-model="form.catId"
            @active-item-change="getCatList"
            placeholder="商品分类"
            :props="props"
            @click.native="getCat"
            :show-all-levels="false">
          </el-cascader>
          <el-button type="text" @click="getExcel">下载商品库存数据模板</el-button>
        </el-form-item>
        <el-form-item label="3、导入数据">
          <el-upload action="/ui/analysisCheckStoreExcel" :on-success="uploadSuccess" :on-remove="removeExcel" :file-list="form.excelFile" multiple style="width: 300px;">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="next">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="active == 2">
        <el-form-item>
          <el-table :data="excelResponse" border>
            <el-table-column label="编码" prop="number">

            </el-table-column>
            <el-table-column label="商品名称" prop="name">

            </el-table-column>
            <el-table-column label="规格" prop="sku">

            </el-table-column>
            <el-table-column label="条形码" prop="barCode">

            </el-table-column>
            <el-table-column label="商品状态" prop="isUp">

            </el-table-column>
            <el-table-column label="单位" prop="unit">

            </el-table-column>
            <el-table-column label="库存上限" prop="upLimit">

            </el-table-column>
            <el-table-column label="库存下限" prop="downLimit">

            </el-table-column>
            <el-table-column label="库存数量" prop="inStoreHouse">

            </el-table-column>
            <el-table-column label="盘点数量" prop="relNum">

            </el-table-column>
            <el-table-column label="备注" prop="remark">

            </el-table-column>

          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button @click="goBack">返回上一步</el-button>
          <el-button @click="sureExport">确定导入</el-button>
        </el-form-item>

      </el-form>
      <el-form v-if="active == 3">
      </el-form>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 1,
        storeIds:[],//门店列表
        totalCategories:[],//分类列表
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        catIds:'',
        form: {
          storeId: '',
          catId: [],
          excelFile: []
        },
        excelResponse: [], //excel解析后的数据
        excelAnalysisStatus: false, //excelResponse默认是数组，不传数据也可以直接下一步，所以要先false
        json_fields: {
          "商品编码": "String",
          "商品名称": "String",
          "规格": "String",
          "条形码": "String",
          "商品状态": "String",
          "商品分类": "String",
          "单位": "String",
          "库存上限": "String",
          "库存下限": "String",
          "库存数量": "String",
          "实际数量": "String",
          "备注": "String",
        },
        json_meta: [
          [{
            "key": "charset",
            "value": "utf-8"
          }]
        ],
      }
    },
    components: {
      'download-excel': require('vue-json-excel')
    },
    created(){
      this.getStoreList()
    },
    methods: {
      getStoreList(){//门店列表
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token')
        };
        self.$http.post('/ui/storeList', self.qs.stringify(requestData)).then(function (response) {
          console.log('store',response)
          let data = response.data;
          if (data.code == 10000) {
            self.storeIds = data.data
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCat(){
        if (this.totalCategories.length === 0) {
          this.getCatList();//获取分类列表
        }
      },
      getCatList(val){//商品分类

        let self = this;
        var requestData;
        if (val === undefined) {
          requestData = {params: {token: window.localStorage.getItem('token')}};
        } else {
          console.log(val[val.length - 1].id)
          requestData = {params: {token: window.localStorage.getItem('token'), catId: val[val.length - 1].id}};
        }
        self.$http.get('/ui/catList', requestData).then(function (response) {
          console.log('catlist',response)
          let data = response.data;
          if (data.code === 10000) {
            for (let i = 0; i < data.data.length; i++) {
              data.data[i].res = JSON.parse(data.data[i].res);
              if (parseInt(data.data[i].hasChild) > 0) {
                data.data[i].children = [];
              }
            }
            if (val === undefined) {
              self.totalCategories = data.data;
            } else {
              self.insertCat(self.totalCategories, val, data.data, 0);

            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      insertCat(arr, val, data, level){//val:所有父级的数组,data:当前获取到的数据
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === val[level].id) {
            if (val.length === level + 1) {
              arr[i].children = data;
            } else {
              level++;
              this.insertCat(arr[i].children, val, data, level);
            }
          }
        }
      },
      next() { //下一步
        this.excelAnalysisStatus ? this.active++ : this.$message.error('请添加模板数据');
      },
      getExcel(){//下载excelmodel
        if(this.form.storeId && this.form.catId){
          location.href = '/ui/exportStore?addressId=' + this.form.storeId + '&catId=' + this.form.catId[this.form.catId.length - 1].id
        }
      },
      uploadSuccess(response, file, fileList) { //成功上传的回调
        console.log(file);
        this.excelAnalysisStatus = true;
        this.form.excelFile = [file]
        if(response.data.length > 0) {
          for(let i = 0; i < response.data.length; i++) {
            this.excelResponse = response.data;
          }
        } else {
          this.form.excelFile = []
          this.$message.error(response.message);
        }

      },
      removeExcel() { //清空文件
        this.form.excelFile = []
        this.excelAnalysisStatus = false;
      },
      goBack() { //返回上一步
        this.active--;
      },
      sureExport() { //确定导入
//        this.active++
//        let self = this
//        let requestData = {
//          token: window.localStorage.getItem('token'),
//          data: JSON.stringify(self.excelResponse),
//          addressId:self.form.storeId,
//          catId:self.catIds
//        };
        let string = JSON.stringify(this.excelResponse);
        location.href = '/ui/checkStoreExcel?data=' + string+ '&catId=' +  this.form.catId[this.form.catId.length - 1].id+ '&addressId=' + this.form.storeId
//        self.$http.get('/ui/checkStoreExcel', self.qs.stringify(requestData)).then(function(res) {
//          let data = res.data;
//          if(data.code == 10000) {
////            self.$router.push('/supplier/suppliers/supplierlist');
//          }
//        }).catch(function(error) {
//          console.log(error);
//        });
      }
    }
  }
</script>
