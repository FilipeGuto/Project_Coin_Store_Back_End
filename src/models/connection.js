const mongodb = require('mongodb').MongoClient;
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = 'Voll_Store';

module.exports = () => mongodb.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((connection) => connection.db(DB_NAME))
.catch((err) => {
  console.log(err);
  process.exit(1);
});