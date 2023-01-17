const {Client} =  require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5433,
    user: 'admin',
    password: '123456',
    database: 'my_store'
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
