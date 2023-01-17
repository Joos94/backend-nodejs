/*Configuración de rutas*/
const express = require("express");//Requiero express

const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const usersRouter = require('./usersRouter');
const orderRouter = require('./ordersRouter');
const customersRouter = require('./customersRouter');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');

function routerApi(app) {
  const router = express.Router(); //creo una ruta maestra
  app.use('/api/v1', router);//Genero un pck globlar para los endponit de aqui en adelante
  router.use('/products', productsRouter);//Se define el nombre del endpoint y las rutas que se usaran
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
