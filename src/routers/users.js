const express = require('express');
const {
  controllerCreateUser,
  controllerLogin,
} = require('../controllers/users.controller');

const routes = express.Router();

routes.post('/users', controllerCreateUser);
routes.post('/login', controllerLogin);

module.exports = routes;
