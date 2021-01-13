const cheerio = require("cheerio");
const mongoose = require("mongoose");
const axios = require("axios").default;
const fs = require("fs");


const mongooseLoader = async() => {
    mongoose.connect("mongodb://localhost:27017/spanish-verbs-db",{ 
        useUnifiedTopology: true,
        useNewUrlParser: true, 
        useFindAndModify: false 
    })
}


(async ( ) => {
    
    await mongooseLoader();
    mongoose.connection.on("connected", () => {
        console.log("connected");
    })

    const Verb = mongoose.model("SpanishVerb", {});
    let verbs = await Verb.find({});
    const arr = [];
    verbs.forEach(verb => {
        
        if (!arr.includes(verb.toObject().verb.replace(/s+/g, "").toLowerCase())) {
            arr.push(verb.toObject().verb);
        }else {
            console.log("verb already exists");
        }
      
    })

   fs.writeFile("./verbs", JSON.stringify(arr), err => {
       if (err) console.log(err)
       else console.log("completed");
   })


})()


