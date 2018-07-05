import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import singleBlog from './views/singleBlog.vue'
import profile from './views/Profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog/:id',
      name: 'singleBlog',
      component: singleBlog
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: profile
    }
  ]
})
