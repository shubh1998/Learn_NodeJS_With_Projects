const express = require('express');
const authController = require('./../controller/authController');
const Router = express.Router();


Router.route('/loginEmployee').get(authController.viewLoginEmp).post(authController.login);

// Router.route('/signUp').post(authController.signUp);

module.exports = Router;
