"use strict";

const Model = require("objection").Model;
const City = require("./City");
const Country = require("./Country");
const Job = require("./Job");

class Person extends Model {
  // Table name is the only required property
  static get tableName() {
    return "person";
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "age", "cityId", "countryId"],

      properties: {
        pid: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 50 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        age: { type: "integer", min: 1, max: 500 },
        cityId: { type: "integer" },
        countryId: { type: "integer" }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      cityRelation: {
        relation: Model.BelongsToOneRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: City,
        join: {
          from: "person.cityId",
          to: "city.id"
        }
      },

      countryRelation: {
        relation: Model.BelongsToOneRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: Country,
        join: {
          from: "person.countryId",
          to: "country.id"
        }
      },

      jobRelation: {
        relation: Model.BelongsToOneRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: Job,
        join: {
          from: "person.jobId",
          to: "job.id"
        }
      }
    };
  }
}

module.exports = Person;
