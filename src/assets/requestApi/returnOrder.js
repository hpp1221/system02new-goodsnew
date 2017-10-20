import Vue from 'vue'
import '../js'


//添加订单
Vue.prototype.httpApi.returnOrder.insertReturnOrder = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/returnOrder/insertReturnOrder', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询订单详情
Vue.prototype.httpApi.returnOrder.selectReturnOrderById = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/returnOrder/selectReturnOrderById', params,
    function (data) {
      successCallback(data);
    })
};
//退货订单列表
Vue.prototype.httpApi.returnOrder.selectReturnOrderListPage = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/returnOrder/selectReturnOrderListPage', params,
    function (data) {
      successCallback(data);
    })
};
//修改订单
Vue.prototype.httpApi.returnOrder.updateReturnOrderById = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/returnOrder/updateReturnOrderById', params,
    function (data) {
      successCallback(data);
    })
};
