<template>
  <div class="container">
    <div class="wrapper">


      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" inline style="padding:50px">
        <el-form-item label="客户名称">
          <el-input v-model="ruleForm.userId" style="width: 300px;margin-right: 200px;" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="反馈单号">
          <el-input v-model="ruleForm.sugId" style="width: 300px;margin-right: 200px;" :disabled="true"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="反馈时间">
          <el-input v-model="moment(ruleForm.createTime).format('YYYY-MM-DD HH:mm:ss')" style="width: 300px;margin-right: 200px;" :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="反馈类型">
          <el-select placeholder="全部" style="width:300px" v-for="t in feedbackType" :key="t.id" v-if="t.id == ruleForm.sugProType" v-model="t.name" :disabled="true">
            <el-option :label="t.name" :key="t.id" :value="t.id" v-for="t in feedbackType">{{t.name}}</el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="反馈内容">
          <el-input type="textarea" v-model="ruleForm.sugMessage" style="width: 300px;" :disabled="true"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="处理意见">
          <el-input type="textarea" v-model="ruleForm.sugRepMessage" style="width: 300px;"></el-input>
        </el-form-item>
        <br>

      </el-form>
      <div style="float: right;margin:22px 70px">
        <el-button @click="returnList">取消</el-button>
        <el-button @click="sureDetail" type="primary">完成</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        ruleForm: {
          userId: '',
          sugId: '',
          createTime: '',
          sugProType: '',
          sugMessage: '',
          sugRepMessage: ''
        },
        feedbackType: [
          {
            name: '全部'
          },
          {
            id: 1,
            name: '功能建议'
          }, {
            id: 2,
            name: '购买遇到其他问题'
          }, {
            id: 3,
            name: '性能问题'
          }, {
            id: 4,
            name: '其他问题'
          }
        ],//问题类型
        feedbackStatus: [
          {
            name: '全部'
          },
          {
            id: 0,
            name: '已处理'
          }, {
            id: 1,
            name: '未处理'
          }
        ],//状态
      };
    },
    created() {
      this.$route.params.id ? this.select(this.$route.params.id) : this.$router.push('/error');
    },
    methods: {
      select(id) {//详情
        let self = this;
        let requestData = {sugId: id};
        self.httpApi.feedback.moSug(requestData, function (data) {
          self.ruleForm = data.data;
        });
      },
      returnList(){
        this.$router.push('/feedback/list');
      },
      sureDetail() {//处理
        let self = this;
        let requestData = {
          sugId:self.$route.params.id,
          sugRepMessage: self.ruleForm.sugRepMessage,
          userId: self.ruleForm.userId,
          createTime: self.ruleForm.createTime,
          sugType: self.ruleForm.sugType,
          sugMessage: self.ruleForm.sugMessage,
        };
        self.httpApi.feedback.upSug(requestData, function (data) {
          self.$router.push('/feedback/list');
        });
      },
    }
  }
</script>
