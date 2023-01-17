/*Archivo inicial*/

/*
Los endpoints son las URLs de un API o un backend que responden a una petición.
Los mismos entrypoints tienen que calzar con un endpoint para existir.
Algo debe responder para que se renderice un sitio con sentido para el visitante.
*/

const express = require("express");//Requiero express
const cors = require('cors');
const routerApi = require("./routes");
const {checkApiKey} = require('./middlerwares/authHandler');
const {logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require("./middlerwares/errorHandler");

//Creo mi App
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['httpd://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors());

require('./utils/auth')

//Creo una ruta
app.get('/', (req, res)=>{
  res.send("Hola esta corriendo server en express");
});

app.get('/nueva-ruta', checkApiKey, (req, res)=>{
  res.send("Hola esta es mi nueva ruta");
});

routerApi(app);
//los middleware se deben hacer despues del routing
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/categories/:categoryId/products/:productId', (req, res)=>{
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId,
    name: 'Producto 1',
    price: 1000
  });
});

//paremtro get query
app.get('/users', (req, res)=>{
  const {limit, offset} = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.send('No hay parametros');
  }
});

app.listen(port, ()=>{
  console.log("Escuchando en el puerto =>"+port);
});
