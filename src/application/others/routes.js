import * as components from './components'
export default [
  {
    path: 'others/img-cut-upload',
    component: components.imgCutUpload,
    meta: {
      requireAuth: true
    },
    name: '图片裁剪上传'
  },
  {
    path: 'others/echarts-list',
    component: components.echartsList,
    name: '图标测试',
    meta: {
      requireAuth: true
    }
  }
]
