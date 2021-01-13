const {ErrorHandler} = require("../../helpers/error");
const express = require("express");
const verbInfoRouter  = express.Router();
const SpanishVerb = require("../../models/spanishVerb");
const verbInfoService = require("../../services/verbInfo");

verbInfoRouter.post("/", async (req,res) => {
    const verb = req.body.verb.replace(/\s+/g, "").toLowerCase();
    await verbInfoService.addVerb(verb);
})

verbInfoRouter.route("/:verb")

    .get((req,res) => {
        console.log("here here")
    })

module.exports = verbInfoRouter;

