/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/dictionary/dictionaryclassify', //商品分类
    component: resolve => require(['@/pages/dictionary/DictionaryClassify'], resolve)
  },
  {
    path: '/dictionary/dictionarybrand', //商品品牌
    component: resolve => require(['@/pages/dictionary/DictionaryBrand'], resolve)
  },
  {
    path: '/dictionary/dictionarylabel', //商品标签
    component: resolve => require(['@/pages/dictionary/DictionaryLabel'], resolve)
  },
  {
    path: '/dictionary/measurementunit', //计量单位
    component: resolve => require(['@/pages/dictionary/MeasurementUnit'], resolve)
  },
  {
    path: '/dictionary/clientlevel', //客户级别
    component: resolve => require(['@/pages/dictionary/ClientLevel'], resolve)
  },
  {
    path: '/dictionary/notificationcategories', //通知分类
    component: resolve => require(['@/pages/dictionary/notificationcategories'], resolve)
  },
  {
    path: '/dictionary/storehouse', //仓库
    component: resolve => require(['@/pages/dictionary/StoreHouse'], resolve)
  },
  {
    path: '/dictionary/test', //仓库
    component: resolve => require(['@/pages/dictionary/test'], resolve)
  },
]
