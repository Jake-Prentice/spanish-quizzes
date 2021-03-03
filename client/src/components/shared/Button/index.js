import React from "react";
import {
    StyledButton,
    BaseButton
} from "./style";
import {Link} from "react-router-dom";

export const handleLinkWrapping = (Component, props) => {
    const {children, to, disabled, isLoading, ...rest} = props 
    
    const button = (
        <Component disabled={disabled || isLoading} {...rest}>
            {children}
        </Component>
    )

    if (to) return <Link to={to} >{button}</Link>

    return button;

}

const Button = props => handleLinkWrapping(StyledButton, props);
export const BaseButtonLinkWrapped = props => handleLinkWrapping(BaseButton, props);

Button.defaultProps = {
    size: "medium",
    variant: "primary"
}

export default Button;