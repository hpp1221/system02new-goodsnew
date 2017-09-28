<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">修改角色</h3>
      <el-form ref="form" :model="addForm" label-width="90px" class="request-form">
        <el-form-item label="角色名称">
          <el-input v-model="addForm.name" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="addForm.status">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addForm.remarks" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            :data="data"
            show-checkbox
            default-expand-all
            node-key="permissionId"
            ref="tree"
            highlight-current
            check-strictly
            :default-checked-keys="defaultPermission"
            v-if="defaultPermission.length > 0"
            :props="defaultProps" style="float:left;width:200px;border:none">
          </el-tree>
        </el-form-item>
        <el-form-item>
          <el-button @click="sureAddRole">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  var qs = require('qs')
  export default{
    data(){
      return {
        addForm:{
          name:'',
          status:1,
          remarks:''
        },
        data: [],
        defaultPermission:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    created(){
      this.selectPermissionList();
      this.$route.query.id ?　this.select(this.$route.query.id) : this.$router.push('/error');
    },
    methods:{
      select(id){//查询该角色的权限
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          roleId:id,
        };
        self.$http.post('/ui/role/selectRoleInfoById',self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          if(data.code == 10000){
            self.defaultPermission = data.data.permissionIds;
            self.addForm = self.formPass(self.addForm,data.data);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      selectPermissionList(){//查询权限树
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
        };
        self.$http.post('/ui/permission/selectPermissionList',self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectPermissionList',response)
          if(data.code == 10000){
            self.data = data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      sureAddRole(){
        let self = this;
        let str = '';
        for(let i = 0;i < this.$refs.tree.getCheckedKeys().length;i++){
          str += this.$refs.tree.getCheckedKeys()[i] + ',';
        }
        str = str.substring(0,str.length-1);
        let requestData = {
          token: window.localStorage.getItem('token'),
          permissionIdStr:str,
          roleId:self.$route.query.id
        };
        requestData = Object.assign(requestData,self.shallowCopy(self.addForm));
        self.$http.post('/ui/role/updateRole',self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('addRole',response)
          if(data.code == 10000){
            self.$message.success('修改成功');
            self.$router.push('/personal/role/list');
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      cancel(){
        this.$router.push('/personal/role/list');
      }
    }
  }
</script>
