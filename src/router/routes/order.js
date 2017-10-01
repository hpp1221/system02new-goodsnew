/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/order/createorder', //创建订单
    component: resolve => require(['@/pages/order/CreateOrder'], resolve)
  },
  {
    path: '/order/orderlist', //订单列表
    component: resolve => require(['@/pages/order/OrderList'], resolve)
  },
  {
    path: '/order/personalorder', //个人订单
    component: resolve => require(['@/pages/order/PersonalOrder'], resolve)
  },
  {
    path: '/order/orderdetail', //订单详情
    component: resolve => require(['@/pages/order/OrderDetail'], resolve)
  },
  {
    path: '/order/ordersummary', //订单
    component: resolve => require(['@/pages/order/OrderSummary'], resolve)
  },
]
