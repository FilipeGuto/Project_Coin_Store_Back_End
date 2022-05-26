const {
  modelCreateProduct,
  modelFindProduct,
  modelUpdateProduct,
  modelByIdProduct,
  modelDeleteProduct,
} = require('../models/products.models');

const { productSchema } = require('../schema/schema');
const errorMessage = require('../utils/errorMessage');
const { notFound, badRequest } = require('../utils/dictionary/statusCode');

const servicesCreateProduct = async (product) => {
  const { title, description, quantity, price, image } = product;
  const { error } = productSchema.validate({ 
    title,
    description,
    quantity,
    price,
    image,
  });
  if (error) {
    throw errorMessage(badRequest, 'Invalid entries. Try again.');
  }

  const newProduct = await modelCreateProduct(title, description, quantity, price, image);

  return newProduct;
};

const servicesFindProduct = async () => {
  const products = await modelFindProduct();

  return products;
};

const servicesByIdProduct = async (id) => {
  const productById = await modelByIdProduct(id);
  if (productById === null) throw errorMessage(notFound, 'Product not found');

  return productById;
};

const servicesUpdateProduct = async (id, product) => {
  await modelUpdateProduct(id, product);

  const productById = await modelByIdProduct(id);

  return productById;
};

const servicesDeleteProduct = async (id) => {
  await modelDeleteProduct(id);

  return { message: 'Product Delete' }
};

module.exports = {
  servicesCreateProduct,
  servicesFindProduct,
  servicesByIdProduct,
  servicesUpdateProduct,
  servicesDeleteProduct,
};
