import Vue from 'vue'
import '../js'
//添加库存调拨
Vue.prototype.httpApi.stock.addAllocationRecord = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/addAllocationRecord', params,
    function (data) {
      successCallback(data);
    })
};
//添加入库
Vue.prototype.httpApi.stock.addRecord = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/addRecord', params,
    function (data) {
      successCallback(data);
    })
};
//库地址列表不分页
Vue.prototype.httpApi.stock.addressList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/addressList', params,
    function (data) {
      successCallback(data);
    })
};
//库地址列表分页
Vue.prototype.httpApi.stock.addressListLimit = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/addressListLimit', params,
    function (data) {
      successCallback(data);
    })
};
//查询调拨列表
Vue.prototype.httpApi.stock.allocationRecordList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/allocationRecordList', params,
    function (data) {
      successCallback(data);
    })
};
//解析当前excel
Vue.prototype.httpApi.stock.analysisCheckStoreExcel = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/analysisCheckStoreExcel', params,
    function (data) {
      successCallback(data);
    })
};
//解析当前excel
Vue.prototype.httpApi.stock.analysisExcel = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/analysisExcel', params,
    function (data) {
      successCallback(data);
    })
};
//库存盘点
Vue.prototype.httpApi.stock.checkExcel = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/checkExcel', params,
    function (data) {
      successCallback(data);
    })
};
//库存盘点(门店)
Vue.prototype.httpApi.stock.checkStoreExcel = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/checkStoreExcel', params,
    function (data) {
      successCallback(data);
    })
};
//新增仓库地址
Vue.prototype.httpApi.stock.createStoreHouse = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/createStoreHouse', params,
    function (data) {
      successCallback(data);
    })
};
//修改仓库地址
Vue.prototype.httpApi.stock.editStoreHouse = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/editStoreHouse', params,
    function (data) {
      successCallback(data);
    })
};
//修改库存上下限
Vue.prototype.httpApi.stock.editStoreHouseLimit = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/editStoreHouseLimit', params,
    function (data) {
      successCallback(data);
    })
};
//导出当前库存表格
Vue.prototype.httpApi.stock.export = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/export', params,
    function (data) {
      successCallback(data);
    })
};
//导出门店库存表格
Vue.prototype.httpApi.stock.exportStore = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/exportStore', params,
    function (data) {
      successCallback(data);
    })
};
//查询调拨详情
Vue.prototype.httpApi.stock.getAllocationRecordDetail = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/getAllocationRecordDetail', params,
    function (data) {
      successCallback(data);
    })
};
//查询库存详情
Vue.prototype.httpApi.stock.getRecord = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/getRecord', params,
    function (data) {
      successCallback(data);
    })
};

//查询库存商品
Vue.prototype.httpApi.stock.goodsInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsInfo', params,
    function (data) {
      successCallback(data);
    })
};
//商品库存列表
Vue.prototype.httpApi.stock.list = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/list', params,
    function (data) {
      successCallback(data);
    })
};
//查询库存商品
Vue.prototype.httpApi.stock.outPutGoodsInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/outPutGoodsInfo', params,
    function (data) {
      successCallback(data);
    })
};


//查询库存列表
Vue.prototype.httpApi.stock.recordList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/recordList', params,
    function (data) {
      successCallback(data);
    })
};

//出入库列表
Vue.prototype.httpApi.stock.recordListBySku = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/recordListBySku', params,
    function (data) {
      successCallback(data);
    })
};
//获取已出库商品
Vue.prototype.httpApi.stock.searchOrderDetail = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/searchOrderDetail', params,
    function (data) {
      successCallback(data);
    })
};
//门店库存明细详情
Vue.prototype.httpApi.stock.storeHouseDetailed = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeHouseDetailed', params,
    function (data) {
      successCallback(data);
    })
};
//库存提醒
Vue.prototype.httpApi.stock.storeHouseRemind = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/storeHouseRemind', params,
    function (data) {
      successCallback(data);
    })
};





