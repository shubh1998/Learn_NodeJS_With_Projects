const Task = require("../../models/Tasks");

/**
 * @description: Function is used to create task
 */
const createTask = async (req, res) => {
    try{
        let requestData = new Task(req.body)

        if (!requestData.task_subject) throw badRequestError(res, "Enter task subject.");
        if (!requestData.task_description) throw badRequestError(res, "Enter task description.");
        
        let taskCareted = await requestData.save();

        return okResponse(res, taskCareted, "Task created successfully !");
    } catch(error){
        console.log(error)
    }
}


module.exports = {
  createTask,
};