import React, {useState, forwardRef} from "react";
import {SelectCardWrapper, SelectCardOption} from "./style";
import useClickOutside from "hooks/useClickOutside";
import useSimpleAndDoubleClick from "hooks/useSimpleAndDoubleClick";
import {isMobile} from "react-device-detect";

const SelectCard = (props) => {
    const {
        options, 
        onRightClickOption,
        onClickOffOption,  
        onClickOption, 
        defaultNumOfOptions,
        selectedOptionIndex, 
        selectedTenseIndex,
        isDisabled, 
        className,
        ...rest
    } = props;


    
    const [optionRef] = useClickOutside(() => {
        onClickOffOption && onClickOffOption();
    }, {
        ignoreByAttr: ".ignore-select-options",
        isDisabled: typeof onClickOffOption === "boolean" && onClickOffOption === false
    }) 


    const onClick = useSimpleAndDoubleClick({
        onClick: () => console.log("clicked"),
        onDoubleClick: () => console.log
    })

    return (
        <SelectCardWrapper isDisabled={!options} {...rest}> 
            {options 
                ? options.map((option, index) => (
                 
                        <SelectCardOption 
                            isHighlighted={option?.isHighlighted === true}
                            ref={selectedOptionIndex === index ? optionRef : null} //only have alerter if selected
                            onContextMenu={e => {
                                e.preventDefault(); 
                                onRightClickOption && onRightClickOption(index)
                            }}
                            key={index}
                            isSelected={selectedOptionIndex === index}
                            className={"ignore-select-options"}
                            onClick={() => {
                                onClickOption && onClickOption(index);
                            }}
                        >
                            {option.content}
                        </SelectCardOption>
      
                ))
                : defaultNumOfOptions && Array.from(Array(defaultNumOfOptions)).map(() =>
                    <SelectCardOption />
                )
            }
        </SelectCardWrapper>
    )
}


export default SelectCard;
