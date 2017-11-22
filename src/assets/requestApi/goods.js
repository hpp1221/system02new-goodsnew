import Vue from 'vue'
import '../js'

//添加商品
Vue.prototype.httpApi.goods.addGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/addGoods', params,
    function (data) {
      successCallback(data);
    })
};

//解析商品excel
Vue.prototype.httpApi.goods.analysisGoodsExcel = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/analysisGoodsExcel', params,
    function (data) {
      successCallback(data);
    })
};

//解析zip
Vue.prototype.httpApi.goods.analysisZip = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/analysisZip', params,
    function (data) {
      successCallback(data);
    })
};

//类目列表
Vue.prototype.httpApi.goods.catList = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/goodsCat/catList', params,
    function (data) {
      successCallback(data);
    })
};

//修改商品
Vue.prototype.httpApi.goods.editGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/editGoods', params,
    function (data) {
      successCallback(data);
    })
};
//修改商品sku
Vue.prototype.httpApi.goods.editSku = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/editSku', params,
    function (data) {
      successCallback(data);
    })
};

//批量修改sku标签
Vue.prototype.httpApi.goods.editSkuTag = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/editSkuTag', params,
    function (data) {
      successCallback(data);
    })
};

//导出商品
Vue.prototype.httpApi.goods.exportGoods = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/goods/exportGoods', params,
    function (data) {
      successCallback(data);
    })
};

//下载模板
Vue.prototype.httpApi.goods.exportGoodsDemo = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/goods/exportGoodsDemo', params,
    function (data) {
      successCallback(data);
    })
};

//导出供应商商品信息
Vue.prototype.httpApi.goods.exportSupplierGoodsInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/exportSupplierGoodsInfo', params,
    function (data) {
      successCallback(data);
    })
};
//查询单个商品信息
Vue.prototype.httpApi.goods.goodsDetail = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/goodsDetail', params,
    function (data) {
      successCallback(data);
    })
};
//批量上传图片
Vue.prototype.httpApi.goods.importPicture = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/importPicture', params,
    function (data) {
      successCallback(data);
    })
};

//导入商品
Vue.prototype.httpApi.goods.inputGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/inputGoods', params,
    function (data) {
      successCallback(data);
    })
};

//查询订单商品信息
Vue.prototype.httpApi.goods.orderGoodsInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/orderGoodsInfo', params,
    function (data) {
      successCallback(data);
    })
};

//添加商品之前的平台商品列表的商品详情
Vue.prototype.httpApi.goods.showGoodsDetail = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/showGoodsDetail', params,
    function (data) {
      successCallback(data);
    })
};

//添加商品之前的平台商品列表
Vue.prototype.httpApi.goods.showGoodsList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/showGoodsList', params,
    function (data) {
      successCallback(data);
    })
};

//查询sku列表
Vue.prototype.httpApi.goods.skuList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/skuList', params,
    function (data) {
      successCallback(data);
    })
};

//供应商商品列表
Vue.prototype.httpApi.goods.supplierGoodsList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/supplierGoodsList', params,
    function (data) {
      successCallback(data);
    })
};
//商品标签列表
Vue.prototype.httpApi.goods.tagList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/tagList', params,
    function (data) {
      successCallback(data);
    })
};
//批量上架下架
Vue.prototype.httpApi.goods.upOrDownGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/upOrDownGoods', params,
    function (data) {
      successCallback(data);
    })
};
