import React from 'react'
import {
    BarContainer,
    Progress
} from "./style";


function ProgressBar(props) {
    const {current, total} = props;

    return (
        <BarContainer>
            <Progress progress={(current/total) * 100}/>
        </BarContainer>
    )
}

export default ProgressBar
