const express = require('express');
const cors = require('cors');
const routeProducts = require('./src/routers/products');
const routeUsers = require('./src/routers/users');
const errorMiddlewares = require('./src/middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json())

app.use(routeProducts);
app.use(routeUsers);
app.use(errorMiddlewares);

module.exports = app;