import React, {useState, forwardRef} from "react";
import {SelectCardWrapper, SelectCardOption} from "./style";
import useClickOutside from "hooks/useClickOutside";

const SelectCard = forwardRef((props, ref) => {
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

    return (
        <SelectCardWrapper isDisabled={!options} {...rest}> 
            {options 
                ? options.map((option, index) => (
                 
                        <SelectCardOption 
                    
                            ref={selectedOptionIndex === index ? optionRef : null} //only have alerter if selected
                            onContextMenu={e => {
                                e.preventDefault(); 
                                onRightClickOption && onRightClickOption(index)
                            }}
                            key={index}
                            isSelected={selectedOptionIndex === index}
                            className={"ignore-select-options"}
                            onClick={() => {
                                onClickOption(index);
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
})


SelectCard.defaultProps = {
    
}


export default SelectCard;
