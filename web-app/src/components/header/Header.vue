<template>
  <md-layout id="header" md-align="center">
    <md-layout md-flex="45" md-align="start" md-flex-small="20" id="title-div">
      <img src="../../assets/drop.svg" class="icon-pointer" width="40" height="224" @click="$router.push({name: 'Bookings'})">
      <h1 id="title">Sistemas de reserva - Ludus Luderia</h1>
    </md-layout>
    <md-layout md-flex="40" md-flex-small="75" md-align="end" >
      <input type="text" placeholder="BUSCA por uma reserva" v-if="$route.path !== '/'" id="search-input" @keyup="initKeyTimer()" v-model="qSearch">
    </md-layout>
    <md-layout md-flex="10" md-flex-small="75" md-align="end" >
      <md-button class="" @click="logout" v-if="$route.path !== '/'">
        <md-icon id="add-booking">exit_to_app</md-icon>
      </md-button>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      qSearch: '',
      keyTimer: null
    }
  },
  methods: {
    // Timeout to check automatic when the user type a query
    initKeyTimer () {
      if (this.keyTimer) {
        clearTimeout(this.keyTimer)
      }
      this.keyTimer = setTimeout(() => {
        this.$store.commit('setSearching', true)
        this.$store.commit('setSelectedBooking', null)

        // Check if there is a query to search
        let query = this.qSearch ? {email: this.qSearch, regex: true} : null

        this.$BookingService.get(query).then(res => {
          this.$store.commit('setSearchedBooking', res.data.message)
        }).catch(err => {
          console.error(err)
        }).then(() => {
          // Timeout to simulate server request
          setTimeout(() => {
            this.$store.commit('setSearching', false)
          }, 1000)
        })
      }, 600)
    },

    logout () {
      document.cookie = '_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      this.$store.commit('userInfo', {})
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass">

#header
  min-height: 60px

#header
  background-color: #2A3138
  color: white
  justify-content: flex-end

#header h1
  font-size: 20px
  text-transform: uppercase
  font-weight: 400
  letter-spacing: 2px
  margin-left: 15px
  
#search-input
  border: 0px
  background: rgba(0, 0, 0, 0.3)
  text-align: start
  color: white
  padding: 10px 16px
  width: 100%

#search-input:focus
  outline: white

#title-div
  align-items: center

@media (max-width: 944px)
  #title
    display: none
</style>