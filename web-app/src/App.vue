<template>
  <div id="app">
    <flash :timeout="3000"></flash>
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script>
import flash from 'vue-flash'
import HeaderComponent from '@/components/header/Header'

export default {
  name: 'app',

  components: { HeaderComponent, flash },

  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },

  methods: {
    getCookie (name) {
      const nameEQ = name + '='
      const ca = document.cookie.split(';')

      for (var i = 0; i < ca.length; i++) {
        let c = ca[i]

        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length)
        }

        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length)
        }
      }
      return null
    }
  },

  created () {
    if (this.getCookie('_id')) {
      this.$UsersService.get({_id: this.getCookie('_id')}).then(response => {
        this.$store.commit('userInfo', response.data.message[0])
      }, error => {
        console.log(error.toString())
        this.$router.push('/')
      })
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass">
.icon-pointer
  cursor: pointer

.custom-background-color
  background-color: rgb(42, 49, 56) !important

.custom-icon
  color: rgb(42, 49, 56)

.custom-icon:hover
  color: rgb(24, 156, 108)

#app
  background-color: #E2E4E1
  min-height: 100%
  height: auto !important

.btn-action
  height: 50px
  width: 130px
  background-color: rgb(42, 49, 56) !important

html, body
  height: 100%

.md-input-focused:after
  background-color: rgb(42, 49, 56) !important

.md-input-focused label
  color: rgb(42, 49, 56) !important

.md-theme-default.md-switch.md-checked .md-switch-container
  background-color: rgba(42, 49, 56, 0.5) !important

.md-theme-default.md-switch.md-checked .md-switch-thumb
  background-color: rgb(42, 49, 56) !important

.alert-info
  color: #31708f
  background-color: #d9edf7
  border-color: #bce8f1

.alert-warning
  color: #8a6d3b
  background-color: #fcf8e3
  border-color: #faebcc

.alert-danger
  color: #a94442
  background-color: #f2dede
  border-color: #ebccd1

.alert-success
  color: #3c763d
  background-color: #dff0d8
  border-color: #d6e9c6

.alert
  padding: 15px
  margin-bottom: 20px
  border: 1px solid transparent
  border-radius: 4px

</style>
