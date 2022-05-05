const express = require('express');
const cors = require('cors');
const path = require('path');
const errorMiddlewares = require('./src/middlewares/errorHandler');
const routeProducts = require('./src/routers/products');
const routeUsers = require('./src/routers/users');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json())

app.use(routeProducts);
app.use(routeUsers);
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
