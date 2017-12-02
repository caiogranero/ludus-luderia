import axios from 'axios'

const Auth = axios.create({
  baseURL: '/api/auth',
  timeout: 10000
})

export default {
  install (Vue) {
    const AuthService = {
      name: 'AuthService',

      login (params) {
        return Auth.post('/login', params)
      },

      register (params) {
        return Auth.post('/register', params)
      }
    }

    Vue.$AuthService = AuthService
    Vue.prototype.$AuthService = AuthService
  }
}
