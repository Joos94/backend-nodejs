require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbuser: process.env.DB_USER,
  dbpassword: process.env.DB_PASSWORD,
  dbhost: process.env.DB_HOST,
  dbname: process.env.DB_NAME,
  dbport: process.env.DB_PORT,
  dburl: process.env.DATABASE_URL,
  apikey: process.env.API_KEY,
  jwtsecret: process.env.JWT_SECRET
}

module.exports = {config};
