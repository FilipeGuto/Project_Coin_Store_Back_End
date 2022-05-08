const express = require('express');
const {
  controllerCreateProduct,
  controllerFindProduct,
  controllerByIdProduct,
  controllerUpdateProduct,
  controllerDeleteProduct,
  controllerUploadImg,
} = require('../controllers/products.controllers');

const uploadImage = require('../middlewares/imageUpload');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.post('/products', auth, controllerCreateProduct);
routes.get('/products', controllerFindProduct);
routes.get('/products/:id', controllerByIdProduct);
routes.put('/products/:id', auth, controllerUpdateProduct);
routes.delete('/products/:id', auth, controllerDeleteProduct);
routes.put('/products/:id/image/', auth, uploadImage.single('image'), controllerUploadImg);

module.exports = routes;
