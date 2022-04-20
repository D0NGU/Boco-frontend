import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: true,
    errorMsg: '',
    token: ''

  },
  getters: {
  },
  mutations: {
    setLogin(state) {
      state.loggedIn = !state.loggedIn
    },

    setErrorMsg(state, newErrorMsg) {
      state.errorMsg = newErrorMsg
    }

  },
  actions: {
  },
  modules: {
  }
})
