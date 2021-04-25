const teacher = require('./../models/users');
const student = require('./../models/students');

exports.teacherHome = (req, res) => {
    teacher.query().findById(req.params.teacher).then(teacher => {
        res.render('teacher/teacherHome', { emp: teacher });
    }).catch(err => {
        console.log(err);
    })
}

exports.viewUpdatePage = (req, res) => {
    teacher.query().findById(req.params.teacher).then(teacher => {
        res.render('teacher/updateTeacher', { teacher: teacher });
    }).catch(err => {
        console.log(err);
    })
}

exports.updatedTeacher = (req, res) => {
    teacher.query().update(req.body.teacher)
        .where('empId', req.params.teacher)
        .then(() => {
            res.redirect(`/teacher/${req.params.teacher}`);
        }).catch(err => {
            console.log(err);
        });
}

exports.showStudents = (req, res) => {
    student
        .query()
        .then(users => {
            res.render('teacher/showStudents', {
                students: users,
                teacher: req.params.teacher
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('back');
        });
}

exports.deleteStudent = (req, res) => {
    student.query().deleteById(req.params.student).then(() => {
        res.redirect(`/teacher/${req.params.teacher}/students`);
    }).catch(err => {
        console.log(err);
    })
}

exports.insertStudent = (req, res) => {
    res.render('teacher/insertStudentPage', { teacher: req.params.teacher });
}

exports.insertedStudent = (req, res) => {
    student.query().insert(req.body.student).then(() => {
        res.redirect(`/teacher/${req.params.teacher}/students`);
    }).catch(err => {
        console.log(err);
    })
};