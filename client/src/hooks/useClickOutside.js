import React, { useEffect, useRef, useState} from "react";

const useClickOutside = (handler=Function(), config={}) => {
    const domNode = useRef(null);
    const ignoreNodes = useRef([]);

    //find all elements to ignore
    useEffect(() => {
        if (config.ignoreByAttr) {
            const foundIgnoreNodes = document.querySelectorAll(config.ignoreByAttr);
            if (foundIgnoreNodes.length !== 0) ignoreNodes.current = foundIgnoreNodes;
        }
    },[config])

    useEffect(() => {

        let maybeHandler = e => {
            if (domNode.current && !domNode.current.contains(e.target) ) {
                if (ignoreNodes.current.length !== 0) {
                    for (let i=0; i < ignoreNodes.current.length; i++ ) {
                        if (ignoreNodes.current[i].contains(e.target)) return;
                    } handler();
                }else handler();
            } 
        };

        document.addEventListener("mousedown", maybeHandler);
        return () => document.removeEventListener("mousedown", maybeHandler);
    }, [domNode.current]);

   return [domNode];
} 


export default useClickOutside;