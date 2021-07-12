import { useFirestore } from 'react-redux-firebase';
import calculateResult from '../HelperFunctions/calculateResult'
import React from 'react';

function Quiz(props) {
  const firestore = useFirestore();

  function submitQuiz(e) {
    e.preventDefault();
    const selects = document.getElementsByTagName("SELECT");
    let given = {};
    given.user = props.user;
    given.answers = {};
    [...selects].forEach(s => {
      given.answers[s.getAttribute("name")] = s.options[s.selectedIndex].value;
    })


    let calculate = calculateResult(given.answers,props.quiz.answers);
    given.info = {
      tester: props.quiz.tester,
      title: props.quiz.title,
      testid: props.quiz.id,
      user: props.user,
      result: calculate
    }
   
    firestore.collection("users").doc(props.user).collection("made").doc(props.quiz.id).collection("submitted").doc(props.user).set(given);

  }

  return (
    <React.Fragment>
      <form onSubmit={submitQuiz}>
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
              <select name={index}>
                {Object.keys(q.answers).map((_, index) => {
                  return (
                    <option>{String.fromCharCode(65 + index)}</option>
                  )
                })}
              </select>
            </div>
          )
        })}
        <button>Get Results</button>
      </form>

    </React.Fragment>
  )

}

export default Quiz;