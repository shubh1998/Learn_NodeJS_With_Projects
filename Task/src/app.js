/****************** Tasks Done ********************************/
// Business user: 
// 1. Business user sign up, login (using Email and Password), logout and without email verification business user can not able to login. 
// 2. Business user Add/update//view/delete hotel information: Hotel field: hotel name, location, postal code, city, state, country 
 
// Customer user: 
// 3. customer user sign up, login (using Email and Password) 
//  a. customer user can not login until business user approve his profile .
// 4. Customer user see the list of hotels.
// 5. Customer user find nearest hotel according to his location. 





//--------DB Conectivity--------------
require('../db/mongoose');

require("../global/global_functions");
require("dotenv").config();

//----------Add Required packages-------------
const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const chalk = require("chalk");
const createError = require("http-errors");
const http = require('http');

const promiseRouter = require("express-promise-router");
const router = promiseRouter();

//--------------------------------------------

const app = express()
  .use(express.json())
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: false,
    })
  )
  .use(morgan("dev"))
  .use(router)
  .use(
    cors({
      credentials: true,
      origin: (origin, callback) => callback(null, true),
    })
  );

// CORS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
 
const port = process.env.PORT || 3000

//---------Assign all routes to a single variable-------------------
const apiRoutes = require("./routes/allRoutes");

// Register our REST API Routes.
app.use('/api/v1', apiRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//-----------------error handler-----------------//
app.use((err, req, res, next) => {
  if (err) {
    // respond with the error
    res.status(err.statusCode || err.status || 500).send(err || {});
    //console.log(chalk.red.bold(err));
    console.error(err);
  } else {
    next();
  }
});

const server = http.Server(app);
// Server Starts Listing
server.listen(port, () => {
    console.log(chalk.blue.bold('Server is up on port ' + port))
})