/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/temporary/list', //临时商品列表
    component: resolve => require(['@/pages/temporary/List'], resolve),
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/temporary/create', //临时商品新增
    component: resolve => require(['@/pages/temporary/Create'], resolve)
  },
  {
    path: '/temporary/update/:id', //临时商品修改
    component: resolve => require(['@/pages/temporary/Update'], resolve)
  },
]
