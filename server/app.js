const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./api");
const mongoose = require("mongoose");
const {handleError, ErrorHandler} = require("./helpers/error");

const app = express();

//middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:3000"}));

//loaders
require("./loaders/mongoose")(); //start mongoose connection

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb");
})

mongoose.connection.on("error", () => {
    console.log("error when connecting to mongodb")
})

//routes
app.use("/api", routes); //change to /api

app.listen(5000 , (res, req) => {
    console.log("listening on port 5000")
})

//catch 404
app.use((req,res,next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
})

//error handlers
app.use((err, req, res, next) => {
    handleError(err, res);
})