const router = require("express").Router();
const quizRouter = require("./routes/quiz");
const quizConfigRouter = require("./routes/quizConfig");

router.use("/quizzes", quizRouter);
router.use("/quiz-configs", quizConfigRouter);

module.exports = router;