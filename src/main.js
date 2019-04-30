// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/styles/index.styl'
import components from '@/components'
import store from './store/index'
import axios from 'axios'
import filters from '@/plugin/filters'
import requestInterceptor from '@/utils/interceptor/request-interceptor'
import responseInterceptor from '@/utils/interceptor/response-interceptor'
import validators from '@/plugin/validator'
import 'babel-polyfill'

Object.keys(components).forEach((key) => {
  let name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(`m${name}`, components[key])
})
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:7002/'
// 39.104.114.135
Vue.use(iView)
Vue.use(filters)
Vue.use(validators)
Vue.config.productionTip = false
requestInterceptor.config(axios)
responseInterceptor.config(axios, store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
