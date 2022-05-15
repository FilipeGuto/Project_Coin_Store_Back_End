const express = require('express');
const {
  controllerCreateUser,
  controllerLogin,
  controllerUpdateUserCoin,
  controllerFindUsers,
  controllerDeleteUser,
} = require('../controllers/users.controller');

const auth = require('../middlewares/auth');

const routes = express.Router();

routes.post('/users', controllerCreateUser);
routes.post('/login', controllerLogin);
routes.get('/users', auth, controllerFindUsers);
routes.put('/users', auth, controllerUpdateUserCoin);
routes.delete('/products/:id', auth, controllerDeleteUser);

module.exports = routes;
