
exports.up = function (knex) {
    return knex.schema.createTable('subjects_teachers', table => {
        table.increments('id').primary();
        table.string('subject_id').references('subId').inTable('subjects');
        table.string('teacher_id').references('empId').inTable('users');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('subjects_teachers')
};
