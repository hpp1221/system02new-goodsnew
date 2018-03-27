/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [

  {
    path: '/order/saleorder/list', //正向订单列表
    component: resolve => require(['@/pages/order/saleorder/list'], resolve),
    meta : {
      keepAlive:true
    }
  },
  {
    path: '/order/saleorder/add', //添加销售订单
    component: resolve => require(['@/pages/order/saleorder/add'], resolve)
  },
  {
    path: '/order/saleorder/detail/:id', //销售订单详情
    component: resolve => require(['@/pages/order/saleorder/detail'], resolve),
    meta : {
      keepAlive:false
    }
  },
  {
    path: '/order/saleorder/verify/:id', //销售订单审批
    component: resolve => require(['@/pages/order/saleorder/verify'], resolve)
  },

]
