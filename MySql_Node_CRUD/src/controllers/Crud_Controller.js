const con = require('../../db/mysql_connection');

const createEmployee = async (req, res) => {
    try {
        let data = req.body;
        let sql = `insert into employee values(${data.eid},'${data.ename}')`;

        con.query(sql , (err, result) => {
            if(err) throw badRequestError(res, err);
            // throw okResponse(res, result, "data inserted successfully!");
            res.json(result)
        })
    } catch (error) {
        console.log(error);
    }
}


const fetchEmployeeDetailById = async (req, res) => {
    try{
        if(!req.query.eid) throw badRequestError(res, "eid is required to get employee details!");

        let sql="select * from employee where eid ="+req.query.eid;
        con.query(sql , (err,result)=>{
            if(err) throw badRequestError(res, err);
            // throw okResponse(res, result, "data fetch successfully!")
            res.json(result)
        });
    }catch(error){
        console.log(error);
    }
}


const updateEmployeeDetailsById = async (req, res) => {
    try{
        let data = req.body;
        if(!data.eid) throw badRequestError(res, "eid is required to update employee details!");
        if(!data.ename) throw badRequestError(res, "ename is required!");

        let sql= `update employee set ename=${data.ename} where eid=${data.eid}`
        con.query(sql , (err,result)=>{
            if(err) throw badRequestError(res, err);
            // throw okResponse(res, result, "data updated successfully!")
            res.json(result)
        });
    }catch(error){
        console.log(error);
    }
}


const deleteEmployeeDetailsById = async (req, res) => {
    try{
        if(!req.query.eid) throw badRequestError(res, "eid is required to delete employee details!");

        let sql="delete from employee where eid ="+req.query.eid;
        con.query(sql , (err,result)=>{
            if(err) throw badRequestError(res, err);
            // throw okResponse(res, result, "data deleted successfully!")
            res.json(result)
        });
    }catch(error){
        console.log(error);
    }
}


const fetchAllEmployyes = async (req, res) => {
    try{
        
        let sql="select * from employee";
        con.query(sql , (err,result)=>{
            if(err) throw badRequestError(res, err);
            // throw okResponse(res, result, "data fetch successfully!")
            res.json(result)
        });
    }catch(error){
        console.log(error);
    }
}


module.exports ={
    createEmployee,
    fetchEmployeeDetailById,
    updateEmployeeDetailsById,
    deleteEmployeeDetailsById,
    fetchAllEmployyes
}