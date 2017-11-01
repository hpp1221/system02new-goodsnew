<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">库存盘点</h3>
      <el-steps :active="active">
        <el-step title="上传导入文件"></el-step>
        <el-step title="预览数据"></el-step>
        <el-step title="导入完成"></el-step>
      </el-steps>
      <el-form v-if="active == 1" label-width="150px">
        <el-form-item label="1、选择盘点仓库">
          <!--<el-select v-model="form.storeId">-->
          <!--<el-option v-for="item in storeIds" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
          <!--</el-select>-->
          <addressselect @getAddressSelect="getAddressSelect">{{form.addressId}}</addressselect>
        </el-form-item>
        <el-form-item label="2、商品库存数据下载">
          <catselect @getCatSelect="getCatSelect">{{form.catId}}</catselect>
          <!--<el-cascader-->
          <!--:options="totalCategories"-->
          <!--v-model="form.catId"-->
          <!--@active-item-change="getCatList"-->
          <!--placeholder="商品分类"-->
          <!--:props="props"-->
          <!--@click.native="getCat"-->
          <!--:show-all-levels="false">-->
          <!--</el-cascader>-->
          <el-button type="text" @click="getExcel">下载商品库存数据模板</el-button>
        </el-form-item>
        <el-form-item label="3、导入数据">
          <el-upload action="/ui/analysisExcel" :on-success="uploadSuccess" :on-remove="removeExcel"
                     :file-list="form.excelFile" multiple style="width: 300px;">
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
            <el-table-column label="商品编码" prop="number">

            </el-table-column>
            <el-table-column label="商品名称" prop="name">

            </el-table-column>
            <el-table-column label="规格" prop="sku">

            </el-table-column>
            <el-table-column label="条形码" prop="barCode">

            </el-table-column>
            <el-table-column label="商品状态" prop="status">

            </el-table-column>
            <el-table-column label="商品分类" prop="catName">

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
        totalStores: [],//仓库列表
        totalCategories: [],//分类列表
        props: {
          value: 'res',
          children: 'children',
          label: 'name'
        },
        catIds: '',
        form: {
          addressId: '',
          catId: '',
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
      'download-excel': require('vue-json-excel'),
      'addressselect': require('../../../components/getaddressselect'),
      'catselect': require('../../../components/getcatselect'),
    },
    methods: {
      getAddressSelect(e) {
        this.form.addressId = e.addressId;
      },
      getCatSelect(e) {
        this.form.catId = e.catId;
      },
      getCat() {
        if (this.totalCategories.length === 0) {
          this.getCatList();//获取分类列表
        }
      },
      next() { //下一步
        this.excelAnalysisStatus ? this.active++ : this.$message.error('请添加模板数据');
      },
      getExcel() {//下载excelmodel
        if (this.form.addressId && this.form.catId) {
          location.href = '/ui/export?addressId=' + this.form.addressId + '&catId=' + this.form.catId + '&token=' + window.localStorage.getItem('token')
        }
      },
      uploadSuccess(response, file, fileList) { //成功上传的回调
        this.excelAnalysisStatus = true;
        this.form.excelFile = [file]
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
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
        this.active++;
        let string = encodeURI(JSON.stringify(this.excelResponse));
        location.href = '/ui/checkExcel?data=' + string + '&catId=' + this.form.catId + '&addressId=' + this.form.addressId + '&token=' + window.localStorage.getItem('token')
      }
    }
  }
</script>
