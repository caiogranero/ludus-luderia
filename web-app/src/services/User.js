import axios from 'axios'

const Users = axios.create({
  baseURL: '/api/users',
  timeout: 30000
})

export default {
  install (Vue) {
    const UsersService = {
      name: 'UsersService',

      get (query = {}) {
        return Users.get('', {
          params: query
        })
      }
    }

    Vue.$UsersService = UsersService
    Vue.prototype.$UsersService = UsersService
  }
}
