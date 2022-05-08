const { ObjectId } = require('mongodb');
const connect = require('./connection');

const COLLECTION = 'users_collection';

const modelCreateUser = async (name, email, password, role) => {
  const conn = await connect();
  const { insertedId } = await conn.collection(COLLECTION).insertOne({
    name, email, password, role,
  });

  const user = {
    id: ObjectId(insertedId),
    name: name,
    email: email,
    password: password,
    role: role,
  };

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
