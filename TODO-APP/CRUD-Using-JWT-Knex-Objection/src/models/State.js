"use strict"

const Model = require("objection").Model;

const Country = require("../models/Country");
const User = require("../models/User")
const City = require("../models/City")

class State extends Model {
    // Table name is the only required property
    static get tableName(){
        return "state";
    }

    // Optional JSON schema.This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema(){
        return {
            type: "object",
            required: ["state_name", "country_id"],
            properties: {
                id: { type: "integer" },
                state_name: { type:"string", minLength: 1, maxLength: 255},
                country_id: { type: "integer" }
            }
        }
    }


    static get relationMappings() {
        return {
            //relation with "users" TABLE
            state_user_relation: {
                relation: Model.HasOneRelation,
                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one. We use the file path version
                // here to prevent require loops.
                modelClass: User,
                join: {
                    from: "state.id",
                    to: "users.state_id"
                }
            },

            //relation with "country" TABLE
            state_country_relation : {
                relation: Model.HasOneRelation,
                modelClass: Country,
                join: {
                    from: "state.country_id",
                    to: "country.id"
                }
            },

            //relation with "city" TABLE
            state_city_relation: {
                relation: Model.HasManyRelation,
                modelClass: City,
                join: {
                    from: "state.id",
                    to: "city.state_id"
                }
            }
        }
    }
}

module.exports = State;