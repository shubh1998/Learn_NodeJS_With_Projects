const knexUnconfig = require('knex');
const { Model } = require('objection');
const config = require('./../db/knexfile');
const knex = knexUnconfig(config.development);
Model.knex(knex);

class Subjects_teachers extends Model {
    static get tableName() {
        return 'subjects_teachers';
    }
    static get idColumn() {
        return 'id';
    }
}
module.exports = Subjects_teachers;