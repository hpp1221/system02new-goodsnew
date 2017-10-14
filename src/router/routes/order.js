/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/order/purchaseorder/add', //创建采购订单
    component: resolve => require(['@/pages/order/purchaseorder/add'], resolve)
  },
  {
    path: '/order/purchaseorder/list', //采购订单列表
    component: resolve => require(['@/pages/order/purchaseorder/list'], resolve)
  },
  {
    path: '/order/purchaseorder/detail/:id', //采购订单详情
    component: resolve => require(['@/pages/order/purchaseorder/detail'], resolve)
  },
  {
    path: '/order/purchaseorder/verify/:id', //采购订单审核
    component: resolve => require(['@/pages/order/purchaseorder/verify'], resolve)
  },

  {
    path: '/order/purchasereturn/list', //采购退货单列表
    component: resolve => require(['@/pages/order/purchasereturn/list'], resolve)
  },
  {
    path: '/order/purchasereturn/add', //添加采购退货单
    component: resolve => require(['@/pages/order/purchasereturn/add'], resolve)
  },
  {
    path: '/order/purchasereturn/detail/:id', //采购退货单详情
    component: resolve => require(['@/pages/order/purchasereturn/detail'], resolve)
  },
  {
    path: '/order/purchasereturn/verify/:id', //审核订单
    component: resolve => require(['@/pages/order/purchasereturn/verify'], resolve)
  },

  {
    path: '/order/saleorder/list', //销售订单列表
    component: resolve => require(['@/pages/order/saleorder/list'], resolve)
  },
  {
    path: '/order/saleorder/add', //添加销售订单
    component: resolve => require(['@/pages/order/saleorder/add'], resolve)
  },
  {
    path: '/order/saleorder/detail/:id', //销售订单详情
    component: resolve => require(['@/pages/order/saleorder/detail'], resolve)
  },

  {
    path: '/order/salereturn/list', //销售退货单列表
    component: resolve => require(['@/pages/order/salereturn/list'], resolve)
  },
  {
    path: '/order/salereturn/add', //添加销售退货单
    component: resolve => require(['@/pages/order/salereturn/add'], resolve)
  },
  {
    path: '/order/salereturn/detail/:id', //销售退货单详情
    component: resolve => require(['@/pages/order/salereturn/detail'], resolve)
  },

  {
    path: '/order/personalorder', //个人订单
    component: resolve => require(['@/pages/order/PersonalOrder'], resolve)
  },
  {
    path: '/order/ordersummary', //订单
    component: resolve => require(['@/pages/order/OrderSummary'], resolve)
  },



]
