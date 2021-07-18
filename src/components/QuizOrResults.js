import React, { useState } from 'react';
import {useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import QuizResults from './QuizResults';
import Quiz from './Quiz';
import { useHistory } from "react-router-dom";
import * as a from '../Actions/index';
import {
  useParams
} from "react-router-dom";



function QuizOrResults(props) {

  let { user: maker, id } = useParams();
  const loggedIn = useSelector(state => state.security.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const [finished, justFinishedTestReloader] = useState(false)

  useFirestoreConnect([
    { collection: 'users', doc: maker, subcollections: [{ collection: 'made', doc: id }], storeAs: "quiz" + maker },
    { collection: 'users', doc: maker, subcollections: [{ collection: 'made', doc: id, subcollections: [{ collection: "submitted", doc: loggedIn }] }], storeAs: "submitted" + loggedIn },
  ]);



  const quiz = useSelector(state => state.firestore.ordered["quiz" + maker]);

  const givenAnswers = useSelector(state => state.firestore.ordered["submitted" + loggedIn]);


  function reloadAfterFinishTest() {
    justFinishedTestReloader(!finished);
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
    history.push('/' + maker)
  }


  if (isLoaded(givenAnswers) && givenAnswers !== null && givenAnswers.length > 0 && isLoaded(quiz) && quiz !== undefined) {

    const q = quiz[0];
    const g = givenAnswers[0];
    return (
      <React.Fragment>
        <QuizResults given={g} quiz={q} />
        <button onClick={seeMoreQuizzesByUser}>See More quizes by {maker}</button>
        <button onClick={dashBoardOrSecurity} type="button">
          Exit Quiz
        </button>
      </React.Fragment>


    )
  }
  else
    if (isLoaded(quiz) && quiz !== undefined) {
      const q = quiz[0];

      return (
        <React.Fragment>
          <Quiz quiz={q} maker={maker} user={loggedIn} reload={reloadAfterFinishTest} />
          <button onClick={seeMoreQuizzesByUser}>See More quizes by {maker}</button>
          <button onClick={dashBoardOrSecurity} type="button">
            Exit Quiz
          </button>
        </React.Fragment>

      )
    }
    else {
      return (
        <div>
          ... Loading
        </div>
      )
    }

}

export default QuizOrResults;