const router = require("express").Router();
const Quiz = require("../../../models/quiz");
const {ErrorHandler} = require("../../../helpers/error");
const quizService = require("../../../services/quiz")


// GET api/quizzes/123/configure
router.get("/:quizId/configure", async (req,res,next) => {
   try{
       const quizId = req.params.quizId;
       const config = JSON.parse(req.body.config);
       console.log(typeof config);

       const arr = [];

       const foundQuiz = await Quiz.findById(quizId);

       for (const {verb} of foundQuiz.verbs) {
           arr.push(...await quizService.configureQuizConfig(config, verb))
       }

        res.json(arr);

   }catch(err) {next(err)}

}) 

// GET api/quizzes/all/configs/123/configure
router.get("/all/configs/:id/configure", async (req,res,next) => {
    try {
        const id = req.params.id;
        if (!id) throw new ErrorHandler(500, "no id!");
        res.json(await quizService.configureQuizByConfigId(id));
    }catch(err) {next(err)}
})


router.put("/all/configs/:id", async (req,res,next) => {
    try {
        
        const newConfig = req.body.newConfig
        const id = req.params.id;
        
        console.log("saved")

        return res.json(await Quiz.findOneAndUpdate(
            {"configs._id": id}, 
            {"$set": {"configs.$" : newConfig}},
            {new: true}
        ))

    }catch(err) {next(err)}
})


module.exports = router;


