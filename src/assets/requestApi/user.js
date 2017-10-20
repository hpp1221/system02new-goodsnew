import Vue from 'vue'
import '../js'
//添加用户
Vue.prototype.httpApi.user.addUser = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/addUser.do', params,
    function (data) {
      successCallback(data);
    })
};
//修改邮箱前用手机号验证是否本人操作
Vue.prototype.httpApi.user.checkMsg = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/checkMsg.do', params,
    function (data) {
      successCallback(data);
    })
};
//判断手机号有没有被使用
Vue.prototype.httpApi.user.checkUserCelCount = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/checkUserCelCount.do', params,
    function (data) {
      successCallback(data);
    })
};
//注册判断用户名是否重复
Vue.prototype.httpApi.user.checkUserCount = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/checkUserCount.do', params,
    function (data) {
      successCallback(data);
    })
};
//获取个人信息
Vue.prototype.httpApi.user.getMyInfo = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/user/getMyInfo', params,
    function (data) {
      successCallback(data);
    })
};
//初始化公司密码
Vue.prototype.httpApi.user.initUserPwd = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/initUserPwd', params,
    function (data) {
      successCallback(data);
    })
};
//登录
Vue.prototype.httpApi.user.login = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/login.do', params,
    function (data) {
      successCallback(data);
    })
};
//注销
Vue.prototype.httpApi.user.logout = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/logout.do', params,
    function (data) {
      successCallback(data);
    })
};

//注册
Vue.prototype.httpApi.user.register = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/register.do', params,
    function (data) {
      successCallback(data);
    })
};

//查询租户列表
Vue.prototype.httpApi.user.selectCompanyUserListPage = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/selectCompanyUserListPage', params,
    function (data) {
      successCallback(data);
    })
};

//查询主账号登录名
Vue.prototype.httpApi.user.selectPrimaryUserLoginId = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/selectPrimaryUserLoginId', params,
    function (data) {
      successCallback(data);
    })
};

//查询用户详情
Vue.prototype.httpApi.user.selectUserById = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/user/selectUserById', params,
    function (data) {
      successCallback(data);
    })
};

//查询邮箱是否存在
Vue.prototype.httpApi.user.selectUserCountByEmail = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/selectUserCountByEmail', params,
    function (data) {
      successCallback(data);
    })
};

//条件查询用户列表
Vue.prototype.httpApi.user.selectUserListPage = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/selectUserListPage', params,
    function (data) {
      successCallback(data);
    })
};

//更新用户自己的信息
Vue.prototype.httpApi.user.updateMyInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/updateMyInfo.do', params,
    function (data) {
      successCallback(data);
    })
};

//修改用户密码
Vue.prototype.httpApi.user.updatePwd = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/updatePwd.do', params,
    function (data) {
      successCallback(data);
    })
};

//更新用户
Vue.prototype.httpApi.user.updateUser = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/updateUser.do', params,
    function (data) {
      successCallback(data);
    })
};
//更新用户邮箱
Vue.prototype.httpApi.user.updateUserEmail = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/updateUserEmail.do', params,
    function (data) {
      successCallback(data);
    })
};
//更新用户手机号
Vue.prototype.httpApi.user.updateUserPhone = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/updateUserPhone.do', params,
    function (data) {
      successCallback(data);
    })
};
//改变用户状态
Vue.prototype.httpApi.user.updateUserStatus = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/user/updateUserStatus', params,
    function (data) {
      successCallback(data);
    })
};


