const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('./../models/users');


exports.login = async (req, res) => {
    if (req.body.emp.empId === '' || req.body.emp.password === '') {
        return res.redirect('back');
    } else {
        const databaseUser = await user.query().findById(req.body.emp.empId);
        if (await bcrypt.compare(req.body.emp.password, databaseUser.password)) {
            const token =
                await jwt.sign({ id: req.body.emp.empId },
                    process.env.JWT_secret,
                    { expiresIn: '1d' });
            console.log(token);
            res.cookie('jwt', token,
                { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
            databaseUser.password = null;
            req.user = databaseUser;
            res.redirect(`/teacher/${req.user.empId}`);
        } else {
            return res.redirect('back');
        }
    }
}

exports.viewLoginEmp = (req, res) => {
    res.render('loginEmp');
}

exports.authoriseUser = async (req, res, next) => {

    if (req.cookies.jwt === '' || req.cookies.jwt === null || !req.cookies.jwt) {
        return res.redirect('/auth/loginEmployee')
    } else if (await user.query().findById(await jwt.verify(req.cookies.jwt, process.env.JWT_secret).id)) {
        return next()
    } else {
        return res.redirect('/auth/loginEmployee');
    }

}

exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 10 * 1000 })
    res.redirect('/auth/loginEmployee');
}

