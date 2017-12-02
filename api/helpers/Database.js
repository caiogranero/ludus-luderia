const ObjectID = require('mongodb').ObjectID
const connection = require('../config/db')
const _ = require('lodash')

const Database = {
  query (collection, query = null) {
    return new Promise((resolve, reject) => {
      let database = null
      connection.open().then((db) => {
        database = db

        if (query) {
          _.forEach(query, (value, key) => {
            if (value == 'true') {
              query[key] = true
            }

            if (value == 'false') {
              query[key] = false
            }


            if (key === '_id') {
              query[key] = new ObjectID(value)
            } else {
              if (query.regex) {
                query[key] = new RegExp(value, 'i')
              }
            }
          })
        }

        if (query.regex) {
          query = _.omit(query, ['regex'])
        }

        if (query.isAdmin) {
          query = _.omit(query, 'isAdmin')
        }
        
        db.collection(collection).find(query).limit(10).toArray((err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
      .then(() => {
        database.close()
      })
      .catch(err => {
        console.error(err.toString())
      })
    })
  },

  findOne (collection, id) {
    return new Promise((resolve, reject) => {
      let database = null
      connection.open().then((db) => {
        database = db
        db.collection(collection).find(id).limit(1).toArray((err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
      .then(() => {
        database.close()
      })
      .catch(err => {
        console.error(err.toString())
      })
    })
  },

  delete (collection, id) {
    return new Promise((resolve, reject) => {
      let database = null
      connection.open().then((db) => {
        database = db
        db.collection(collection).deleteOne(id, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
      .then(() => {
        database.close()
      })
      .catch(err => {
        console.error(err.toString())
      })
    })
  },

  deleteAll (collection) {
    return new Promise((resolve, reject) => {
      let database = null
      connection.open().then((db) => {
        database = db
        db.collection(collection).remove({}, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
      .then(() => {
        database.close()
      })
      .catch(err => {
        console.error(err.toString())
      })
    })
  },

  update (collection, id, data) {
    return new Promise((resolve, reject) => {
      let database = null
      connection.open().then((db) => {
        database = db
        data = _.omit(data, '_id')
        db.collection(collection).updateOne(id, { $set: data }, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
      .then(() => {
        database.close()
      })
      .catch(err => {
        console.error(err.toString())
      })
    })
  },

  replace (collection, id, data) {
    return new Promise((resolve, reject) => {
      let database = null
      connection.open().then((db) => {
        database = db
        data = _.omit(data, '_id')
        db.collection(collection).replaceOne(id, data, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
      .then(() => {
        database.close()
      })
      .catch(err => {
        console.error(err.toString())
      })
    })
  },

  insert (collection, items) {
    return new Promise((resolve, reject) => {
      let database = null
      connection.open().then((db) => {
        database = db
        db.collection(collection).insertOne(items, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })
      .then(() => {
        database.close()
      })
      .catch(err => {
        console.error(err.toString())
      })
    })
  }
}

module.exports = Database
