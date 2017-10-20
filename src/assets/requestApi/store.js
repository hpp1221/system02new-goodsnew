import Vue from 'vue'
import '../js'
//创建要货单
Vue.prototype.httpApi.store.addGetGoodsRecord = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/addGetGoodsRecord', params,
    function (data) {
      successCallback(data);
    })
};
//添加仓库的关联门店
Vue.prototype.httpApi.store.addStoreHouseContact = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/addStoreHouseContact', params,
    function (data) {
      successCallback(data);
    })
};

//生成要货单号
Vue.prototype.httpApi.store.createGetGoodsNumber = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/createGetGoodsNumber', params,
    function (data) {
      successCallback(data);
    })
};
//要货单审核
Vue.prototype.httpApi.store.examine = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/examine', params,
    function (data) {
      successCallback(data);
    })
};

//要货单详情
Vue.prototype.httpApi.store.getGoodsRecordDetail = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/getGoodsRecordDetail', params,
    function (data) {
      successCallback(data);
    })
};

//要货单列表
Vue.prototype.httpApi.store.getGoodsRecordList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/getGoodsRecordList', params,
    function (data) {
      successCallback(data);
    })
};

//要货单作废
Vue.prototype.httpApi.store.setInvalid = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/setInvalid', params,
    function (data) {
      successCallback(data);
    })
};

//要货单商品信息
Vue.prototype.httpApi.store.storeGoodsInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/storeGoodsInfo', params,
    function (data) {
      successCallback(data);
    })
};

//仓库列表(用户仓库门店关联列表)
Vue.prototype.httpApi.store.storeHouseListSpecial = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/storeHouseListSpecial', params,
    function (data) {
      successCallback(data);
    })
};

//门店要货单列表
Vue.prototype.httpApi.store.storeHouseTradeList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/storeHouseTradeList', params,
    function (data) {
      successCallback(data);
    })
};

//门店列表
Vue.prototype.httpApi.store.storeList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/storeList', params,
    function (data) {
      successCallback(data);
    })
};

//门店列表(用户仓库门店关联列表)
Vue.prototype.httpApi.store.storeListSpecial = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/storeListSpecial', params,
    function (data) {
      successCallback(data);
    })
};
