<template>
  <el-select :placeholder="placeholderString" v-model="brand" value-key="id" @click.native="selectClick"
             @change="getBrand" :disabled="disabled" filterable>
    <el-option label="" :value="'全部'" v-if="selectAllVisible"></el-option>
    <el-option :label="t.nameCn" :value="t" :key="t.id" v-for="t in totalBrandList"></el-option>
  </el-select>
</template>
<script>
  export default{
    data(){
      return {
        brand: [],
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
        let requestData = {}
        self.httpApi.brands.selectBrandAllList(requestData,function (data) {
          self.totalBrandList = data.data.list;
          self.dataFetchComplete = true;
          for(let i = 0;i < self.totalBrandList.length;i++){
            self.totalBrandList[i].id += ''
          }
          console.log(self.totalBrandList)
        });//获取品牌列表
      },
      selectClick(){
        if (this.isClickFetch && !this.dataFetchComplete) {
          this.fetchData();
        }
      },
      getBrand(brand){
        this.$emit('getBrandSelect', {brand: brand, nameCn: brand.nameCn, id: brand.id});
      }
    }
  }
</script>
