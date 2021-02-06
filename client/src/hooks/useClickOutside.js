import React, { useEffect, useRef, useState} from "react";

const useClickOutside = (handler=Function(), config={}) => {
    const domNode = useRef(null);
    const ignoreNodes = useRef([]);
    
    const {ignoreByAttr, isDisabled} = config;
    
    //find all elements to ignore
    useEffect(() => {
        if (ignoreByAttr) {
            const foundIgnoreNodes = document.querySelectorAll(ignoreByAttr);
            if (foundIgnoreNodes.length !== 0) ignoreNodes.current = foundIgnoreNodes;
        }
    },[config])
    
    useEffect(() => {
        let maybeHandler = e => {

            if (domNode.current && !domNode.current.contains(e.target) ) {
                if (ignoreNodes.current.length !== 0) {
                    for (let i=0; i < ignoreNodes.current.length; i++ ) {
                        if (ignoreNodes.current[i].contains(e.target)) return;
                    } 
                }

                handler();
            }
        };

        if (!isDisabled) document.addEventListener("mousedown", maybeHandler);
        return () => document.removeEventListener("mousedown", maybeHandler);

    }, [domNode.current, isDisabled]);

   return [domNode];
} 


export default useClickOutside;