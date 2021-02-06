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
const app = express();
const Quiz = require("./models/quiz");
const config = require("./config");

//middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors({origin: ["http://localhost:3000", `http://${config.IPV4URL}:3000`]}));

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

app.get("/do-it", async (req,res) => {
    const config = { 
        filterOptions: {
            moods: [
                {mood: "indicative"},
                {mood: "subjunctive"},
                {mood: "impertative"},
                {mood: "present-continuous"},

            ]
        }
    }

   res.json(await quizService.configureQuizByConfigId("600c5a3770aac84948bae2e2"))
})

app.get("/add", async (req,res) => {
    const newQuiz = new Quiz({
        title: "test-6",
        configs: [
            {
                filterOptions: {
                    moods: [
                        {mood: "indicative", tenses: [
                            {tense: "present", pronouns: [
                                "yo", "nosotros"
                            ]}
                        ]}
                    ]
                }
            }
        ],
        verbs: [
            {verb: "hablar"},
            {verb: "comer"}
        ]
    })

    await newQuiz.save()
    console.log("done")
})

app.listen(5000, config.IPV4URL || "localhost", (res, req) => {
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