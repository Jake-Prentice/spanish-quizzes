const router = require("express").Router();
const quizRouter = require("./routes/quiz");
const quizConfigRouter = require("./routes/quizConfig");
const verbDataRouter = require("./routes/verbData");

router.use("/quizzes", quizRouter);
router.use("/quiz-configs", quizConfigRouter)
router.use("/verb-data", verbDataRouter);

module.exports = router;