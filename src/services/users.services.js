const {
  modelCreateUser,
  modelFindByEmail,
  modelUpdateUserCoin,
  modelFindUsers,
  modelDeleteUser,
} = require('../models/users.models');

const errorMessage = require('../utils/errorMessage');

const { userSchema } = require('../schema/schema');

const { generateToken } = require('./authService');
const { badRequest, conflict, unauthorized } = require('../utils/dictionary/statusCode');

const servicesCreateUser = async (user) => {
  const { name, email, password } = user;
  const { error } = userSchema.validate({ name, email, password });
  if (error) {
    throw errorMessage(badRequest, 'Invalid entries. Try again.');
  }

  const emailExists = await modelFindByEmail(email);
  if (emailExists) throw errorMessage(conflict, 'Email already registered');

  if (!user.role) role = user.role = 'user';

  if (!user.coin) coin = user.coin = 100;

  const createUser = await modelCreateUser(name, email, password, role, coin)

  return createUser;
};

const servicesFindUsers = async () => {
  const users = await modelFindUsers();

  return users;
};

const servicesUpdateUserCoin = async (email, product) => {
  await modelUpdateUserCoin(email, product);

  const userById = await modelFindByEmail(email);

  return userById;
};

const servicesLogin = async (user) => {
  const { email, password } = user

  const userInfo = await modelFindByEmail(email);

  if (!userInfo || userInfo.password !== password) {
    throw errorMessage(unauthorized, 'Incorrect username or password');
  }

  const { password: _password, ...userWithoutPassword } = userInfo;
  const token = generateToken(userWithoutPassword);

  return ({ token });
};

const servicesDeleteUser = async (id) => {
  await modelDeleteUser(id);

  return { message: 'User Deleted' }
};

module.exports = {
  servicesCreateUser,
  servicesLogin,
  servicesUpdateUserCoin,
  servicesFindUsers,
  servicesDeleteUser,
};