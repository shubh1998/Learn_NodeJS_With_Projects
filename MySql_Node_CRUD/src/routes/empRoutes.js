const promiseRouter = require("express-promise-router");
const router = promiseRouter();

const empControler = require("../controllers/Crud_Controller")

router.post("/createEmp", empControler.createEmployee);
router.put('/updateEmp', empControler.updateEmployeeDetailsById);
router.get("/allEmployees", empControler.fetchAllEmployyes);
router.get("/employee_detail", empControler.fetchEmployeeDetailById);
router.delete("/deleteEmp", empControler.deleteEmployeeDetailsById);

module.exports = router;