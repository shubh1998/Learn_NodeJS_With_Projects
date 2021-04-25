const express = require('express');
const Router = express.Router();
const teacherController = require('./../controller/teacherController');
const authRoute = require('./../controller/authController');

Router.route('/:teacher').get(authRoute.authoriseUser, teacherController.teacherHome).put(authRoute.authoriseUser, teacherController.updatedTeacher);

Router.route('/:teacher/edit').get(authRoute.authoriseUser, teacherController.viewUpdatePage);

Router.route('/:teacher/students').get(authRoute.authoriseUser, teacherController.showStudents);
Router.route('/:teacher/student/:student').delete(authRoute.authoriseUser, teacherController.deleteStudent);
Router.route('/:teacher/students/insert').get(authRoute.authoriseUser, teacherController.insertStudent).post(authRoute.authoriseUser, teacherController.insertedStudent);
module.exports = Router;