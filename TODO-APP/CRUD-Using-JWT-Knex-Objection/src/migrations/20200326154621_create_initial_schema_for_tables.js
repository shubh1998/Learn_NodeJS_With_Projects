
exports.up = function(knex) {
  return knex.schema
    .createTable('country', table => {
        table.increments('id').primary();
        table.string("country_name");
        table.string('country_code');
        table.timestamps(false, true);
    })

    .createTable('state', table => {
        table.increments('id').primary();
        table.string("state_name");
        table.integer('country_id').references('id').inTable('country');
        table.timestamps(false, true);
    })

    .createTable('city', table => {
        table.increments('id').primary();
        table.string("city_name");
        table.integer('state_id').references('id').inTable('state');
        table.integer('country_id').references('id').inTable('country');
        table.timestamps(false, true);
    })

    .createTable('users', table => {
        table.increments('id').primary();
        table.string('name', 120);
        table.string('email').unique();
        table.string('password');
        table.integer('mobile').unique();
        table.string('profile_pic')
        table.string('gender')
        table.string('address');
        table.integer('city_id').references('id').inTable('city');
        table.integer('state_id').references('id').inTable('state');
        table.integer('country_id').references('id').inTable('country');
        //to handle single-device logins (perhaps, not the best way to do this)
        table.string('auth_token').comment('JWT for single-device logins');
        //to handle forgot password link verification
        table.string('forgot_password_token');
        table.boolean('is_active').defaultTo(true);
        table.timestamps(false, true);
    })

    .createTable('todo_notes', table => {
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users');
        table.string('notes_title');
        table.string('notes_description');
        table.timestamps(false, true);
    })
};

exports.down = function(knex) {
  
};
