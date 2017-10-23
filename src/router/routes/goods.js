/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/goods/goodslist', //商品列表
    component: resolve => require(['@/pages/goods/GoodsList'], resolve)
  },
  {
    path: '/goods/creategoods', //新增商品
    component: resolve => require(['@/pages/goods/CreateGoods'], resolve)
  },
  {
    path: '/goods/goodsDetail/:id', //商品详情
    component: resolve => require(['@/pages/goods/goodsDetail'], resolve)
  },
  {
    path: '/goods/updategoods/:id/:goodsId', //修改商品详情
    component: resolve => require(['@/pages/goods/UpdateGoods'], resolve)
  },
  {
    path: '/goods/multipleInputGoods', //批量导入商品
    component: resolve => require(['@/pages/goods/MultipleInputGoods'], resolve)
  },
  {
    path: '/goods/multipleInputImgs', //批量导入图片
    component: resolve => require(['@/pages/goods/MultipleInputImgs'], resolve)
  },
]
