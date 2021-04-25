const promiseRouter = require('express-promise-router');
const router = promiseRouter();

//------Import Midlewares--------------
const checkUserStatus = require("../../middlewares/checkUserStatus");
//----------Using passport for authentication---------
var passport = require("passport");
require("../../middlewares/passport");

const UserManagement = require("../../controllers/mainController").UserManagement;

/**
 *  =================================================================================================================================
 * @description:{ User Doesn't Need to do login to access these APIs}
 *  =================================================================================================================================
 */

 /*--------Register User Route---------*/
 router.post('/registeruser', UserManagement.registerUser);
 /*--------Login User Route---------*/
 router.post('/userlogin', UserManagement.UserLogin);


/**
 *  =================================================================================================================================
 * @description:{ User Need to do login to access these APIs}
 *  =================================================================================================================================
 */

 /*--------Get User Details Route---------*/
 router.get('/userdetail/:id', passport.authenticate('jwt', {session: false}), checkUserStatus.isActiveUser ,UserManagement.getUserDetailsById);
 /*--------Delete User Route---------*/
 router.delete('/deleteuser/:id', passport.authenticate('jwt', {session: false}), checkUserStatus.isActiveUser ,UserManagement.deleteUserById);
 /*--------Logout User Route---------*/
 router.get('/userlogout', passport.authenticate('jwt', {session: false}), checkUserStatus.isActiveUser ,UserManagement.logoutUser);
 /*--------Fetch all Users list Route---------*/
 router.get('/allusers', passport.authenticate('jwt', {session: false}), checkUserStatus.isActiveUser ,UserManagement.allUserList);
 /*--------Update Users Details by id Route---------*/
 router.patch('/updateuser/:id', passport.authenticate('jwt', {session: false}), checkUserStatus.isActiveUser ,UserManagement.updateUserDetailsById);



/**
  * @description - {Export the router}
*/
module.exports = router;