import React , {useState, useEffect, useRef, useMemo} from "react";
//styles
import {
    ListContainer,
    ListItem,
    StyledInput,
    CheckCircleBtn,
    IconContainer,
} from "../style";
import {SubListsCardFooter, AddVerbBtnContainer} from "./style";
import {useQuery, queryCache} from "react-query";
//hooks
import {useQuizzesQuery} from "hooks/useQuizzesQuery";
import useClickOutside from "hooks/useClickOutside";
import useFocusInput from "hooks/useFocusInput";
import useQuizMutation from "hooks/mutations/useQuizMutation"
//apis
import {fetchVerbsFromQuizzes} from "api/quiz";
//components
import * as faSolid from "@styled-icons/fa-solid";
import * as faRegular from "@styled-icons/fa-regular";


const isAVerb = (word) => {
    return ["ar", "er", "ir"].includes(word.slice(-2).toLowerCase())
}

const VerbsPage = ({selectedQuiz, quizId}) => {

    const [newVerb, setNewVerb] = useState([]);
    const [selectedVerbIndex, setSelectedVerbIndex] = useState(null);
    const [editVerb, setEditVerb] = useState(false);
    const [verbValue, setVerbValue] = useState("");
    
    const listEndRef = useRef(null);
    const inputRef = useFocusInput();

    const resetStates = () => {
        setSelectedVerbIndex(null);
        setEditVerb(false); 
        setNewVerb([])
        setVerbValue("");
    }

    //set data
    const {data, isLoading} = useQuizzesQuery();
    const verbs = useMemo(() => data[selectedQuiz.index].verbs, [data, selectedQuiz.index]);

    //outside click handlers
    const [listItemRef] = useClickOutside(resetStates)
   
    const [newListItemRef] = useClickOutside(resetStates, {
        ignoreByAttr: ".list-item-ignore"
    })
    
    const {addVerbToQuiz, updateVerbFromQuiz, deleteVerbFromQuiz} = useQuizMutation({
        onMutating: resetStates,
        onError: err => console.log(err)
    })

    const handleNewVerb = () => {
        if (newVerb.length !== 0) return
        setNewVerb([{_id: "tid", verb: ""}])
        setEditVerb(true);
        setSelectedVerbIndex(verbs.length)
    }

    const handleVerbChange = (verbId, e) => {
        e.preventDefault();
        if (!isAVerb(verbValue)) return resetStates(); //check see if better way pls! not the function itself

        const strippedVerb = verbValue.toLowerCase().replace(/\s+/g, "");
        verbId === "tid"  
            ? addVerbToQuiz({
                quizId: selectedQuiz.id, 
                verbId,
                verb: strippedVerb,
            }) 
            : updateVerbFromQuiz({
                quizId: selectedQuiz.id, 
                verbId,
                newVerb: strippedVerb
            })
    }

    useEffect(() => {
        if (!isLoading) {
            if (newVerb.length > 0) {
                listEndRef.current.scrollIntoView({behavior: "smooth"})
            }
        }
    }, [newVerb])

    return (
        <>
        <ListContainer>
            {verbs && !isLoading && [...verbs, ...newVerb].map((verbObj, index) => (
 
                <ListItem
                    key={verbObj._id}
                    ref={selectedVerbIndex === index 
                        ? verbObj._id === "tid" ? newListItemRef : listItemRef 
                        : null
                    }
                    selected={selectedVerbIndex === index}
                    onClick={() => setSelectedVerbIndex(index)}>

                    <form onSubmit={e => handleVerbChange(verbObj._id, e)}>
                        {editVerb && index === selectedVerbIndex 
                            ? <StyledInput ref={inputRef} onChange={e => setVerbValue(e.target.value)} value={verbValue} /> 
                            : verbObj.verb
                        }
                        { editVerb && index === selectedVerbIndex && 
                        <CheckCircleBtn>
                            <faRegular.CheckCircle size={"1rem"} title={"change verb"} />
                        </CheckCircleBtn>
                        }
                    </form>
                    <IconContainer>
                        <faRegular.Edit size={"1.2rem"} title={"Edit verb"} onClick={() => setEditVerb(prev => !prev)} /> 
                    </IconContainer>
                    {selectedVerbIndex === index && !editVerb &&
                        <faSolid.TrashAlt
                            size={"1rem"} 
                            onClick={() => deleteVerbFromQuiz({quizId: selectedQuiz.id, verbId: verbObj._id})}
                            style={{position: "absolute", right: "-1.25rem", color: "#40a8c4"}} 
                        /> 
                    }
                </ListItem>
            ))}
            <div ref={listEndRef} />
        </ListContainer>
        <SubListsCardFooter>
            <AddVerbBtnContainer className={"list-item-ignore"} onClick={handleNewVerb}>
                <faSolid.LayerGroup size={"1.3rem"} color={"#ee6f57"} />
            </AddVerbBtnContainer>
        </SubListsCardFooter>
        </>
        
    )
}


export default VerbsPage;