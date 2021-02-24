import React ,{ useState, useEffect, useRef} from "react";
//styles
import {
    CardWrapper,
    ListContainer,
    ListItem,
    StyledInput,
    CheckCircleBtn,
    IconContainer,
    CardFooter,
    ErrorContainer,
} from "./style";
import gsap from "gsap";
//hooks
import {useQuizzesQuery} from "hooks/useQuizzesQuery";
import useClickOutside from "hooks/useClickOutside";
import useFocusInput from "hooks/useFocusInput";
import useQuizMutation from "hooks/mutations/useQuizMutation";
import useStateWithSessionStorage from "hooks/useStateWithSessionStorage";
import {useHistory, useRouteMatch, generatePath} from "react-router-dom";
//apis
import {fetchQuizzes} from "api/quiz";
//components
import Button from "components/shared/Button";
import SubListsCard from "./SubListsCard";
import * as faSolid from "@styled-icons/fa-solid";
import * as faRegular from "@styled-icons/fa-regular";
import {Transition, TransitionGroup} from "react-transition-group";
import ItemSkeleton from "./ItemSkeleton"
//
import {QUIZ_CONFIG_STATES_SESSION_KEY} from "hooks/useQuizConfigReducer";

const ListsCard = (props) => {

    const {routes} = props;

    const history = useHistory();
    const urlMatch = useRouteMatch(routes.config);
 
    const {setIsOpen, isMounted} = props;
    
    const [newQuiz, setNewQuiz] = useState([]);
    const [quizTitleValue, setQuizTitleValue] = useState("");
    const [editQuizTitle, setEditQuizTitle] = useState(false);
    const [infoPage, setInfoPage] = useState("")
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const listEndRef = useRef(null);
    const inputRef = useFocusInput();

    const resetStates = () => {
        setInfoPage(""); 
        setEditQuizTitle(false);
        setSelectedQuiz({});
        setQuizTitleValue("");
        setNewQuiz([]);
    }

    //loading data
    const {data: quizzes, error, isLoading} = useQuizzesQuery()

    //outside click handlers
    const [listItemRef] = useClickOutside(resetStates, {
        ignoreByAttr: ".list-item-ignore",
        isDisabled: true
    });

    //mutation handler
    const {createQuiz, updateQuiz, deleteQuiz} = useQuizMutation({
        onMutating: resetStates
    })

    //events
    const handleLoadList = () => {
        setIsOpen(false);
        const path = generatePath(routes.config, {id: selectedQuiz.id})
   
        if (!urlMatch?.isExact || urlMatch?.params.id !== selectedQuiz.id) { 
            console.log("here")
            sessionStorage.removeItem(QUIZ_CONFIG_STATES_SESSION_KEY);
            history.push(path);
        }
        
    }

    const handleNewList = e => {
        if (newQuiz.length !== 0) return
        setNewQuiz([{_id: "tid", title: ""}])
        setEditQuizTitle(true);
        setSelectedQuiz({
            index: quizzes.length,
            id: "tid"
        })
    }

    const handleTitleChange = (quizId, e) => {
        e.preventDefault();
        quizId === "tid" 
            ? createQuiz({
                title: quizTitleValue,
                quizId
            }) 
            : updateQuiz({
                quizId, 
                newTitle: quizTitleValue
            })
    }

    //scrolling
    useEffect(() => {
        if (!isLoading) {
            if (newQuiz.length !== 0) {
                listEndRef.current.scrollIntoView({behavior: "smooth"})
            }
        }
    }, [newQuiz])


    return (
        <CardWrapper {...props}>
            <Transition
                in={infoPage !== ""}
                timeout={400}
                unmountOnExit
                addEndListener={(node, done) => 
                    gsap.to(node, {
                        x: ".7rem",
                        duration: 0.2,
                        autoAlpha: infoPage ? 1 : 0,
                        onComplete: done
                    })
                }
            >
                <SubListsCard   
                    resetStates={resetStates}
                    selectedQuiz={selectedQuiz}
                    infoPage={infoPage}
                /> 
            </Transition>
                
            <ListContainer>
                {quizzes && !isLoading && isMounted ? [...quizzes, ...newQuiz ].map((quiz, index) => (  
                       
                        <ListItem 
                            key={quiz._id}
                            className={"sub-lists-card-ignore"}
                            ref={selectedQuiz.index === index && !infoPage 
                                ? listItemRef 
                                : null
                            }
                            selected={selectedQuiz.index === index}
                            onClick={() => setSelectedQuiz({
                                id: quiz._id,
                                index
                            })}>

                            <form onSubmit={e => handleTitleChange(quiz._id, e)}>
                                {editQuizTitle && index === selectedQuiz.index
                                    ? <StyledInput 
                                        ref={inputRef} 
                                        onChange={e => setQuizTitleValue(e.target.value)} 
                                        value={quizTitleValue} 
                                        /> 
                                    : quiz.title
                                }
                                { editQuizTitle && index === selectedQuiz.index && 
                                    <CheckCircleBtn>
                                        <faRegular.CheckCircle size={"1rem"} title={"change title"} />
                                    </CheckCircleBtn>
                                }
                            </form>
                    
                            <IconContainer disabled={isLoading || quiz._id === "tid"}>
                                <faRegular.Edit size={"1.2rem"} title={"Edit verb quiz title"} onClick={() => setEditQuizTitle(prev => !prev)} /> 
                                <faRegular.ListAlt size={"1.2rem"} title={`Contents of ${quiz.title}`} onClick={() => setInfoPage("list")} />
                                <faSolid.ChartLine size={"1.2rem"} title={"Analytics"} onClick={() => setInfoPage("analytics")} />
                            </IconContainer>
                            { index === selectedQuiz.index && !editQuizTitle && !infoPage && 
                                <faSolid.TrashAlt 
                                    onClick={() => deleteQuiz(quiz._id)}  
                                    size={"1rem"} style={{position: "absolute", right: "-1.25rem", color: "#40a8c4"}} 
                                /> 
                            }
                            
                        </ListItem>)
                )
                
                :   <ItemSkeleton />
            
                }
                <div ref={listEndRef} />
                </ListContainer>

            <CardFooter className={"list-item-ignore"}>  
                <Button  size={"small"} variant={"secondary"} onClick={handleNewList}>New Quiz</Button>
                <Button 
                    size={"small"} 
                    disabled={isNaN(selectedQuiz.index) || selectedQuiz.id === "tid"}
                    onClick={handleLoadList}>
                    Load Quiz
                </Button>

                {error && (
                    <ErrorContainer>
                        something went wrong :/
                    </ErrorContainer>
                )}
            </CardFooter>
        </CardWrapper>
    ) 
}
       
export default ListsCard;