import { createStore } from 'vuex'

export const mutations = {
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
    myListingName: '',
    myListingDes: '',
    myListingPrice: '',
    myAddress: '',
    myPhone: '',
    unlisted: false,
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
  }
})
