import Vue from 'vue'
import '../js'


//订单创建
Vue.prototype.httpApi.order.create = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/create', params,
    function (data) {
      successCallback(data);
    })
};
//订单详情
Vue.prototype.httpApi.order.detail = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/detail', params,
    function (data) {
      successCallback(data);
    })
};

//订单明细
Vue.prototype.httpApi.order.details = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/details', params,
    function (data) {
      successCallback(data);
    })
};

//导出订单明细
Vue.prototype.httpApi.order.export = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/order/export', params,
    function (data) {
      successCallback(data);
    })
};

//订单商品明细
Vue.prototype.httpApi.order.goodsDetails = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/goods/details', params,
    function (data) {
      successCallback(data);
    })
};

//导出订单商品明细
Vue.prototype.httpApi.order.goodsExport = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/order/goods/export', params,
    function (data) {
      successCallback(data);
    })
};

//订单导入
Vue.prototype.httpApi.order.import = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/import', params,
    function (data) {
      successCallback(data);
    })
};

//订单列表
Vue.prototype.httpApi.order.list = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/list', params,
    function (data) {
      successCallback(data);
    })
};

//本人处理订单
Vue.prototype.httpApi.order.listSelf = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/list/self', params,
    function (data) {
      successCallback(data);
    })
};

//添加标签
Vue.prototype.httpApi.order.log = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/log', params,
    function (data) {
      successCallback(data);
    })
};

//待处理任务(首页)
Vue.prototype.httpApi.order.pendingTask = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/pendingTask', params,
    function (data) {
      successCallback(data);
    })
};

//品类销售汇总
Vue.prototype.httpApi.order.salesSummary = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/salesSummary', params,
    function (data) {
      successCallback(data);
    })
};

//订单统计
Vue.prototype.httpApi.order.statistics = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/statistics', params,
    function (data) {
      successCallback(data);
    })
};

//订单审核
Vue.prototype.httpApi.order.verify = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/order/verify', params,
    function (data) {
      successCallback(data);
    })
};
