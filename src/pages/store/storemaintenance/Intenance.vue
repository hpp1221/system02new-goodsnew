<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">门店所属仓库维护</h3>
      <el-select placeholder="仓库" v-model="storeHouse" filterable value-key="id">
        <el-option :label="t.name" :key="t.id" :value="t" v-for="t in totalStores"></el-option>
      </el-select>
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入门店"
        :titles="['门店','仓库']"
        @change="saveChange"
        v-model="value"
        v-if="data"
        :data="data">
      </el-transfer>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        storeHouse: '',//仓库
        data: [],
        shopList: [],
        storeList: [],
        value: [],
        totalStores: [],
        filterMethod(query, item){
          return item.number.indexOf(query) > -1 || item.name.indexOf(query) > -1;
        }
      };
    },
    created(){
      let self = this;
      self.getAddressList(function (data) {
        self.totalStores = data;
      });
    },
    watch: {
      storeHouse: function (newVal, oldVal) {
        this.selectShopList();
      }
    },
    methods: {
      selectShopList(){//门店列表
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
        };
        self.httpApi.store.storeListSpecial(requestData, function (data) {
          self.shopList = data.data;
//            for(let i = 0;i < self.shopList.length;i++){
//              self.shopList[i] = JSON.stringify(self.shopList[i]);
//            }
          self.selectStoreList();
        });
      },
      selectStoreList(){//仓库列表
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          storeHouseId: self.storeHouse.id
        };
        self.httpApi.store.storeHouseListSpecial(requestData, function (data) {
          self.storeList = data.data;
          let value = [];
          for (let i = 0; i < self.storeList.length; i++) {
            value.push(self.storeList[i].id);
          }
          self.value = value;
          console.log('右边的', self.storeList)
          let transferData = [];
          for (let i = 0; i < self.shopList.length; i++) {
            transferData.push(self.shopList[i]);
          }
          for (let i = 0; i < self.storeList.length; i++) {
            transferData.push(self.storeList[i]);
          }
          console.log(transferData)
          let resultData = [];
          for (let i = 0; i < transferData.length; i++) {
            resultData.push({
              key: transferData[i].id,
              label: transferData[i].name,
              number: transferData[i].number,
              name: transferData[i].name
            });
          }
          self.data = resultData;
          console.log('数据源', self.data)
        });
      },
      saveChange(value, direction, movedKeys){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          storeHouse: JSON.stringify(self.storeHouse),
          userStoreHouseAddressList: JSON.stringify(value)
        };
        self.httpApi.store.addStoreHouseContact(requestData, function (data) {
          self.$message.success('操作成功');
        });
      },

    }
  };
</script>
