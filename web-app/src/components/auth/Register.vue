<template>
  <div id="register">
    <md-layout md-align="center">
      <md-layout md-flex="90" style="justify-content: space-around;">
        <md-layout md-flex="45" md-align="center" id="page-title">
          <md-layout md-flex="100" md-align="start">
            <h2>Cadastre-se</h2>
          </md-layout>
        </md-layout>
        <md-layout md-flex="45" md-align="start" id="page-title">
          <md-layout md-flex="100" md-align="start">
            <h2>Login</h2>
          </md-layout>
        </md-layout>

        <md-layout md-flex="45" md-align="center" id="">
          <md-layout md-flex="100" class="input-row">
            <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
              <md-input-container>
                <label>Nome completo</label>
                <md-input v-model="register.name"></md-input>
              </md-input-container>
            </md-layout>
          </md-layout>
          <md-layout md-flex="100" class="input-row">
            <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
              <md-input-container>
                <label>E-mail</label>
                <md-input v-model="register.email"></md-input>
              </md-input-container>
            </md-layout>
          </md-layout>
          <md-layout md-flex="100" class="input-row">
            <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
              <md-input-container>
                <label>Senha</label>
                <md-input type="password" v-model="register.password"></md-input>
              </md-input-container>
            </md-layout>
          </md-layout>
          <md-layout md-flex="100" class="input-row">
            <md-layout md-flex="40" class="input-row" md-flex-small="100" md-flex-xmall="100">
              <md-button class="md-raised md-primary" @click="newUser">Cadastrar</md-button>
            </md-layout>
          </md-layout>
        </md-layout>

        <md-layout md-flex="45" md-align="start">
          <md-layout md-flex="100" md-align="start">
            <md-layout md-flex="100" class="input-row" style="height: 80px;">
              <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
                <md-input-container>
                  <label>E-mail</label>
                  <md-input v-model="login.email"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>
            <md-layout md-flex="100" class="input-row" style="height: 80px;">
              <md-layout md-flex="40" md-flex-small="100" md-flex-xmall="100">
                <md-input-container>
                  <label>Senha</label>
                  <md-input type="password" v-model="login.password"></md-input>
                </md-input-container>
              </md-layout>
            </md-layout>
            <md-layout md-flex="100" class="input-row" style="height: 50px;">
              <md-layout md-flex="40" md-flex-small="100" class="input-row" md-flex-xmall="100">
                <md-button class="md-raised md-primary" @click="doLogin">Login</md-button>
              </md-layout>
            </md-layout>

          </md-layout>
        </md-layout>

        <md-layout id="login-content" v-if="!searching" md-flex="50" md-align="start">
        </md-layout>
        <md-layout md-align="space-around" id="booking-content" v-else>
          <spinner></spinner>
        </md-layout>
      </md-layout>
    </md-layout>
    
  </div>
</template>

<script>
import Spinner from '@/components/helpers/Spinner'

export default {
  name: 'Register',
  components: { Spinner },
  data () {
    return {
      register: {
        name: '',
        email: '',
        password: '',
        admin: false
      },
      login: {
        email: '',
        password: ''
      },
      searching: false
    }
  },

  methods: {
    doLogin () {
      const password = this.login.password
      const email = this.login.email

      if (password && email) {
        this.$AuthService.login(this.login).then(response => {
          if (response.data.message.length > 0) {
            document.cookie = `_id=${response.data.message[0]._id}`
            this.$store.commit('userInfo', response.data.message[0])
            window.flash('Login feito com sucesso', 'success')
            window.setTimeout(() => {
              this.$router.push('/bookings')
            }, 1000)
          } else {
            window.flash('Usuário ou senha errado', 'error')
          }
        }, error => {
          window.flash(`Erro ao fazer login. ${error.toString()}`, 'error')
        })
      } else {
        window.flash('Preencha todos os campos', 'warning')
      }
    },

    newUser () {
      const name = this.register.name
      const password = this.register.password
      const email = this.register.email
      this.register.admin = true

      if (name && password && email) {
        this.$AuthService.register(this.register).then(response => {
          window.flash('Conta criada com sucesso', 'success')
          this.$AuthService.login({email, password}).then(response => {
            document.cookie = `_id=${response.data.message[0]._id}`
            this.$store.commit('userInfo', response.data.message[0])
            window.flash('Login feito com sucesso', 'success')
            window.setTimeout(() => {
              this.$router.push('/bookings')
            }, 1000)
          }, error => {
            window.flash(`Erro ao fazer login. ${error.toString()}`, 'error')
          })
        }, error => {
          window.flash(`Erro ao se cadastrar. ${error.toString()}`, 'error')
        })
      } else {
        window.flash('Preencha todos os campos', 'warning')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
  h2 {
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 0px;
    font-size: 20px;
    color: #2A3138;
  }

  #page-title {
    margin-top: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
  }

  h3 {
    font-weight: 500;
    letter-spacing: 0px;
    font-size: 16px;
    color: #2A3138;
  }

  #booking-tags-div {
    align-content: flex-start;
  }

  #tags-content {
    height: 400px;
    overflow-y: auto;
    align-content: flex-start;
  }

  .input-row {
    justify-content: center;
  }

  .md-primary {
    background-color: #2A3138 !important;
  }
</style>
