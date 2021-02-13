import styled, {css} from "styled-components";

export const Margin = styled.div`${props => css`
    margin: ${props.auto ? "auto" : null};
    margin: ${props.all ? props.all : null};
    margin-top: ${props.top ? props.top : null};
    margin-bottom: ${props.bottom ? props.bottom : null};
    margin-right: ${props.right ? props.right: null};
    margin-left: ${props.left ? props.left : null};
`}`

