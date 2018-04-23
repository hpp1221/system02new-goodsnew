/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/commodit/classify', //商品分类
    component: resolve => require(['@/pages/commodit/Classify'], resolve)
  },
  {
    path: '/commodit/goodslist', //商品列表
    component: resolve => require(['@/pages/commodit/GoodsList'], resolve),
    meta : {
      keepAlive:true
    }
  },
  {
    path: '/commodit/creategoods', //新增商品
    component: resolve => require(['@/pages/commodit/CreateGoods'], resolve)
  },
  {
    path: '/commodit/goodsDetail/:id', //商品详情
    component: resolve => require(['@/pages/commodit/goodsDetail'], resolve),
    meta : {
      keepAlive:false
    }
  },
  {
    path: '/commodit/updategoods/:id/:goodsId', //修改商品详情
    component: resolve => require(['@/pages/commodit/UpdateGoods'], resolve),
    meta : {
      keepAlive:false
    }
  },
  {
    path: '/commodit/multipleInputGoods', //批量导入商品
    component: resolve => require(['@/pages/commodit/MultipleInputGoods'], resolve)
  },
]
