<template>
  <div id="booking-modal">
    <snack-bar :open="openSnackBar" :msg="msgSnackBar"></snack-bar>
    <md-dialog ref="dialog-checkin">
      <md-dialog-title md-align="start" id="booking-dialog-title">Nova reserva</md-dialog-title>

      <md-dialog-content>
        <md-layout md-flex="100" class="input-row">
          <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
            <md-input-container>
              <label>Pessoas presentes</label>
              <md-input v-model="checkinInfo.present"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
            <md-input-container>
              <label>Mesas disponíveis</label>
              <md-select name="available-table" id="available-table" v-model="checkinInfo.table">
                <md-option v-for="table in availablesTables" :key="table" :value="table">{{table}}</md-option>
              </md-select>
            </md-input-container>
          </md-layout>
        </md-layout>
      </md-dialog-content>

      <md-dialog-actions id="dialog-footer-booking">
        <md-button class="md-primary md-raised btn-action" @click="doCheckin()">Checkin</md-button>
        <md-button class="md-primary md-raised btn-action" @click="closeDialog()">FECHAR</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import SnackBar from '@/components/helpers/SnackBar'

export default {
  name: 'CheckinModal',
  data () {
    return {
      checkinInfo: {
        present: '',
        table: ''
      },
      openSnackBar: false,
      msgSnackBar: ''
    }
  },
  components: {SnackBar},
  props: {
    open: Boolean,
    bookingId: String
  },

  watch: {
    open () {
      this.$refs['dialog-checkin'].open()
    }
  },

  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },

    availablesTables () {
      return _.sampleSize([1, 2, 3, 4, 5, 6, 7, 8, 9], _.random(1, 9)).sort()
    }
  },

  methods: {
    closeDialog () {
      this.$refs['dialog-checkin'].close()
    },

    isInfoFilled () {
      let filled = true
      Object.keys(this.checkinInfo).forEach((el, idx) => {
        if (this.checkinInfo[el] === '') {
          filled = false
        }
      })

      return filled
    },

    doCheckin () {
      if (this.isInfoFilled()) {
        this.$BookingService.patch(this.bookingId, Object.assign(this.checkinInfo, { checkin: true })).then(res => {
          this.msgSnackBar = 'Checkin realizado com sucesso!'
          this.openSnackBar = !this.openSnackBar
          this.closeDialog()
        }).catch(err => {
          console.error(err)
          this.msgSnackBar = 'Houve um erro ao realizar o checkin, tente novamente.'
          this.openSnackBar = !this.openSnackBar
        })
      } else {
        this.msgSnackBar = 'Prencha todos os campos e tente novamente.'
        this.openSnackBar = !this.openSnackBar
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">

#booking-dialog-title
  font-weight: 400
  letter-spacing: 0px
  font-size: 24px
  color: #2A3138

.md-dialog
  background-color: #E2E4E1 !important
  height: 500px
  width: 750px

.input-row
  justify-content: space-between

#dialog-footer-booking
  margin-bottom: 20px
  margin-right: 20px
</style>
