<template>
  <el-select :placeholder="placeholderString" v-model="gradeType" value-key="id" @click.native="selectClick"
             @change="getGradeType" :disabled="disabled" filterable>
    <el-option :value="''" v-if="selectAllVisible"></el-option>
    <el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalGradeTypeList"></el-option>
  </el-select>
</template>
<script>
  export default{
    data(){
      return {
        gradeType: [],
        totalGradeTypeList: [],
        dataFetchComplete: false,//数据是否
      }
    },
    created(){
      if (!this.isClickFetch) {
        this.fetchData();
      }
      if (this.outGradeType) {
        this.gradeType = this.outGradeType;
      }
    },
    props: {
      isClickFetch: {//true则点击获取数据，false则create时获取数据
        type: Boolean,
        default: true//默认点击时获取
      },
      placeholderString: {
        default: "请选择贸易形态"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      outGradeType: '',
      selectAllVisible: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      fetchData(){
        let self = this;
        console.log(self.outGradeType)
        let requestData = {}
        self.httpApi.dict.selectDictByType({type:'trade_type'},function (data) {
          self.totalGradeTypeList = data.data.list;
          self.dataFetchComplete = true;
          for(let i = 0;i < self.totalGradeTypeList.length;i++){
            self.totalGradeTypeList[i].id += ''
          }
          console.log(self.totalGradeTypeList)
        });//获取品牌列表
      },
      selectClick(){
        if (this.isClickFetch && !this.dataFetchComplete) {
          this.fetchData();
        }
      },
      getGradeType(gradeType){
        this.$emit('getGradeTypeSelect', {gradeType: gradeType, tradeName: gradeType.name, tradeType: gradeType.id});
      }
    }
  }
</script>
