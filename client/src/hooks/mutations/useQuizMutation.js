import React, {useEffect, useState, useRef} from "react";
import {useQuery, useMutation, queryCache} from "react-query";
import * as api from "api/quiz";

const useQuizMutation = ({onMutating=Function(), onError=Function()}) => {
    
    const [createQuiz] = useMutation(api.createQuiz, {
        onMutate: ({title, quizId}) => {
            queryCache.cancelQueries("quizzes");
            const current = queryCache.getQueryData("quizzes");
            queryCache.setQueryData("quizzes", prev => [...prev, {_id: quizId, title}])
            onMutating();
            return () => queryCache.setQueryData("quizzes", current);
        },
        onError: (err, variables, rollback) => {
            rollback(); 
            onError(err)
        },
        onSettled: () => {
            queryCache.invalidateQueries("quizzes");
        }
    })

    const [updateQuiz] = useMutation(api.updateQuiz, {
        onMutate: ({quizId, newTitle}) => {
            queryCache.cancelQueries("quizzes");
            const current = queryCache.getQueryData("quizzes");
            queryCache.setQueryData("quizzes", prev => 
                prev.map(quiz => (quiz._id === quizId) ? {...quiz, title: newTitle} : quiz)
            )
            onMutating()
            return () => queryCache.setQueryData("quizzes", current);
        },
        onError: (err, variables, rollback) => {
            rollback(); 
            onError(err)
        },
        onSettled: () => {
            queryCache.invalidateQueries("quizzes");
            
        }
    })

    const [deleteQuiz] = useMutation(api.deleteQuiz, {
        onMutate: (id) => {
            queryCache.cancelQueries("quizzes");
            const current = queryCache.getQueryData("quizzes");
            queryCache.setQueryData("quizzes", prev => (
                prev.filter(quiz => quiz._id !== id)
            ))
            onMutating();
            return () => queryCache.setQueryData("quizzes", current);
        },
        onError: (err, variables, rollback) => {
            rollback(); 
            onError(err)
        },
        onSettled: () => {
            queryCache.invalidateQueries("quizzes");
        }
    })

    const [addVerbToQuiz] = useMutation(api.addVerbToQuiz, {
        onMutate: ({quizId, verbId, verb}) => {
            queryCache.cancelQueries("quizzes");
            const current = queryCache.getQueryData("quizzes");
            queryCache.setQueryData("quizzes", prev => 
                prev.map(quiz => {
                    const verbs = [...quiz.verbs, {_id: verbId, verb}];
                    return (quiz._id === quizId) ? {...quiz, verbs: verbs} : quiz
                }) 
            )
            onMutating();
            return () => queryCache.setQueryData("quizzes", current)
        },
        onError: (err, variables, rollback) => {rollback(); onError(err)},
        onSuccess: () => queryCache.invalidateQueries("quizzes")

    })

    const [updateVerbFromQuiz] = useMutation(api.updateVerbFromQuiz, {
        onMutate: ({quizId, verbId, newVerb}) => {
            queryCache.cancelQueries("quizzes");
            const current = queryCache.getQueryData("quizzes");
            queryCache.setQueryData("quizzes", prev => 
                prev.map(quiz => 
                    (quizId === quiz._id) ? 
                    {...quiz, verbs: quiz.verbs.map(verb => 
                        (verbId === verb._id) ? {...verb, verb: newVerb} : verb    
                    )}
                    : quiz     
                )
            )
            onMutating();
            return () => queryCache.setQueryData("quizzes", current)
        },
        onError: (err, variables, rollback) => {rollback(); onError(err)},
        onSuccess: () => queryCache.invalidateQueries("quizzes")

    })

    const [deleteVerbFromQuiz] = useMutation(api.deleteVerbFromQuiz, {
        onMutate: ({quizId, verbId}) => {
            queryCache.cancelQueries("quizzes");
            const current = queryCache.getQueryData("quizzes");
            queryCache.setQueryData("quizzes", prev => 
                prev.map(quiz => 
                    (quizId === quiz._id) ? {...quiz, verbs: quiz.verbs.filter(verb => verb._id !== verbId)}
                    : quiz
                )
            )
            onMutating();
            return () => queryCache.setQueryData("quizzes", current)
        },
        onError: (err, variables, rollback) => {rollback(); onError(err)},
        onSuccess: () => queryCache.invalidateQueries("quizzes")
    
    })

    return {
        createQuiz, 
        updateQuiz, 
        deleteQuiz,
        addVerbToQuiz,
        updateVerbFromQuiz,
        deleteVerbFromQuiz
    };

}


export default useQuizMutation;