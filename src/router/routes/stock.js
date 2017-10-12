/**
 * Created by Lyb on 2017/9/29 0029.
 */
export default [
  {
    // r => require.ensure([], () => r(require('@/pages/stock/goodsin/List')), 'User')
    path: '/stock/goodsin/list', //商品入库
    component: resolve => require(['@/pages/stock/goodsin/List'], resolve)
  },
  {
    path: '/stock/goodsin/add', //添加入库
    component: resolve => require(['@/pages/stock/goodsin/add'], resolve)
  },
  {
    path: '/stock/goodsin/detail/:id', //入库明细
    component: resolve => require(['@/pages/stock/goodsin/Detail'], resolve)
  },
  {
    path: '/stock/goodsout/list', //商品出库
    component: resolve => require(['@/pages/stock/goodsout/List'], resolve)
  },
  {
    path: '/stock/goodsout/add', //添加出库
    component: resolve => require(['@/pages/stock/goodsout/Add'], resolve)
  },
  {
    path: '/stock/goodsout/detail/:id', //入库明细
    component: resolve => require(['@/pages/stock/goodsout/Detail'], resolve)
  },
  {
    path: '/stock/goodsstore/list', //商品库存
    component: resolve => require(['@/pages/stock/goodsstore/List'], resolve)
  },
  {
    path: '/stock/stockallocation/list', //库存调拨
    component: resolve => require(['@/pages/stock/stockallocation/List'], resolve)
  },
  {
    path: '/stock/stockallocation/add', //添加库存调拨
    component: resolve => require(['@/pages/stock/stockallocation/Add'], resolve)
  },
  {
    path: '/stock/stockallocation/detail', //添加库存调拨
    component: resolve => require(['@/pages/stock/stockallocation/Detail'], resolve)
  },
  {
    path: '/stock/stocking/stocking', //库存盘点
    component: resolve => require(['@/pages/stock/stocking/stocking'], resolve)
  },
  {
    path: '/stock/inoutdetail/list', //出入库明细
    component: resolve => require(['@/pages/stock/inoutdetail/List'], resolve)
  },
  {
    path: '/stock/goodssummary/list', //商品收发汇总
    component: resolve => require(['@/pages/stock/goodssummary/List'], resolve)
  },
]
