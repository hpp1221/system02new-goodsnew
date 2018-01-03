/**
 * Created by Administrator on 2017/9/29 0029.
 */
export default [
  {
    path: '/combination/list', //组合列表
    component: resolve => require(['@/pages/combination/List'], resolve)
  },
  {
    path: '/combination/add', //新增
    component: resolve => require(['@/pages/combination/CombinationAdd'], resolve)
  },
  {
    path: '/combination/detail/:id', //详情
    component: resolve => require(['@/pages/combination/Detail'], resolve)
  },
  {
    path: '/combination/update/:id', //修改
    component: resolve => require(['@/pages/combination/Update'], resolve)
  },
]
