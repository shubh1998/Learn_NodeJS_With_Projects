const promiseRouter = require("express-promise-router");
const router = promiseRouter();

//----------Using passport for authentication---------
var passport = require("passport");
require("../../middleware/passport");

// load the dependent controller
const UserManagement = require("../../controllers/mainController").UserManagement;

/*---------------Create User Route--------------------*/
router.post("/registerUser", UserManagement.createUser);

/*---------------User Login Route--------------------*/
router.post("/user/login", UserManagement.UserLogin);

/*---------------User Logout Route--------------------*/
router.get("/user/logout", passport.authenticate('jwt', {session: false}) , UserManagement.UserLogout);

/*---------------Update User's Info Route--------------------*/ 
router.patch("/updateUser", passport.authenticate('jwt', {session: false}) , UserManagement.updateUser);

/*---------------Fetch All Users Data Route--------------------*/
router.get("/allUsers", passport.authenticate('jwt', {session: false}) , UserManagement.getAllUsers);

/*---------------Get User's Info By Id Route--------------------*/
router.get("/getUserById", passport.authenticate('jwt', {session: false}) , UserManagement.getUserDetailById);

/*---------------Delete User's Info By Id Route--------------------*/
router.delete("/deleteUserById", passport.authenticate('jwt', {session: false}) , UserManagement.deleteUser);

module.exports = router;
