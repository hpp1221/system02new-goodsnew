<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">门店要货</h3>
      <el-button class="dictionarycreate" @click="createStoreGetGoods">新增</el-button>
      <!--选择表单-->
      <el-form :inline="true" :model="formInline" class="demo-form-inline storegetgoods-nav">
        <el-form-item label="单据状态">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="要货门店">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item><el-form-item>
        <el-button type="primary" @click="onSearch">高级搜索</el-button>
      </el-form-item>
      </el-form>
      <!--门店要货表格-->
      <el-table :data="tableData" ref="multipleTable" border tooltip-effect="dark" style="width: 100%"
                class="categories">
        <el-table-column prop="name" label="门店名称">
        </el-table-column>
        <el-table-column prop="number" label="门店编码">
        </el-table-column>
        <el-table-column prop="address" label="门店地址">
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-button
              size="small"
              @click="updateStoreHouse(scope.$index, scope.row)" class="el-icon-edit updatecategories">修改
            </el-button>
            <el-button
              size="small"
              @click="handleDelete(scope.$index, scope.row)" class="el-icon-delete updatecategories">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right;margin-top: 110px;">
      </pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        formInline: {
          user: '',
          region: ''
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: 10,
      };
    },
    created() {
      this.getStoreHouseList()
    },
    components: {
      'pagination': require('../../../../components/pagination')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.getStoreHouseList(page.size, page.num);
      },
      onSearch(){

      },
      getStoreHouseList(size,num) {//仓库列表
        let self = this
        let params = {
          token: window.localStorage.getItem('token'),
          pageSize:size,
          pageNo: num
        };
        self.$http.post('/ui/addressList', self.qs.stringify(params)).then(function (response) {
          console.log('getStoreHouseList', response)
          let data = response.data
          if (data.code == 10000) {
            self.tableData = data.data.list
            self.totalPage = data.data.total
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      createStoreHouse() {//新增弹框
        this.createStore = true
        this.createForm = {data: {name: '', number: '', address: ''}};
      },
      createStoreHouseSure() {//新增确定
        let self = this
        let requestData = {
          name: self.createForm.name,
          number: self.createForm.number,
          address: self.createForm.address,
          token: window.localStorage.getItem('token')
        };
        self.$http.post('/ui/createStoreHouse', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('storehouse', response)
          if (data.code == 10000) {
            self.createStore = false
            self.$message.success('添加成功')
            self.getStoreHouseList(self.pageSize,self.pageNum)
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      updateStoreHouse(index, row){
        console.log('index',index)
        console.log('row',row)
        this.updateStore = true
        this.updateForm = row
      },
      updateStoreHouseSure() {
        let self = this
        let requestData = {
          name: self.updateForm.name,
          number: self.updateForm.number,
          address: self.updateForm.address
        };
        self.$http.post('/ui/editStoreHouse', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('update', response)
          if (data.code == 10000) {
            self.updateStore = false
            self.$message.success('修改成功')
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  };
</script>
