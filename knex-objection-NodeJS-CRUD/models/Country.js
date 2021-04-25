"use strict";

const Model = require("objection").Model;
const Person = require("./Person");

class Country extends Model {
  // Table name is the only required property
  static get tableName() {
    return "country";
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      personCity: {
        relation: Model.HasOneRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: Person,
        join: {
          from: "country.id",
          to: "person.countryId"
        }
      }
    };
  }
}

module.exports = Country;
