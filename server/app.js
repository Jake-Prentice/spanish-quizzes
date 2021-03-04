const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./api");
const mongoose = require("mongoose");
const {handleError, ErrorHandler} = require("./helpers/error");
const quizService = require("./services/quiz");
const spanishDict = require("./helpers/spanishDict");
const fs = require("fs");
const {addVerb} = require("./services/verbData");
const {getVerbData} = require("./helpers/spanishDict");
const app = express();
const Quiz = require("./models/quiz");
const config = require("./config");

//middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());

//loaders
require("./loaders/mongoose")(); //start mongoose connection

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb");
})

mongoose.connection.on("error", () => {
    console.log("error when connecting to mongodb")
})

//routes
app.use("/api", routes); 

app.listen(config.port, (res, req) => {
    console.log("listening on port 5000")
})

//catch 404
app.use((req,res,next) => {
    const err = new Error("Not found!");
    err.status = 404;
    next(err);
})

//error handlers
app.use((err, req, res, next) => {
    handleError(err, res);
})


/* 
    api/quiz/lists/:id
    api/quiz/verbs/:id
    
    api/quiz/configs/:id
    api/quiz/configure

*/