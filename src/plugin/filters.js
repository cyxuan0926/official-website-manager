import moment from './filters'
export default {
  install: (Vue) => {
    Vue.filter('moment', moment)
  }
}
