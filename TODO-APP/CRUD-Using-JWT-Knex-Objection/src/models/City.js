"use strict"

const Model = require("objection").Model;

const User = require("../models/User");
const State = require("../models/State")
const Country = require("../models/Country");

class City extends Model {
    // Table name is the only required property
    static get tableName() {
        return "city";
    }

    // Optional JSON schema.This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: "object",
            required: ["city_name", "state_id", "country_id"],
            properties: {
                id: { type: "integer" },
                city_name: { type: "string", minLength: 1, maxLength: 255 },
                state_id: { type: "integer" },
                country_id: { type: "integer" }
            }
        };
    }

    // This object defines the relations to other models.
    static get relationMappings() {
        return {
            //relation with "users" TABLE
            user_city_relation: {
                relation: Model.HasOneRelation,
                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one. We use the file path version
                // here to prevent require loops.
                modelClass: User,
                join: {
                    from: "city.id",
                    to: "users.city_id"
                }
            },

            //relation with "state" TABLE
            city_state_relation: {
                relation: Model.HasOneRelation,
                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one. We use the file path version
                // here to prevent require loops.
                modelClass: State,
                join: {
                    from: "city.state_id",
                    to: "state.id"
                }
            },

            //relation with "country" TABLE
            city_country_relation: {
                relation: Model.HasOneRelation,
                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one. We use the file path version
                // here to prevent require loops.
                modelClass: Country,
                join: {
                    from: "city.country_id",
                    to: "country.id"
                }
            }
        }
    }
}

module.exports = City;