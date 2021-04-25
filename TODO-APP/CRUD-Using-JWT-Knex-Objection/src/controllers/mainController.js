const UserManagement = require("./User/UserController");
const CityManagement = require("./City/CityController");
const CountryManagement = require("./Country/CountryController");
const StateManagement = require("./State/StateController");
const NotesManagement = require("./Notes/NotesController");

module.exports ={
    UserManagement,
    CityManagement,
    CountryManagement,
    StateManagement,
    NotesManagement
}