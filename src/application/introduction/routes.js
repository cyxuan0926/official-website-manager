import * as components from './components'
export default [
  {
    path: 'introduction/new',
    component: components.introductionNew,
    name: '新增简介',
    meta: {
      requireAuth: true
    }
  },
  {
    path: 'introduction/list',
    component: components.introductionList,
    name: '简介管理',
    meta: {
      requireAuth: true
    }
  }
]
