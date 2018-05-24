export default [
  {
    path: '/activitybar/list', //活动栏列表
    component: resolve => require(['@/pages/activitybar/List'], resolve),
    meta:{
      keepAlive:true
    } 
  }
]
