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
};

export const actions = {
  login(context, {token, userID }) {
    context.commit("SET_STATUS", true);
    context.commit("SET_TOKEN", token);
    context.commit("SET_MYUSERID", userID);
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
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
  }
})


