const cheerio = require("cheerio");
const axios = require("axios").default;

const getVerbData = async (verb) => {
    const html = await axios.get(`https://www.spanishdict.com/conjugate/${verb}`);
    const $ = cheerio.load(html.data);

    const componentData = JSON.parse(
        $("script:contains('window.SD_COMPONENT_DATA')")
        .html()
        .replace("window.SD_COMPONENT_DATA = ", "")
        .replace(/;+/g, "")
    )
      
    return {
        conjugations: componentData.verb.paradigms,
        translation: componentData.resultCardHeaderProps.headwordAndQuickdefsProps.quickdef1.displayText
    }
}

const getPronounciationVideoId = async (verb) => {
    const html = await axios.get(`https://www.spanishdict.com/conjugate/${verb}`); // doesn't matter which path
    const $ = cheerio.load(html.data);

    const componentData = JSON.parse(
        $("script:contains('window.SD_COMPONENT_DATA')")
        .html()
        .replace("window.SD_COMPONENT_DATA = ", "")
        .replace(/;+/g, "")
    )

    return componentData.
            resultCardHeaderProps.
            headwordAndQuickdefsProps.
            headword.
            pronunciations[1].
            id
}

module.exports = {
    getVerbData
}