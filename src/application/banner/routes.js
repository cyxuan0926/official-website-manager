import * as components from './components'
export default [
  {
    path: 'banner/new',
    component: components.bannerNew,
    name: '新增标题栏',
    meta: {
      requireAuth: true
    }
  },
  {
    path: 'banner/list',
    component: components.bannerList,
    name: '标题栏管理',
    meta: {
      requireAuth: true
    }
  },
  {
    path: 'banner/edit/:id',
    component: components.bannerEdit,
    name: '标题栏修改',
    meta: {
      requireAuth: true
    }
  }
]
