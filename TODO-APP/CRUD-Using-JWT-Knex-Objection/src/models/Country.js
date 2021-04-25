"use strict"

const Model = require("objection").Model;

const City = require("../models/City");
const State = require("../models/State");
const User = require("../models/User");

class Country extends Model {
    // Table name is the only required property
    static get tableName() {
        return "country";
    }
    
    // Optional JSON schema.This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: "object",
            required: ["country_name"],
            properties: {
                id: { type: "integer" },
                country_name: { type: "string", minLength: 1, maxLength: 255 },
                country_code: { type: "string", minLength: 1, maxLength: 5 }
            }
        };
    }

    // This object defines the relations to other models.
    static get relationMappings() {
        return {
            //relation with "users" TABLE
            country_user_relation: {
                relation: Model.HasOneRelation,
                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one. We use the file path version
                // here to prevent require loops.
                modelClass: User,
                join: {
                    from: "country.id",
                    to: "users.country_id"
                }
            },

             //relation with "city" TABLE
            country_city_relation: {
                relation: Model.HasManyRelation,
                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one. We use the file path version
                // here to prevent require loops.
                modelClass: City,
                join: {
                    from: "country.id",
                    to: "city.country_id"
                }
            },

            //relation with "state" TABLE
            country_state_relation: {
                relation: Model.HasManyRelation,
                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one. We use the file path version
                // here to prevent require loops.
                modelClass: State,
                join: {
                    from: "country.id",
                    to: "state.country_id"
                }
            }
        }
    }
}

module.exports = Country;