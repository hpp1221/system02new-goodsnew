/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/tenant/tenant/list', //租户列表
    component: resolve => require(['@/pages/tenant/tenant/list'], resolve)
  },
  {
    path: '/tenant/company/list', //公司列表
    component: resolve => require(['@/pages/tenant/company/list'], resolve)
  },
]
