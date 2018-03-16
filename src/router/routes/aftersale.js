/**
 * Created by Lyb on 2017/9/29 0029.
 */
export default [
  {
    path: '/aftersale/list', //售后列表
    component: resolve => require(['@/pages/aftersale/List'], resolve)
  },
  {
    path: '/aftersale/orderdetail/:id', //订单详情
    component: resolve => require(['@/pages/aftersale/OrderDetail'], resolve)
  },
  {
    path: '/aftersale/detail/:id', //售后订单详情
    component: resolve => require(['@/pages/aftersale/Detail'], resolve)
  },
  {
    path: '/aftersale/update/:id', //售后订单处理
    component: resolve => require(['@/pages/aftersale/Update'], resolve)
  },
]
