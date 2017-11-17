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
]
