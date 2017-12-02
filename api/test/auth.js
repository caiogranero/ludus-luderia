// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const server = require('../config/server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)

const agent = chai.request.agent(server)

describe('Users', () => {
  let bookingId

  it('create user', (done) => {
    const booking = {
      email: 'pessoa@ludus.com.br',
      password: '123',
      name: 'Pessoa'
    }

    agent
      .post('/api/auth/register')
      .send(booking)
      .then(response => {
        expect(response).to.have.status(200)
        done()
      }, error => {
        done(error)
      })
  })

  it('get all users', (done) => {
    agent
      .get('/api/users')
      .then(response => {
        expect(response).to.have.status(200)
        done()
      }, error => {
        done(error)
      })
  })

  it('do login', (done) => {
    agent
      .post('/api/auth/login')
      .send({email: 'pessoa@ludus.com.br', password: '123'})
      .then(response => {
        expect(response).to.have.status(200)
        done()
      }, error => {
        done(error)
      })
  })
})