const {ValidationError} = require('sequelize');

/*loguear errores*/
function logErrors(err, req, res, next){
  console.log("logErrors");
    console.error(err);
    next(err);
}

//Creo un error en especifico que decta un error pero crea un formato para devolverlo al
//cliente
function errorHandler(err, req, res, next){
  console.log("errorHandler");
  res.status(500).json({
      message: err.message,
      stack: err.stack
  });
}

//Creo un error en especifico que decta un error pero crea un formato para devolverlo al
//cliente
function boomErrorHandler(err, req, res, next){
  if (err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  }

  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}

module.exports = {logErrors, errorHandler, boomErrorHandler, ormErrorHandler}
