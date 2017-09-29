/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/personal/security/security', //账户安全
    component: resolve => require(['@/pages/personal/security/Security'], resolve)
  },
  {
    path: '/personal/company/basicinfo', //基础信息
    component: resolve => require(['@/pages/personal/company/BasicInfo'], resolve)
  },
  {
    path: '/personal/company/department', //员工部门信息
    component: resolve => require(['@/pages/personal/company/Department'], resolve)
  },

  {
    path: '/personal/client/clientmanagement', //客户管理
    component: resolve => require(['@/pages/personal/client/ClientManagement'], resolve)
  },
  {
    path: '/personal/client/inputclient', //客户导入
    component: resolve => require(['@/pages/personal/client/InputClient'], resolve)
  },
  {
    path: '/personal/client/updateclient', //修改客户详情
    component: resolve => require(['@/pages/personal/client/UpdateClient'], resolve)
  },
  {
    path: '/personal/client/createclient', //新增客户
    component: resolve => require(['@/pages/personal/client/CreateClient'], resolve)
  },

  {
    path: '/personal/role/list', //角色列表
    component: resolve => require(['@/pages/personal/role/list'], resolve)
  },
  {
    path: '/personal/role/add', //新建角色
    component: resolve => require(['@/pages/personal/role/add'], resolve)
  },
  {
    path: '/personal/role/update', //修改角色
    component: resolve => require(['@/pages/personal/role/update'], resolve)
  },
]
