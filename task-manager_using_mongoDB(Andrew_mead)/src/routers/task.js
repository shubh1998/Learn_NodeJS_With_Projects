const express = require('express')
const router = new express.Router()
const taskController = require("../controllers/taskController")

router.post("/createtask", taskController.createTask);

router.get('/alltasks', taskController.fetchAllTasks)

router.get('/task/:id', taskController.getTaskById)

router.patch('/task/:id', taskController.updateTask)

router.delete('/tasks/:id', taskController.deleteTaskById)

module.exports = router