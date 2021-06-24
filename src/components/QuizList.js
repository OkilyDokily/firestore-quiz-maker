import { useFirestoreConnect, isLoaded, actionTypes } from 'react-redux-firebase';
import { useSelector,useDispatch } from 'react-redux';
import QuizItem from './QuizItem';
import React from 'react';
import * as a from '../Actions/index'
import {
  useParams,useHistory
} from "react-router-dom";

function QuizList() {
  let { user} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  // const loggedIn = useSelector(state => state.security.loggedIn);
  
  useFirestoreConnect([
    { collection: 'quizzes' + user, storeAs: "quizzes"  }
  ]);

  function returnToDashBoard(){  
    history.push("/");
    dispatch(a.changeComponent("Dashboard"));
  }

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
          <button onClick={returnToDashBoard}>Return to Dashboard</button>
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