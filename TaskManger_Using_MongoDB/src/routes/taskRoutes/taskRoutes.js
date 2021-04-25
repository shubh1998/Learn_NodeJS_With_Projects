const promiseRouter = require("express-promise-router");
const router = promiseRouter();

//------Import Midlewares--------------
const checkUserStatus = require("../../middlewares/checkUserStatus");
//----------Using passport for authentication---------
var passport = require("passport");
require("../../middlewares/passport");


const TaskManagement = require("../../controllers/mainController").TaskManagement;

/**
 *  =================================================================================================================================
 * @description:{ User Need to do login to access these APIs}
 *  =================================================================================================================================
 */

/*--------Create task Route---------*/
router.post('/createtask', passport.authenticate('jwt', {session: false}), checkUserStatus.isActiveUser, TaskManagement.createTask);

 /*--------Update task Details Route---------*/
router.patch('/updatetask/:id', passport.authenticate('jwt', {session: false}), checkUserStatus.isActiveUser, TaskManagement.updateTaskDetailsById);

 /*--------Get Task Details By Id Route---------*/
router.get('/taskdetails/:id', passport.authenticate('jwt', {session: false}), checkUserStatus.isActiveUser, TaskManagement.getTaskDetailsById);

 /*--------Delete task Route---------*/
router.delete('/deletetask/:id', passport.authenticate('jwt', {session: false}), checkUserStatus.isActiveUser, TaskManagement.deleteTask);

 /*--------Fetch all tasks Route---------*/
router.get('/alltasks', passport.authenticate('jwt', {session: false}), checkUserStatus.isActiveUser, TaskManagement.fetchAllTasksWithUserInfo);


/**
  * @description - {Export the router}
*/
module.exports = router;