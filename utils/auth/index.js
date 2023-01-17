const passport = require('passport');

const LocalStrategy = require('./strategies/localStrategy');
const jwtStrategy = require('./strategies/jwtStrategy');

passport.use(LocalStrategy);
passport.use(jwtStrategy);
