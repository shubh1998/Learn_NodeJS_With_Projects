// Update with your config settings.
const dotenv = require("dotenv").config({path: "../.env"});

// console.log(__dirname)

// console.log(process.env)
// console.log(process.env.DB_HOST_DEV)

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    migrations: {
      directory: "../src/migrations"
    },
    connection: {
      // host: '127.0.0.1',
      // user: 'postgres',
      // password: 'root',
      // database: 'TODO_APP'
      
      //All server-specific secrets are stored in the .env file
      host: process.env.DB_HOST_DEV,
      user: process.env.DB_USER_DEV,
      password: process.env.DB_PASS_DEV,
      database: process.env.DB_NAME_DEV
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      // host: process.env.DB_HOST_PROD,
      // user: process.env.DB_USER_PROD,
      // password: process.env.DB_PASS_PROD,
      // database: process.env.DB_NAME_PROD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
