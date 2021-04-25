require("../global/global_function")
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const http = require("http");
const createError = require("http-errors");

const promiseRouter = require("express-promise-router");
const router = promiseRouter();

const app = express().use(express.json())
            .use(bodyParser.json())
            .use(
                bodyParser.urlencoded({
                    extended: false
                })
            )
            .use(morgan("dev"))
            .use(router)

const port = 3000;

const api_routes = require("./routes/allRoutes")

app.use("/api/v1", api_routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


app.use((err, req, res, next) => {
    if(err){
        res.status(err.statusCode || 500).send(err || {});
        console.log(err)
    }else{
        next();
    }
})


const server = http.Server(app);

server.listen(port, ()=> {
    console.log(`Server runs on port ${port}`)
})
