/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/store/storemaintenance/storemaintenanceList', //门店维护
    component: resolve => require(['@/pages/store/storemaintenance/StoreMaintenanceList'], resolve)
  },
  {
    path: '/store/storemanagement/storegetgoods/storegetgoodslist', //门店要货列表
    component: resolve => require(['@/pages/store/storemanagement/storegetgoods/StoreGetGoodsList'], resolve)
  },

]
