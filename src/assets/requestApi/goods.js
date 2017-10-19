import Vue from 'vue'
import '../js'

//添加商品
Vue.prototype.httpApi.goods.addGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/addGoods', params,
    function (data) {
      successCallback(data);
    })
};

//解析商品excel
Vue.prototype.httpApi.goods.analysisGoodsExcel = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/analysisGoodsExcel', params,
    function (data) {
      successCallback(data);
    })
};

//解析zip
Vue.prototype.httpApi.goods.analysisZip = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/analysisZip', params,
    function (data) {
      successCallback(data);
    })
};

//类目列表
Vue.prototype.httpApi.goods.catList = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/catList', params,
    function (data) {
      successCallback(data);
    })
};

//修改商品
Vue.prototype.httpApi.goods.editGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/editGoods', params,
    function (data) {
      successCallback(data);
    })
};
//修改商品sku
Vue.prototype.httpApi.goods.editSku = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/editSku', params,
    function (data) {
      successCallback(data);
    })
};

//批量修改sku标签
Vue.prototype.httpApi.goods.editSkuTag = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/editSkuTag', params,
    function (data) {
      successCallback(data);
    })
};

//导出商品
Vue.prototype.httpApi.goods.exportGoods = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/exportGoods', params,
    function (data) {
      successCallback(data);
    })
};

//下载模板
Vue.prototype.httpApi.goods.exportGoodsDemo = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/exportGoodsDemo', params,
    function (data) {
      successCallback(data);
    })
};

//导出供应商商品信息
Vue.prototype.httpApi.goods.exportSupplierGoodsInfo = function (params, successCallback) {
  Vue.prototype.httpGet('/ui/exportSupplierGoodsInfo', params,
    function (data) {
      successCallback(data);
    })
};
//查询单个商品信息
Vue.prototype.httpApi.goods.goodsDetail = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/goodsDetail', params,
    function (data) {
      successCallback(data);
    })
};
//批量上传图片
Vue.prototype.httpApi.goods.importPicture = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/importPicture', params,
    function (data) {
      successCallback(data);
    })
};

//导入商品
Vue.prototype.httpApi.goods.inputGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/inputGoods', params,
    function (data) {
      successCallback(data);
    })
};

//查询订单商品信息
Vue.prototype.httpApi.goods.orderGoodsInfo = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/orderGoodsInfo', params,
    function (data) {
      successCallback(data);
    })
};

//添加商品之前的平台商品列表的商品详情
Vue.prototype.httpApi.goods.showGoodsDetail = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/showGoodsDetail', params,
    function (data) {
      successCallback(data);
    })
};

//添加商品之前的平台商品列表
Vue.prototype.httpApi.goods.showGoodsList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/showGoodsList', params,
    function (data) {
      successCallback(data);
    })
};

//查询sku列表
Vue.prototype.httpApi.goods.skuList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/skuList', params,
    function (data) {
      successCallback(data);
    })
};

//供应商商品列表
Vue.prototype.httpApi.goods.supplierGoodsList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/supplierGoodsList', params,
    function (data) {
      successCallback(data);
    })
};
//商品标签列表
Vue.prototype.httpApi.goods.tagList = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/tagList', params,
    function (data) {
      successCallback(data);
    })
};
//批量上架下架
Vue.prototype.httpApi.goods.upOrDownGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/ui/upOrDownGoods', params,
    function (data) {
      successCallback(data);
    })
};
