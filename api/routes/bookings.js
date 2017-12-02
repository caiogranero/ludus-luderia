const Database = require('../helpers/Database')
const ObjectId = require('mongodb').ObjectID
const moment = require('moment-timezone')

module.exports = function (app) {
  app.post('/api/bookings', (req, res) => {
    if (req.body.email &&
        req.body.classification &&
        req.body.date) {
      req.body = Object.assign(req.body, {created: new Date(), updated: new Date(), date: moment(req.body.date, 'DD/MM/YYYY HH:mm').toDate()})
      Database.insert('bookings', req.body).then(results => {
        res.status(200).send({error: false, message: results.insertedId})
      })
      .catch(err => {
        res.status(500).send({error: true, message: err.toString()})
      })
    } else {
      res.status(400).send({error: true, message: 'Missing body content'})
    }
  })

  app.get('/api/bookings', (req, res) => {
    Database.query('bookings', req.query).then(results => {
      res.status(200).send({error: false, message: results})
    })
    .catch(err => {
      res.status(500).send({error: true, message: err.toString()})
    })
  })

  app.get('/api/bookings/:id', (req, res) => {
    if (req.params.id) {
      Database.findOne('bookings', {_id: ObjectId(req.params.id)}).then(results => {
        res.status(200).send({error: false, message: results})
      })
      .catch(err => {
        res.status(500).send({error: true, message: err.toString()})
      })
    } else {
      res.status(204).send({error: true, message: 'Missing param'})
    }
  })

  app.put('/api/bookings/:id', (req, res) => {
    if (req.params.id) {
      if (req.body) {
        req.body = Object.assign(req.body, {updated: new Date()})
        Database.replace('bookings', {_id: ObjectId(req.params.id)}, req.body).then(results => {
          res.status(200).send({error: false, message: results})
        })
        .catch(err => {
          res.status(500).send({error: true, message: err.toString()})
        })
      } else {
        res.status(204).send({error: true, message: 'Missing body content'})
      }
    } else {
      res.status(204).send({error: true, message: 'Missing param'})
    }
  })

  app.patch('/api/bookings/:id', (req, res) => {
    if (req.params.id) {
      if (req.body) {
        req.body = Object.assign(req.body, {updated: new Date()})
        Database.update('bookings', {_id: ObjectId(req.params.id)}, req.body).then(results => {
          res.status(200).send({error: false, message: results})
        })
        .catch(err => {
          res.status(500).send({error: true, message: err.toString()})
        })
      } else {
        res.status(204).send({error: true, message: 'Missing body content'})
      }
    } else {
      res.status(204).send({error: true, message: 'Missing param'})
    }
  })

  app.delete('/api/bookings/:id', (req, res) => {
    if (req.params.id) {
      Database.delete('bookings', {_id: ObjectId(req.params.id)}).then(results => {
        res.status(200).send({error: false, message: results})
      })
      .catch(err => {
        res.status(500).send({error: true, message: err.toString()})
      })
    } else {
      res.status(204).send({error: true, message: 'Missing param'})
    }
  })
}
