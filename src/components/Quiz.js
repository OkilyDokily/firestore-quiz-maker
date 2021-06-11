import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React from 'react';


function Quiz() {
  const routeUser = useSelector(state => state.routing.username)
  const routeId = useSelector(state => state.routing.id)
  useFirestoreConnect([
    { collection: 'quizzes' + routeUser, doc: routeId }
  ]);

  const quiz = useSelector(
    (state) => state.firestore.data["quizzes" + routeUser] && state.firestore.data["quizzes" + routeUser][routeId]
  )

  if (isLoaded()) {
    if (quiz !== undefined) {
      return (
        <React.Fragment>
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
                <select>
                  {Object.keys(q.answers).map((_,index)=>{
                    return(
                      <option>{String.fromCharCode(65 + index)}</option>
                    )
                  })}
                </select>
              </div>
            )
          })}
        </React.Fragment>
      )
    }
    else {
      return (
        <div>
          ...Is Loading
        </div>
      )
    }
  }
  else {
    return (
      <div>
        ...isLoading
      </div>
    )
  }
}

export default Quiz;