import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React from 'react';

function QuizResults(props) {
  const firestore = useFirestore();
  const routeId = useSelector(state => state.routing.id)
  const loggedIn = useSelector(state => state.security.loggedIn);
  const routeUser = useSelector(state => state.routing.username)
  useFirestoreConnect([
    {
      collection: 'results', where: [['correlation', '==', routeId], ['user', '==', loggedIn]], storeAs: "result"
    }]);

  const result = useSelector(
    (state) => state.firestore.data["result"]
  )

  const quizResultsStyle ={
    width: "300px",
    border: "1px solid green",
    marginBottom: "4px",
    padding: "5px"
  }
  function CalculateResults() {

    let results = Object.keys(props.given).map(x => props.given[x] === props.correct[x]);
    const percentage = results.filter(x => x === true).length / results.length;

    if (result === null) {
      firestore.collection("results").add({ result: percentage, user:loggedIn, correlation: routeId,tester: routeUser,title:props.quiz.title})
    }

    return (percentage * 100)

  }
  if (isLoaded(result) && result !== undefined) {
    
    
    return (
      <div style={quizResultsStyle}>
        <p>Percentage correct {CalculateResults()}%</p>
        {Object.keys(props.quiz.questions).map((_, index) => {
          const q = props.quiz.questions[index];
          return (
            <div className={props.given[index] === props.correct[index] ? "green" : "red"}>
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
      </div>
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