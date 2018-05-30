import * as validator from '@/validator'
export default {
  install: (Vue) => {
    Vue.prototype.$validators = {
      isNull: validator.isNull
    }
  }
}
