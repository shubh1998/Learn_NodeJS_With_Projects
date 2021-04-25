// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    //connection: "postgres://localhost/CRUD_DB"

    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "root",
      database: "CRUD_DB"
    }
  }

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     host: 'host_url'
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   }
  // }
};
