import Vue from 'vue'
import '../js'
/*--------------------------优惠券规则--------------------------------------*/


//添加优惠券金额规则
Vue.prototype.httpApi.coupon.addCoupon = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/coupon/addCoupon', params,
    function (data) {
      successCallback(data);
    })
};
//根据id删除优惠券金额规则
Vue.prototype.httpApi.coupon.deleteCoupon = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/coupon/deleteCoupon', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询优惠券金额规则详情
Vue.prototype.httpApi.coupon.selectCoupon = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/coupon/selectCoupon', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询优惠券金额规则列表
Vue.prototype.httpApi.coupon.selectCouponList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/coupon/selectCouponList', params,
    function (data) {
      successCallback(data);
    })
};

//根据id修改优惠券金额规则
Vue.prototype.httpApi.coupon.updateCoupon = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/coupon/updateCoupon', params,
    function (data) {
      successCallback(data);
    })
};
//修改优惠券状态
Vue.prototype.httpApi.coupon.updateCouponStatus = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/coupon/updateCouponStatus', params,
    function (data) {
      successCallback(data);
    })
};
//查询定向派发优惠券信息
Vue.prototype.httpApi.coupon.selectDistributeCouponList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/coupon/selectDistributeCouponList', params,
    function (data) {
      successCallback(data);
    })
};
//指定用户派发优惠券
Vue.prototype.httpApi.coupon.doDistributeCoupon = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/coupon/doDistributeCoupon', params,
    function (data) {
      successCallback(data);
    })
};
//根据条件，查询优惠券发放信息
Vue.prototype.httpApi.coupon.selectDistributeMemberCouponList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/coupon/selectDistributeMemberCouponList', params,
    function (data) {
      successCallback(data);
    })
};
/*--------------------------金额规则--------------------------------------*/


//添加优惠券金额规则
Vue.prototype.httpApi.coupon.addCouponAmountRule = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/couponAmountRule/addCouponAmountRule', params,
    function (data) {
      successCallback(data);
    })
};
//根据id删除优惠券金额规则
Vue.prototype.httpApi.coupon.deleteCouponAmountRule = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/couponAmountRule/deleteCouponAmountRule', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询优惠券金额规则详情
Vue.prototype.httpApi.coupon.selectCouponAmountRuleById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/couponAmountRule/selectCouponAmountRuleById', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询优惠券金额规则列表
Vue.prototype.httpApi.coupon.selectCouponAmountRuleList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/couponAmountRule/selectCouponAmountRuleList', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询优惠券金额规则列表不分页
Vue.prototype.httpApi.coupon.selectCouponAmountRuleListAll = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/couponAmountRule/selectCouponAmountRuleListAll', params,
    function (data) {
      successCallback(data);
    })
};
//根据id修改优惠券金额规则
Vue.prototype.httpApi.coupon.updateCouponAmountRule = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/couponAmountRule/updateCouponAmountRule', params,
    function (data) {
      successCallback(data);
    })
};

/*--------------------------品类规则--------------------------------------*/


//添加优惠券品类规则
Vue.prototype.httpApi.coupon.addCouponCategoryRule = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/couponCategoryRule/addCouponCategoryRule', params,
    function (data) {
      successCallback(data);
    })
};
//根据id删除优惠券品类规则
Vue.prototype.httpApi.coupon.deleteCouponCategoryRule = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/couponCategoryRule/deleteCouponCategoryRule', params,
    function (data) {
      successCallback(data);
    })
};
//根据id查询优惠券品类规则详情
Vue.prototype.httpApi.coupon.selectCouponCategoryRuleById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/couponCategoryRule/selectCouponCategoryRuleById', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询优惠券品类规则列表
Vue.prototype.httpApi.coupon.selectCouponCategoryRuleList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/couponCategoryRule/selectCouponCategoryRuleList', params,
    function (data) {
      successCallback(data);
    })
};
//条件查询优惠券品类规则列表不分页
Vue.prototype.httpApi.coupon.selectCouponCategoryRuleListAll = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/couponCategoryRule/selectCouponCategoryRuleListAll', params,
    function (data) {
      successCallback(data);
    })
};
//根据id修改优惠券品类规则
Vue.prototype.httpApi.coupon.updateCouponCategoryRule = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/couponCategoryRule/updateCouponCategoryRule', params,
    function (data) {
      successCallback(data);
    })
};


