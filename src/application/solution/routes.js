import * as components from './components'
export default [
  {
    path: 'solution/new',
    component: components.solutionNew,
    name: '新增解决方案',
    meta: {
      requireAuth: true
    }
  },
  {
    path: 'solution/list',
    component: components.solutionList,
    name: '解决方案管理',
    meta: {
      requireAuth: true
    }
  },
  {
    path: 'solution/edit/:id',
    component: components.solutionEdit,
    name: '修改解决方案',
    meta: {
      requireAuth: true
    }
  }
]
