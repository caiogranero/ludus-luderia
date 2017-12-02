<template>
  <div id="booking-modal">
    <snack-bar :open="openSnackBar" :msg="msgSnackBar"></snack-bar>
    <md-dialog ref="dialog-booking" @open="onOpen" @close="close">
      <md-dialog-title md-align="start" id="booking-dialog-title">Nova reserva</md-dialog-title>

      <md-dialog-content>
        <md-layout md-flex="100" class="input-row">
          <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
            <md-input-container>
              <label>E-mail do cliente</label>
              <md-input v-model="bookingInfo.email"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
            <md-input-container>
              <label>Celular</label>
              <md-input  v-mask="'(##) #####-####'" v-model="bookingInfo.phoneNumber"></md-input>
            </md-input-container>
          </md-layout>
        </md-layout>

        <md-layout md-flex="100" class="input-row">
          <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
            <md-input-container>
              <label>Classificação</label>
              <md-select name="classification" id="classification" v-model="bookingInfo.classification">
                <md-option v-for="(description, option) in classifications" :key="option" :value="option">{{description}}</md-option>
              </md-select>
            </md-input-container>
          </md-layout>
          <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
            <md-input-container>
              <label>Data e hora</label>
              <md-input name="date"  v-mask="'##/##/#### ##:##'" id="date" v-model="bookingInfo.date"></md-input>
            </md-input-container>
          </md-layout>
        </md-layout>

        <md-layout md-flex="100" class="input-row">
          <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
            <md-input-container>
              <label>Quantidade de convidados</label>
              <md-input type="number" min="0" v-model="bookingInfo.quantityGuest"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
            <md-switch v-model="bookingInfo.deficiency" id="sold" name="sold">Deficiência?</md-switch>
          </md-layout>
        </md-layout>

        <md-layout md-flex="100">
          <md-input-container>
            <label>Observações</label>
            <md-textarea v-model="bookingInfo.observation" maxlength="1000"></md-textarea>,
          </md-input-container>
        </md-layout>
      </md-dialog-content>

      <md-dialog-actions id="dialog-footer-booking">
        <md-button class="md-primary md-raised btn-action" @click="submitRequest()">{{type}}</md-button>
        <md-button class="md-primary md-raised btn-action" @click="closeDialog()">FECHAR</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import SnackBar from '@/components/helpers/SnackBar'
import Classification from '@/components/helpers/Classification'

export default {
  name: 'BookingModal',
  data () {
    return {
      bookingInfo: {
        email: '',
        phoneNumber: '',
        classification: '',
        deficiency: false,
        observation: '',
        quantityGuest: 0,
        date: ''
      },
      classifications: Classification,
      openSnackBar: false,
      msgSnackBar: ''
    }
  },
  components: {SnackBar},
  props: {
    type: String,
    open: Boolean,
    storedData: Object,
    onClose: Function
  },

  watch: {
    open () {
      this.$refs['dialog-booking'].open()
    }
  },

  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },

  methods: {
    close () {
      this.onClose()
    },

    closeDialog () {
      this.$refs['dialog-booking'].close()
    },

    onOpen () {
      if (this.type === 'editar') {
        Object.keys(this.bookingInfo).forEach((key) => {
          this.bookingInfo[key] = this.storedData[key]
        })

        return
      }

      if (this.type === 'add') {
        if (!this.userInfo.admin) {
          this.bookingInfo.email = this.userInfo.email
        }
      }
    },

    isInfoFilled () {
      let filled = true
      Object.keys(this.bookingInfo).forEach((el, idx) => {
        if (this.bookingInfo[el] === '') {
          filled = false
        }
      })

      return filled
    },

    submitRequest () {
      if (this.isInfoFilled()) {
        if (this.type === 'add') {
          this.$BookingService.create(Object.assign(this.bookingInfo, { deleted: false, checkin: false })).then(res => {
            this.msgSnackBar = 'Veículo inserido com sucesso!'
            this.openSnackBar = !this.openSnackBar
            this.closeDialog()
          }).catch(err => {
            console.error(err)
            this.msgSnackBar = 'Houve um erro ao inserir a reserva, tente novamente.'
            this.openSnackBar = !this.openSnackBar
          })
        } else if (this.type === 'editar') {
          this.$BookingService.patch(this.storedData._id, this.bookingInfo).then(res => {
            this.msgSnackBar = 'Veículo atualizado com sucesso!'
            this.openSnackBar = !this.openSnackBar
            this.closeDialog()
          }).catch(err => {
            console.error(err)
            this.msgSnackBar = 'Houve um erro ao atualizar a reserva, tente novamente.'
            this.openSnackBar = !this.openSnackBar
          })
        }
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
