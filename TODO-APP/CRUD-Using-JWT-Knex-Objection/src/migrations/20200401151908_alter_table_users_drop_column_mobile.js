
exports.up = function(knex) {
    return knex.schema.alterTable("users", table => {
      table.dropColumn("mobile");
    });
};

exports.down = function(knex) {
  
};
