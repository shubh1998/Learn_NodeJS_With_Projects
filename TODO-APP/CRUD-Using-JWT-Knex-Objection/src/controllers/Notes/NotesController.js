"use strict"

/**
 * @author SHUBHAM GUPTA
 */

//----------------------------------------------NotesController Start------------------------------------------------------------------

//Import Model Here
const Notes = require("../../models/Notes");

//=====================================================================================

/**
 * Create TODO Notes
 * @description: function is used to create TODO Notes
 */
const create_TODO_Notes = async (req, res) => {
    let data = req.body;
    data.user_id = req.user.id;

    if (!data.notes_title) throw badRequestError("Please enter Title Of the TO-DO-Note.");
    if (!data.notes_description) throw badRequestError("Please enter Description Of the TO-DO-Note.");

    let Add_TO_DO_Note = await Notes.query()
        .insert(data)
        .returning("*");

    return createdResponse(
        res,
        Add_TO_DO_Note,
        "Congratulations! TO-DO-Note Created Successfully."
    );
};


/**
 * Delete TODO-Notes
 * @description: function is used to delete TODO-Notes
 */
const delete_TODO_Notes = async (req, res) => {
    let todo_NoteID = req.query.id;

    if (!todo_NoteID) throw badRequestError("Please pass todo_NoteID to Delete details.");

    let get_TO_DO = await Notes.query().deleteById(todo_NoteID);

    if (!get_TO_DO) {
        throw notFoundError("TO-DO-Note Not Found!!");
    } else {
        return okResponse(res, get_TO_DO, "TO-DO-Note Deleted Successfully!!");
    }
};


/**
 * Get TODO-Note By Id
 * @description: function is used to Get TODO-Note By Ids
 */
const get_TODO_NoteById = async (req, res) => {
    let todo_NoteID = req.query.id;

    if (!todo_NoteID) throw badRequestError("Please pass todo_NoteID to Delete details.");

    let get_TO_DO = await Notes.query().select("*").where("id", todo_NoteID);

    if (!get_TO_DO) {
        throw notFoundError("TO-DO-Note Not Found!!");
    } else {
        return okResponse(res, get_TO_DO, "TO-DO-Note Get Successfully!!");
    }
};


/**
 * Update ToDo Note
 * @description: function is used to update ToDo Note Info
 */
const updateToDoNoteById = async (req, res) => {
    let ToDoNoteId = req.query.id;
    let data = req.body;

    let updateToDoNote = await Notes.query()
        .update(data)
        .where("id", ToDoNoteId)
        .returning("*");

    if (!updateToDoNote) throw badRequestError("Something Went Wrong");

    return okResponse(
        res,
        updateToDoNote,
        "Congratulations! TO-DO-Note Updated Successfully."
    );
};


/**
 * Get List Of All TODO Notes
 * @description: function is used to Get List Of All TODO Notes
 */
const getAllToDoNotes = async (req, res) => {
    let allToDos = await Notes.query()
        .select("*")
        .eager("[notes_user_relation]")
        .modifyEager("notes_user_relation", builder => {
            builder.select("id", "name", "email", "mobile")
        })
        .orderBy("created_at", "desc");

    return okResponse(res, allToDos, "All ToDo-Notes Get Successfully.");
};


/**
 * Get List Of All TODO Notes By UserId
 * @description: function is used to Get List Of All TODO Notes By UserId
 */
const getAllToDoNotesByUserId = async (req, res) => {
    let userId = req.params.id;

    let allToDos = await Notes.query()
        .select("*")
        .eager("[notes_user_relation]")
        .modifyEager("notes_user_relation", builder => {
            builder.select("id", "name", "email", "mobile")
        })
        .where("user_id", userId)
        .orderBy("created_at", "desc");

    return okResponse(res, allToDos, "All ToDo-Notes Get Successfully.");
};


module.exports = {
    create_TODO_Notes,
    delete_TODO_Notes,
    updateToDoNoteById,
    getAllToDoNotes,
    getAllToDoNotesByUserId,
    get_TODO_NoteById
};

//----------------------------------------------NotesController END------------------------------------------------------------------