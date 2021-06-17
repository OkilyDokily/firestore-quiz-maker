import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import QuizItem from './QuizItem';
import QuizStats from './QuizStats';
import React, { useState } from 'react';

function QuizList() {
  const loggedIn = useSelector(state => state.security.loggedIn);
  useFirestoreConnect([
    { collection: 'quizzes' + loggedIn }
  ]);
  const [isStats, showStats] = useState(false);
  const quizzes = useSelector(state => state.firestore.ordered["quizzes" + loggedIn])
  if (isStats.show) {
    return (
      <React.Fragment>
        <QuizStats id={isStats.id} />
      </React.Fragment>
    )
  }
  else {
    if (isLoaded(quizzes)) {
      return (
        <React.Fragment>
          {quizzes.map(quiz => {
            return <QuizItem title={quiz.title} id={quiz.id} showStats={showStats} />
          })}
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          <p>...Loading</p>
        </React.Fragment>
      )
    }
  }

}


export default QuizList;