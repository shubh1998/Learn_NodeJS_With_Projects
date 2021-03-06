const knexUnconfig = require('knex');
const { Model } = require('objection');
const config = require('./../db/knexfile');
const knex = knexUnconfig(config.development);
Model.knex(knex);
class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'empId';
  }

  static get relationMappings() {
    const subjects = require('./subjects');
    return {
      subject: {
        relation: Model.ManyToManyRelation,
        modelClass: subjects,
        join: {
          from: 'users.empId',
          through: {
            from: 'subjects_teachers.teacher_id',
            to: 'subjects_teachers.subject_id'
          },
          to: 'subjects.subId'
        }
      }
    }
  }
}

module.exports = Users;
