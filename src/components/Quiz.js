import { useFirestore } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import QuizResults from './QuizResults';
import { useHistory } from "react-router-dom";
import * as a from '../Actions/index'
import {
  useParams
} from "react-router-dom";


function Quiz() {
  const firestore = useFirestore();

  let { user, id } = useParams();

  const loggedIn = useSelector(state => state.security.loggedIn);

  const dispatch = useDispatch();

  const history = useHistory();


  const [quiz, quizState] = useState(false)
  if (quiz === false) {
    firestore.collection("quizzes" + user).doc(id).get().then(doc => {
      quizState(doc.data());
    })
  }

  const [correctAnswers, correctAnswersState] = useState(false)
  if (correctAnswers === false) {
    let first = true;
    firestore.collection("answers" + user).where('correlation', '==', id).get().then(query => {
      query.forEach(doc => {
        if (first === true) {
          correctAnswersState(doc.data());
          first = false;
        }
      })
    })
  }

  const [givenAnswers, givenAnswersState] = useState(false);


  function getGivenAnswers() {
    if (givenAnswers === false) {

      firestore.collection("submitted" + loggedIn).where('correlation', '==', id).limit(1).get().then(query => {
        if (query.empty) {

        }
        else {
          query.forEach(doc => {
            givenAnswersState(doc.data());
          }
          )
        }
      })
    }
  }

  if (givenAnswers === false) {
    getGivenAnswers();
  }

  function submitQuiz(e) {
    e.preventDefault();
    const selects = document.getElementsByTagName("SELECT");
    let given = {};
    [...selects].forEach(s => {
      given[s.getAttribute("name")] = s.options[s.selectedIndex].value;
    })

    firestore.collection("submitted" + loggedIn).add(
      {
        correlation: id,
        answers: given
      }
    ).then(x => {
      getGivenAnswers();
    })

  }

  function dashBoardOrSecurity() {
    if (loggedIn !== null) {
      dispatch(a.changeComponent("Dashboard"));
    }
    else {
      dispatch(a.changeComponent("Security"));
    }
    history.push('/')
  }

  function seeMoreQuizzesByUser() {
    dispatch(a.changeComponent("QuizList"));
    history.push('/' + user)
  }


  if ((quiz !== false) && (correctAnswers !== false) && (givenAnswers !== false) && getGivenAnswers() !== false) {

    const given = givenAnswers.answers;
    const correct = correctAnswers.answers;

    return (
      <React.Fragment>
        <QuizResults quiz={quiz} correct={correct} given={given} />

        <button onClick={seeMoreQuizzesByUser}>See More quizes by {user}</button>
        <button onClick={dashBoardOrSecurity} type="button">
          Exit Quiz
        </button>

      </React.Fragment>
    )
  }
  else if ((quiz !== false) && (correctAnswers !== false)) {
    return (
      <React.Fragment>
        <form onSubmit={submitQuiz}>
          {Object.keys(quiz.questions).map((_, index) => {
            const q = quiz.questions[index];
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

        <button onClick={seeMoreQuizzesByUser}>See More quizes by {user}</button>

        <button onClick={dashBoardOrSecurity} type="button">
          Exit Quiz
        </button>

      </React.Fragment>
    )
  }
  else {
    return (
      <div>
        Loading...

        <button onClick={dashBoardOrSecurity} type="button">
          Exit to Dashboard.
        </button>

      </div>
    )
  }
}

export default Quiz;