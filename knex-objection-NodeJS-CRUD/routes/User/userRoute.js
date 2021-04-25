const promiseRouter = require("express-promise-router");
const router = promiseRouter();

// load the dependent controller
const UserManagement = require("../../controllers/controllers").UserManagement;

/*---------------Create Person Route--------------------*/
router.post("/registerPerson", UserManagement.createPerson);

/*---------------Update Person's Info Route--------------------*/
router.patch("/updatePerson", UserManagement.updatePerson);

/*---------------Fetch All Persons Data Route--------------------*/
router.get("/allPersons", UserManagement.getAllPersons);

/*---------------Get Person's Info By Id Route--------------------*/
router.get("/getPersonById", UserManagement.getPersonDetailById);

/*---------------Delete Person's Info By Id Route--------------------*/
router.delete("/deletePersonById", UserManagement.deletePerson);

module.exports = router;
