import * as types from './mutation-type'
export default {
  [types.SETACTIVENAME] (state, activeName) {
    state.activeName = activeName
  },
  [types.SETOPENMENU] (state, openItem) {
    state.openMenu = Array.of(openItem)
  },
  [types.SETCOLLAPSED] (state, collapsed) {
    state.isCollapsed = collapsed
  }
}
