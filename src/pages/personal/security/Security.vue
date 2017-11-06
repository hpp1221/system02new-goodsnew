<template>
  <div class="container">
    <div class="wrapper">
      <h4 class="user-security-title">账户安全</h4>
      <div class="user-security-div">
        <h4 class="title">安全中心</h4>
        <div class="user-security-level-div">
          <p class="level-label">安全级别：</p>
          <el-progress :text-inside="true" :stroke-width="20" :percentage="90" status="success"
                       style="width:200px;display:inline-block;top:-2px"></el-progress>
          <p class="level-status">较高</p>
          <p class="suggestion">建议您启动全部安全设置。以保障账户及资金安全。</p>
        </div>
        <div class="user-security-repeat-div">
          <img src="../../../assets/images/success.png" alt="" class="status-img"/>
          <p class="label-name">登录密码</p>
          <div class="vertical-line"></div>
          <p class="label-warning">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p>
          <el-button type="text" class="update-button" @click="pwdModalVisible = true">修改</el-button>
        </div>
        <div class="user-security-repeat-div">
          <img src="../../../assets/images/success.png" alt="" class="status-img"/>
          <p class="label-name">邮箱验证</p>
          <div class="vertical-line"></div>
          <p class="label-value" v-if="userInfo.email">你验证的邮箱：<span>{{userInfo.email}}</span></p>
          <p class="label-value" v-else>未验证邮箱</p>

          <el-button type="text" class="update-button" v-if="userInfo.email" @click="emailModalVisible = true">修改
          </el-button>
          <el-button type="text" class="update-button" v-else @click="emailModalVisible = true">去验证</el-button>
        </div>
        <div class="user-security-repeat-div">
          <img src="../../../assets/images/success.png" alt="" class="status-img"/>
          <p class="label-name">手机验证</p>
          <div class="vertical-line"></div>
          <p class="label-value">你绑定的手机：<span v-if="userInfo.cel">{{userInfo.cel}}</span></p>
          <el-button type="text" class="update-button" @click="phoneModalVisible = true">修改</el-button>
        </div>
        <div class="user-security-repeat-div">
          <img src="../../../assets/images/success.png" alt="" class="status-img"/>
          <p class="label-name">支付密码</p>
          <div class="vertical-line"></div>
          <p class="label-value">
            安全程度
            <el-progress :text-inside="true" :stroke-width="20" :percentage="90" status="success"
                         style="width:200px;display:inline-block;top:-2px;left:20px"></el-progress>
          </p>
          <el-button type="text" class="update-button">修改</el-button>
        </div>
      </div>
      <el-dialog title="密码修改" :visible.sync="pwdModalVisible" width="400px">
        <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="90px">
          <el-form-item label="输入旧密码" prop="oldPwd">
            <el-input type="password" v-model="pwdForm.oldPwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="输入新密码" prop="pwd">
            <el-input type="password" v-model="pwdForm.pwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="pwdAgain">
            <el-input type="password" v-model="pwdForm.pwdAgain" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="pwdModalVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureChangePwd('pwdForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="新手机绑定" :visible.sync="phoneModalVisible" width="400px">
        <el-form :model="phoneForm" :rules="phoneRules" ref="phoneForm" label-width="60px" class="request-form">
          <el-form-item prop="phone" label="手机">
            <el-input type="number" v-model="phoneForm.phone" placeholder="输入手机号" class="form-input"></el-input>
            <el-button style="margin-left: 20px" type="text" class="verify-code" @click="getVerifyCode"
                       v-if="verifyText =='获取验证码'">获取验证码
            </el-button>
            <el-button style="margin-left: 20px" type="text" class="verify-code" disabled v-else>{{verifyText}}秒后重发
            </el-button>
          </el-form-item>
          <el-form-item prop="code" label="验证码">
            <el-input v-model="phoneForm.code" placeholder="输入验证码" class="form-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="phoneModalVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureChangePhone">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改邮箱" :visible.sync="emailModalVisible" width="400px">
        <el-form :model="emailForm" :rules="emailRules" ref="emailForm" label-width="60px"
                 v-if="!changeEmailVisible" class="request-form">
          <el-form-item prop="phone" label="手机">
            <el-input v-model="userInfo.cel" class="form-input" disabled></el-input>
            <el-button style="margin-left: 20px" type="text" class="verify-code" @click="getEmailVerifyCode"
                       v-if="verifyText =='获取验证码'">获取验证码
            </el-button>
            <el-button style="margin-left: 20px" type="text" class="verify-code" disabled v-else>{{verifyText}}秒后重发
            </el-button>
          </el-form-item>
          <el-form-item prop="code" label="验证码">
            <el-input v-model="emailForm.code" placeholder="输入验证码" class="form-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirmEmailFirst">确 定</el-button>
            <el-button @click="emailModalVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="changeEmailForm" ref="changeEmailForm" v-else label-width="100px">
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="changeEmailForm.email" style="width: 300px;"></el-input>
            <el-button type="text" class="verify-code" @click="sendEmail" v-if="verifyText =='获取验证码'">发送邮件</el-button>
            <el-button type="text" class="verify-code" disabled v-else>{{verifyText}}秒后重发</el-button>
          </el-form-item>
          <el-form-item prop="code" label="验证码">
            <el-input v-model="changeEmailForm.code" placeholder="输入验证码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sureChangeEmail">确 定</el-button>
            <el-button @click="emailModalVisible = false;changeEmailVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      var oldPwdValidator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      var pwdValidator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.pwdForm.pwdAgain !== '') {
            this.$refs.pwdForm.validateField('pwdAgain');
          }
          callback();
        }
      };
      var pwdAgainValidator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.pwdForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        rate: 3.5,
        pwdModalVisible: false,//修改密码模态框
        phoneModalVisible: false,//修改手机模态框
        changeEmailVisible: false,
        emailModalVisible: false,
        pwdForm: {
          oldPwd: '',//老密码
          pwd: '',//新密码
          pwdAgain: '',//确认新密码
        },
        phoneForm: {
          phone: '',
          code: ''
        },
        emailForm: {
          code: ''
        },
        changeEmailForm: {
          email: '',
          code: ''
        },

        pwdRules: {
          oldPwd: [
            {
              validator: oldPwdValidator,
            }
          ],
          pwd: [
            {
              validator: pwdValidator,
              trigger: 'change'
            }
          ],
          pwdAgain: [
            {
              validator: pwdAgainValidator,
              trigger: 'change'
            }
          ],
        },
        phoneRules: {},
        emailRules: {},
        verifyText: '获取验证码',
        messageCount: ''
      }
    },
    computed: {
      userInfo: function () {
        return JSON.parse(window.localStorage.getItem('userinfo'));
      }
    },
    methods: {
      sureChangePwd(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let self = this;
            let requestData = {
              oldPwd: self.pwdForm.oldPwd,
              pwd: self.pwdForm.pwd,
            };
            self.httpApi.user.updatePwd(requestData, function (data) {
              self.pwdModalVisible = false;
              self.$message.success('修改成功！');
              self.getUserInfo();
              setTimeout(function () {
                self.$router.go(0);
              }, 500);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      sureChangePhone(){
        let self = this;
        let requestData = {
          phone: self.phoneForm.phone,
          code: self.phoneForm.code,
        };
        self.httpApi.user.updateUserPhone(requestData, function (data) {
          self.phoneModalVisible = false;
          self.$message.success('修改成功！');
          self.getUserInfo();
          setTimeout(function () {
            self.$router.go(0);
          }, 500)
        });
      },
      getVerifyCode(){//获取短信验证码
        let self = this;
        let requestData = {
          phone: self.phoneForm.phone
        };
        self.httpApi.user.checkUserCelCount(requestData, function (data) {
          self.verifyText = 60;
          var messageCount = setInterval(function () {
            self.verifyText--;
            if (self.verifyText === 0) {
              self.verifyText = '获取验证码';
              clearInterval(messageCount);
            }
          }, 1000);
          let requestData = {phone: self.phoneForm.phone, type: 2};//1代表修改
          self.httpApi.message.getMessage(requestData, function (data) {
            self.$message.success('已成功发送');
          });
        });
      },
      getEmailVerifyCode(){//验证身份
        let self = this;
        self.verifyText = 60;
        self.messageCount = setInterval(function () {
          self.verifyText--;
          if (self.verifyText === 0) {
            self.verifyText = '获取验证码';
            clearInterval(self.messageCount);
          }
        }, 1000);
        let requestData = {
          phone: self.userInfo.cel,
          type: 3
        };//3代表修改邮箱
        self.httpApi.message.getMessage(requestData, function (data) {
          self.$message.success('已成功发送');
        });
      },
      confirmEmailFirst(){//修改邮箱时验证手机
        let self = this;

        let requestData = {
          phone: self.userInfo.cel,
          code: self.emailForm.code
        };//3代表修改邮箱
        self.httpApi.user.checkMsg(requestData, function (data) {
          self.$message.success('验证身份通过');
          self.changeEmailVisible = true;
          self.verifyText = '获取验证码';
          clearInterval(self.messageCount);
        });
      },
      sendEmail(){
        let self = this;
        let requestData = {email: self.changeEmailForm.email};
        self.httpApi.user.selectUserCountByEmail(requestData, function (data) {
          self.verifyText = 60;
          self.messageCount = setInterval(function () {
            self.verifyText--;
            if (self.verifyText === 0) {
              self.verifyText = '获取验证码';
              clearInterval(self.messageCount);
            }
          }, 1000);
          let requestData = {email: self.changeEmailForm.email, type: 1};//1修改邮箱
          self.httpApi.message.getEmailMessage(requestData, function (data) {
            self.$message.success('已成功发送');
          });
        });
      },
      sureChangeEmail(){
        let self = this;
        let requestData = {
          email: self.changeEmailForm.email,
          code: self.changeEmailForm.code
        };//1修改邮箱
        self.httpApi.user.updateUserEmail(requestData, function (data) {
          self.changeEmailVisible = false;
          self.$message.success('修改成功！');
          self.getUserInfo();
          setTimeout(function () {
            self.$router.go(0);
          }, 500)
        });
      },
    }
  }
</script>
