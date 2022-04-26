import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: true,
    token: ''

  },
  getters: {
  },
  mutations: {
    SET_STATUS(state, status) {
      state.loggedIn = status;
    },

  },
  actions: {
  },
  modules: {
  }
})
