const {Pool} =  require('pg');
const {config} = require('../config/config');

let URI = '';
const options = {};

if (config.isProd) {
  options.connectionString = config.dburl;
  options.ssl =  {
    rejectUnauthorized: false
  };
}else{
  const USER = encodeURIComponent(config.dbuser);
  const PWD = encodeURIComponent(config.dbpassword);
  URI =  `postgres://${USER}:${PWD}@${config.dbhost}:${config.dbport}/${config.dbname}`;//CREO URL DE CONEXIÓN.
}

const pool = new Pool(options);

module.exports = pool;
