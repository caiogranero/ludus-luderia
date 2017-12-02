<template>
  <div id="bookings">
    <md-layout md-align="center">
      <md-layout md-flex="90" md-align="start">
        <page-title name="Reservas" :onInserted="getBookings"></page-title>
      </md-layout>
    </md-layout>

    <md-layout md-align="space-around" id="booking-content" v-if="!searching" md-flex="100">
      <md-layout md-flex-small="90" md-flex-xsmall="90" md-flex="40" md-align="start" id="booking-tags-div">
        <h3>Lista de reservas</h3>
        <md-layout md-flex="100" md-align="start" id="tags-content" v-if="bookings.length > 0">
          <tag v-for="booking in bookings" :key="booking._id" :data="booking"></tag>
        </md-layout>
        <md-layout md-flex="100" md-align="start" id="tags-content" v-else>
          <label>Nenhuma reserva encontrado</label>
        </md-layout>
      </md-layout>

      <md-layout md-flex-small="90" md-flex-xsmall="90" md-flex="40" md-align="start">
        <h3 v-if="bookings.length > 0">Detalhes</h3>
        <md-layout md-flex="100" md-align="start" id="tags-content" v-if="bookings.length > 0">
          <detail></detail>
        </md-layout>
      </md-layout>
    </md-layout>
    <md-layout md-align="space-around" id="booking-content" v-else>
      <spinner></spinner>
    </md-layout>
  </div>
</template>

<script>
import PageTitle from '@/components/structure/PageTitle'
import Tag from '@/components/booking/Tag'
import Spinner from '@/components/helpers/Spinner'
import Detail from '@/components/booking/Detail'
import _ from 'lodash'

export default {
  name: 'Bookings',

  components: { PageTitle, Tag, Detail, Spinner },

  data () {
    return {
      bookings: []
    }
  },

  watch: {
    searchedBooking () {
      this.bookings = this.searchedBooking
    },
    userInfo () {
      this.getBookings()
    }
  },

  created () {
    this.getBookings()
  },

  computed: {
    searchedBooking () {
      return this.$store.state.searchedBooking
    },
    searching () {
      return this.$store.state.searching
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },

  methods: {
    getBookings () {
      if (_.keys(this.userInfo).length === 0) {
        return
      }

      let params = {
        deleted: false,
        checkin: false
      }

      if (this.userInfo.admin) {
        params.isAdmin = true
      } else {
        params.email = this.userInfo.email
      }

      this.$BookingService.get(params).then(res => {
        this.bookings = res.data.message
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

  h3
    font-weight: 500
    letter-spacing: 0px
    font-size: 16px
    color: #2A3138

  #booking-tags-div
    align-content: flex-start

  #booking-content
    justify-content: space-around

  #tags-content
    height: 400px
    overflow-y: auto
    align-content: flex-start
</style>
