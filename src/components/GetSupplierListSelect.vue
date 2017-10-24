<template>
  <el-select :placeholder="placeholderString" v-model="supplier" value-key="name" @click.native="selectClick"
             @change="getSupplier" :disabled="disabled">
    <el-option label="全部" :value="''" v-if="selectAllVisible"></el-option>
    <el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalSupplierList"></el-option>
  </el-select>
</template>
<script>
  export default{
    data(){
      return {
        supplier: '',
        totalSupplierList: [],
        dataFetchComplete: false,//数据是否
      }
    },
    created(){
      if (!this.isClickFetch) {
        this.fetchData();
      }
      if (this.outSupplier) {
        this.supplier = this.outSupplier;
      }
    },
    props: {
      isClickFetch: {//true则点击获取数据，false则create时获取数据
        type: Boolean,
        default: true//默认点击时获取
      },
      placeholderString: {
        default: "请选择供应商"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      outSupplier: '',
      selectAllVisible: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      fetchData(){
        let self = this;
        self.getSupplierList(function (data) {
          self.totalSupplierList = data;
          self.dataFetchComplete = true;
        });//获取品牌列表
      },
      selectClick(){
        if (this.isClickFetch && !this.dataFetchComplete) {
          this.fetchData();
        }
      },
      getSupplier(supplier){
        this.$emit('getSupplierSelect', {
          supplier: supplier,
          supplierName: supplier.name,
          supplierId: supplier.supplierId
        });
      }
    }
  }
</script>
