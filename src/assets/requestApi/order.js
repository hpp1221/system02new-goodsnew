import Vue from 'vue'
import '../js'
//更新备注
Vue.prototype.httpApi.order.upateNotes = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/upateNotes', params,
    function (data) {
      successCallback(data);
    })
};

//订单创建
Vue.prototype.httpApi.order.create = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/create', params,
    function (data) {
      successCallback(data);
    })
};


//正向订单详情
Vue.prototype.httpApi.order.viewOrderInfo = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/order/viewOrderInfo', params,
    function (data) {
      successCallback(data);
    })
};
//正向订单添加物流信息
Vue.prototype.httpApi.order.addDeliveryInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/addDeliveryInfo', params,
    function (data) {
      successCallback(data);
    })
};
//正向订单删除物流信息
Vue.prototype.httpApi.order.deleteDeliveryInfo = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/order/deleteDeliveryInfo', params,
    function (data) {
      successCallback(data);
    })
};
//正向订单查询物流详情
Vue.prototype.httpApi.order.searchLogisticsOrder = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/searchLogisticsOrder', params,
    function (data) {
      successCallback(data);
    })
};
//正向订单查询订单物流情况
Vue.prototype.httpApi.order.selectLogisticsByOrderId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/order/selectLogisticsByOrderId', params,
    function (data) {
      successCallback(data);
    })
};

//正向订单修改订单价格
Vue.prototype.httpApi.order.updateOrderItemPrice = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/updateOrderItemPrice', params,
    function (data) {
      successCallback(data);
    })
};
//正向订单添加物流信息的回调列表
Vue.prototype.httpApi.order.viewDeliveryInfoList = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/order/viewDeliveryInfoList', params,
    function (data) {
      successCallback(data);
    })
};
//正向订单日志列表
Vue.prototype.httpApi.order.viewOrderLogList = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/order/viewOrderLogList', params,
    function (data) {
      successCallback(data);
    })
};
//订单明细
Vue.prototype.httpApi.order.details = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/details', params,
    function (data) {
      successCallback(data);
    })
};

//导出订单明细
Vue.prototype.httpApi.order.export = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/order/export', params,
    function (data) {
      successCallback(data);
    })
};

//订单商品明细
Vue.prototype.httpApi.order.goodsDetails = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/goods/details', params,
    function (data) {
      successCallback(data);
    })
};

//导出订单商品明细
Vue.prototype.httpApi.order.goodsExport = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/order/goods/export', params,
    function (data) {
      successCallback(data);
    })
};

//订单导入
Vue.prototype.httpApi.order.import = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/import', params,
    function (data) {
      successCallback(data);
    })
};

//正向订单列表
Vue.prototype.httpApi.order.viewOrderListByQuery = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/viewOrderListByQuery', params,
    function (data) {
      successCallback(data);
    })
};

//本人处理订单
Vue.prototype.httpApi.order.listSelf = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/list/self', params,
    function (data) {
      successCallback(data);
    })
};

//添加标签
Vue.prototype.httpApi.order.log = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/log', params,
    function (data) {
      successCallback(data);
    })
};

//待处理任务(首页)
// Vue.prototype.httpApi.order.pendingTask = function (params, successCallback) {
//   Vue.prototype.httpPost('/admin/order/pendingTask', params,
//     function (data) {
//       successCallback(data);
//     })
// };

//品类销售汇总
Vue.prototype.httpApi.order.salesSummary = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/salesSummary', params,
    function (data) {
      successCallback(data);
    })
};

//订单统计
Vue.prototype.httpApi.order.statistics = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/statistics', params,
    function (data) {
      successCallback(data);
    })
};

//订单审核
Vue.prototype.httpApi.order.verify = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/order/verify', params,
    function (data) {
      successCallback(data);
    })
};
