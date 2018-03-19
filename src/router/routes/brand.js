/**
 * Created by Lyb on 2017/9/29 0029.
 */
export default [
  {
    path: '/brand/list', //品牌商列表
    component: resolve => require(['@/pages/brand/List'], resolve),
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/brand/add', //品牌商新增
    component: resolve => require(['@/pages/brand/BrandAdd'], resolve)
  },
  {
    path: '/brand/detail/:id', //品牌商详情
    component: resolve => require(['@/pages/brand/Detail'], resolve)
  },
  {
    path: '/brand/update/:id', //品牌商修改
    component: resolve => require(['@/pages/brand/Update'], resolve),
    meta:{
      keepAlive:false
    }
  },
]
