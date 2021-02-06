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
//custom hooks
import {useQuizzesQuery} from "hooks/useQuizzesQuery";
import useClickOutside from "hooks/useClickOutside";
import useFocusInput from "hooks/useFocusInput";
import useQuizMutation from "hooks/mutations/useQuizMutation";
import useStateWithSessionStorage from "hooks/useStateWithSessionStorage";
//apis
import {fetchQuizzes} from "api/quiz";
//components
import Button from "components/shared/Button";
import SubListsCard from "./SubListsCard";
import * as faSolid from "@styled-icons/fa-solid";
import * as faRegular from "@styled-icons/fa-regular";
import {Transition, TransitionGroup} from "react-transition-group";
import ItemSkeleton from "./components/ItemSkeleton"

const ListsCard = (props) => {

    const {setIsOpen, isMounted} = props;

    const [newQuiz, setNewQuiz] = useState([]);
    const [quizTitleValue, setQuizTitleValue] = useState("");
    const [editQuizTitle, setEditQuizTitle] = useState(false);
    const [infoPage, setInfoPage] = useState("")
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [error, setError] = useState("");
    
    const listEndRef = useRef(null);
    const inputRef = useFocusInput();
    const errorRef = useRef();

    const resetStates = () => {
        setInfoPage(""); 
        setEditQuizTitle(false);
        setSelectedQuiz({});
        setQuizTitleValue("");
        setNewQuiz([]);
    }

    //loading data
    const {data: quizzes, isLoading} = useQuizzesQuery({}, {
        onError: err => setError(err.message)
    })

    //outside click handlers
    const [listItemRef] = useClickOutside(resetStates, {
        ignoreByAttr: ".list-item-ignore"
    });

    //mutation handler
    const {createQuiz, updateQuiz, deleteQuiz} = useQuizMutation({
        onMutating: resetStates,
        onError: err => setError(err.message)
    })

    //events
    const handleLoadList = () => {
        setIsOpen(false);
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

    //error handling
    useEffect(() => {
        if (error) {
            gsap.to(errorRef.current, {opacity: 1, duration: .2})
            gsap.to(errorRef.current, {
                opacity: 0, 
                duration: .5, 
                delay: 1.5,
                onComplete: () => setError("")
            })
        }
    }, [error])


    return (
        <CardWrapper>
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
                    setError={setError}
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
                                        autoCorrect={false}
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
                {error ?
                    <ErrorContainer ref={errorRef}>
                        {error}
                    </ErrorContainer>
                : null}
                <Button  size={"small"} variant={"secondary"} onClick={handleNewList}>New Quiz</Button>
                <Button 
                        size={"small"} 
                        to={{
                            pathname: "/config",
                            state: {selectedQuizId: selectedQuiz.id}
                        }}
                        disabled={isNaN(selectedQuiz.index) || selectedQuiz.id === "tid"}
                        onClick={handleLoadList}>
                    Load Quiz
                </Button>

            </CardFooter>

        </CardWrapper>
    ) 
}
       
export default ListsCard;