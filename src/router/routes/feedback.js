/**
 * Created by Lyb on 2017/12/08 0029.
 */
export default [
  {
    path: '/feedback/list', //用户意见反馈列表
    component: resolve => require(['@/pages/feedback/List'], resolve)
  },
  {
    path: '/feedback/detail/:id', //用户意见反馈详情
    component: resolve => require(['@/pages/feedback/Detail'], resolve)
  },
  {
    path: '/feedback/solve/:id', //用户意见反馈处理
    component: resolve => require(['@/pages/feedback/Solve'], resolve)
  },
]
