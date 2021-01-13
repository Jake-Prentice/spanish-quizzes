const {ErrorHandler} = require("../helpers/error");
const SpanishVerb = require("../models/spanishVerb");

const attachCurrentVerb = async (req, res, next) => {
    try {
        req.verb = req.body.verb.replace(/\s+/g,"");
        if (!req.verb) throw new ErrorHandler(400, "please enter a verb!");

        const foundVerb = await SpanishVerb.findOne({verb: req.verb});
        if (!foundVerb) throw new ErrorHandler(404, "verb doesn't exist");

        next();
    }catch(err) {next(err)}
}

module.exports = {
    attachCurrentVerb,
}