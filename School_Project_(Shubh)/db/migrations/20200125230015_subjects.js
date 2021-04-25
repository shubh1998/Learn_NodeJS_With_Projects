exports.up = function (knex) {
    return knex.schema.createTable('subjects', table => {
        table
            .string('subId')
            .unique()
            .primary()
            .notNullable();
        table.string('subjectName').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('subjects');
};
