import Vue from 'vue'
import Router from 'vue-router'
import Bookings from '@/components/Bookings'
import Register from '@/components/auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: Bookings
    }
  ]
})
