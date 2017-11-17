import Vue from 'vue'
import '../js'
//下载excel模板
Vue.prototype.httpApi.vip.downVip = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/downVip', params,
    function (data) {
      successCallback(data);
    })
};
//导出excel
Vue.prototype.httpApi.vip.exportVips = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/exportVips', params,
    function (data) {
      successCallback(data);
    })
};
//excel导入
Vue.prototype.httpApi.vip.importVips = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/importVips', params,
    function (data) {
      successCallback(data);
    })
};
//会员新增
Vue.prototype.httpApi.vip.insertvip = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/insertvip', params,
    function (data) {
      successCallback(data);
    })
};
//插入多条数据
Vue.prototype.httpApi.vip.insertvipList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/insertvipList', params,
    function (data) {
      successCallback(data);
    })
};
//会员修改
Vue.prototype.httpApi.vip.upuser = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/upuser', params,
    function (data) {
      successCallback(data);
    })
};
//会员修改数据
Vue.prototype.httpApi.vip.upvipdata = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/upvipdata', params,
    function (data) {
      successCallback(data);
    })
};
//会员删除
Vue.prototype.httpApi.vip.vipdelete = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/vipdelete', params,
    function (data) {
      successCallback(data);
    })
};
//会员列表
Vue.prototype.httpApi.vip.viplist = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/viplist', params,
    function (data) {
      successCallback(data);
    })
};
//会员检索
Vue.prototype.httpApi.vip.vipterm = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/vipterm', params,
    function (data) {
      successCallback(data);
    })
};
