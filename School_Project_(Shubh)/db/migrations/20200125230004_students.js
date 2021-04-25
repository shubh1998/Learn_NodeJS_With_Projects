exports.up = function (knex) {
    return knex.schema.createTable('students', table => {
        table
            .string('rollNo')
            .unique()
            .primary()
            .notNullable();
        table.string('name').notNullable();
        table.string('class').notNullable();
        table.integer('age').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('students');
};
