const { Model } = require('objection');
const config = require('./../db/knexfile');
const knexUnconfig = require('knex')
const knex = knexUnconfig(config.development);
Model.knex(knex);

class Students extends Model {
    static get tableName() {
        return 'students';
    }

    static get idColumn() {
        return 'rollNo';
    }

}

module.exports = Students;