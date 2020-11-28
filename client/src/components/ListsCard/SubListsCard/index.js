import React , {useCallback, useState, useEffect, useRef, forwardRef} from "react";
import {
    SubListsCardWrapper
} from "./style";

import VerbsPage from "./VerbsPage";
import AnalyticsPage from "./AnalyticsPage";
import useClickOutside from "hooks/useClickOutside";

const SubListsCard = (props) => {
    const {infoPage, resetStates, ...rest} = props;
    
    const [subListsCardRef] = useClickOutside(resetStates, {
        ignoreByAttr: ".sub-lists-card-ignore"
    })

    return (
        <SubListsCardWrapper ref={subListsCardRef} {...rest} >
            {infoPage === "list" && <VerbsPage {...rest} />}
            {infoPage === "analytics" && <AnalyticsPage {...rest} />}
        </SubListsCardWrapper>
    )
};

export default SubListsCard;