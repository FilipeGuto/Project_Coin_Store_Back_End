const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2, tlds: { allow: ['com', 'net'] },
  }).required(),
  password: Joi.string().required(),
});

const productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  image: Joi.string(),
})

module.exports = {
  userSchema,
  productSchema,
};
