const mongoose = require("mongoose");
const config = require("../config");
const {ErrorHandler} = require("../helpers/error");

const mongooseLoader = async() => {
    mongoose.connect(config.mongoUri,{ 
        useUnifiedTopology: true,
        useNewUrlParser: true, 
        useFindAndModify: false 
    }).catch(err => {throw new ErrorHandler(500, err.message)});
}

module.exports = mongooseLoader;