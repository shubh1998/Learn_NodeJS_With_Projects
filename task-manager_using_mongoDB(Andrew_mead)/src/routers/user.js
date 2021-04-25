const express = require('express')
const router = new express.Router()
const userController = require("../controllers/userController")
const auth = require("../middlewares/auth")

router.post('/createuser', userController.createUser)

router.post('/login', auth ,userController.loginUser)

router.get('/allusers', userController.fetchAllUsers)

router.get('/users/:id', userController.getUserDetailsById)

router.patch('/users/:id', userController.updateUserDetailsById)

router.delete('/users/:id', userController.deleteUserById)

module.exports = router