import * as types from './mutation-type'
export default {
  [types.SETNAVIGATION] (state, val) {
    Object.assign(state.navigationObj, val)
  }
}
