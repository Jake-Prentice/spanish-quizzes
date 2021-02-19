const router = require("express").Router();

const quizRouter = require("./routes/quiz");
const verbDataRouter = require("./routes/verbData");

router.use("/quizzes", quizRouter);
router.use("/verb-data", verbDataRouter);

module.exports = router;