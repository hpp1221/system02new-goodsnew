import Vue from 'vue'
import '../js'
//创建供应商
Vue.prototype.httpApi.supplier.createSupplier = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/createSupplier', params,
    function (data) {
      successCallback(data);
    })
};
//删除一个供应商
Vue.prototype.httpApi.supplier.deleteSupplierBySupplierId = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/deleteSupplierBySupplierId', params,
    function (data) {
      successCallback(data);
    })
};
//导出excel
Vue.prototype.httpApi.supplier.exportSupplierGoods = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/supplier/exportSupplierGoods', params,
    function (data) {
      successCallback(data);
    })
};
//导出excel模板
Vue.prototype.httpApi.supplier.exportSupplierGoodsDemo = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/supplier/exportSupplierGoodsDemo', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询供应商
Vue.prototype.httpApi.supplier.getById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/getById', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询平台或渠道供应商
Vue.prototype.httpApi.supplier.getPlatformAndChannelSupplierById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/getPlatformAndChannelSupplierById', params,
    function (data) {
      successCallback(data);
    })
};
//查询供应商列表总数
Vue.prototype.httpApi.supplier.getSupplierCountByQuery = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/getSupplierCountByQuery', params,
    function (data) {
      successCallback(data);
    })
};
//excel导入
Vue.prototype.httpApi.supplier.importSupplierGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/importSupplierGoods', params,
    function (data) {
      successCallback(data);
    })
};
//插入供应商列表
Vue.prototype.httpApi.supplier.insertSupplierList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/insertSupplierList', params,
    function (data) {
      successCallback(data);
    })
};
//供应商列表
Vue.prototype.httpApi.supplier.list = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/list', params,
    function (data) {
      successCallback(data);
    })
};
//查询供应商列表
Vue.prototype.httpApi.supplier.listByPage = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/listByPage', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询供应商列表
Vue.prototype.httpApi.supplier.listByPageAndQuery = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/listByPageAndQuery', params,
    function (data) {
      successCallback(data);
    })
};
//根据id更新供应商
Vue.prototype.httpApi.supplier.modifySupplier = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/modifySupplier', params,
    function (data) {
      successCallback(data);
    })
};
//根据名字模糊查询供应商
Vue.prototype.httpApi.supplier.searchSuppliersByName = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/searchSuppliersByName', params,
    function (data) {
      successCallback(data);
    })
};
//根据name列表查询供应商
Vue.prototype.httpApi.supplier.selectSupplierByNameList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/selectSupplierByNameList', params,
    function (data) {
      successCallback(data);
    })
};
//供应商商品列表查询
Vue.prototype.httpApi.supplier.supplierGoodslistByPageAndQuery = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/supplierGoodslistByPageAndQuery', params,
    function (data) {
      successCallback(data);
    })
};
//不包含平台供应商列表
Vue.prototype.httpApi.supplier.supplierListNoPlatform = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/supplier/supplierListNoPlatform', params,
    function (data) {
      successCallback(data);
    })
};
