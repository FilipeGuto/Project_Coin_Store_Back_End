const { ObjectId } = require('mongodb');
const connect = require('./connection');

const COLLECTION = 'users_collection';

const modelCreateUser = async (name, email, password, role, coin) => {
  const conn = await connect();
  const { insertedId } = await conn.collection(COLLECTION).insertOne({
    name, email, password, role, coin
  });

  const user = {
    id: ObjectId(insertedId),
    name: name,
    email: email,
    password: password,
    coin: coin,
    role: role,
  };

  return user;
};

const modelFindUsers = async () => {
  const conn = await connect();
  const response = await conn.collection(COLLECTION).find().toArray();

  return response;
};

const modelUpdateUserCoin = async (email, user) => {
  const conn = await connect();

  const updateCoin = await conn.collection(COLLECTION).updateOne(
    { email: email }, { $set: { ...user } },
  );

  return updateCoin;
};

const modelFindByEmail = async (email) => {
  const conn = await connect();
  const userByEmail = await conn.collection(COLLECTION).findOne({ email });

  return userByEmail;
};

const modelDeleteUser = async (id) => {
  const conn = await connect();
  await conn.collection(COLLECTION).deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  modelCreateUser,
  modelFindByEmail,
  modelUpdateUserCoin,
  modelFindUsers,
  modelDeleteUser,
};
