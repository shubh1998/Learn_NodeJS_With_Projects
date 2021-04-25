const promiseRouter = require("express-promise-router");
const router = promiseRouter();

// load the dependent controller
const StateManagement = require("../../controllers/mainController").StateManagement;

/*---------------Create State Route--------------------*/
router.post("/createState", StateManagement.createState);

/*---------------Fetch All Cities Data Route--------------------*/
router.get("/allStates", StateManagement.getAllStates);

/*---------------Delete State By Id Route--------------------*/
router.delete("/deleteStateById", StateManagement.deleteState);

/*---------------Get Cities By State Id Route--------------------*/
router.get("/allStates/:id", StateManagement.getStatesByCountryId);

module.exports = router;