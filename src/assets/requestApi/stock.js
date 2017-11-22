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

//品牌商列表
Vue.prototype.httpApi.stock.recordListBySku = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/selectBrandDealerList', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商新增
Vue.prototype.httpApi.stock.addBrandDealer = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/addBrandDealer', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商新增中获取凭证数据字典表
Vue.prototype.httpApi.stock.selectDictByType = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/dict/selectDictByType', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商列表
Vue.prototype.httpApi.stock.recordListBySku = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/selectBrandDealerList', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商详情
Vue.prototype.httpApi.stock.selectBrandDealerById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/selectBrandDealerById', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商修改
Vue.prototype.httpApi.stock.updateBrandDealerById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/updateBrandDealerById', params,
    function (data) {
      successCallback(data);
    })
};
//品牌商删除
Vue.prototype.httpApi.stock.deleteBrandDealerById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/deleteBrandDealerById', params,
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





