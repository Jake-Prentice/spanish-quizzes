const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  const envFound = dotenv.config();
  if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }
}

module.exports = { 
    mongoUri: `mongodb+srv://jake-admin:${process.env.MONGO_PASSWORD}@spanishquizzescluster.x8x9h.mongodb.net/spanish-quizzes-db?retryWrites=true&w=majority`,
    numOfQuizConfigs: 5,
    IPV4URL: "192.168.1.79",
    port: process.env.PORT || 5000
}