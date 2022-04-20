import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: true,
  },
  getters: {
  },
  mutations: {
    setLogin(state) {
      state.loggedIn = !state.loggedIn
    },
    
  },
  actions: {
  },
  modules: {
  }
})
