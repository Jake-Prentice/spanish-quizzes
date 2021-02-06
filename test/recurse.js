const util = require("util");
const options = require("./options");

const config = { 
    filterOptions: {
        moods: [
            {mood: "indicative"},
            {mood: "subjunctive", tenses: [
                {tense: "present", pronouns: [{pronoun: "yo"}, {pronoun: "tú"}]},
            ]},
            {mood: "imperative", tenses: [
                {tense: "affirmative", pronouns: [{pronoun: "tú"}]},
            ]}
         
        ]
    }
}




const convertConfigToOptions = (config, options) => { 
    
    const states = {
        "mood" : {next: "tenses"},
        "tense" : {next: "pronouns"},
        "pronoun" : {next: null}
    }

    const highlightAll = currentOption => {
        for (let value in currentOption) {
            if (typeof currentOption[value] === "object") {
                if (currentOption[value].value !== undefined) {
                    currentOption[value].isHighlighted = true;
                }
                highlightAll(currentOption[value])
            }
        }
    }
    
    const recurse = (configsRef, optionsRef) => { 
        let currentOption = optionsRef;
        for (let value in configsRef) {
            if (typeof configsRef[value] === "object") {
                recurse(configsRef[value], currentOption); 
            }
            else {
                currentOption = currentOption.find(option => option.value === configsRef[value]);
                if (!currentOption) throw new Error(`${configsRef[value]} doesn't exist!`)

                if (states.hasOwnProperty(value) && !configsRef[states[value].next]) {
                    currentOption.isHighlighted = true;
                    if (states[value].next) highlightAll(currentOption.children); //if its not at bottom of config tree
                }

                if (currentOption.children) currentOption = currentOption.children;
            }
        } 
    }

    recurse(config, options);
}


convertConfigToOptions(config, options);

console.log(util.inspect(options, false, null, true))


/* 

    const states = ["mood", "tense", "pronoun"];
    const states = {
        "mood": {
            next: "tenses" 
        },
        "tense": {
            next: "pronouns"
        },
        "pronoun": {
            next: null
        }
    }

    if (states.includes(value) {
        currentOption.isHighlighted = true;
    }
    
    ----------------------------------
    if (states.hasOwnProperty(value) && !configsRef[states[value].next]) {
        currentOption.isHighlighted = true;
        if (states[value].next) highlightAll(currentOption.children);
    }

     if (currentOption.children) currentOption = currentOption.children;
    ----------------------------------------------------


        if (value === "mood" && !configsRef.tenses || value === "tense" && !configsRef.pronouns) {
                    currentOption.isHighlighted = true;
                    highlightAll(currentOption.children)

        }else if (value == "pronoun") {
            currentOption.isHighlighted = true;
        }


*/