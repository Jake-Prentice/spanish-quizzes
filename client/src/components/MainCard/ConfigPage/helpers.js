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

    const intendedLevel = path.push(highlighted.index) - 1;
    
    const recurse = (configsRef, optionsRef, currentLevel=0) => {

        const paradigm = Object.keys(states)[currentLevel]
        const nextParadigms = states[paradigm].next;
  
        const currentOption = optionsRef[path[currentLevel]];

        let configIndex = configsRef.findIndex(config => config[paradigm] === currentOption.value)

        const updatedConfig = {
            [paradigm]: currentOption.value
        }

        if (intendedLevel !== currentLevel) { 
        
            configIndex = configIndex === -1 
                ? configsRef.push({...updatedConfig, [nextParadigms]: [] }) - 1
                : configIndex
    
            if (!configsRef[configIndex][nextParadigms]) {
                currentOption.isHighlighted = false;
                const nextParadigm = Object.keys(states)[currentLevel + 1];

                configsRef[configIndex][nextParadigms] = currentOption.children.map(option => ( 
                    {[nextParadigm]: option.value}
                ))
            }

            recurse(
                configsRef[configIndex][nextParadigms], 
                currentOption.children,
                ++currentLevel
            )
            
        }else {

            currentOption.isHighlighted = !currentOption.isHighlighted;
            
            if (currentOption.children) {
                traverseEachObj(currentOption.children, option => 
                    option.isHighlighted = currentOption.isHighlighted
                )
            }

            if (configIndex !== -1) {
                if (configsRef[configIndex][nextParadigms]) configsRef[configIndex] = updatedConfig;
                else configsRef.splice(configIndex, 1);
            }else {
                configIndex = configsRef.push(updatedConfig) - 1
            }
            
        }

        if (!!configsRef?.[configIndex]?.[nextParadigms]) { 

            const nextConfigs = configsRef[configIndex]?.[nextParadigms];
            const nextOptions = currentOption?.children;

            if (nextConfigs?.length === 0) {
                configsRef.splice(configIndex, 1);
            }
            else if (nextConfigs.length === nextOptions.length) {
                //embrace the bug
                //check to see if each config actually has a next level
                const actualLength = nextConfigs.reduce((accumulator, currentValue) => { 
                    if (!currentValue[states[Object.keys(states)[currentLevel]].next]) {
                        return accumulator + 1;
                    }
                 }, 0)

                if (actualLength === nextOptions.length) {
                    configsRef[configIndex] = updatedConfig
                    currentOption.isHighlighted = true;
                 }

            }
        }


    }

    recurse(config.filterOptions.moods, options);

}


/* 


*/