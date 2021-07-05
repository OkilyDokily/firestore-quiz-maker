import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import QuizItem from './QuizItem';
import React from 'react';
import * as a from '../Actions/index'
import {
  useParams, useHistory
} from "react-router-dom";

function QuizList() {
  let { user: maker } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useFirestoreConnect([
    { collection: 'quizzes', where: ["tester","==",maker], storeAs: "quizzes" + maker }
  ]);

  function returnToDashBoard() {
    history.push("/");
    dispatch(a.changeComponent("Dashboard"));
  }

  const quizzes = useSelector(state => state.firestore.ordered["quizzes" + maker]);

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
          <p style={quizzesP}>Quizzes made by {maker}.</p>
          {quizzes.map(quiz => {
            return <QuizItem title={quiz.title} key={quiz.id} id={quiz.id} user={maker} />
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