const promiseRouter = require("express-promise-router");
const router = promiseRouter();

// load the dependent controller
const CountryManagement = require("../../controllers/mainController").CountryManagement;

/*---------------Create City Route--------------------*/
router.post("/createCountry", CountryManagement.createCountry);

/*---------------Fetch All Cities Data Route--------------------*/
router.get("/getAllCountries", CountryManagement.getAllCountries);

/*---------------Delete City By Id Route--------------------*/
router.delete("/deleteCountryById", CountryManagement.deleteCountry);

module.exports = router;