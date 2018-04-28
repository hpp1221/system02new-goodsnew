import Vue from 'vue'
import '../js'
//商品新增
Vue.prototype.httpApi.commodit.addGoodsV1 = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/addGoodsV1', params,
    function (data) {
      successCallback(data);
    })
};
//查询商品详情
Vue.prototype.httpApi.commodit.selectGoodsInfoBySkuId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/goods-v1/selectGoodsInfoBySkuId', params,
    function (data) {
      successCallback(data);
    })
};
//查询商品sku列表
Vue.prototype.httpApi.commodit.selectGoodsSkuList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/selectGoodsSkuList', params,
    function (data) {
      successCallback(data);
    })
};
//更改商品
Vue.prototype.httpApi.commodit.updateGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/updateGoods', params,
    function (data) {
      successCallback(data);
    })
};




//添加类目规格名
Vue.prototype.httpApi.commodit.addCategorySpec = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/spec/addCategorySpec', params,
    function (data) {
      successCallback(data);
    })
};
//添加类目规格值
Vue.prototype.httpApi.commodit.addCategorySpecItem = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/spec/addCategorySpecItem', params,
    function (data) {
      successCallback(data);
    })
};
//删除类目规格名
Vue.prototype.httpApi.commodit.deleteCategorySpecById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/spec/deleteCategorySpecById', params,
    function (data) {
      successCallback(data);
    })
};
//删除类目规格值
Vue.prototype.httpApi.commodit.deleteCategorySpecItemById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/spec/deleteCategorySpecItemById', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询类目规格名信息
Vue.prototype.httpApi.commodit.selectCategorySpecById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/spec/selectCategorySpecById', params,
    function (data) {
      successCallback(data);
    })
};
//根据类目id查询规格名列表
Vue.prototype.httpApi.commodit.selectCategorySpecListByCategoryId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/spec/selectCategorySpecListByCategoryId', params,
    function (data) {
      successCallback(data);
    })
};
//修改类目规格名
Vue.prototype.httpApi.commodit.updateCategorySpec = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/spec/updateCategorySpec', params,
    function (data) {
      successCallback(data);
    })
};
//根据id修改类目规格值状态
Vue.prototype.httpApi.commodit.updateCategorySpecItemStatus = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/spec/updateCategorySpecItemStatus', params,
    function (data) {
      successCallback(data);
    })
};
//根据id修改类目规格名状态
Vue.prototype.httpApi.commodit.updateCategorySpecStatus = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/spec/updateCategorySpecStatus', params,
    function (data) {
      successCallback(data);
    })
};

//添加类目下基本属性名
Vue.prototype.httpApi.commodit.addCategoryAttribute = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/attribute/addCategoryAttribute', params,
    function (data) {
      successCallback(data);
    })
};
//添加类目下基本属性值
Vue.prototype.httpApi.commodit.addAttributeItem = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/attribute/addAttributeItem', params,
    function (data) {
      successCallback(data);
    })
};
//根据id删除属性值
Vue.prototype.httpApi.commodit.deleteAttributeItemById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/attribute/deleteAttributeItemById', params,
    function (data) {
      successCallback(data);
    })
};
//根据id删除属性名
Vue.prototype.httpApi.commodit.deleteCategoryAttributeById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/attribute/deleteCategoryAttributeById', params,
    function (data) {
      successCallback(data);
    })
};
//根据类目id查询基本属性
Vue.prototype.httpApi.commodit.selectCategoryAttributeById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/attribute/selectCategoryAttributeById', params,
    function (data) {
      successCallback(data);
    })
};
//根据类目id查询基本属性列表
Vue.prototype.httpApi.commodit.selectCategoryAttributeListByCategoryId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/attribute/selectCategoryAttributeListByCategoryId', params,
    function (data) {
      successCallback(data);
    })
};
//根据类目id查询基本属性列表
Vue.prototype.httpApi.commodit.selectCategoryAttributeListByCategoryId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/attribute/selectCategoryAttributeListByCategoryId', params,
    function (data) {
      successCallback(data);
    })
};
//根据类目id查询类目规格值列表
Vue.prototype.httpApi.commodit.selectSpecItemListByCategoryId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/spec/selectSpecItemListByCategoryId', params,
    function (data) {
      successCallback(data);
    })
};
//修改类目下基本属性名
Vue.prototype.httpApi.commodit.updateCategoryAttribute = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/attribute/updateCategoryAttribute', params,
    function (data) {
      successCallback(data);
    })
};
//根据id修改属性名状态
Vue.prototype.httpApi.commodit.updateCategoryAttributeStatus = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/attribute/updateCategoryAttributeStatus', params,
    function (data) {
      successCallback(data);
    })
};
//根据id修改属性值状态
Vue.prototype.httpApi.commodit.updateAttributeItemStatus = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/attribute/updateAttributeItemStatus', params,
    function (data) {
      successCallback(data);
    })
};
