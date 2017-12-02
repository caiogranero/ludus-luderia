const MongoClient = require('mongodb').MongoClient
const collection = 'test'
const url = `mongodb://localhost:27017/${collection}`

const db = {
  getCollection () {
    return collection
  },

  open () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (err, db) => {
        if (err) {
          reject(err)
        } else {
          resolve(db)
        }
      })
    })
  },

  close (db) {
    if (db) {
      db.close()
    }
  },

  fixture (data) {
    connection.open().then((db) => {      
      database = db
      return data.reduce((inserted, item) => {
        return db.collection(this.getCollection()).insertOne(items, (err, result) => {
          return result
        })
      })
    })
    .then(() => {
      database.close()
    })
    .catch(err => {
      console.error(err.toString())
    })
  }
}

module.exports = db
