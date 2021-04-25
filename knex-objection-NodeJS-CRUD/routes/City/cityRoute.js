const promiseRouter = require("express-promise-router");
const router = promiseRouter();

// load the dependent controller
const CityManagement = require("../../controllers/controllers").CityManagement;

/*---------------Create City Route--------------------*/
router.post("/createCity", CityManagement.createCity);

/*---------------Fetch All Countries Data Route--------------------*/
router.get("/allCities", CityManagement.getAllCities);

/*---------------Delete Country's Info By Id Route--------------------*/
router.delete("/deleteCityById", CityManagement.deleteCity);

module.exports = router;
