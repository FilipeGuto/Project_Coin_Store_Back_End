const express = require('express');
const {
  controllerCreateProduct,
  controllerFindProduct,
  controllerByIdProduct,
  controllerUpdateProduct,
  controllerDeleteProduct,
} = require('../controllers/products.controllers');

const uploadImage = require('../middlewares/imageUpload');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.post('/products', auth, uploadImage.single('image'), controllerCreateProduct);
routes.get('/products', controllerFindProduct);
routes.get('/products/:id', controllerByIdProduct);
routes.put('/products/:id', auth, controllerUpdateProduct);
routes.delete('/products/:id', auth, controllerDeleteProduct);

module.exports = routes;
