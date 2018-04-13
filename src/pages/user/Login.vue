<template>
  <div class="login-container"
       :style="{backgroundImage: 'url(' +bg + ')'}">
    <div class="login-box">
      <!--<div class="login-ivis-div">-->
      <!--<p style="color:darkgray;font-size:32px">觇智云</p>-->
      <!--&lt;!&ndash;<img src="../../assets/images/ivis.jpg" alt=""/>&ndash;&gt;-->
      <!--</div>-->
      <!--<el-tabs v-model="tabName">-->
      <!--<el-tab-pane label="登录" name="login">-->
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm" style="margin-top: 80px">
        <el-form-item prop="username">
          <input type="text" style="display:none;">
          <el-input v-model="form.username" placeholder="请输入账号" auto-complete="off" autofocus
          @keyup.enter.native="submitForm('form')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"
                    @keyup.enter.native="submitForm('form')"></el-input>
        </el-form-item>
        <el-form-item>
          <!--checked="true" -->
          <el-checkbox label="记住用户名" name="type" v-model="form.twoWeek" style="color: #000"></el-checkbox>
          <span v-model="form.twoWeek" class="forgetPwd" @click="clearCookie" style="cursor: pointer">忘记密码 ? </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
      <!--<el-button type="text" @click="forgetPwd" class="forget-btn">忘记密码</el-button>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="注册" name="register">-->
      <!--<el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="demo-ruleForm">-->
      <!--<el-form-item prop="username">-->
      <!--<input type="text" style="display:none;">-->
      <!--<el-input v-model="registerForm.username" placeholder="公司名称,推荐公司首字母缩写,例如觇智科技(CZKJ)"-->
      <!--@blur="checkUserName"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item prop="password">-->
      <!--<el-input v-model="registerForm.password" placeholder="输入密码" type="password"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item prop="phone">-->
      <!--<el-input v-model="registerForm.phone" placeholder="输入手机号" style="width: 300px;"></el-input>-->
      <!--<el-button type="text" class="verify-code" @click="getVerifyCode" v-if="verifyText =='获取验证码'">获取验证码-->
      <!--</el-button>-->
      <!--<el-button type="text" class="verify-code" disabled v-else>{{verifyText}}秒后重发</el-button>-->
      <!--</el-form-item>-->
      <!--<el-form-item prop="verifyCode">-->
      <!--<el-input v-model="registerForm.code" placeholder="输入验证码"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
      <!--<el-button type="primary" @click="register('registerForm')" class="login-btn">注册</el-button>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <!--</el-tab-pane>-->
      <!--</el-tabs>-->

    </div>
  </div>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import md5 from 'js-md5';

  export default {
    components: {
      ElButton,
      md5,
    },
    data() {
      return {
        bg: require('../../assets/images/login.jpg'),
        form: {
          username: '',
          password: '',
          twoWeek: false,
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名称', trigger: 'change'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'}
          ],
        },
        registerForm: {
          username: '',
          password: '',
          phone: '',
          code: ''
        },
        registerRules: {
          username: [
            {required: true, message: '请输入用户名称', trigger: 'change'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'change'},
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'change'},
          ]
        },
        tabName: 'login',
        verifyText: '获取验证码',
        phoneAvailable: false,//手机是否可用

      }
    },
    created() {
//      let self = this;
//      let requestData = {};
//      self.httpGet('/admin/user/checkToken.do', requestData, function (data) {
//        self.$router.push('/index');
//      }, function (data) {
//      })
    },
    mounted() {
      this.getCookie();
    },
    methods: {

      submitForm(formName) {//登录
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let self = this;
            // let form = self.form;
            let name = self.form.username;
            window.localStorage.setItem('loginuser', self.form.username);
            self.form.username = window.localStorage.getItem('loginuser');
            let pass = self.form.password;
            let requestData = {
              loginId: name,
              pwd: md5(pass)
            };
            if (self.form.twoWeek === true) {
              self.setCookie(name, pass, 7);
            } else {
              self.setCookie("", "", -1);//修改2值都为空，天数为负1天就好了
            }
            self.httpApi.user.doLogin(requestData, function (data) {
              window.localStorage.setItem('token', data.data.token);
              window.localStorage.setItem('memberId', data.data.memberId);
              console.log('id',localStorage.getItem('memberId'));
              if(data.data){
                let requestData1 = {
                  memberId:data.data.memberId
                };
                self.httpApi.user.selectMemberById(requestData1,function (data1) {
                  let name = data1.data.member.name;
                  window.localStorage.setItem('memberNameNew',name);
                })
              }

              self.$router.push('/index');
            });
          } else {
            return false;
          }
        });
      },
      setCookie(c_name, c_pwd, exdays) {//设置cookie
        let cookieTime = new Date();//获取时间
        cookieTime.setTime(cookieTime.getTime() + 24 * 60 * 60 * 1000 * exdays);//保存的天数
        //字符串拼接cookie
        window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + cookieTime.toGMTString();
        window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + cookieTime.toGMTString();
      },
      //读取cookie
      getCookie() {
        let self = this;
        if (document.cookie.length > 0) {
          let arr = document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('=');//再次切割
            //判断查找相对应的值
            if (arr2[0] == 'username') {
              self.form.username = arr2[1];//保存到保存数据的地方
            } else if (arr2[0] == 'password') {
              self.form.password = arr2[1];
            }
            self.form.twoWeek = true;
          }
        }
      },
      //清除cookie
      clearCookie() {
        this.setCookie("", "", -1);//修改2值都为空，天数为负1天就好了
        this.form.username = '';
        this.form.password = '';
        this.form.twoWeek = false;
      },
      register(formName) {//注册按钮
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let self = this;
            let requestData = self.registerForm;
            self.httpApi.user.register(requestData, function (data) {
              self.$message.success('注册成功');
              self.tabName = 'login';
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      checkUserName() {//注册判断用户名是否重复
        let self = this;
        let requestData = {username: self.registerForm.username};
        self.httpApi.user.checkUserCount(requestData, function (data) {
          //self.$message.success('用户名可用');
        });
      },
      forgetPwd() {//忘记密码跳转

      },
      checkCookies() {//免密登录

      },
      getVerifyCode() {//获取短信验证码
        let self = this;
        if (!self.registerForm.phone) {
          self.$message.error('请输入手机号');
          return;
        }
        let requestData = {phone: self.registerForm.phone};
        self.httpApi.user.checkUserCelCount(requestData, function (data) {
          self.verifyText = 60;
          const messageCount = setInterval(function () {
            self.verifyText--;
            if (self.verifyText === 0) {
              self.verifyText = '获取验证码';
              clearInterval(messageCount);
            }
          }, 1000);
          let requestData = {phone: self.registerForm.phone, type: 1};//1代表修改
          self.httpApi.message.getMessage(requestData, function (data) {
            self.$message.success('已成功发送');
          });
        });
      }
    }
  }
</script>
