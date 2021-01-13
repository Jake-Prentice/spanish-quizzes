const router = require("express").Router();
const quizRouter = require("./routes/quiz");
const verbInfoRouter = require("./routes/verbInformation");

router.use("/quizzes", quizRouter);
router.use("/verb-information", verbInfoRouter);

module.exports = router;