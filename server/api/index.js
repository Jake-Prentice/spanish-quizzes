const router = require("express").Router();
const quizRouter = require("./routes/quiz");

router.use("/quizzes", quizRouter);

module.exports = router;