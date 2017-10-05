<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="dictionaryclassifytitle">计量单位</h3>
      <div class="dictionaryclassify-create">
        <el-button class="dictionarycreate" @click="createUnit">新增</el-button>
      </div>
      <!--新增弹框-->
      <el-dialog title="新增计量单位" v-model="dictionaryUnitCreate">
        <el-form :model="form">
          <el-form-item label="单位名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createSure">确 定</el-button>
          <el-button @click="dictionaryUnitCreate = false">取 消</el-button>
        </div>
      </el-dialog>
      <div class="dictionaryclassify-main">
        <ul class="dictionarybrand-content">
          <li v-for="item in list" class="iconfont icon-erp-R">{{item.name}}
            <el-button class="el-icon-delete icon-deletechilddependent" v-on:click="deleteUnit(item)">删除
            </el-button>
          </li>
        </ul>
      </div>
      <pagination @setChanged="pageChanged" :totalPage="totalPage" style="float: right;margin-top: 110px;">
      </pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dictionaryUnitCreate: false,//新增
        list: [],
        form: {
          name: ''
        },
        pageSize: 5,
        pageNum: 1,
        totalPage: '',
        formLabelWidth: '120px'
      };
    },
    components: {
      'pagination': require('../../components/pagination')
    },
    methods: {
      pageChanged(page) {
        this.pageSize = page.size;
        this.pageNum = page.num;
        this.getUnitList(page.size, page.num);
      },
      getUnitList(size,num) {//单位列表
        let self = this
        let params = {
          token: window.localStorage.getItem('token'),
          pageSize:size,
          pageNo: num
        };
        self.$http.post('/ui/unitList', self.qs.stringify(params)).then(function (response) {
          let data = response.data
          console.log('222',response.data.data.list)
          if (data.code === 10000) {
            self.list = data.data.list
            self.totalPage = data.data.total
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      createUnit() {//新增单元
        this.dictionaryUnitCreate = true;
        this.form = {data: {name: ''}};
      },
      createSure() {//新增确定
        let self = this
        let requestData = {
          name: self.form.name,
          token: window.localStorage.getItem('token')
        };
        self.$http.post('/ui/createUnit', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('createUnit', response)
          if (data.code == 10000) {
            self.dictionaryUnitCreate = false
            self.$message.success('添加成功')
            self.getUnitList(self.pageSize,self.pageNum)
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      deleteUnit(item){//删除
        let self = this;
        let params = { unitId: item.id};
        self.$confirm('请确认是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          self.$http.post('/ui/deleteUnit', self.qs.stringify(params)).then((res) => {
            console.log('1003',res)
            if(res.data.code == 10000) {
              self.$message({
                type: 'success',
                message: '您已成功删除!'
              });
              self.getUnitList(self.pageSize,self.pageNum)
            } else {
              self.$message({
                type: 'info',
                message: '您已取消删除'
              });
            }
          })

        })
      }
    }
  };
</script>
