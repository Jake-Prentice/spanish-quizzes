const quizConfigRouter = require("express").Router();
const Quiz = require("../../models/quiz");
const {ErrorHandler} = require("../../helpers/error");
const quizService = require("../../services/quiz");

quizConfigRouter.put("/:id", async (req,res,next) => {
    try {
        
        const newQuizConfig = JSON.parse(req.body.quizConfig.replace(/\s+/g, ""));
        const id = req.params.id;
        const shouldConfigureOnRes = req.query.configure_on_res;

        const document = await Quiz.findOneAndUpdate(
            {"configs._id": req.params.id}, 
            {"$set": {"configs.$" : newQuizConfig}},
            {new: true}
        ) 

        if (shouldConfigureOnRes) {
            res.json(await quizService.configureQuizByConfigId(id));
        }
        else return res.status(200).end();

    }catch(err) {next(err)}
})


quizConfigRouter.get("/:id?", (req,res,next) => {
    console.log("here maty")
})

module.exports = quizConfigRouter;