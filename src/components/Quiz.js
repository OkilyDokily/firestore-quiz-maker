import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
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

  useFirestoreConnect([
    { collection: 'quizzes' + user, doc: id, storeAs: "quiz" },
    { collection: "answers" + user, where: [['correlation', '==', id]], storeAs: "answers" },
    { collection: "submitted" + loggedIn, where: [['correlation', '==', id]], storeAs: "givenanswers" }
  ]);

  const quiz = useSelector(
    (state) => state.firestore.data["quiz"]
  )
  let correctAnswers = useSelector(
    (state) => state.firestore.data["answers"]
  )
  let givenAnswers = useSelector(
    (state) => state.firestore.data["givenanswers"]
  )

  function submitQuiz(e) {
    e.preventDefault();
    const selects = document.getElementsByTagName("SELECT");
    givenAnswers = {};
    [...selects].forEach(s => {
      givenAnswers[s.getAttribute("name")] = s.options[s.selectedIndex].value;
    })

    firestore.collection("submitted" + loggedIn).add(
      {
        correlation: id,
        answers: givenAnswers
      }
    )

    
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
 
  if (isLoaded(quiz) && isLoaded(correctAnswers) && isLoaded(givenAnswers) && givenAnswers !== null) {
    console.log(givenAnswers,"given answers")
    console.log(quiz,"quiz")
    console.log(correctAnswers,"correct answers")

    const key = Object.keys(givenAnswers)[0];
    const given = givenAnswers[key].answers;

    const key2 = Object.keys(correctAnswers)[0];
    const correct = correctAnswers[key2].answers;

    return (
      <React.Fragment>
        <QuizResults quiz={quiz} correct={correct} given={given} />

        <button onClick={dashBoardOrSecurity} type="button">
          Exit Quiz
        </button>

      </React.Fragment>
    )
  }
  else if (isLoaded(quiz) && isLoaded(correctAnswers) && isLoaded(givenAnswers)) {
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