<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="page-title">供应商修改</h3>

      <el-form ref="form" :model="form" class="request-form" label-width="120px" style="width:700px" inline>
        <el-form-item label="供应商名称">
          <el-input v-model="form.name" class="form-input">
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
          <el-button @click.native="submit('form')">保存</el-button>
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
          number: '',
          email: ''
        }
      }
    },
    watch: {},
    created() {
      this.$route.params.supplierId ? this.select(this.$route.params.supplierId) : this.$router.push('/error')
    },
    methods: {
      select(supplierId) {
        let self = this
        let requestData = {
          token: window.localStorage.getItem('token'),
          supplierId: supplierId
        };
        self.httpApi.supplier.getById(requestData, function (data) {
          self.form = data.data;
        });
      },
      submit(formName) {//修改后保存
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let self = this;
            let requestData = {
              token: window.localStorage.getItem('token')
            };
            requestData = Object.assign(requestData, self.shallowCopy(self.form));
            self.httpApi.supplier.modifySupplier(requestData, function (data) {
              self.$router.push('/supplier/suppliers/supplierlist');
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
    }
  }
</script>
