const {
  servicesCreateProduct,
  servicesFindProduct,
  servicesByIdProduct,
  servicesUpdateProduct,
  servicesDeleteProduct,
} = require('../services/products.services');

const { created, success } = require('../utils/dictionary/statusCode');

const controllerCreateProduct = async (req, res, next) => {
  try {
    const newProduct = await servicesCreateProduct(req.body);

    return res.status(created).json(newProduct);
  } catch (error) {
    console.log(`POST CREATE PRODUCT -> ${error.message}`);
    return next(error);
  }
};

const controllerFindProduct = async (req, res, next) => {
  try {
    const products = await servicesFindProduct();

    return res.status(success).json(products);
  } catch (error) {
    console.log(`GET ALL PRDUCTS -> ${error.message}`);
    return next(error);
  }
};

const controllerByIdProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await servicesByIdProduct(id);

    return res.status(success).json(productById);
  } catch (error) {
    console.log(`GET PRODUCT BY ID -> ${error.message}`);
    return next(error);
  }
};

const controllerUpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = await servicesUpdateProduct(id, req.body);

    return res.status(success).json(productId);
  } catch (error) {
    console.log(`UPDATE PRODUCT BY ID -> ${error.message}`);
    return next(error);
  }
};

const controllerDeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await servicesDeleteProduct(id);

    return res.status(success).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log(`DELETE PRODUCT BY ID -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  controllerCreateProduct,
  controllerFindProduct,
  controllerByIdProduct,
  controllerUpdateProduct,
  controllerDeleteProduct,
};
