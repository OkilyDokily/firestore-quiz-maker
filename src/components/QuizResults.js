import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React from 'react';
import { firestore } from 'firebase';


function QuizResults(props) {
  const firestore = useFirestore();
  const routeId = useSelector(state => state.routing.id)
  const loggedIn = useSelector(state => state.security.loggedIn);

  useFirestoreConnect([
    {
      collection: 'results', where: [['correlation', '==', routeId], ['user', '==', loggedIn]], storeAs: "result"
    }]);

  const result = useSelector(
    (state) => state.firestore.data["result"]
  )

  function CalculateResults() {

    let results = Object.keys(props.given).map(x => props.given[x] === props.correct[x]);
    const percentage = results.filter(x => x === true).length / results.length;

    if (result === null) {
      firestore.collection("results").add({ result: percentage, user:loggedIn, correlation: routeId })
    }

    return (percentage * 100)

  }
  if (isLoaded(result) && result !== undefined) {
    return (

      <React.Fragment>
        <p>Percentage correct {CalculateResults()}%</p>
        {Object.keys(props.quiz.questions).map((_, index) => {
          const q = props.quiz.questions[index];
          return (
            <div>
              <p>Question {index + 1}:</p>
              <p>{q.question}</p>
              <ol type="A">
                {Object.keys(q.answers).map((_, index) => {
                  const answer = q.answers[index];
                  return (
                    <li>
                      {answer}
                    </li>
                  )
                })}
              </ol>
              <p>Your Answer: {props.given[index]}</p>
              <p>Correct Answer: {props.correct[index]}</p>
            </div>
          )
        })}
      </React.Fragment>
    )
  }
  else {
    return (
      <div>
        not given
      </div>
    )
  }
}




export default QuizResults;