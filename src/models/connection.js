const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let db = null;

const connection = () => {
  return db ?
    Promise.resolve(db) :
    MongoClient.connect(MONGO_URL, OPTIONS)
      .then((conn) => {
        db = conn.db('Voll_Store');
        return db;
      });
};

module.exports = connection;
