import { createStore } from 'vuex'

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
  },
  getters: {
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
  },
  actions: {
  },
  modules: {
  }
})
