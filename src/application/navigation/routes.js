import * as components from './components'
export default [
  {
    path: 'navigation/new',
    component: components.navigationNew,
    name: '新增导航栏',
    meta: {
      requireAuth: true
    }
  },
  {
    path: 'navigation/list',
    component: components.navigationList,
    name: '导航栏管理',
    meta: {
      requireAuth: true
    }
  },
  {
    path: 'navigation/edit/:id',
    component: components.navigationEdit,
    name: '修改导航栏',
    meta: {
      requireAuth: true
    }
  }
]
