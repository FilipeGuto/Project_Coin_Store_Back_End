const {
  modelCreateUser,
  modelFindByEmail,
} = require('../models/users.models');

const errorMessage = require('../utils/errorMessage');

const userSchema = require('../schema/schema');

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

  if (!user.role) role = user.role = 'user'

  const createUser = await modelCreateUser(name, email, password, role)

  return createUser;
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

module.exports = {
  servicesCreateUser,
  servicesLogin,
};