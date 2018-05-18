import Vue from 'vue'
import '../js'
//添加推荐商品
Vue.prototype.httpApi.recommed.addGoodsRecommend = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsRecommend/addGoodsRecommend', params,
    function (data) {
      successCallback(data);
    })
};
//批量添加推荐商品
Vue.prototype.httpApi.recommed.addGoodsRecommendList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsRecommend/addGoodsRecommendList', params,
    function (data) {
      successCallback(data);
    })
};
//根据id删除推荐商品
Vue.prototype.httpApi.recommed.deleteGoodsRecommendBySkuId = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/goodsRecommend/deleteGoodsRecommendBySkuId', params,
    function (data) {
      successCallback(data);
    })
};
//获取商品推荐列表
Vue.prototype.httpApi.recommed.selectGoodsSkuRecommendList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsRecommend/selectGoodsSkuRecommendList', params,
    function (data) {
      successCallback(data);
    })
};
//获取没有被推荐商品列表
Vue.prototype.httpApi.recommed.selectNotGoodsRecommendList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsRecommend/selectNotGoodsRecommendList', params,
    function (data) {
      successCallback(data);
    })
};
