const user = require('./../models/users');
const subjects = require('./../models/subjects');
const bcrypt = require('bcryptjs');

exports.showAdminPage = (req, res) => {
  res.render('admin/adminHome', { admin: req.params.admin });
};

exports.showAllTeachers = (req, res) => {
  user
    .query()
    .where('isAdmin', false)
    .then(users => {
      res.render('admin/allTeachers', {
        teachers: users,
        admin: req.params.admin
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect('back');
    });
};

exports.showTeacher = (req, res) => {
  user.query().findOne('empId', req.params.teacher).then(teacher => {
    res.render('admin/teacher', { emp: teacher, admin: req.params.admin })
  })
};

exports.viewUpdatePage = (req, res) => {
  user.query().findOne('empId', req.params.teacher).then(teacher => {
    res.render('admin/updateTeacher', { teacher: teacher, admin: req.params.admin })
  })
};
exports.updateTeacher = (req, res) => {
  user.query().update(req.body.teacher)
    .where('empId', req.params.teacher)
    .then(() => {
      res.redirect(`/admin/${req.params.admin}/teachers/${req.params.teacher}`);
    }).catch(err => {
      console.log(err);
    });
};

exports.deleteTeacher = (req, res) => {
  user.query().deleteById(req.params.teacher).then(() => {
    res.redirect(`/admin/${req.params.admin}/teachers`);
  }).catch(err => {
    console.log(err);
  })
}

exports.insertTeacherPage = (req, res) => {
  res.render('admin/insertTeacher', { admin: req.params.admin });
}

exports.teacherInserted = (req, res) => {
  if (req.body.teacher.empId === '' || req.body.teacher.password === '') {
    return res.sendStatus(401);
  } else {

    bcrypt.hash(req.body.teacher.password, 12).then(hashedPassword => {
      req.body.teacher.password = hashedPassword;
      user.query().insert(req.body.teacher).then(() => {
        res.redirect(`/admin/${req.params.admin}/teachers`);
      }).catch(err => {
        console.log(err);
      })
    })


  }

}

exports.showTeacherSubjects = (req, res) => {
  subjects.query().then(subject => {
    user.relatedQuery('subject').for(req.params.teacher).then(subs => {
      res.render('admin/teacherSubjects',
        { subjects: subs, teacher: req.params.teacher, allSubjects: subject, admin: req.params.admin });
    })
  })

}

exports.addSubject = (req, res) => {
  subjects.query().insert(req.body.subject).then(() => {
    res.redirect(`/admin/${req.params.admin}/subjects`);
  })
}

exports.showSubjects = (req, res) => {
  subjects.query().then(subs => {
    res.render('admin/allSubjects', { subjects: subs, admin: req.params.admin });
  })
}

exports.AddSubjectForTeacher = (req, res) => {
  user.relatedQuery('subject').for(req.params.teacher).relate(req.body.sub).then(() => {
    res.redirect(`/admin/${req.params.admin}/teachers/${req.params.teacher}/subjects`);
  });


}
