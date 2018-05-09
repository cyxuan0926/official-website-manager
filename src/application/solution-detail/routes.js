import * as components from './components'
export default [
  {
    path: 'solution-detail/new',
    component: components.solutionDetailNew,
    name: '新增解决方案详情',
    meta: {
      requireAuth: true
    }
  },
  {
    path: 'solution-detail/list',
    component: components.solutionDetailList,
    name: '解决方案详情管理',
    meta: {
      requireAuth: true
    }
  }
]
