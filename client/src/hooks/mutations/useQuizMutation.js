import React, {useEffect, useState, useRef} from "react";
import {useQuery, useMutation, useQueryClient} from "react-query";
import * as api from "api/quiz";



const useQuizMutation = ({onMutating=Function(), onError=Function()}) => {
    const queryClient = useQueryClient();

    const getOptions = (onMutate) => ({
        onMutate(data) {
          queryClient.cancelQueries("quizzes")
          const current = queryClient.getQueryData("quizzes")
          onMutating();
          onMutate(data)
          return () => queryClient.setQueryData("quizzes", current)
        },
        onError(err, variables, rollback) {
          rollback()
          onError(err)
        },
        onSettled() {
          queryClient.invalidateQueries("quizzes")
        },
      })
    
    const {mutate: createQuiz} = useMutation(
        api.createQuiz,
        getOptions(({title, quizId}) => {
            queryClient.setQueryData("quizzes", prev => [...prev, {_id: quizId, title}])
        })
    )

        
    const {mutate: updateQuiz} = useMutation(
        api.updateQuiz,
        getOptions(({quizId, newTitle}) => {
            console.log(quizId, newTitle)
            queryClient.setQueryData("quizzes", prev => 
                prev.map(quiz => (quiz._id === quizId) ? {...quiz, title: newTitle} : quiz)
            )
        })
    )

    const {mutate: deleteQuiz} = useMutation(
        api.deleteQuiz,
        getOptions((id) => {
            queryClient.setQueryData("quizzes", prev => (
                prev.filter(quiz => quiz._id !== id)
            ))
        })
    )

    const {mutate: addVerbToQuiz} = useMutation(
        api.addVerbToQuiz,
        getOptions(({quizId, verbId, verb}) => {
            queryClient.setQueryData("quizzes", prev => 
            prev.map(quiz => {
                const verbs = [...quiz.verbs, {_id: verbId, verb}];
                return (quiz._id === quizId) ? {...quiz, verbs: verbs} : quiz
            }) 
        )
        })
    )

    const {mutate: updateVerbFromQuiz} = useMutation(
        api.updateVerbFromQuiz,
        getOptions(({quizId, verbId, newVerb}) => {
            queryClient.setQueryData("quizzes", prev => 
                prev.map(quiz => 
                    (quizId === quiz._id) ? 
                    {...quiz, verbs: quiz.verbs.map(verb => 
                        (verbId === verb._id) ? {...verb, verb: newVerb} : verb    
                    )}
                    : quiz     
                )
            )
        })
    )

    const {mutate: deleteVerbFromQuiz} = useMutation(
        api.deleteVerbFromQuiz,
        getOptions(({quizId, verbId}) => {
            queryClient.setQueryData("quizzes", prev => 
            prev.map(quiz => 
                (quizId === quiz._id) ? {...quiz, verbs: quiz.verbs.filter(verb => verb._id !== verbId)}
                : quiz
            )
        )
        })
    )
    
    
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