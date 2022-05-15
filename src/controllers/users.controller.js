const {
  servicesCreateUser,
  servicesLogin,
  servicesUpdateUserCoin,
  servicesFindUsers,
  servicesDeleteUser,
} = require('../services/users.services');

const { created, success } = require('../utils/dictionary/statusCode');

const controllerCreateUser = async (req, res, next) => {
  try {
    const newUser = await servicesCreateUser(req.body);

    return res.status(created).json(newUser);
  } catch (error) {
    console.log(`POST CREATE USER -> ${error.message}`);
    return next(error);
  }
};

const controllerFindUsers = async (req, res, next) => {
  try {
    const users = await servicesFindUsers();

    return res.status(success).json(users);
  } catch (error) {
    console.log(`GET ALL PRDUCTS -> ${error.message}`);
    return next(error);
  }
};

const controllerUpdateUserCoin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const productId = await servicesUpdateUserCoin(email, req.body);

    return res.status(success).json(productId);
  } catch (error) {
    console.log(`UPDATE PRODUCT BY ID -> ${error.message}`);
    return next(error);
  }
};

const controllerLogin = async (req, res, next) => {
try {
  const loginUser = await servicesLogin(req.body);


  return res.status(success).json(loginUser);
} catch (error) {
  console.log(`POST LOGIN -> ${error.message}`);
    return next(error);
}
};

const controllerDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await servicesDeleteUser(id);

    return res.status(success).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(`DELETE USER BY ID -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  controllerCreateUser,
  controllerLogin,
  controllerUpdateUserCoin,
  controllerFindUsers,
  controllerDeleteUser,
};
