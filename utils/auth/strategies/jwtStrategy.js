const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//Se obtiene el token del header
  secretOrKey: config.jwtsecret //Necesitamos el secret para saber si la firma es valida
}

//Creo la estrategia
const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;
