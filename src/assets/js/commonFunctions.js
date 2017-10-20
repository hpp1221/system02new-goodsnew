import Vue from 'vue';
Vue.prototype.shallowCopy = function (obj) {//将对象中的数据迭代出来
  let newObj = {};
  for (let o in obj) {
    newObj[o] = typeof(obj[o]) === 'object' ? JSON.stringify(obj[o]) : obj[o];
    newObj[o] = obj[o] instanceof Date ? obj[o].pattern('yyyy-MM-dd HH:mm:ss') : obj[o];
  }
  return newObj;
}

Vue.prototype.formPass = function (myForm, responseForm) {//将服务器的form一一传入自己的form
  for (let o in myForm) {
    myForm[o] = responseForm[o];
  }
  return myForm;
}

Vue.prototype.getUserInfo = function () {//获取用户信息
  let self = this;
  let requestData = {params: {token: window.localStorage.getItem('token')}};
  self.$http.get('/ui/user.js/getMyInfo', requestData).then(function (response) {
    let data = response.data;
    if (data.code === 10000) {
      window.localStorage.setItem('userinfo', JSON.stringify(data.data));
    }
  }).catch(function (error) {
    console.log(error);
  });
}

Vue.prototype.accAdd = function (arg1, arg2) {//精确计算加法
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (accMul(arg1, m) + accMul(arg2, m)) / m;
}

Vue.prototype.accMul = function (arg1, arg2) {//精确计算乘法
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {
  }
  try {
    m += s2.split(".")[1].length
  } catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
Vue.prototype.checkImg = function (file) {
  const isIMG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isIMG) {
    this.$message.error('图片格式错误!');
  }
  if (!isLt2M) {
    this.$message.error('上传头像图片大小不能超过 2MB!');
  }
  return isIMG && isLt2M;
}
Date.prototype.pattern = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
