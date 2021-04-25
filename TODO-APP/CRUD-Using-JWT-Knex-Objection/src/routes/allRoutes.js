const city_routes = require("./City/CityRoutes");
const country_routes = require("./Country/CountryRoutes");
const state_routes = require("./State/StateRoutes");
const user_routes = require("./User/UserRoutes");
const notes_routes = require("./Notes/NotesRoutes");

module.exports = [ city_routes, country_routes, state_routes, user_routes, notes_routes ];
