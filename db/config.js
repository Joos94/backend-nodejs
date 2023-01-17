const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbuser);
const PASSWORD = encodeURIComponent(config.dbpassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbhost}:${config.dbport}/${config.dbname}`;

module.exports = {
  development: {
    url: config.dburl,
    dialect: 'postgres',
  },
  production: {
    url: config.dburl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
