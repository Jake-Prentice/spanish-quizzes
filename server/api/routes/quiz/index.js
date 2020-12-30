const express = require("express");
const {ErrorHandler} = require("../../../helpers/error");
const config = require("../../../config");
//routers
const quizRouter = express.Router();
const verbRouter = express.Router({mergeParams: true}); //so you can access params from the parent
const quizConfigRouter = require("./quizConfig");
//models
const Quiz = require("../../../models/quiz");
const SpanishVerb = require("../../../models/spanishVerb");
//middlewares 
const middlewares = require("../../middlewares");
//services
const quizService = require("../../../services/quiz");

const isOriginal = async (req,res,next) => {
    const foundQuiz = await Quiz.find({title: req.body.title})
    if (foundQuiz.length > 0 )  return res.status(400).json("a quiz with that title already exists!");
    next();
};

quizRouter.use("/:quizId/verbs", verbRouter);
quizRouter.use("/:quizId/configs", quizConfigRouter);

quizRouter.route("/")

    .get(async (req,res,next) => {
        try {
            res.json(await Quiz.find({}));
        } catch(err) {next(err)}
    })

    .post(isOriginal, async (req,res,next) => {
        try{
            const title = req.body.title;
            if (!title) throw new ErrorHandler(400, "quiz must have a title!")
            const newQuiz = new Quiz({ // creates a new quiz
                title: req.body.title
            })
            //initialise configs
            for (i=0; i < config.numOfQuizConfigs; i++) {
                newQuiz.configs.push({ 
                    saveNum: i + 1,
                })
            }
            await newQuiz.save();
            console.log(newQuiz);
            res.status(200).end();
        }catch(err) {next(err)}
    })

quizRouter.route("/:quizId")

    .patch(isOriginal, async (req,res,next) => {
        try {
        const title = req.body.title;
        if (!title) throw new ErrorHandler(400, "quiz must have a title!")
        
        await Quiz.updateOne({_id: req.params.quizId}, {title});
        res.status(200).end();
        } catch(err) {next(err)}
    })

    .delete(async (req,res,next) => {
        try {
        res.json(await Quiz.deleteOne({_id: req.params.quizId}))
        } catch(err) {next(err)}
    })
    
//verb router
verbRouter.route("/")

    .get(async (req,res,next) => {
        try {
            if (req.params.quizId === "all") {
                const quizzes = await Quiz.find({});
                res.json(quizzes.map(quiz => quiz.verbs));
            }
        }catch(err) {next(err)}
    })

    .post(middlewares.attachCurrentVerb, async (req,res,next) => {
        try { 
            const quizId = req.params.quizId;   
            const verb = req.verb;

            await quizService.addVerbToQuiz({quizId, verb});

            res.status(201).end();
        }catch(err) {next(err)}

    })
    
verbRouter.route("/:verbId?")

    .patch(async (req,res,next) => {
        try {
            const {quizId, verbId} = req.params;
            const verb = req.body.verb;

            if (!verb) throw new ErrorHandler(400, "please enter a verb!")
            
            await Quiz.updateOne(
                {_id: quizId, "verbs._id": verbId}, 
                {"$set": {"verbs.$.verb" : verb}}
            )
            res.status(200).end();
        }catch(err) {next(err)}
    })

    .delete(async (req,res,next) => {
        try{
            const {quizId, verbId} = req.params; 

            res.json(await Quiz.updateOne(
                { _id: quizId}, 
                { "$pull": { "verbs": { "_id": verbId } }}, 
                { safe: true, multi:false })
            )

        }catch(err) {next(err)}
    })
    
module.exports = quizRouter;