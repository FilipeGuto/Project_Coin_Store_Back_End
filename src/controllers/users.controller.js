const {
  servicesCreateUser,
  servicesLogin,
} = require('../services/users.services');

const controllerCreateUser = async (req, res, next) => {
  try {
    const newUser = await servicesCreateUser(req.body);

    if(!newUser.role) newUser.role = 'user';

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(`POST CREATE USER -> ${error.message}`);
    return next(error);
  }
};

const controllerLogin = async (req, res, next) => {
try {
  const loginUser = await servicesLogin(req.body);


  return res.status(200).json(loginUser);
} catch (error) {
  console.log(`POST LOGIN -> ${error.message}`);
    return next(error);
}
};

module.exports = {
  controllerCreateUser,
  controllerLogin,
};
