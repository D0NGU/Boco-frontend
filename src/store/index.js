import { createStore } from 'vuex'

export default createStore({
  state: {
    loginStatus: '',
  },
  getters: {
    getLoginStatus: state => state.loginStatus,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
