import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import QuizItem from './QuizItem';
import React from 'react';
import {
  useParams
} from "react-router-dom";

function QuizList() {
  let { user, _ } = useParams();
  // const loggedIn = useSelector(state => state.security.loggedIn);
  useFirestoreConnect([
    { collection: 'quizzes' + user, storeAs: "quizzes"  }
  ]);

  const quizzes = useSelector(state => state.firestore.ordered["quizzes"])

  if (quizzes !== undefined && quizzes?.length === 0) {
    const haventMadeQuizzesYetStyle = {
      marginBottom: "4px"
    }
    return (
      <div style={haventMadeQuizzesYetStyle}>
        This user hasn't made any quizzes yet.
      </div>
    )

  }
  else {
    if (isLoaded(quizzes)) {
      const quizzesP = {
        marginBottom: "4px"
      }
      return (
        <React.Fragment>
          <p style={quizzesP}>Quizzes made by {user}.</p>
          {quizzes.map(quiz => {
            return <QuizItem title={quiz.title} key={quiz.id} id={quiz.id} user={user} />
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