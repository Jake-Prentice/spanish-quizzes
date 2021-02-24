import { Error } from "styled-icons/boxicons-solid";
import axios from "../axios"


export const fetchQuizzes = async () => {
    const res = await axios.get("/quizzes")
    return res.data;
}

export const createQuiz = async ({title}) => {
    const res = await axios.post(`/quizzes`, {title})
    return res.data;
}

export const updateQuiz = async ({quizId, newTitle}) => {
    const res = await axios.patch(`/quizzes/${quizId}`, {title: newTitle});
    return res.data
}

export const deleteQuiz = async quizId => {
    const res = await axios.delete(`/quizzes/${quizId}`);
    return res.data;
}


export const addVerbToQuiz = async ({quizId, verb}) => {
    const res = await axios.post(`/quizzes/${quizId}/verbs`, {verb});
    return res.data;
}

export const updateVerbFromQuiz = async ({verbId, newVerb}) => {
    const res = await axios.patch(`/quizzes/all/verbs/${verbId}`, {verb: newVerb})
    return res.data;
}

export const deleteVerbFromQuiz = async ({verbId}) => {
    const res = await axios.delete(`/quizzes/all/verbs/${verbId}`);
    return res.data;
}

export const updateQuizConfig = async (newConfig) => {
    const res = await axios.put(`/quizzes/all/configs/${newConfig._id}`, {newConfig});
    return res.data;
}

export const configureQuizByConfigId = async (id) => {
    const {data} = await axios.get(`/quizzes/all/configs/${id}/configure`);
    return data;
}

export const configureQuizByUnsavedConfig = async ({quizId, config}) => {
    const encodedFilterOptions = encodeURIComponent(JSON.stringify(config.filterOptions));
    const {data} = await axios.get(`/quizzes/${quizId}/configure?filterOptions=${encodedFilterOptions}`)
    return data;
}