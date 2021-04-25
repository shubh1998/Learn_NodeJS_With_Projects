require('dotenv').config();

const express = require('express');
const app = express();
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const authRouter = require('./router/authRoutes');
const authController = require('./controller/authController');
const adminRouter = require('./router/adminRoutes');
const teacherRouter = require('./router/teacherRoutes');

app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

loginPageStudent = (req, res) => {
  res.render('loginStu');
};


app.use('/auth', authRouter);
app.delete('/logout', authController.logout)
app.use('/admin/', adminRouter);
app.use('/teacher/', teacherRouter);

app.listen(process.env.PORT, () => {
  console.log('server is running at port ' + process.env.PORT);
});
