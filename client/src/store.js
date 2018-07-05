import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: !!localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('id'),
    allBlogs: [],
    userfilter: ''
  },
  mutations: {
    logoutState (state) {
      state.loggedIn = false
      state.username = ''
      state.userId = ''
    },
    loginState (state) {
      state.loggedIn = true
      state.username = localStorage.getItem('username')
      state.userId = localStorage.getItem('id')
    },
    allBlogsState(state, payload){
      state.allBlogs = payload
    },
    changeUserfilter(state,payload){
      state.userfilter = payload
    }
  },
  actions: {
    loginAction ({commit}) {
      commit('loginState')
    },
    logoutAction ({commit}) {
      commit('logoutState')
    },
    getAllBlogs({commit}){
      axios.get('http://localhost:3000/blogs')
      .then(response=>{
        console.log(response.data)
        commit('allBlogsState',response.data.allBlogs)
      })
      .catch(errors=>{
        console.log(errors.response)
      })
    },
    getUserBlogs({commit}, id){
      axios.get('http://localhost:3000/users/' + id)
      .then(response=>{
        console.log(response.data)
        commit('allBlogsState',response.data.blogs)
        commit('changeUserfilter', response.data.username)
      })
      .catch(errors=>{
        console.log(errors.response)
      })
    }
  }
})
