<template>
  <md-snackbar md-position="top center" ref="snackbar" md-duration="4000">
    <span>{{msg}}</span>
    <md-button class="md-accent" md-theme="light-blue" @click="$refs.snackbar.close()">OK</md-button>
  </md-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props: {
    open: Boolean,
    msg: String
  },
  watch: {
    open () {
      this.$refs.snackbar.open()
    }
  }
}
</script>