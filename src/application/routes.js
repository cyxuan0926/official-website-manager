import {routes as user} from './user/index'
import {routes as login} from './login/index'
import {default as main} from './main'
import {routes as banner} from './banner'
import {routes as navigation} from './navigation'
import {routes as solution} from './solution'
import {routes as solutionDetail} from './solution-detail'
import {routes as information} from './information'
import {routes as introduction} from './introduction'
import {routes as others} from './others'
export default [
  {
    path: '/main',
    component: main,
    meta: {
      requireAuth: true
    },
    name: '主页面',
    children: [
      ...banner,
      ...navigation,
      ...solution,
      ...solutionDetail,
      ...information,
      ...introduction,
      ...others
    ]
  },
  ...user,
  ...login
]
