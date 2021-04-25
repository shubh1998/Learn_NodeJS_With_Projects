const knexUnconfig = require('knex');
const { Model } = require('objection');
const config = require('./../db/knexfile');
const knex = knexUnconfig(config.development);
Model.knex(knex);

class Subjects extends Model {
    static get tableName() {
        return 'subjects';
    }

    static get idColumn() {
        return 'subId';
    }

    static get relationMappings() {
        const users = require('./users');
        return {
            teachers: {
                relation: Model.ManyToManyRelation,
                modelClass: users,
                join: {
                    from: 'subjects.subId',
                    through: {
                        from: 'subjects_teachers.subject_id',
                        to: 'subjects_teachers.teacher_id'
                    },
                    to: 'users.empId'
                }
            }
        }
    }
}

module.exports = Subjects;