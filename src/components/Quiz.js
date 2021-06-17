import { useFirestoreConnect, isLoaded} from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React from 'react';
import QuizResults from './QuizResults';
import { Link } from "react-router-dom";
function Quiz() {
  const firestore = useFirestore();
  const routeUser = useSelector(state => state.routing.username)
  const routeId = useSelector(state => state.routing.id)
  const loggedIn = useSelector(state => state.security.loggedIn);

  useFirestoreConnect([
    { collection: 'quizzes' + routeUser, doc: routeId, storeAs: "quiz" },
    { collection: "answers" + routeUser, where: [['correlation', '==', routeId]], storeAs: "answers" },
    { collection: "submitted" + loggedIn, where: [['correlation', '==', routeId]], storeAs: "givenanswers" }
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
        correlation: routeId,
        answers: givenAnswers
      }
    )
  }


  if (isLoaded(quiz) && isLoaded(correctAnswers) && isLoaded(givenAnswers) && givenAnswers !== null) {
    const key = Object.keys(givenAnswers)[0];
    const given = givenAnswers[key].answers;

    const key2 = Object.keys(correctAnswers)[0];
    const correct = correctAnswers[key2].answers;

    return (
      <React.Fragment>
        <QuizResults quiz={quiz} correct={correct} given={given} />
        <Link to="/">
          <button type="button">
            Exit Quiz
          </button>
        </Link>
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
        <Link to="/">
          <button type="button">
            Exit Quiz
          </button>
        </Link>
      </React.Fragment>
    )
  }
  else {
    return (
      <div>
        Loading...
        <Link to="/">
          <button type="button">
            Exit Quiz
          </button>
        </Link>
      </div>
    )
  }
}

export default Quiz;