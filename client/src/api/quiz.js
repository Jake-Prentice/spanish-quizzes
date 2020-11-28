import axios from "../axios"

export const fetchQuizzes = async () => {
    try {
    const res = await axios.get("/quizzes")
    return res.data;
    }catch(err) {throw new Error(err.response.data)}
}

export const createQuiz = async ({title}) => {
    try {
    const res = await axios.post(`/quizzes`, {title})
    return res.data;
    }catch(err) {console.log({err}); throw new Error(err.response.data.error.message)}
}

export const updateQuiz = async ({quizId, newTitle}) => {
    try {
    const res = await axios.patch(`/quizzes/${quizId}`, {title: newTitle});
    return res.data
    }catch(err) {throw new Error(err.response.data)}
}

export const deleteQuiz = async quizId => {
    try{
    const res = await axios.delete(`/quizzes/${quizId}`);
    return res.data;
    }catch(err) {throw new Error(err.response.data)} 
}

export const fetchVerbsFromQuizzes = async () => {
    try {
        const res = await axios.get(`/quizzes/all/verbs`);
        return res.data
    }catch(err) {throw new Error(err.response.data)}
    
}

export const addVerbToQuiz = async ({quizId, verb}) => {
    try {
        console.log({verb})
        const res = await axios.post(`/quizzes/${quizId}/verbs`, {verb});
        console.log("here dsddssddds")
        return res.data;
    }catch(err) {throw new Error(err.response.data)}
}

export const updateVerbFromQuiz = async ({quizId, verbId, newVerb}) => {
    try {
        
        const res = await axios.patch(`/quizzes/${quizId}/verbs/${verbId}`, {verb: newVerb})
        return res.data;
    }catch(err) {throw new Error(err.response.data)}
}

export const deleteVerbFromQuiz = async ({quizId, verbId}) => {
    try{
        const res = await axios.delete(`/quizzes/${quizId}/verbs/${verbId}`);
        return res.data;
    }catch(err) {throw new Error(err.response.data)}
}