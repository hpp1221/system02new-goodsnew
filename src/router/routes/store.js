/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/store/storemaintenance/storemaintenancelist', //门店维护
    component: resolve => require(['@/pages/store/storemaintenance/StoreMaintenanceList'], resolve)
  },
  {
    path: '/store/storemanagement/storegetgoods/storegetgoodslist', //要货单列表
    component: resolve => require(['@/pages/store/storemanagement/storegetgoods/StoreGetGoodsList'], resolve)
  },
  {
    path: '/store/storemanagement/storegetgoods/creategetgoods', //要货单新增
    component: resolve => require(['@/pages/store/storemanagement/storegetgoods/CreateGetGoods'], resolve)
  },
  {
    path: '/store/storemanagement/storegetgoods/storegetgoodsdetail', //要货单详情
    component: resolve => require(['@/pages/store/storemanagement/storegetgoods/StoreGetGoodsDetail'], resolve)
  },
  {
    path: '/store/storemanagement/storegetgoods/storegetgoodsexamine', //要货单审核
    component: resolve => require(['@/pages/store/storemanagement/storegetgoods/StoreGetGoodsExamine'], resolve)
  },
  {
    path: '/store/storemanagement/storegetgoods/storegetgoodsdetail', //门店盘点列表
    component: resolve => require(['@/pages/store/storemanagement/storegetgoods/StoreGetGoodsDetail'], resolve)
  },
]
