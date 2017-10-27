/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/store/maintenance/list', //门店维护
    component: resolve => require(['@/pages/store/maintenance/list'], resolve)
  },
  {
    path: '/store/maintenance/intenance', //所属仓库维护
    component: resolve => require(['@/pages/store/maintenance/intenance'], resolve)
  },
  {
    path: '/store/management/getgoods/list', //要货单列表
    component: resolve => require(['@/pages/store/management/getgoods/list'], resolve)
  },
  {
    path: '/store/management/getgoods/create', //要货单新增
    component: resolve => require(['@/pages/store/management/getgoods/create'], resolve)
  },
  {
    path: '/store/management/getgoods/detail/:id', //要货单详情
    component: resolve => require(['@/pages/store/management/getgoods/detail'], resolve)
  },
  {
    path: '/store/management/getgoods/examine/:id', //要货单审核
    component: resolve => require(['@/pages/store/management/getgoods/examine'], resolve)
  },
  {
    path: '/store/management/inventory/list', //门店盘点
    component: resolve => require(['@/pages/store/management/inventory/list'], resolve)
  },
  {
    path: '/store/management/stock/list', //门店库存
    component: resolve => require(['@/pages/store/management/stock/List'], resolve)
  },
  {
    path: '/store/management/allocation/list', //门店调拨
    component: resolve => require(['@/pages/store/management/allocation/List'], resolve)
  },
  {
    path: '/store/management/allocation/add', //门店调拨新增
    component: resolve => require(['@/pages/store/management/allocation/Add'], resolve)
  },
  {
    path: '/store/management/allocation/detail/:id', //门店调拨单详情
    component: resolve => require(['@/pages/store/management/allocation/Detail'], resolve)
  },
  {
    path: '/store/management/allocation/examine/:id', //门店调拨单审核
    component: resolve => require(['@/pages/store/management/allocation/Examine'], resolve)
  },
]
