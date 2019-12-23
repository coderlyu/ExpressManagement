
const state = {
  leftOpened: false,
  screenWidth: 0
}

const mutations = {
  TOGGLE_LEFT_OPENED: state => {
    // state.leftOpened = false
    state.leftOpened = !state.leftOpened
  },
  LEFT_OPEN: state => {
    state.leftOpened = true
  },
  LEFT_CLOSE: state => {
    state.leftOpened = false
  },
  SCREEN_CHANGE: (state, { width }) => {
    state.screenWidth = width
  }
}

const actions = {
  Resize ({ commit }, { width }) {
    if (width >= 768) {
      commit('LEFT_CLOSE')
    }
    commit('SCREEN_CHANGE', { width })
  },
  LeftClick ({ commit }) {
    commit('TOGGLE_LEFT_OPENED')
  },
  LeftClose ({ commit }) {
    commit('LEFT_CLOSE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
