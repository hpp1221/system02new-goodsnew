<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">供应商新增</h3>

      <el-form ref="form" :model="form" class="request-form" label-width="100px">
        <el-form-item label="供应商名称">
          <el-input placeholder="请输入供应商名称" v-model="form.name" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="供应商电话">
          <el-input placeholder="请输入供应商电话" v-model="form.tel" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="供应商手机">
          <el-input placeholder="请输入供应商手机" v-model="form.phone" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="供应商地址">
          <el-input placeholder="请输入供应商地址" v-model="form.address" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="供应商编码">
          <el-input placeholder="请输入供应商编码" v-model="form.number" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item label="供应商邮箱">
          <el-input placeholder="请输入供应商邮箱" v-model="form.email" class="form-input">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="submit('form')">保存</el-button>
          <el-button  @click.native="createCancel">取消</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          tel: '',
          phone: '',
          address: '',
          email: ''
        },
      }
    },
    methods: {
      submit() { //保存
        let self = this;
        let requestData = {
          token: window.localStorage.getItem('token')
        };
        requestData = Object.assign(requestData, self.shallowCopy(self.form));
        self.httpApi.supplier.createSupplier(requestData, function (data) {
          self.$router.push('/supplier/suppliers/supplierlist');
        });
      },
      createCancel() {
        this.$router.push('/supplier/suppliers/supplierlist')
      }
    }
  }
</script>
