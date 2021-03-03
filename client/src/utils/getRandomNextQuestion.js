
const getRandomNextQuestion = (questions) => {
    let totalWeightSoFar = 0;

    const weightSum = questions.reduce((accumulator, currentValue) => {
       return accumulator + currentValue.weight
    }, 0) 

    const randomValue = Math.floor(Math.random() * weightSum)
 
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        if (randomValue >= totalWeightSoFar && randomValue < totalWeightSoFar + question.weight) {
            console.log(i);
            return i
        }
        totalWeightSoFar += question.weight;
    }
}

export default getRandomNextQuestion;