require("../globals/global_functions");
require("dotenv").config();

//----------Require the dependencies----------------------
const Knex = require("knex");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const promiseRouter = require("express-promise-router");
const knexConfig = require("../db/knexfile");
const cors = require("cors");
const { Model } = require("objection");
var createError = require('http-errors');
const chalk = require("chalk");

//---------Assign all routes to a single variable-------------------
const api_version1_routes = require("./routes/allRoutes");

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

const router = promiseRouter();

const app = express()
    .use(bodyParser.json())
    .use(
        bodyParser.urlencoded({
            extended: false
        })
    )
    .use(morgan("dev"))
    .use(router)
    .use(
        cors({
            credentials: true,
            origin: ((origin, callback) => callback(null, true))
        })
    );

// Optional to use static contents we use express.static method and pass folder
// name or path to use it.
app.use(express.static("public"));


// Register our REST API.
app.use('/api/v1', api_version1_routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

//-----------------error handler-----------------//
app.use((err, req, res, next) => {
    if (err) {
        // respond with the error
        res.status(err.statusCode || err.status || 500).send(err || {});
        console.log(chalk.red.bold(err));
    } else {
        next();
    }
});

//------------Server Listing on port 3000---------//
const server = app.listen(3000, () => {
    console.log(
      chalk.blue.bold('"TODO_APP app listening at port %s"'),
      server.address().port
    );
});