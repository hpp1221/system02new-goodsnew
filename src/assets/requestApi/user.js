import Vue from 'vue'
import '../js'
//根据memberId查询会员信息
Vue.prototype.httpApi.user.selectMemberById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/member/selectMemberById', params,
    function (data) {
      successCallback(data);
    })
};
//添加用户
Vue.prototype.httpApi.user.addUser = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/addUser.do', params,
    function (data) {
      successCallback(data);
    })
};
//修改邮箱前用手机号验证是否本人操作
Vue.prototype.httpApi.user.checkMsg = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/checkMsg.do', params,
    function (data) {
      successCallback(data);
    })
};
//判断手机号有没有被使用
Vue.prototype.httpApi.user.checkUserCelCount = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/checkUserCelCount.do', params,
    function (data) {
      successCallback(data);
    })
};
//注册判断用户名是否重复
Vue.prototype.httpApi.user.checkUserCount = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/checkUserCount.do', params,
    function (data) {
      successCallback(data);
    })
};
//获取个人信息
Vue.prototype.httpApi.user.getMyInfo = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/user/getMyInfo', params,
    function (data) {
      successCallback(data);
    })
};
//初始化公司密码
Vue.prototype.httpApi.user.initUserPwd = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/initUserPwd', params,
    function (data) {
      successCallback(data);
    })
};
//登录
Vue.prototype.httpApi.user.doLogin = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/login/doLogin', params,
    function (data) {
      successCallback(data);
    })
};
//注销
Vue.prototype.httpApi.user.logout = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/logout.do', params,
    function (data) {
      successCallback(data);
    })
};

//注册
Vue.prototype.httpApi.user.register = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/register.do', params,
    function (data) {
      successCallback(data);
    })
};

//查询租户列表
Vue.prototype.httpApi.user.selectCompanyUserListPage = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/selectCompanyUserListPage', params,
    function (data) {
      successCallback(data);
    })
};

//查询主账号登录名
Vue.prototype.httpApi.user.selectPrimaryUserLoginId = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/selectPrimaryUserLoginId', params,
    function (data) {
      successCallback(data);
    })
};

//查询用户详情
Vue.prototype.httpApi.user.selectUserById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/user/selectUserById', params,
    function (data) {
      successCallback(data);
    })
};

//查询邮箱是否存在
Vue.prototype.httpApi.user.selectUserCountByEmail = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/selectUserCountByEmail', params,
    function (data) {
      successCallback(data);
    })
};

//条件查询用户列表
Vue.prototype.httpApi.user.selectUserListPage = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/selectUserListPage', params,
    function (data) {
      successCallback(data);
    })
};

//更新用户自己的信息
Vue.prototype.httpApi.user.updateMyInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/updateMyInfo.do', params,
    function (data) {
      successCallback(data);
    })
};

//修改用户密码
Vue.prototype.httpApi.user.updatePwd = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/updatePwd.do', params,
    function (data) {
      successCallback(data);
    })
};

//更新用户
Vue.prototype.httpApi.user.updateUser = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/updateUser.do', params,
    function (data) {
      successCallback(data);
    })
};
//更新用户邮箱
Vue.prototype.httpApi.user.updateUserEmail = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/updateUserEmail.do', params,
    function (data) {
      successCallback(data);
    })
};
//更新用户手机号
Vue.prototype.httpApi.user.updateUserPhone = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/updateUserPhone.do', params,
    function (data) {
      successCallback(data);
    })
};
//改变用户状态
Vue.prototype.httpApi.user.updateUserStatus = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/user/updateUserStatus', params,
    function (data) {
      successCallback(data);
    })
};


