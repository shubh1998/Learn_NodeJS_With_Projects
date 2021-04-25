"use strict"

const Model = require("objection").Model;

const User = require("../models/User");

class Notes extends Model {
    static get tableName() {
        return "todo_notes";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["notes_title", "notes_description"],
            properties: {
                id: { type: "integer" },
                userId: { type: "integer" },
                notes_title: { type: "string"},
                notes_description: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        return {
            //relation with "users" TABLE
            notes_user_relation: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "todo_notes.user_id",
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Notes;