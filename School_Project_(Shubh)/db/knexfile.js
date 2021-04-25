// Update with your config settings.
const pg = require('pg');
module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      password: 'root',
      database: 'school'
    },
    debug: true
  }
};
