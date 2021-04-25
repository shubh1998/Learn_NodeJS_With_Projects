const Task = require("../../models/Task");


/**
 * @description: Function is used to create a task 
 */
const createTask = async (req, res) => {
    try {
        if (!req.body.description) throw badRequestError(res, "Description required !");
        
        const newTask = new Task({
          ...req.body,
          user_id: req.user._id,
        });

        await newTask.save();
        return okResponse(res, newTask, "Task created successfully !");
    } catch (error) {
        console.log(error);
    }
}


/**
 * @description: Function is used to delete a task 
 */
const deleteTask = async (req, res) => {
    try {
        if (!req.params.id) throw badRequestError(res, "Please pass id in params !");
        
        const taskDelete = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user._id })
        if (!taskDelete) {
            throw badRequestError(res, "Task not found !");
        }
        return okResponse(res, taskDelete, "Task deleted successfully !");
    } catch (error) {
        console.log(error);
    }
}


/**
 * @description: Function is used to fetch a task by id 
 */
const getTaskDetailsById = async (req, res) => {
    try {
        const _id = req.params.id;
        //get task detail by id
        const taskDetail = await Task.findOne({ _id, user_id: req.user._id })
        //get user details by user id which is stored in task document using populate query
        await taskDetail.populate('user_id').execPopulate();
        
        if (!taskDetail) {
            throw badRequestError(res, "Task not found !");
        }
        return okResponse(res, taskDetail, "Task Details fetched successfully !");
    } catch (error) {
        console.log(error);
    }
}


/**
 * @description: Function is used to fetch all task with user info 
 */
const fetchAllTasksWithUserInfo = async (req, res) => {
    try {
        let fetchAllTasks;
        const page = req.query.page || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        //For Sorting data : -1 for desc sorting, +1 for asc Sorting

        if(req.query.completed != ''){
            fetchAllTasks = await Task.find({ completed: req.query.completed }).limit(limit).skip(skip).sort({createdAt: -1});
        } else{
            fetchAllTasks = await Task.find().limit(limit).skip(skip).sort({createdAt: -1});
        }

        return okResponse(res, fetchAllTasks, "All Task fetched successfully !");
    } catch (error) {
        console.log(error);
    }
}


/**
 * @description: Function is used to Update task by id
 */
const updateTaskDetailsById = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            throw badRequestError(res, "Invalid updates!");
        }

        const taskUpdate = await Task.findOne({ _id: req.params.id, user_id: req.user._id})

        if (!taskUpdate) throw badRequestError(res, "Task not found !");
        
        updates.forEach((update) => taskUpdate[update] = req.body[update])
        await taskUpdate.save();

        return okResponse(res, taskUpdate, "Task Details updated successfully !");        
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    createTask,
    deleteTask,
    fetchAllTasksWithUserInfo,
    getTaskDetailsById,
    updateTaskDetailsById
};
