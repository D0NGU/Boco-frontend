import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: false,
    token: '',
    myUserId: '',
  },
  getters: {
    token: function (state) {
      return state.token;
    }
  },
  mutations: {
    SET_STATUS(state, status) {
      state.loggedIn = status;
    },
    SET_MYUSERID(state, id) {
      state.myUserId = id;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
      login(context, {token, userID }) {
          context.commit("SET_STATUS", true);
          context.commit("SET_TOKEN", token);
          context.commit("SET_MYUSERID", userID);
      },
  },
  modules: {
  }
})
