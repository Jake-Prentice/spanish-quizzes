import {optionsSchema} from "./optionsSchema";

const states = {
    "mood" : {next: "tenses"},
    "tense" : {next: "pronouns"},
    "pronoun" : {next: null}
}


export const traverseEachObj = (obj, cb) => {
    for (let value in obj) {
        if (typeof obj[value] === "object") {
            //is a plain object not an array.
            if (obj[value] && !Array.isArray(obj[value]) && typeof obj[value] === 'object') { 
                cb && cb(obj[value]);
            }
            traverseEachObj(obj[value], cb);
        }
    }
}

export const convertConfigToOptions = (config) => { 
    const copiedConfig = JSON.parse(JSON.stringify(config))
    const copiedOptions = JSON.parse(JSON.stringify(optionsSchema))
    
    const recurse = (configsRef, optionsRef) => { 
        let currentOption = optionsRef;
        for (let value in configsRef) {
            if (typeof configsRef[value] === "object") {
                recurse(configsRef[value], currentOption); 
            }
            else {
                if (!states.hasOwnProperty(value)) continue;

                currentOption = currentOption.find(option => option.value === configsRef[value]);
                if (!currentOption) throw new Error(`${configsRef[value]} doesn't exist!`)

                if (!configsRef[states[value].next]) {
                    currentOption.isHighlighted = true;
                    //if its not at bottom of config tree
                    if (states[value].next) traverseEachObj(
                        currentOption.children,
                        option => {
                            option.isHighlighted = true
                        }
                    ) 
                }

                if (currentOption.children) currentOption = currentOption.children;
            }
        } 
    }

    recurse(copiedConfig, copiedOptions);

    return {
        config: copiedConfig, 
        options: copiedOptions
    }
}


export const addParadigmToConfig = (selected, highlighted) => {
    
    const {config, moodIndex, tenseIndex, options} = selected;
    
    let path = [moodIndex, tenseIndex].filter(selectedIndex => selectedIndex !== null);
    path.length = Object.keys(states).findIndex(state => state === highlighted.paradigm);

    const intendedLevel = path.length;

    const recurse = (configsRef, optionsRef, currentLevel=0) => {

        const paradigm = Object.keys(states)[currentLevel]
        const nextParadigms = states[paradigm].next;
        
        if (intendedLevel !== currentLevel) {

            const currentOption = optionsRef[path[currentLevel]];
            
            let currentConfigIndex = configsRef.findIndex(config => config[paradigm] === currentOption.value)
            
            if (currentOption.isHighlighted) currentOption.isHighlighted = false;
            
            currentConfigIndex = currentConfigIndex !== -1 
                ? currentConfigIndex 
                : configsRef.push({ [paradigm]: currentOption.value, [nextParadigms]: [] }) - 1  //pushing returns length of array

            //create path to recurse down
            if (!configsRef[currentConfigIndex]?.[nextParadigms]) {
                configsRef[currentConfigIndex][nextParadigms] = [];
            }

            recurse(
                configsRef[currentConfigIndex][nextParadigms], 
                currentOption.children,
                ++currentLevel
            )
            
        }else {

            const highlightedOption = optionsRef[highlighted.index];
            const foundParadigmIndex = configsRef.findIndex(config => config[paradigm] === highlightedOption.value)
   
            const updated = {
                [paradigm]: highlightedOption.value
            }

            highlightedOption.isHighlighted = !highlightedOption.isHighlighted;
            
            if (highlightedOption.children) {
                traverseEachObj(highlightedOption.children, option => 
                    option.isHighlighted = highlightedOption.isHighlighted
                )
            }

            if (foundParadigmIndex !== -1) {
                if (configsRef[foundParadigmIndex][nextParadigms]) configsRef[foundParadigmIndex] = updated;
                else configsRef.splice(foundParadigmIndex, 1);
            }else {
                console.log(optionsRef.length, configsRef.length);
                configsRef.push(updated)
            }
            
        }

    }

    recurse(config.filterOptions.moods, options);
    // console.log(JSON.stringify(config))
}


/* 


*/