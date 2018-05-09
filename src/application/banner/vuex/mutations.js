import * as types from './mutation-type'
export default {
  [types.SET_BANNER] (state, val) {
    Object.assign(state.bannerObj, val)
  }
}
