import Vue from 'vue'
import '../js'
//创建要货单
Vue.prototype.httpApi.store.addGetGoodsRecord = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/addGetGoodsRecord', params,
    function (data) {
      successCallback(data);
    })
};
//添加仓库的关联门店
Vue.prototype.httpApi.store.addStoreHouseContact = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/addStoreHouseContact', params,
    function (data) {
      successCallback(data);
    })
};

//生成调拨单号
Vue.prototype.httpApi.store.createAllocationRecordNumber = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/createAllocationRecordNumber', params,
    function (data) {
      successCallback(data);
    })
};

//生成要货单号
Vue.prototype.httpApi.store.createGetGoodsNumber = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/createGetGoodsNumber', params,
    function (data) {
      successCallback(data);
    })
};
//新增门店调拨单
Vue.prototype.httpApi.store.createStoreAllocation = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/createStoreAllocation', params,
    function (data) {
      successCallback(data);
    })
};
//要货单审核
Vue.prototype.httpApi.store.examine = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/examine', params,
    function (data) {
      successCallback(data);
    })
};

//要货单详情
Vue.prototype.httpApi.store.getGoodsRecordDetail = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/getGoodsRecordDetail', params,
    function (data) {
      successCallback(data);
    })
};

//要货单列表
Vue.prototype.httpApi.store.getGoodsRecordList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/getGoodsRecordList', params,
    function (data) {
      successCallback(data);
    })
};
//查询出入库门店的某一商品库存
Vue.prototype.httpApi.store.selectOutPutAndInputGoodsStoreHouse = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/selectOutPutAndInputGoodsStoreHouse', params,
    function (data) {
      successCallback(data);
    })
};
//关键字查询出库门店的商品信息列表
Vue.prototype.httpApi.store.selectStoreGoodsInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/selectStoreGoodsInfo', params,
    function (data) {
      successCallback(data);
    })
};

//要货单作废
Vue.prototype.httpApi.store.setInvalid = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/setInvalid', params,
    function (data) {
      successCallback(data);
    })
};

//门店调拨单详情
Vue.prototype.httpApi.store.storeAllocationInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeAllocationInfo', params,
    function (data) {
      successCallback(data);
    })
};
//门店调拨单列表
Vue.prototype.httpApi.store.storeAllocationList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeAllocationList', params,
    function (data) {
      successCallback(data);
    })
};
//门店调拨单 审核
Vue.prototype.httpApi.store.storeAllocationRecordAdopt = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeAllocationRecordAdopt', params,
    function (data) {
      successCallback(data);
    })
};
//门店调拨单 作废
Vue.prototype.httpApi.store.storeAllocationRecordCancel = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeAllocationRecordCancel', params,
    function (data) {
      successCallback(data);
    })
};
//门店调拨单 确认收货审核
Vue.prototype.httpApi.store.storeAllocationRecordReceiveAdopt = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeAllocationRecordReceiveAdopt', params,
    function (data) {
      successCallback(data);
    })
};
//门店调拨单 发货审核
Vue.prototype.httpApi.store.storeAllocationRecordSendAdopt = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeAllocationRecordSendAdopt', params,
    function (data) {
      successCallback(data);
    })
};
//要货单商品信息
Vue.prototype.httpApi.store.storeGoodsInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeGoodsInfo', params,
    function (data) {
      successCallback(data);
    })
};

//仓库列表(用户仓库门店关联列表)
Vue.prototype.httpApi.store.storeHouseListSpecial = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeHouseListSpecial', params,
    function (data) {
      successCallback(data);
    })
};

//门店要货单列表
Vue.prototype.httpApi.store.storeHouseTradeList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeHouseTradeList', params,
    function (data) {
      successCallback(data);
    })
};

//门店列表
Vue.prototype.httpApi.store.storeList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeList', params,
    function (data) {
      successCallback(data);
    })
};

//门店列表(用户仓库门店关联列表)
Vue.prototype.httpApi.store.storeListSpecial = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeListSpecial', params,
    function (data) {
      successCallback(data);
    })
};
