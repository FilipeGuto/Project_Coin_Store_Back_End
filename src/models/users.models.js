const { ObjectId } = require('mongodb');
const connect = require('./connection');

const COLLECTION = 'store_collection';

const modelCreateUser = async (name, email, password) => {
  const conn = await connect();
  const { insertedId } = await conn.collection(COLLECTION).insertOne({
    name, email, password,
  });

  const user = {
    id: ObjectId(insertedId),
    name: name,
    email: email,
    password: password,
  }

  return user;
};

const modelFindByEmail = async (email) => {
  const conn = await connect();
  const userByEmail = await conn.collection(COLLECTION).findOne({ email });

  return userByEmail;
};

module.exports = {
  modelCreateUser,
  modelFindByEmail,
};
