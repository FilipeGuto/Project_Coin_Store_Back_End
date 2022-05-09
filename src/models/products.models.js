const { ObjectId } = require('mongodb');
const connect = require('./connection');

const COLLECTION = 'products_collection';

const modelCreateProduct = async (title, description, quantity, price, image) => {
  const conn = await connect();
  const { insertedId } = await conn.collection(COLLECTION).insertOne({
    title, description, quantity, price, image
  });

  const newProduct = {
    id: ObjectId(insertedId),
    title: title,
    description: description,
    quantity: quantity,
    price: price,
    image: image,
  };

  return newProduct;
};

const modelFindProduct = async () => {
  const conn = await connect();
  const response = await conn.collection(COLLECTION).find().toArray();

  return response;
};

const modelByIdProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connect();
  const productById = await conn.collection(COLLECTION).findOne({ _id: ObjectId(id) });

  return productById;
};

const modelUpdateProduct = async (id, product) => {
  const conn = await connect();

  const updateProduct = await conn.collection(COLLECTION).updateOne(
    { _id: ObjectId(id) }, { $set: { ...product } },
  );

  return updateProduct;
};

const modelDeleteProduct = async (id) => {
  const conn = await connect();
  await conn.collection(COLLECTION).deleteOne({ _id: ObjectId(id) });
};

const modelUploadImg = async (id, image) => {
  const conn = await connect();
  await conn.collection(COLLECTION).updateOne(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/src/uploads/${image}` } },
  );

  return true;
};

module.exports = {
  modelCreateProduct,
  modelFindProduct,
  modelByIdProduct,
  modelUpdateProduct,
  modelDeleteProduct,
  modelUploadImg,
};
