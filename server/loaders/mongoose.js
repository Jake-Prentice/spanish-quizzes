const mongoose = require("mongoose");

const mongooseLoader = async() => {
    mongoose.connect("mongodb://localhost:27017/spanish-quizzes-db",{ 
        useUnifiedTopology: true,
        useNewUrlParser: true, 
        useFindAndModify: false 
    }).catch(err => console.log(err));
}

module.exports = mongooseLoader;