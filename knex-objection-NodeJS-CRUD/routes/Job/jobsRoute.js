const promiseRouter = require("express-promise-router");
const router = promiseRouter();

// load the dependent controller
const JobManagement = require("../../controllers/controllers").JobManagement;

/*---------------Create Job Route--------------------*/
router.post("/createJob", JobManagement.createJob);

/*---------------Update Job's Info Route--------------------*/
router.patch("/updateJob", JobManagement.updateJob);

/*---------------Fetch All Jobs Data Route--------------------*/
router.get("/allJobs", JobManagement.getAllJobs);

/*---------------Delete Job's Info By Id Route--------------------*/
router.delete("/deleteJobById", JobManagement.deleteJob);

module.exports = router;
