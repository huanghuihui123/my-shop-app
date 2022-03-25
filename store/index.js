import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    updateUserInfo(state, params) {
      state.userInfo = {
        ...params
      }
    }
  },
  actions: {
    loginAction(context) {
      console.log(context)
    }
  }
})

export default store
