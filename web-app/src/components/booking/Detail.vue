<template>
  <md-layout md-flex="100" md-align="center" id="detail-area">
    <booking-modal :open="openModal" type="editar" :storedData="bookingInfo" :onClose="getBookingInfo"></booking-modal>

    <checkin-modal :open="openCheckin" :bookingId="bookingInfo._id"></checkin-modal>

    <md-layout md-flex="100" md-align="start" md-vertical-align="top" v-if="bookingId">
      <div id="detail-model">Data e hora: {{bookingInfo.date}}</div>
    </md-layout>
    
    <md-layout md-flex="100" md-align="start" md-vertical-align="top" v-if="bookingId">
      <md-layout md-flex="50" md-align="start" md-vertical-align="top" class="detail-brand-year">
        <div id="detail-type">Cliente</div>
        <div id="detail-value">{{bookingInfo.email}}</div>
      </md-layout>
      <md-layout md-flex="50" md-align="start" md-vertical-align="top" class="detail-brand-year">
        <div id="detail-type">Telefone</div>
        <div id="detail-value">{{bookingInfo.phoneNumber}}</div>
      </md-layout>
      <md-layout md-flex="50" md-align="start" md-vertical-align="top" class="detail-brand-year">
        <div id="detail-type">Quantidade de convidados</div>
        <div id="detail-value">{{bookingInfo.quantityGuest}}</div>
      </md-layout>
      <md-layout md-flex="50" md-align="start" md-vertical-align="top" class="detail-brand-year">
        <div id="detail-type">Classificação</div>
        <div id="detail-value">{{classification[bookingInfo.classification]}}</div>
      </md-layout>
    </md-layout>

    <md-layout md-flex="100" md-align="start" md-vertical-align="top" v-if="bookingId">
      <p>{{bookingInfo.observation}}</p>
    </md-layout>

    <md-layout md-flex="100" id="footer-booking-description" v-if="bookingId">
      <md-layout md-flex="90" md-align="start">
        <md-button class="md-raised md-primary btn-action" @click="checkinBooking()">
          <md-icon>checkin</md-icon> Check-in
        </md-button>
        <md-button class="md-raised md-primary btn-action" @click="editBooking()">
          <md-icon>mode_edit</md-icon> Editar
        </md-button>
        <md-button class="md-raised md-primary btn-action" @click="cancelBooking()">
          <md-icon>close</md-icon> Cancelar
        </md-button>
      </md-layout>
    </md-layout>
  </md-layout>
</template>

<script>
import CheckinModal from '@/components/booking/CheckinModal'
import BookingModal from '@/components/BookingModal'
import moment from 'moment'
import Classification from '@/components/helpers/Classification'

export default {
  name: 'Details',

  components: { BookingModal, CheckinModal },

  data () {
    return {
      bookingInfo: {},
      openModal: false,
      openCheckin: false,
      classification: Classification || {}
    }
  },

  watch: {
    bookingId () {
      this.getBookingInfo()
    }
  },

  computed: {
    bookingId () {
      return this.$store.state.selectedBooking
    }
  },

  methods: {
    checkinBooking () {
      this.openCheckin = !this.openCheckin
    },

    editBooking () {
      this.openModal = !this.openModal
    },

    cancelBooking () {
      this.$BookingService.getById(this.bookingId).then(response => {
        const booking = response.data.message[0]
        this.$BookingService.patch(this.bookingId, Object.assign(booking, { deleted: true })).then(res => {
          this.msgSnackBar = 'Reserva cancelada com sucesso.'
          this.openSnackBar = !this.openSnackBar
        })
      })
    },

    getBookingInfo () {
      this.$BookingService.getById(this.bookingId).then(res => {
        this.bookingInfo = res.data.message.map(booking => {
          booking.date = moment(booking.date).format('DD/MM/YYYY HH:mm')

          return booking
        })[0]
      })
    }
  }
}
</script>

<style scoped lang="sass">
  #detail-area
    padding: 20px 20px 10px 20px
    background-color: rgb(241, 242, 240)
    height: 400px

  #detail-type
    font-weight: 500
    font-size: 16px
    color: rgb(42, 49, 56)

  #detail-model
    font-weight: 400
    font-size: 20px
    color: #1D7555

  #detail-value
    font-weight: 500
    font-size: 16px
    color: rgba(42, 49, 56, 0.5)

  .detail-brand-year
    display: block

  #footer-booking-description
    border-top: 1px solid rgba(0, 0, 0, 0.2)
    align-items: center
</style>
