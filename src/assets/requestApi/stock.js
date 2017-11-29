import Vue from 'vue'
import '../js'
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
//品牌商列表不分页
Vue.prototype.httpApi.stock.selectBrandDealerAllList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/brandDealer/selectBrandDealerAllList', params,
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
  Vue.prototype.httpGet('/admin/brandDealer/selectBrandDealerById', params,
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
//地区数据字典---省
Vue.prototype.httpApi.stock.getProvince = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/region/getProvince', params,
    function (data) {
      successCallback(data);
    })
};
//地区数据字典---市
Vue.prototype.httpApi.stock.getCityByProvinceId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/region/getCityByProvinceId', params,
    function (data) {
      successCallback(data);
    })
};
//地区数据字典---区
Vue.prototype.httpApi.stock.getAreaByCityId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/region/getAreaByCityId', params,
    function (data) {
      successCallback(data);
    })
};
//地区数据字典---省市区
Vue.prototype.httpApi.stock.selectRegionTree = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/region/selectRegionTree', params,
    function (data) {
      successCallback(data);
    })
};
//获取所有地区数据，以列表形式展现
Vue.prototype.httpApi.stock.selectRegionList = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/region/selectRegionList',params,
    function (data) {
      successCallback(data);
    })
};




