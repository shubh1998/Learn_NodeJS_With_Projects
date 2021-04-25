
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.string('empId').unique().notNullable().primary();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.boolean('isAdmin').notNullable().default(false);
        table.integer('age').notNullable();
        table.decimal('experiance');
        table.string('specialization');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
