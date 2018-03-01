/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/client/platform/list', //后台管理客户
    component: resolve => require(['@/pages/client/platform/list'], resolve)
  },
  {
    path: '/client/platform/add', //后台添加管理客户
    component: resolve => require(['@/pages/client/platform/add'], resolve)
  },
  {
    path: '/client/platform/detail/:id', //后台查看客户详情
    component: resolve => require(['@/pages/client/platform/detail'], resolve)
  },
  {
    path: '/client/platform/update/:id', //后台修改客户
    component: resolve => require(['@/pages/client/platform/update'], resolve)
  },
  {
    path: '/client/clientmanagement', //客户列表
    component: resolve => require(['@/pages/client/ClientManagement'], resolve)
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
