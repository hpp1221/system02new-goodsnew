<template>
  <el-select :placeholder="placeholderString" v-model="brand" value-key="brandId" @click.native="selectClick"
             @change="getBrand" :disabled="disabled">
    <el-option label="全部" :value="''" v-if="selectAllVisible"></el-option>
    <el-option :label="t.brandName" :value="t" :key="t.brandName" v-for="t in totalBrandList"></el-option>
  </el-select>
</template>
<script>
  export default{
    data(){
      return {
        brand: '',
        totalBrandList: [],
        dataFetchComplete: false,//数据是否
      }
    },
    created(){
      if (!this.isClickFetch) {
        this.fetchData();
      }
      if (this.outBrand) {
        this.brand = this.outBrand;
      }
    },
    props: {
      isClickFetch: {//true则点击获取数据，false则create时获取数据
        type: Boolean,
        default: true//默认点击时获取
      },
      placeholderString: {
        default: "请选择商品品牌"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      outBrand: '',
      selectAllVisible: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      fetchData(){
        let self = this;
        self.getBrandList(function (data) {
          self.totalBrandList = data.list;
          self.dataFetchComplete = true;
        });//获取品牌列表
      },
      selectClick(){
        if (this.isClickFetch && !this.dataFetchComplete) {
          this.fetchData();
        }
      },
      getBrand(brand){
        this.$emit('getBrandSelect', {brand: brand, brandName: brand.brandName, brandId: brand.brandId});
      }
    }
  }
</script>
