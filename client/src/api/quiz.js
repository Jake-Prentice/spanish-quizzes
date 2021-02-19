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


export const addVerbToQuiz = async ({quizId, verb}) => {
    try {
        const res = await axios.post(`/quizzes/${quizId}/verbs`, {verb});
        return res.data;
    }catch(err) {throw new Error(err.response.data)}
}

export const updateVerbFromQuiz = async ({verbId, newVerb}) => {
    try {
        const res = await axios.patch(`/quizzes/all/verbs/${verbId}`, {verb: newVerb})
        return res.data;
    }catch(err) {throw new Error(err.response.data)}
}

export const deleteVerbFromQuiz = async ({verbId}) => {
    try{
        const res = await axios.delete(`/quizzes/all/verbs/${verbId}`);
        return res.data;
    }catch(err) {throw new Error(err.response.data)}
}

export const updateQuizConfig = async (newConfig) => {
    try {
        const res = await axios.put(`/quizzes/all/configs/${newConfig._id}`, {newConfig});
        return res.data;
    }catch(err) {throw new Error(err.response.data)}
}

export const configureQuizByConfigId = async (id) => {
    try{

    }catch(err) {throw new Error(err.response.data)}
}

export const configureQuizById = async (quizId) => {
    try{

    }catch(err) {throw new Error(err.response.data)}
}