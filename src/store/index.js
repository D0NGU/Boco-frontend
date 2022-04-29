import { createStore } from 'vuex'

export const mutations = {
  SET_STATUS(state, status) {
    state.loggedIn = status;
  },
  SET_MYUSERID(state, id) {
    state.myUserId = id;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
};

export const actions = {
  login(context, {token, email }) {
    context.commit("SET_STATUS", true);
    context.commit("SET_TOKEN", token);
    context.commit("SET_EMAIL", email);
  },
};

export const getters = {
  token: function (state) {
    return state.token;
  },
  myUserId: function (state) {
    return state.myUserId;
  }
};

export default createStore({
  state: {
    loggedIn: false,
    token: '',
    myUserId: '',
    email: '',
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
  }
})
