const Database = require('../helpers/Database')

module.exports = function (app) {
  app.get('/api/users', (req, res) => {
    Database.query('users', req.query).then(results => {
      res.status(200).send({error: false, message: results})
    })
    .catch(err => {
      res.status(500).send({error: true, message: err.toString()})
    })
  })
}
