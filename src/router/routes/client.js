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
    path: '/client/clientmanagement', //客户管理
    component: resolve => require(['@/pages/client/ClientManagement'], resolve)
  },
  {
    path: '/client/inputclient', //客户导入
    component: resolve => require(['@/pages/client/InputClient'], resolve)
  },
  {
    path: '/client/updateclient/:id', //修改客户详情
    component: resolve => require(['@/pages/client/UpdateClient'], resolve)
  },
  {
    path: '/client/createclient', //新增客户
    component: resolve => require(['@/pages/client/CreateClient'], resolve)
  },


]
