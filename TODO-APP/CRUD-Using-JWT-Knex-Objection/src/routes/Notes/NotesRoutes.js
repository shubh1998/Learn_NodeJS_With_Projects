const promiseRouter = require("express-promise-router");
const router = promiseRouter();

//----------Using passport for authentication---------
var passport = require("passport");
require("../../middleware/passport");

// load the dependent controller
const NotesManagement = require("../../controllers/mainController").NotesManagement;

/*---------------Create ToDo Route--------------------*/
router.post("/createToDo", passport.authenticate('jwt', {session: false}) , NotesManagement.create_TODO_Notes);

/*---------------Update ToDo's Info Route--------------------*/
router.patch("/updateToDo", passport.authenticate('jwt', {session: false}) , NotesManagement.updateToDoNoteById);

/*---------------Fetch All ToDos Data Route--------------------*/
router.get("/allToDos", passport.authenticate('jwt', {session: false}) , NotesManagement.getAllToDoNotes);

/*---------------Get All ToDo's By UserId Route--------------------*/
router.get("/getAllNotesByUserId/:id", passport.authenticate('jwt', {session: false}) , NotesManagement.getAllToDoNotesByUserId);

/*---------------Delete ToDo's Info By Id Route--------------------*/
router.delete("/deleteToDoById", passport.authenticate('jwt', {session: false}) , NotesManagement.delete_TODO_Notes);

/*---------------Get ToDo's Info By Todo_Id Route--------------------*/
router.get("/getToDoNoteById", passport.authenticate('jwt', {session: false}) , NotesManagement.get_TODO_NoteById);

module.exports = router;
