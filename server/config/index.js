const dotenv = require("dotenv");

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = { 
    mongoUri: `mongodb+srv://jake-admin:${process.env.MONGO_PASSWORD}@spanishquizzescluster.x8x9h.mongodb.net/spanish-quizzes-db?retryWrites=true&w=majority`,
    numOfQuizConfigs: 5,
    IPV4URL: "192.168.1.79"
}