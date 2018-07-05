import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import store from './store'

import './assets/css/style.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import navbar from './components/static/Navbar'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
Vue.component('navbar', navbar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
