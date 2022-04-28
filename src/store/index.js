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
    SET_MYLISTINGNAME(state, name) {
      state.myListingName = name;
    },
    SET_MYLISTINGDES(state, description) {
      state.myListingDes = description;
    },
    SET_MYLISTINGPRICE(state, price) {
      state.myListingPrice = price;
    },
    SET_MYADDRESS(state, address) {
      state.myAddress = address;
    },
    SET_MYPHONE(state, phone) {
      state.myPhone = phone;
    },
    SET_UNLISTED(state, status) {
        state.unlisted = status;
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
