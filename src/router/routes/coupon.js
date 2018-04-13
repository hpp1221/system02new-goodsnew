/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/coupon/list', //列表
    component: resolve => require(['@/pages/coupon/List'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/coupon/listout', //发放
    component: resolve => require(['@/pages/coupon/Out'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/coupon/couponclient', //客户列表
    component: resolve => require(['@/pages/coupon/CouponClient'], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/coupon/outlist', //发放列表
    component: resolve => require(['@/pages/coupon/OutList'], resolve),
    meta: {
      keepAlive: true
    }
  },
]
