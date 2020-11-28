import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

const StyledContentLoader = styled(ContentLoader)`
    
`

const ItemSkeleton = props => (
    <StyledContentLoader
        speed={1}
        width={"100%"}
        height={"100%"}
        backgroundColor="#87556f"
        opacity={0.5}
        foregroundColor="rgba(236, 235, 235, 0.5)"
        {...props}
    >
        {Array.from(Array(7)).map((_ , index) => (
            <rect key={index} x={"10%"} y={`${3.8 * index}rem`} rx="3" ry="3" width="80%" height="3.1rem" /> 
        ))}
     

    </StyledContentLoader>
)

export default ItemSkeleton;