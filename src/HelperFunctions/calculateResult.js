function calculateResult(givenAnswers, correct) {

  let results = Object.keys(givenAnswers).map(x => givenAnswers[x] === correct[x]);
  const percentage = results.filter(x => x === true).length / results.length;


  return (percentage * 100)
}

export default calculateResult;
