/**
 * Created by Lyb on 2017/9/29 0029.
 */
export default [
  {
    path: '/brands/list', //品牌列表
    component: resolve => require(['@/pages/brands/List'], resolve)
  },
  {
    path: '/brands/create', //品牌新增
    component: resolve => require(['@/pages/brands/Create'], resolve)
  },
  {
    path: '/brands/detail/:id', //品牌详情
    component: resolve => require(['@/pages/brands/Detail'], resolve)
  },
  {
    path: '/brands/update/:id', //品牌修改
    component: resolve => require(['@/pages/brands/Update'], resolve)
  },
]
