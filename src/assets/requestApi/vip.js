import Vue from 'vue'
import '../js'
//下载excel模板
Vue.prototype.httpApi.vip.downVip = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/downVip', params,
    function (data) {
      successCallback(data);
    })
};
//导出excel
Vue.prototype.httpApi.vip.exportVips = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/exportVips', params,
    function (data) {
      successCallback(data);
    })
};
//excel导入
Vue.prototype.httpApi.vip.importVips = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/importVips', params,
    function (data) {
      successCallback(data);
    })
};
//会员新增
Vue.prototype.httpApi.vip.insertVip = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/insertVip', params,
    function (data) {
      successCallback(data);
    })
};
//插入多条数据
Vue.prototype.httpApi.vip.insertvipList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/insertvipList', params,
    function (data) {
      successCallback(data);
    })
};
//会员修改
Vue.prototype.httpApi.vip.upuser = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/upuser', params,
    function (data) {
      successCallback(data);
    })
};
//会员修改数据
Vue.prototype.httpApi.vip.upvipdata = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/upvipdata', params,
    function (data) {
      successCallback(data);
    })
};
//会员删除
Vue.prototype.httpApi.vip.vipdelete = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/vipdelete', params,
    function (data) {
      successCallback(data);
    })
};
//会员列表
Vue.prototype.httpApi.vip.viplist = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/viplist', params,
    function (data) {
      successCallback(data);
    })
};
//会员检索
Vue.prototype.httpApi.vip.vipterm = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/vipterm', params,
    function (data) {
      successCallback(data);
    })
};
