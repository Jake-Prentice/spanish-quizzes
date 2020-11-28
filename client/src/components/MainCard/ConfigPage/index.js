import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";

const ConfigPage = (props) => {
    const {currentListId} = props;
    
    if (!currentListId) return <Redirect to={"/"} />;
    
    return (
        <div>Config Page</div>
    )
}

export default ConfigPage