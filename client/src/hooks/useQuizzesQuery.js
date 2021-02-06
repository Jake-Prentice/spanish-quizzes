import React, {useMemo} from 'react'
import {useQuery, useQueryClient} from "react-query";
import {fetchQuizzes} from "api/quiz";


export const useQuizzesQuery = (config) => {
    return useQuery("quizzes", fetchQuizzes, config);
}



// (queryInfo) => qui