/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/tenant/tenant/list', //租户列表
    component: resolve => require(['@/pages/tenant/tenant/list'], resolve)
  },
  {
    path: '/tenant/tenant/detail/:id', //租户列表
    component: resolve => require(['@/pages/tenant/tenant/detail'], resolve)
  },
  {
    path: '/tenant/company/list', //公司列表
    component: resolve => require(['@/pages/tenant/company/list'], resolve)
  },
  {
    path: '/tenant/company/detail/:id', //公司详情
    component: resolve => require(['@/pages/tenant/company/detail'], resolve)
  },
]
