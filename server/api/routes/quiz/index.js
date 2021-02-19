const express = require("express");
const {ErrorHandler} = require("../../../helpers/error");
const config = require("../../../config");
//routers
const router = express.Router();
const configRouter = require("./config");
//models
const Quiz = require("../../../models/quiz");
const VerbData = require("../../../models/verbData");
//middlewares 
const middlewares = require("../../middlewares");
//services
const quizService = require("../../../services/quiz");

const isOriginal = async (req,res,next) => {
    const foundQuiz = await Quiz.find({title: req.body.title})
    if (foundQuiz.length > 0 )  return res.status(400).json("a quiz with that title already exists!");
    next();
};


router.use("/", configRouter);

router.route("/")

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
                newQuiz.configs.push({})
            }
            await newQuiz.save();
            console.log(newQuiz);
            res.status(200).end();
        }catch(err) {next(err)}
    })

router.route("/:quizId")

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
    



router.route("/:quizId/verbs")

    .post(middlewares.attachCurrentVerb, async (req,res,next) => {
        try { 
            const quizId = req.params.quizId;   
            const verb = req.verb;

            await Quiz.findOneAndUpdate(
                {_id: quizId}, {$push: {verbs: {verb} }}
            )  

            res.status(201).end();
        }catch(err) {next(err)}

    })
    
router.route("/all/verbs/:verbId?")

    .patch(async (req,res,next) => {
        try {
            const {verbId} = req.params;
            const verb = req.body.verb;

            if (!verb) throw new ErrorHandler(400, "please enter a verb!")
            
            await Quiz.updateOne(
                {"verbs._id": verbId}, 
                {"$set": {"verbs.$.verb" : verb}}
            )
            res.status(200).end();
        }catch(err) {next(err)}
    })

    .delete(async (req,res,next) => {
        try{
            const {verbId} = req.params; 
            res.json(await Quiz.updateOne(
                { "verbs._id": verbId}, 
                { "$pull": { "verbs": { "_id": verbId } }}, 
                { safe: true, multi:false })
            )

        }catch(err) {next(err)}
    })



    
module.exports = router; 