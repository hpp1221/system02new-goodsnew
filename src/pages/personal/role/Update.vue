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
            @check-change="checkChange"
            :default-checked-keys="defaultPermission"
            v-if="permissionComplete"
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
        addForm: {
          name: '',
          status: 1,
          remarks: ''
        },
        data: [],
        defaultPermission: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        permissionComplete: false,//权限请求完毕
      }
    },
    created(){
      this.selectPermissionList();
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    methods: {
      select(id){//查询该角色的权限
        let self = this;
        let requestData = {
          roleId: id,
        };
        self.httpApi.role.selectRoleInfoById(requestData, function (data) {
          self.defaultPermission = data.data.permissionIds;
          self.addForm = self.formPass(self.addForm, data.data);
          self.permissionComplete = true;
        });
      },
      checkChange(obj, isChecked, other){
        let checkedKeys = this.$refs.tree.getCheckedKeys()
        if (isChecked) {
          if (obj.pid.indexOf(checkedKeys) == -1 && obj.pid != 0) {
            this.$refs.tree.setChecked(obj.pid, true, false)
          }
        } else {
          if (obj.children) {
            for (let i = 0; i < obj.children.length; i++) {
              this.$refs.tree.setChecked(obj.children[i].permissionId, false, false);
            }
          }
        }
      },
      selectPermissionList(){//查询权限树
        let self = this;
        let requestData = {};
        self.httpApi.permission.selectPermissionList(requestData, function (data) {
          self.data = data.data;
        });
      },
      sureAddRole(){
        let self = this;
        let str = '';
        for (let i = 0; i < this.$refs.tree.getCheckedKeys().length; i++) {
          str += this.$refs.tree.getCheckedKeys()[i] + ',';
        }
        str = str.substring(0, str.length - 1);
        let requestData = {
          permissionIdStr: str,
          roleId: self.$route.params.id
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.addForm));
        self.httpApi.role.updateRole(requestData, function (data) {
          self.$message.success('修改成功');
          self.$router.push('/personal/role/list');
        });
      },
      cancel(){
        this.$router.push('/personal/role/list');
      }
    }
  }
</script>
