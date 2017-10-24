/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/supplier/suppliers/leadin', //供应商导入
    component: resolve => require(['@/pages/supplier/suppliers/Leadin'], resolve)
  },
  {
    path: '/supplier/suppliers/createsupplier', //供应商新增
    component: resolve => require(['@/pages/supplier/suppliers/CreateSupplier'], resolve)
  },
  {
    path: '/supplier/suppliers/supplierlist', //供应商管理
    component: resolve => require(['@/pages/supplier/suppliers/SupplierList'], resolve)
  },
  {
    path: '/supplier/suppliers/updatesupplier', //修改供应商详情
    component: resolve => require(['@/pages/supplier/suppliers/UpdateSupplier'], resolve)
  },
  {
    path: '/supplier/suppliergoods/suppliergoodslist', //供应商商品管理列表
    component: resolve => require(['@/pages/supplier/supplierGoods/SupplierGoodsList'], resolve)
  },
  {
    path: '/supplier/suppliergoods/suppliergoodscreate', //供应商商品新增
    component: resolve => require(['@/pages/supplier/supplierGoods/SupplierGoodsCreate'], resolve)
  },
]
