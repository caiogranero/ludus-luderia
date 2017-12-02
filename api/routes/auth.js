const Database = require('../helpers/Database')
const ObjectId = require('mongodb').ObjectID

module.exports = function (app) {
  app.post('/api/auth/register', (req, res) => {
    if (req.body.email && req.body.name && req.body.password) {
      req.body = Object.assign(req.body, {created: new Date(), updated: new Date()})
      Database.insert('users', req.body).then(results => {
        res.status(200).send({message: results.insertedId})
      })
      .catch(err => {
        res.status(500).send({message: err.toString()})
      })
    } else {
      res.status(400).send({message: 'Missing body content'})
    }
  })

  app.post('/api/auth/login', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email
      const password = req.body.password
      Database.query('users', {email, password}).then(results => {
        res.status(200).send({message: results})
      })
      .catch(err => {
        res.status(500).send({message: err.toString()})
      })
    } else {
      res.status(400).send({message: 'Missing body content'}) 
    }
  })
}
