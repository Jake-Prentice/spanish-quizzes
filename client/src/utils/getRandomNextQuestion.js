
const getRandomNextQuestion = (questions) => {
    let totalWeightSoFar = 0;

    const weightSum = questions.reduce((accumulator, currentValue) => {
       return accumulator + currentValue.weight
    }, 0) 

    const randomValue = Math.floor(Math.random() * weightSum)
    console.log({randomValue})
    console.log(weightSum);
 
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        if (randomValue >= totalWeightSoFar && randomValue < totalWeightSoFar + question.weight) {
           
            return i
        }
        totalWeightSoFar += question.weight;
    }
}

export default getRandomNextQuestion;