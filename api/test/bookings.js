// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const server = require('../config/server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)

const agent = chai.request.agent(server)

describe('Bookings', () => {
  let bookingId

  it('create new booking', (done) => {
    const booking = {
      email: 'pessoa@ludus.com.br',
      classification: 'happy_hour',
      date: '10/10/2017 10:10',
      deficiency: true,
      deleted: false,
      observation: 'dsadsa',
      phoneNumber: '(11) 94659-9848',
      quantityGuest: '10'
    }

    agent
      .post('/api/bookings')
      .send(booking)
      .then(response => {
        expect(response).to.have.status(200)
        done()
      }, error => {
        done(error)
      })
  })

  it('get all bookings', (done) => {
    agent
      .get('/api/bookings')
      .then(response => {
        expect(response).to.have.status(200)
        bookingId = response.body.message[0]
        done()
      }, error => {
        done(error)
      })
  })

  it('get one booking', (done) => {
    agent
      .get(`/api/bookings/${bookingId._id}`)
      .then(response => {
        expect(response).to.have.status(200)
        done()
      }, error => {
        done(error)
      })
  })

  it('update one booking', (done) => {
    agent
      .put(`/api/bookings/${bookingId._id}`)
      .send({ deficiency: false })
      .then(response => {
        expect(response).to.have.status(200)
        done()
      }, error => {
        done(error)
      })
  })

  it('delete one booking', (done) => {
    agent
      .delete(`/api/bookings/${bookingId._id}`)
      .then(response => {
        expect(response).to.have.status(200)
        done()
      }, error => {
        done(error)
      })
  })
})