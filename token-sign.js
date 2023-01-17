const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1d',
};

const secret = 'myCat';//Se recomienda guardar el secret en una variable de entorno
const payload = {
  sub: 1,//Forma que voy a identificar el usuario o identificador del token
  role: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret, jwtConfig);
console.log(token);
