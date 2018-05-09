import * as components from './components'
export default [
  {
    path: 'information/new',
    component: components.informationNew,
    name: '新增基本信息',
    meta: {
      requireAuth: true
    }
  },
  {
    path: 'information/list',
    component: components.informationList,
    name: '基本信息管理',
    meta: {
      requireAuth: true
    }
  },
  {
    path: 'information/edit/:id',
    component: components.informationEdit,
    name: '修改基本信息',
    meta: {
      requireAuth: true
    }
  }
]
