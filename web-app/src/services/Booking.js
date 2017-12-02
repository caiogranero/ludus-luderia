import axios from 'axios'
const querystring = require('querystring')

const Booking = axios.create({
  baseURL: '/api/bookings',
  timeout: 30000
})

export default {
  install (Vue) {
    const BookingService = {
      name: 'BookingService',

      get (query = {}) {
        return Booking.get('', {
          params: query
        })
      },

      getAll () {
        return Booking.get('')
      },

      getById (id) {
        return Booking.get(`/${id}`)
      },

      create (params) {
        return Booking.post('', params)
      },

      update (id, params) {
        return Booking.put(`/${id}`, params)
      },

      patch (id, params) {
        return Booking.patch(`/${id}`, params)
      },

      query (params) {
        return Booking.get(`/find?${querystring.stringify(params)}`)
      }
    }

    Vue.$BookingService = BookingService
    Vue.prototype.$BookingService = BookingService
  }
}
