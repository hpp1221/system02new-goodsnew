import Vue from 'vue'
import '../js'
//查询数据字典(根据类型 查询数据字典列表)客户列表认证状态数字字典表
Vue.prototype.httpApi.dict.selectDictByType = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/dict/selectDictByType', params,
    function (data) {
      successCallback(data);
    })
};
//查询数据字典(根据类型 name 查询数据dict)
Vue.prototype.httpApi.dict.selectDictByTypeAndName = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/dict/selectDictByTypeAndName', params,
    function (data) {
      successCallback(data);
    })
};
//查询数据字典(根据类型 value 查询数据dict)客户详情面积数字字典表
Vue.prototype.httpApi.dict.selectDictByTypeAndValue = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/dict/selectDictByTypeAndValue', params,
    function (data) {
      successCallback(data);
    })
};



//地区数据字典

//根据id查询市下所有的区
Vue.prototype.httpApi.dict.getAreaByCityId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/region/getAreaByCityId', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询市下所有的市
Vue.prototype.httpApi.dict.getCityByProvinceId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/region/getCityByProvinceId', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询所有的省
Vue.prototype.httpApi.dict.getProvince = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/region/getProvince', params,
    function (data) {
      successCallback(data);
    })
};
//查询所有的地址
Vue.prototype.httpApi.dict.selectRegionList = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/region/selectRegionList', params,
    function (data) {
      successCallback(data);
    })
};
//查询所有的地址返回树结构
Vue.prototype.httpApi.dict.selectRegionTree = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/region/selectRegionTree', params,
    function (data) {
      successCallback(data);
    })
};

//加载所有物流公司信息
Vue.prototype.httpApi.dict.selectLogistics = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/dict/selectLogistics', params,
    function (data) {
      successCallback(data);
    })
};
