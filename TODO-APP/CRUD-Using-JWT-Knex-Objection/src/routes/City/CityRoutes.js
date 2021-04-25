const promiseRouter = require("express-promise-router");
const router = promiseRouter();

// load the dependent controller
const CityManagement = require("../../controllers/mainController").CityManagement;

/*---------------Create City Route--------------------*/
router.post("/createCity", CityManagement.createCity);

/*---------------Fetch All Cities Data Route--------------------*/
router.get("/allCities", CityManagement.getAllCities);

/*---------------Delete City By Id Route--------------------*/
router.delete("/deleteCityById", CityManagement.deleteCity);

/*---------------Get Cities By State Id Route--------------------*/
router.get("/allCities/:id", CityManagement.getCitiesByStateId);

module.exports = router;