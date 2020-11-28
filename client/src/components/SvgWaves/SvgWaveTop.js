import React from "react";
import styled from "styled-components";

const StyledSvg = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg"
})`
    z-index: -1000;
    width: max(33vw,540px);
    height: auto;
    position: absolute;
    top: 0;
    right: 0;
`; 


const SvgWaveTop = () => {
    return (
        <StyledSvg viewBox="0 0 782 312.27">
            <path transform="translate(2, -5)" style={{fill: "#9583d8"}} d={"M-.78-1A4.28,4.28,0,0,0-1,.86c.61,6.07,18.71,9.3,23.62,11q14.9,5.11,30,9.71,30.11,9.21,60.75,16.38a939.13,939.13,0,0,0,123.92,20.4q21.25,2.06,42.59,3.12c55.21,2.78,110.82.67,165.52,8.94s109.74,28.12,149.15,68.27c38.91,39.64,59.85,96,101.85,132.12A153.1,153.1,0,0,0,781,307q-.5-154-1-308"}/>
        </StyledSvg>
    )
}

export default SvgWaveTop;