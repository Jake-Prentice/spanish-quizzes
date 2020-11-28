const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios").default;
const mongoose = require("mongoose");

const verb = "conllevar";
const mood = "indicative";
const paradigm = "present";

(async ( ) => {
    const html = await axios.get(`https://www.spanishdict.com/conjugate/${verb}`);
    const $ = cheerio.load(html.data);
    const verbInfo = JSON.parse(
        $("script")[35]
            .children[0]
            .data
            .replace("window.SD_COMPONENT_DATA = ", "")
            .replace(/;+/g, "")
    )
   
    const verbConjugations = verbInfo.verb.paradigms;

    console.log(verbConjugations)
})()


