import { useFirestoreConnect, isLoaded, actionTypes } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React,{useState} from 'react';
import QuizResults from './QuizResults';
import { firestore } from 'firebase';


function Quiz() {
  const [showResults, toggleResults] = useState(false);
  const firestore = useFirestore();
  const routeUser = useSelector(state => state.routing.username)
  const routeId = useSelector(state => state.routing.id)
  const loggedIn = useSelector(state => state.security.loggedIn);
  
  useFirestoreConnect([
    { collection: 'quizzes' + routeUser, doc: routeId }
  ]);

  const quiz = useSelector(
    (state) => state.firestore.data["quizzes" + routeUser] && state.firestore.data["quizzes" + routeUser][routeId]
  )
  let correctAnswers;
  let givenAnswers = {};
  function submitQuiz(e){
    e.preventDefault();
    correctAnswers = firestore.collection("answers" + routeUser).where("correlation", "==", routeId);
    
    const selects = document.getElementsByTagName("SELECT");
   
    [...selects].forEach(s => {
      givenAnswers[s.getAttribute("name")] = s.options[s.selectedIndex].value;
    })
   
    firestore.collection("submitted" + loggedIn).add(
      {
        correlation:routeId,
        answers:givenAnswers
      }
    )
    toggleResults(true);
  }

  

  if(showResults=== true){
    return (
      <React.Fragment>
        <QuizResults quiz={quiz} correct={correctAnswers.answers} given={givenAnswers}/>
      </React.Fragment>
    )
  }
  else if (isLoaded() && quiz !== undefined) {
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
      </React.Fragment>
    )
  }
  else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}

export default Quiz;