import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: !!localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('id')
  },
  mutations: {
    loginState (state) {
      state.loggedIn = false
      state.username = ''
      state.userId = ''
    },
    logout (state) {
      state.loggedIn = true
      state.username = localStorage.getItem('username')
      state.userId = localStorage.getItem('id')
    }
  },
  actions: {
    login ({commit}) {
      commit('loginState')
    },
    logout ({commit}) {
      commit('logoutState')
    }
  }
})
