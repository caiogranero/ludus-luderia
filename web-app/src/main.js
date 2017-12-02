// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import BookingService from './services/Booking'
import AuthService from './services/Auth'
import UserService from './services/User'
import 'vue-material/dist/vue-material.css'
import VueMask from 'v-mask'

Vue.use(VueMask)
Vue.use(VueMaterial)
Vue.use(AuthService)
Vue.use(BookingService)
Vue.use(UserService)

/**
 * Our Vuejs event handler which we will be using for flash messaging
 * @type {Vue}
 */
window.events = new Vue()

/**
 * Our Flash function which will be used to add new flash events to our event handler
 * @param  String message Our alert message
 * @param  String type    The type of alert we want to show
 */
window.flash = (message, type) => {
  window.events.$emit('flash', message, type)
}

Vue.component('flash', require('vue-flash'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
