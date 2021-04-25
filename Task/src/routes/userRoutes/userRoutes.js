const promiseRouter = require('express-promise-router');
const router = promiseRouter();

/*------Using Passport For Authentication ------*/
const passport = require("passport")
require("../../middlewares/passport");

const checkUserStatus = require("../../middlewares/checkUserStatus")

const UserManagement = require("../../controllers/mainController").UserManagement;

/**
 *  =================================================================================================================================
 * @description:{ User Doesn't Need to do login to access these APIs}
 *  =================================================================================================================================
 */

/*--------Register User Route---------*/
router.post('/registerUser', UserManagement.registerUser);
router.post('/loginUser', UserManagement.loginUser);
router.get("/verifyEmail", UserManagement.verifyEmail);
router.get('/logoutUser',  passport.authenticate('jwt', { session: false }), checkUserStatus.isActiveUser, UserManagement.logoutUser);
router.get('/approveUser',  passport.authenticate('jwt', { session: false }), checkUserStatus.isActiveUser, UserManagement.approveAcccountOfCustomer);
router.patch('/updateUser',  passport.authenticate('jwt', { session: false }), checkUserStatus.isActiveUser, UserManagement.updateUserProfie);

/**
  * @description - {Export the router}
*/
module.exports = router;