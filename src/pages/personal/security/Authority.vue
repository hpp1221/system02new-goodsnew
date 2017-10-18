<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">权限管理</h3>
      <el-form :model="form" inline class="request-form">
        <el-form-item>
          <el-button @click="addAuthority(0,'无')">新增权限</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template scope="scope">
            <el-table :data="scope.row.children" :show-header="false">
              <el-table-column
                label="权限名称"
                prop="name">
              </el-table-column>
              <el-table-column
                label="备注"
                prop="remark">
              </el-table-column>
              <el-table-column
                label="创建时间"
                prop="name">
                <template scope="scope">
                  {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
                </template>
              </el-table-column>
              <el-table-column
                label="创建人"
                prop="updater">
              </el-table-column>
              <el-table-column
                label="修改时间"
                prop="name">
                <template scope="scope">
                  {{moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')}}
                </template>
              </el-table-column>
              <el-table-column
                label="修改人"
                prop="updater">
              </el-table-column>
              <el-table-column>
                <template scope="scope">
                  <el-dropdown trigger="click">
                    <i class="iconfont icon-more" style="cursor: pointer"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="addAuthority(scope.row.permissionId,scope.row.name)">添加子菜单
                      </el-dropdown-item>
                      <el-dropdown-item @click.native="update(scope.row.permissionId)">修改</el-dropdown-item>
                      <el-dropdown-item @click.native="deleteItem(scope.row.permissionId)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="权限名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="name">
          <template scope="scope">
            {{moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column
          label="创建人"
          prop="updater">
        </el-table-column>
        <el-table-column
          label="修改时间"
          prop="name">
          <template scope="scope">
            {{moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column
          label="修改人"
          prop="updater">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-dropdown trigger="click">
              <i class="iconfont icon-more" style="cursor: pointer"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="addAuthority(scope.row.permissionId,scope.row.name)">添加子菜单
                </el-dropdown-item>
                <el-dropdown-item @click.native="update(scope.row.permissionId)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="deleteItem(scope.row.permissionId)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!--<table>-->
      <!--<thead>-->
      <!--<tr>-->
      <!--<th width="12%">权限名称</th>-->
      <!--<th width="12%">备注</th>-->
      <!--<th width="12%">创建时间</th>-->
      <!--<th width="12%">创建人</th>-->
      <!--<th width="12%">修改时间</th>-->
      <!--<th width="12%">修改人</th>-->
      <!--<th width="20%">操作</th>-->
      <!--</tr>-->
      <!--</thead>-->
      <!--<tbody>-->
      <!--<tr v-for="m in configs" :id="m.permissionId">-->
      <!--<td @click="showChild(m.permissionId,m.toggle)" style="cursor:pointer;user-select:none;text-align: left;">-->
      <!--<span v-if="m.level == 1" style="margin-left:30px">{{m.level}}.</span>-->
      <!--<span v-if="m.level == 2" style="margin-left:60px">{{m.level}}.</span>-->
      <!--<span v-if="m.level == 3" style="margin-left:90px">{{m.level}}.</span>-->
      <!--<span v-if="m.level > 3" style="margin-left:120px">{{m.level}}.</span>-->
      <!--<span class="permission-td-p">{{m.name}}</span>-->
      <!--<i class="el-icon-arrow-down" v-if="m.children && !m.toggle"></i>-->
      <!--<i class="el-icon-arrow-up" v-if="m.children && m.toggle"></i>-->
      <!--</td>-->
      <!--<td>{{m.remarks}}</td>-->
      <!--<td>{{moment(m.createTime).format('YYYY-MM-DD HH:mm:ss')}}</td>-->
      <!--<td>{{m.creater}}</td>-->
      <!--<td>{{moment(m.updateTime).format('YYYY-MM-DD HH:mm:ss')}}</td>-->
      <!--<td>{{m.updater}}</td>-->
      <!--<td>-->
      <!--<el-dropdown trigger="click">-->
      <!--<el-button type="text" icon="more"></el-button>-->
      <!--<el-dropdown-menu slot="dropdown">-->
      <!--<el-dropdown-item @click.native="addAuthority(m.permissionId)">添加子菜单</el-dropdown-item>-->
      <!--<el-dropdown-item @click.native="update(m.permissionId)">修改</el-dropdown-item>-->
      <!--<el-dropdown-item @click.native="deleteItem(m.permissionId)">删除</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <!--</td>-->
      <!--</tr>-->
      <!--</tbody>-->
      <!--</table>-->

      <el-dialog title="新增子权限" :visible.sync="addAuthorityDialog" width="30%">
        <el-form ref="form" :model="addForm" label-width="70px">
          <el-form-item label="权限名称">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="上级权限">
            <!--<el-select v-model="addForm.pid" disabled v-if="addForm.pid!=0">-->
            <!--<el-option v-for="t in tableData"-->
            <!--:key="t.permissionId"-->
            <!--:value="t.permissionId"-->
            <!--:label="t.name">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <span>{{addForm.pname}}</span>
          </el-form-item>
          <el-form-item label="url">
            <el-input v-model="addForm.url"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="addForm.icon"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="addForm.orders" type="number"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="addForm.type">
              <el-option label="菜单" :value="1">

              </el-option>
              <el-option label="按钮" :value="2">

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="sureAddAuthority">确定</el-button>
            <el-button @click="addAuthorityDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="修改权限" :visible.sync="updateAuthorityDialog" size="tiny">
        <el-form ref="form" :model="updateForm" label-width="90px">
          <el-form-item label="权限名称">
            <el-input v-model="updateForm.name"></el-input>
          </el-form-item>
          <el-form-item label="上级权限">
            <el-select v-model="updateForm.pid" disabled v-if="updateForm.pid!=0">
              <el-option v-for="t in tableData"
                         :key="t.permissionId"
                         :value="t.permissionId"
                         :label="t.name">
              </el-option>
            </el-select>
            <span v-else>无</span>
          </el-form-item>
          <el-form-item label="url">
            <el-input v-model="updateForm.url"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="updateForm.icon"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="updateForm.orders" type="number"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="updateForm.type">
              <el-option label="菜单" :value="1">

              </el-option>
              <el-option label="按钮" :value="2">

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="sureUpdateAuthority">确定</el-button>
            <el-button @click="updateAuthorityDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        tableData: [],
        form: {},
        addAuthorityDialog: false,
        updateAuthorityDialog: false,
        addForm: {
          name: '',
          pid: 0,//上级部门id
          url: '',
          pids: 0,
          icon: '',
          orders: '',
          type: 1,//1菜单2按钮
          pname: ''
        },
        updateForm: {
          name: '',
          pid: 0,//上级部门id
          url: '',
          pids: 0,
          icon: '',
          orders: '',
          permissionId: '',
          type: 1,//1菜单2按钮
        },
        flag: 0,
        configs: [],
      }
    },
    updated(){
      if (this.flag != 0) {
        return;
      }
      this.flag += 1;
      this.showAll(this.configs);
    },
    created(){
      this.selectAuthority();
    },
    methods: {
      selectAuthority(){//查询权限列表
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
        };
        self.$http.post('/ui/permission/selectPermissionList', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log('selectPermissionList', response)
          if (data.code == 10000) {
            self.tableData = data.data;
//            self.configs = [];
//            self.hasNext(self.tableData);
//            console.log('configs', self.configs)
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      addAuthority(id, name){//打开添加权限模态框
        let self = this;
        self.addAuthorityDialog = true;
        self.addForm.pname = name;
        if (id !== 0) {
          let requestData = {
            token: window.localStorage.getItem('token'),
            permissionId: id
          };
          self.$http.post('/ui/permission/selectPermissionById', self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            console.log('添加', response)
            if (data.code == 10000) {
              self.addForm.pid = data.data.permissionId;
              self.addForm.pids = data.data.pids + ',' + self.addForm.pid;
            }
          }).catch(function (error) {
            console.log(error);
          });
        }

      },
      sureAddAuthority(){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
        };
        if (self.addForm.orders === '') {
          self.addForm.orders = 0;
        }
        requestData = Object.assign(requestData, self.shallowCopy(self.addForm));
        self.$http.post('/ui/permission/addPermission', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          if (data.code == 10000) {
            self.addAuthorityDialog = false;
            self.$message.success('操作成功');
            setTimeout(function () {
              self.$router.go(0);
            }, 500);

          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      sureUpdateAuthority(id){
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token'),
          companyId: JSON.parse(window.localStorage.getItem('userinfo')).companyId,
          permissionId: id
        };
        if (self.updateForm.orders === '') {
          self.updateForm.orders = 0;
        }
        requestData = Object.assign(requestData, self.shallowCopy(self.updateForm));
        self.$http.post('/ui/permission/updatePermission', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          if (data.code == 10000) {
            self.updateAuthorityDialog = false;
            self.$message.success('操作成功');
            setTimeout(function () {
              self.$router.go(0);
            }, 500);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      deleteItem(id){
        let self = this;
        this.$confirm('此操作将无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let requestData = {
            token: window.localStorage.getItem('token'),
            permissionId: id
          };
          self.$http.post('/ui/permission/deletePermission', self.qs.stringify(requestData)).then(function (response) {
            let data = response.data;
            console.log('selectOrganizationListByCompanyId', response)
            if (data.code == 10000) {
              self.$message.success('删除成功');
              self.$router.go(0);
            }
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      update(id){//修改接口
        let self = this;
        self.updateAuthorityDialog = true;

        let requestData = {
          token: window.localStorage.getItem('token'),
          permissionId: id
        };
        self.$http.post('/ui/permission/selectPermissionById', self.qs.stringify(requestData)).then(function (response) {
          let data = response.data;
          console.log(response)
          if (data.code == 10000) {
            self.updateForm = self.formPass(self.updateForm, data.data);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
//      hasNext(arr){
//        for (let i = 0; i < arr.length; i++) {
//          arr[i].pid == 0 ? this.$set(arr[i], 'show', true) : this.$set(arr[i], 'show', false);
//          this.$set(arr[i], 'toggle', false);
//          this.$set(arr[i], 'level', arr[i].pids.split(",").length);
//          this.configs.push(arr[i]);
//          if (arr[i].children) {
//            this.hasNext(arr[i].children);
//          }
//        }
//      },
      showAll(arr){
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].show) {
            if (document.getElementById(arr[i].permissionId)) {
              document.getElementById(arr[i].permissionId).style.display = "table-row";
            }

          } else {
            if (document.getElementById(arr[i].permissionId)) {
              document.getElementById(arr[i].permissionId).style.display = "none";
            }
          }
          if (arr[i].children) {
            this.showAll(arr[i].children)
          }
        }
      },
      showChild(id, toggle){
        if (toggle) {//收起子菜单
          this.deleteChild(id);
        } else {
          this.createChild(id);
        }
        for (let i = 0; i < this.configs.length; i++) {
          if (this.configs[i].permissionId == id) {
            this.configs[i].toggle = !toggle;
          }
        }
      },
      deleteChild(id){
        for (let i = 0; i < this.configs.length; i++) {
          if (this.configs[i].pid == id) {
            if (document.getElementById(this.configs[i].permissionId)) {
              document.getElementById(this.configs[i].permissionId).style.display = "none";
            }
            this.configs[i].show = false;
            this.configs[i].toggle = false;
            if (this.configs[i].children) {
              this.deleteChild(this.configs[i].permissionId);
            }
          }
        }
        this.showAll(this.configs);
      },
      createChild(id){
        for (let i = 0; i < this.configs.length; i++) {
          if (this.configs[i].pid == id) {
            if (document.getElementById(this.configs[i].permissionId)) {
              document.getElementById(this.configs[i].permissionId).style.display = "table-row";
            }
            this.configs[i].show = true;
          }
        }
        this.showAll(this.configs);
      },
    }
  }
</script>

<style scoped="scoped">
  table {
    width: 100%;
    border-collapse: collapse;
    color: #333;
    font-size: 14px;
    border: none;
    background-color: white;
  }

  thead, tbody, th, td {
    height: 40px;
  }

  th {
    font-weight: normal;
    font-size: 16px;
    background-color: #fafafa;
    border: 1px solid #ddd;
    min-width: 120px;
  }

  td {
    min-width: 120px;
    overflow: hidden;
    border: 1px solid #ddd;
    text-align: center;
  }
</style>
