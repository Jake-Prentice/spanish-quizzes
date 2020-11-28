import React from 'react'
import {useQuery} from "react-query";
import {fetchQuizzes} from "api/quiz";

const useQuizzesQuery = (config) => {
    const {data: quizzes, ...rest} = useQuery("quizzes", fetchQuizzes, config);
    return {quizzes, ...rest};
}

export default useQuizzesQuery;