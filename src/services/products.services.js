const {
  modelCreateProduct,
  modelFindProduct,
  modelUpdateProduct,
  modelByIdProduct,
  modelDeleteProduct,
  modelUploadImg,
} = require('../models/products.models');

const errorMessage = require('../utils/errorMessage');
const { notFound } = require('../utils/dictionary/statusCode');

const servicesCreateProduct = async (product) => {
  const { title, description, price, image } = product;

  const newProduct = await modelCreateProduct(title, description, price, image);

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

const servicesUploadImg = async (id, image) => {
  await modelUploadImg(id, image);
  
  const productById = await modelByIdProduct(id);

  return productById;
};

module.exports = {
  servicesCreateProduct,
  servicesFindProduct,
  servicesByIdProduct,
  servicesUpdateProduct,
  servicesDeleteProduct,
  servicesUploadImg,
};
