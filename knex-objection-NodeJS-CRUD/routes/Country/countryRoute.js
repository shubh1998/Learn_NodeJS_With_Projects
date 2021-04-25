const promiseRouter = require("express-promise-router");
const router = promiseRouter();

// load the dependent controller
const CountryManagement = require("../../controllers/controllers")
  .CountryManagement;

/*---------------Create Country Route--------------------*/
router.post("/createCountry", CountryManagement.createCountry);

/*---------------Fetch All Countries Data Route--------------------*/
router.get("/allCountries", CountryManagement.getAllCountries);

/*---------------Delete Country's Info By Id Route--------------------*/
router.delete("/deleteCountryById", CountryManagement.deleteCountry);

module.exports = router;
