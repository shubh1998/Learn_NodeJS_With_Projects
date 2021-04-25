exports.up = function(knex) {
  return knex.schema
    .createTable("city", table => {
      table
        .increments("id")
        .unsigned()
        .primary();

      table.string("name");
      table.timestamps(false, true);
    })

    .createTable("country", table => {
      table
        .increments("id")
        .unsigned()
        .primary();

      table.string("name");
      table.timestamps(false, true);
    })

    .createTable("job", table => {
      table
        .increments("id")
        .unsigned()
        .primary();

      table.string("name");
      table.timestamps(false, true);
    })

    .createTable("person", table => {
      table
        .increments("pid")
        .unsigned()
        .primary();

      table.string("name");
      table.string("email");
      table.integer("age");

      table
        .integer("cityId")
        .unsigned()
        .references("id")
        .inTable("city");

      table
        .integer("countryId")
        .unsigned()
        .references("id")
        .inTable("country");

      table
        .integer("jobId")
        .unsigned()
        .references("id")
        .inTable("job");

      table.boolean("status").defaultTo(true);
      table.timestamps(false, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("person")
    .dropTable("city")
    .dropTable("country")
    .dropTable("job");
};
