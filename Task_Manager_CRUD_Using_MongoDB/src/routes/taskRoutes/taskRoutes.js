const promiseRouter = require("express-promise-router");
const router = promiseRouter();

//-----------Importing MiddleWare---------------
const checkUserStatus = require("../../middlewares/checkUserStatus");

const TaskManagement = require("../../controllers/mainController").TaskManagement;

/**
 *  =================================================================================================================================
 * @description:{ User Doesn't Need to do login to access these APIs}
 *  =================================================================================================================================
 */

 /*--------Create Task Route---------*/
 router.post("/createTask", checkUserStatus.isActiveUser, TaskManagement.createTask);

/**
  * @description - {Export the router}
*/
module.exports = router;