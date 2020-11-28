import React , {useState, useEffect, useRef} from "react";
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
import useQuizzesQuery from "hooks/useQuizzesQuery";
import useClickOutside from "hooks/useClickOutside";
import useFocusInput from "hooks/useFocusInput";
import useQuizMutation from "hooks/mutations/useQuizMutation";
//apis
import {fetchVerbsFromQuizzes} from "api/quiz";
//components
import * as faSolid from "@styled-icons/fa-solid";
import * as faRegular from "@styled-icons/fa-regular";

const VerbsPage = ({selectedQuizIndex, setError}) => {

    const [verbs, setVerbs] = useState([]);
    const [selectedVerbIndex, setSelectedVerbIndex] = useState(null);
    const [editVerb, setEditVerb] = useState(false);
    const [verbValue, setVerbValue] = useState("");
    
    const listEndRef = useRef(null);
    const inputRef = useFocusInput();

    const resetStates = () => {
        setSelectedVerbIndex(null);
        setEditVerb(false); 
        setVerbValue("");
    }

    //set data
    const {quizzes, isLoading} = useQuizzesQuery();

    useEffect(() => {
        if (!isLoading) setVerbs(quizzes[selectedQuizIndex].verbs);
    },[quizzes, selectedQuizIndex])

    //outside click handlers
    const [listItemRef] = useClickOutside(resetStates)
   
    const [newListItemRef] = useClickOutside(() => {
        setVerbs(prev => {
            prev.pop()
            return [...prev]
        })
        resetStates();
    }, {
        ignoreByAttr: ".list-item-ignore"
    })
    
    const {addVerbToQuiz, updateVerbFromQuiz, deleteVerbFromQuiz} = useQuizMutation({
        onMutating: resetStates,
        onError: err => console.log(err)
    })

    const handleNewVerb = () => {
        if (verbs[verbs.length - 1]?._id === "tid") return;
        setVerbs(prev => [...prev, {_id: "tid", title: ""}])
        setEditVerb(true);
        setSelectedVerbIndex(verbs.length)
    }

    const handleVerbChange = (verbId, e) => {
        e.preventDefault();
        verbId === "tid"  
            ? addVerbToQuiz({
                quizId: quizzes[selectedQuizIndex]._id, 
                verbId,
                verb: verbValue,
            }) 
            : updateVerbFromQuiz({
                quizId: quizzes[selectedQuizIndex]._id, 
                verbId,
                newVerb: verbValue
            })
    }

    useEffect(() => {
        if (!isLoading) {
            if (verbs[verbs.length - 1]?._id === "tid") {
                listEndRef.current.scrollIntoView({behavior: "smooth"})
            }
        }
    }, [verbs])

    return (
        <>
        <ListContainer>
            {verbs && verbs.map((verbObj, index) => (
 
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
                            onClick={() => deleteVerbFromQuiz({quizId: quizzes[selectedQuizIndex]._id, verbId: verbObj._id})}
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