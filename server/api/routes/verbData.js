const {ErrorHandler} = require("../../helpers/error");
const express = require("express");
const verbInfoRouter  = express.Router();
const VerbData = require("../../models/verbData");
const verbDataService = require("../../services/verbData");

verbInfoRouter.post("/", async (req,res,next) => {
    try {
        const verb = req.body.verb.replace(/\s+/g, "").toLowerCase();
        await verbDataService.addVerb(verb);
    }catch(err) {next(err)}
})

verbInfoRouter.route("/:verb")

    .get((req,res) => {
        console.log("here here")
    })

module.exports = verbInfoRouter;

