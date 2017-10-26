<template>
  <div>
    <el-checkbox v-model="checkAllStatus" @change="statusAllChange">全选</el-checkbox>
    <el-checkbox-group
      v-model="data"
      @change="statusChange"
      style="display: inline;margin-left: 30px">
      <el-checkbox
        v-for="d in dataList"
        :key="d[valueId]"
        :label="d[valueId]">
        {{d[valueName]}}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        data: [],
        checkAllStatus: false
      }
    },
    props: {
      dataList: {
        type: Array
      },
      valueId: {
        type: String,
        default: 'id'
      },
      valueName: {
        type: String,
        default: 'name'
      }
    },
    watch: {
      data: function (newVal, oldVal) {
        this.$emit('getCheckList', newVal);
      }
    },
    methods: {
      statusAllChange(event){//全选按钮
        this.data = [];
        if (event) {
          for (let i = 0; i < this.dataList.length; i++) {
            this.data.push(this.dataList[i].id);
          }
        }
      },
      statusChange(value){//单个按钮
        let checkedCount = value.length;
        this.checkAllStatus = checkedCount === this.dataList.length;
      }
    }
  }
</script>
