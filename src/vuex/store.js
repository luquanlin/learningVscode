import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginshow: false
  },
  mutations: {
    collapse (state, arg) {
      if (arg) {
        state.loginshow = !state.loginshow
      } else {
        state.loginshow = !state.loginshow
      }
    }
  },
  actions: {
    collapse ({ commit }) {
      commit('collapse')
    }
  },
  getters: {
    loginshow: state => state.loginshow
  }

})
