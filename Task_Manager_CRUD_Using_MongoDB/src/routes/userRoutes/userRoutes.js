const promiseRouter = require('express-promise-router');
const router = promiseRouter();

const UserManagement = require("../../controllers/mainController").UserManagement;

/**
 *  =================================================================================================================================
 * @description:{ User Doesn't Need to do login to access these APIs}
 *  =================================================================================================================================
 */

 /*--------Register User Route---------*/
 router.post('/registerUser', UserManagement.registerUser);

/**
  * @description - {Export the router}
*/
module.exports = router;