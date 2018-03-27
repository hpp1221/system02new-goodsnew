/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/coupon/list', //列表
    component: resolve => require(['@/pages/coupon/List'], resolve)
  },
  {
    path: '/coupon/add', //新增
    component: resolve => require(['@/pages/coupon/Add'], resolve)
  },
]
