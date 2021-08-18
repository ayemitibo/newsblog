import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.css'
import { apiClient } from './plugins/axios'
import { createDebounce } from './plugins/utils'
import CountryFlag from 'vue-country-flag'

Vue.component('country-flag', CountryFlag)

Vue.config.productionTip = false
Vue.prototype.$http  = apiClient
Vue.prototype.$utils  = { createDebounce }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
