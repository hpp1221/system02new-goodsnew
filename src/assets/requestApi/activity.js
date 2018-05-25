import Vue from 'vue'
import '../js'
//活动栏新增
Vue.prototype.httpApi.activity.addBanner = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/banner/addBanner', params,
    function (data) {
      successCallback(data);
    })
};
//删除活动栏
Vue.prototype.httpApi.activity.deleteBannerById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/banner/deleteBannerById', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询活动栏详情
Vue.prototype.httpApi.activity.selectBannerById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/banner/selectBannerById', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询列表
Vue.prototype.httpApi.activity.selectBannerList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/banner/selectBannerList', params,
    function (data) {
      successCallback(data);
    })
};
//活动栏修改
Vue.prototype.httpApi.activity.updateBannerById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/banner/updateBannerById', params,
    function (data) {
      successCallback(data);
    })
};
//活动栏状态修改
Vue.prototype.httpApi.activity.updateBannerStatusById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/banner/updateBannerStatusById', params,
    function (data) {
      successCallback(data);
    })
};

// --------------------------------------------icon---------------------------------------------------------------------
//活动icon新增
Vue.prototype.httpApi.activity.addActivity = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/activity/addActivity', params,
    function (data) {
      successCallback(data);
    })
};
//删除活动icon
Vue.prototype.httpApi.activity.deleteActivityById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/activity/deleteActivityById', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询活动icon详情
Vue.prototype.httpApi.activity.selectActivityById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/activity/selectActivityById', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询列表
Vue.prototype.httpApi.activity.selectActivityList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/activity/selectActivityList', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询列表不分页
Vue.prototype.httpApi.activity.selectActivityListNotPage = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/activity/selectActivityListNotPage', params,
    function (data) {
      successCallback(data);
    })
};
//活动icon修改
Vue.prototype.httpApi.activity.updateActivityById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/activity/updateActivityById', params,
    function (data) {
      successCallback(data);
    })
};
//活动icon状态修改
Vue.prototype.httpApi.activity.updateActivityStatusById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/activity/updateActivityStatusById', params,
    function (data) {
      successCallback(data);
    })
};

// --------------------------------------------demo---------------------------------------------------------------------
//活动demo新增
Vue.prototype.httpApi.activity.addActivityGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/activityGoods/addActivityGoods', params,
    function (data) {
      successCallback(data);
    })
};
//删除活动demo
Vue.prototype.httpApi.activity.deleteActivityById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/activityGoods/deleteActivityById', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询活动demo详情
Vue.prototype.httpApi.activity.selectActivityById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/activityGoods/selectActivityById', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询列表
Vue.prototype.httpApi.activity.selectActivityGoodsList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/activityGoods/selectActivityGoodsList', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询列表goods
Vue.prototype.httpApi.activity.selectNotActivityGoodsList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/activityGoods/selectNotActivityGoodsList', params,
    function (data) {
      successCallback(data);
    })
};
//活动demo修改
Vue.prototype.httpApi.activity.updateActivityGoodsById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/activityGoods/updateActivityGoodsById', params,
    function (data) {
      successCallback(data);
    })
};

