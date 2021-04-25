
exports.up = function(knex) {
  return knex.schema.alterTable("users", table => {
    table.string("mobile").unique();
    table.string("user_type");
  });
};

exports.down = function(knex) {
  
};
