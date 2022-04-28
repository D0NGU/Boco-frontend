import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: false,
    token: '',
    myUserId: '',
    email: '',
    myListingName: '',
    myListingDes: '',
    myListingPrice: '',
    myAddress: '',
    myPhone: '',
    unlisted: false,
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
    SET_EMAIL(state, email){
      state.email = email
    }
  },
  actions: {
      login(context, {token, email }) {
          context.commit("SET_STATUS", true);
          context.commit("SET_TOKEN", token);
          context.commit("SET_EMAIL", email);
         // context.commit("SET_MYUSERID", userID);
      },
  },
  modules: {
  }
})
