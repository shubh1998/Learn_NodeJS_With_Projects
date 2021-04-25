//require("./global_constants");
require("./global/global_functions");

const Knex = require("knex");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const promiseRouter = require("express-promise-router");
const knexConfig = require("./db/knexfile");
const v1 = require("./routes/allRoutes");
const cors = require("cors");
const { Model } = require("objection");

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
      origin: (origin, callback) => callback(null, true)
    })
  );

app.use(express.static("public"));

// Register our REST API.

// Error handling. The `ValidationError` instances thrown by objection.js have a `statusCode`
// property that is sent as the status code of the response.
//
// NOTE: This is not a good error handler, this is the simplest one. See the error handing
//       recipe for a better handler: http://vincit.github.io/objection.js/#error-handling
app.use("/api/v1", v1);

// app.use('/', (req, res) => {
//   res.statusCode = 404; //send the appropriate status code
//   res.json({
//     status: false,
//     message: 'Sorry, API does not exist!',
//     data: {},
//     code: 404
//   });
// });

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode || err.status || 500).send(err || {});
    console.error(err);
  } else {
    next();
  }
});

const server = app.listen(3000, () => {
  console.log("Example app listening at port %s", server.address().port);
});
