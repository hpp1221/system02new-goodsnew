/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/client/clientmanagement', //客户列表
    component: resolve => require(['@/pages/client/ClientManagement'], resolve),
    meta:{
      keepAlive:true
    }
  },

  {
    path: '/client/detail/:id', //客户详情
    component: resolve => require(['@/pages/client/Detail'], resolve)
  },
  {
    path: '/client/examine/:id', //客户审核
    component: resolve => require(['@/pages/client/Examine'], resolve)
  },
  {
    path: '/client/update/:id', //修改客户详情
    component: resolve => require(['@/pages/client/Update'], resolve)
  },
  {
    path: '/client/create', //新增客户
    component: resolve => require(['@/pages/client/Create'], resolve)
  },
]
