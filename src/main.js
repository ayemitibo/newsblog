import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.css'
import { apiClient } from './plugins/axios'

Vue.config.productionTip = false
Vue.prototype.$http  = apiClient

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
