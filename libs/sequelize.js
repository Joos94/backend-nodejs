const {Sequelize} = require('sequelize');
const {config} = require('../config/config');
const setupModels = require('../db/models');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}


const sequelize = new Sequelize(config.dburl, options);

setupModels(sequelize);
//sequelize.sync();//Realizar una sincronización de los modelos

module.exports = sequelize;
