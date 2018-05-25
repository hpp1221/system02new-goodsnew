export default [
  {
    path: '/activitybar/list', //活动栏列表
    component: resolve => require(['@/pages/activity/activitybar/List'], resolve),
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/activityicon/list', //活动图标列表
    component: resolve => require(['@/pages/activity/activityicon/List'], resolve),
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/activitydemo/list', //活动模块商品列表
    component: resolve => require(['@/pages/activity/activitydemo/List'], resolve),
    meta:{
      keepAlive:true
    }
  }
]
