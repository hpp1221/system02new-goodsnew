/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/dictionary/dictionaryclassify', //商品分类
    component: resolve => require(['@/pages/dictionary/DictionaryClassify'], resolve)
  },
  {
    path: '/dictionary/measurementunit', //计量单位
    component: resolve => require(['@/pages/dictionary/MeasurementUnit'], resolve)
  },
  {
    path: '/dictionary/recommended', //为你推荐
    component: resolve => require(['@/pages/dictionary/Recommended'], resolve)
  },
  {
    path: '/dictionary/tags', //标签管理
    component: resolve => require(['@/pages/dictionary/Tags'], resolve)
  },
]
