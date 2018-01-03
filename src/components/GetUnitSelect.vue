<template>
  <el-select :placeholder="placeholderString" v-model="unit" @click.native="selectClick"
             @change="getUnit" :disabled="disabled">
    <el-option label="全部" :value="''" v-if="selectAllVisible"></el-option>
    <el-option :label="t.name" :value="t.name" :key="t.name" v-for="t in totalUnitList"></el-option>
  </el-select>
</template>
<script>
  export default{
    data(){
      return {
        unit: '',
        totalUnitList: [],
        dataFetchComplete: false,//数据是否
      }
    },
    created(){
      if (!this.isClickFetch) {
        this.fetchData();
      }
      if (this.outUnit) {
        this.unit = this.outUnit;
      }
    },
    props: {
      isClickFetch: {//true则点击获取数据，false则create时获取数据
        type: Boolean,
        default: true//默认点击时获取
      },
      placeholderString: {
        default: "请选择单位"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      outUnit: '',
      selectAllVisible: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      fetchData(){
        let self = this;
        self.getUnitList(function (data) {
          self.totalUnitList = data.list;
          self.dataFetchComplete = true;
        });//获取品牌列表
      },
      selectClick(){
        if (this.isClickFetch && !this.dataFetchComplete) {
          this.fetchData();
        }
      },
      getUnit(unit){

        this.$emit('getUnitSelect', unit);
      }
    }
  }
</script>
