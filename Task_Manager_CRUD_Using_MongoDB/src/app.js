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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Register our REST API Routes.
app.use('/api/v1', apiRoutes)

// Server Starts Listing
app.listen(port, () => {
    console.log(chalk.blue.bold('Server is up on port ' + port))
})