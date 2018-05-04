import * as components from './components'
export default [
  {
    path: '/',
    component: components.login,
    name: '登录页',
    meta: {
      requireAuth: false
    }
  }
]
