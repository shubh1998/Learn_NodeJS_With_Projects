const express = require('express');
const adminController = require('./../controller/adminController');
const Router = express.Router();

Router.route('/:admin').get(adminController.showAdminPage);

Router.route('/:admin/teachers').get(adminController.showAllTeachers);
Router.route('/:admin/teachers/insert').get(adminController.insertTeacherPage).post(adminController.teacherInserted);
Router.route('/:admin/teachers/:teacher').get(adminController.showTeacher)
  .put(adminController.updateTeacher)
Router.route('/:admin/teachers/:teacher/delete').delete(adminController.deleteTeacher);
Router.route('/:admin/teachers/new').post();
Router.route('/:admin/teachers/:teacher/edit').get(adminController.viewUpdatePage);
Router.route('/:admin/teachers/:teacher/subjects').get(adminController.showTeacherSubjects)
  .post(adminController.AddSubjectForTeacher);
Router.route('/:admin/subjects').get(adminController.showSubjects).post(adminController.addSubject);

module.exports = Router;
