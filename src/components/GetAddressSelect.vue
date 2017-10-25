<template>
  <el-select :placeholder="placeholderString" v-model="address" value-key="id" @click.native="selectClick"
             @change="getAddress" :disabled="disabled" :loading="loading">
    <el-option label="全部仓库" :value="''" v-if="selectAllVisible"></el-option>
    <el-option :label="t.name" :value="t" :key="t.name" v-for="t in totalAddressList"></el-option>
  </el-select>
</template>
<script>
  export default{
    data(){
      return {
        address: '',
        loading: false,
        totalAddressList: [],
        dataFetchComplete: false,//数据是否
      }
    },
    created(){
      if (!this.isClickFetch) {
        this.fetchData();
      }
      if (this.outAddress) {
        this.address = this.outAddress;
      }
    },
    props: {
      isClickFetch: {//true则点击获取数据，false则create时获取数据
        type: Boolean,
        default: true//默认点击时获取
      },
      placeholderString: {
        default: "请选择仓库"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      outAddress: '',
      selectAllVisible: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      fetchData(){
        let self = this;
        self.loading = true;
        self.getAddressList(function (data) {
          self.loading = false;
          self.totalAddressList = data;
          self.dataFetchComplete = true;
        });//获取品牌列表
      },
      selectClick(){
        if (this.isClickFetch && !this.dataFetchComplete) {
          this.fetchData();
        }
      },
      getAddress(address){
        this.$emit('getAddressSelect', {address: address, addressName: address.name, addressId: address.id});
      }
    }
  }
</script>
