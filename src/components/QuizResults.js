import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useSelector} from 'react-redux';
import React from 'react';
import {
  useParams
} from "react-router-dom";

function QuizResults(props) {
  let { user, id } = useParams();
  const firestore = useFirestore();
  const loggedIn = useSelector(state => state.security.loggedIn);

  useFirestoreConnect([
    {
      collection: 'results', where: [['correlation', '==', id], ['user', '==', loggedIn]], storeAs: "result"
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
      firestore.collection("results").add({ result: percentage, user:loggedIn, correlation: id,tester: user,title:props.quiz.title})
    }

    return (percentage * 100)

  }
  if (isLoaded(result) && result !== undefined ) {
    
    
    return (
      <div style={quizResultsStyle}>
        <p>Percentage correct {CalculateResults()}%</p>
        {Object.keys(props.quiz.questions).map((_, index) => {
          const q = props.quiz.questions[index];
          return (
            <div key={index} className={props.given[index] === props.correct[index] ? "green" : "red"}>
              <p>Question {index + 1}:</p>
              <p>{q.question}</p>
              <ol type="A">
                {Object.keys(q.answers).map((_, index) => {
                  const answer = q.answers[index];
                  return (
                    <li key={index}>
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