<template>
  <md-layout md-flex="100" md-align="center" id="tag-area">
    <md-layout md-flex="90" md-align="start" md-vertical-align="center" id="tag-info">
      <div id="tag-brand">Data e hora: {{moment(data.date).format('DD/MM/YYYY HH:mm')}}</div>
      <div id="tag-model">E-mail do cliente: {{data.email}}</div>
      <div id="tag-year">Quantidade de convidados: {{data.quantityGuest}}</div>
    </md-layout>
    <md-layout md-flex="10" md-align="end" md-vertical-align="center">
      <md-icon class="icon-pointer custom-icon" @click.native="selectBooking(data._id)">remove_red_eye</md-icon>
    </md-layout>
  </md-layout>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Tag',

  props: {
    data: Object
  },

  data () {
    return {
      moment: moment
    }
  },

  methods: {
    selectBooking (bookingId) {
      this.$store.commit('setSelectedBooking', bookingId)
    }
  }
}
</script>

<style scoped lang="sass">
  #tag-area
    padding: 10px 20px 10px 20px
    background-color: white
    height: 100px

  #tag-area:hover
    background-color: rgb(241, 242, 240)

  #tag-info
    display: grid

  #tag-brand
    font-weight: 500
    font-size: 16px
    color: rgb(42, 49, 56)

  #tag-model
    font-weight: 500
    font-size: 16px
    color: #1D7555

  #tag-year
    font-weight: 500
    font-size: 16px
    color: rgba(42, 49, 56, 0.5)
</style>
