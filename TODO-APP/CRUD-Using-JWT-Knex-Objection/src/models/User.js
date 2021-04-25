"use strict"

const Model = require("objection").Model;

const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const City = require("../models/City");
const State = require("../models/State")
const Country = require("../models/Country");

class User extends Model {
    static get tableName() {
        return "users";
    }

    static get jsonSchema() {
        return {
            type: "object",
            // required: ["name", "email", "password", "mobile", "gender"],
            required: [],
            properties: {
                id: { type: "integer" },
                name: { type: "string", minLength: 1, maxLength: 255 },
                email: { type: "string", minLength: 1, maxLength: 255 },
                password: { type: "string"},
                mobile: { type: "string", maxLength: 10 },
                gender: { type: "string" },
                city_id: { type: "integer" },
                state_id: { type: "integer" },
                country_id: { type: "integer" },
                address: { type: "string", minLength: 1, maxLength: 500 }
            }
        }
    }

    static get relationMappings() {
        return {
            // relation with "city" Table
            user_city_relation: {
                relation: Model.HasOneRelation,
                modelClass: City,
                join: {
                    to: "users.city_id",
                    from: "city.id"
                }
            },

            // relation with "state" Table
            user_state_relation: {
                relation: Model.HasOneRelation,
                modelClass: State,
                join: {
                    to: "users.state_id",
                    from: "state.id"
                }
            },

            // relation with "country" Table
            user_country_relation: {
                relation: Model.HasOneRelation,
                modelClass: Country,
                join: {
                    to: "users.country_id",
                    from: "country.id"
                }
            }
        }
    }

    //--------Function is used to generate auth_token------------
    async getJWT() {
        return await jwt.sign({
            id: this.id,
            role: 'USER',
        }, process.env.JWT_SECRET);
    }

    //---------Function to compare password----------------------
    async comparePassword(password) {
        if (!password) {
            return false;
        }
        let pass = await bcrypt.compare(password, this.password);
        return pass;
    }

    //---------Function runs before inserting a record----------------------
    //-----It checks valid emailId and bcrypt the password-----
    async $beforeInsert() {
        await super.$beforeInsert();
        if (this.email) {
            if (!validator.isEmail(this.email || '')) {
                console.log('in before insert');
                throw badRequestError("Not a valid email address!");
            }
        }
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}

module.exports = User;