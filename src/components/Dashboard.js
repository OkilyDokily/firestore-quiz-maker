import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuizList from './QuizList';
import YourQuizzes from './YourQuizzes'

import * as a from '../Actions/index'

function DashBoard() {
  const loggedIn = useSelector(state => state.security.loggedIn);
  const dispatch = useDispatch();
  let [component, changeComponent] = useState("QuizList");
  function switchComponent() {
    switch (component) {
      case "QuizList":
        return <QuizList/>
      case "YourQuizzes":
        return <YourQuizzes/>
      default:
       return null;
    }
  }

  return (
    <React.Fragment>
      <p>{loggedIn}'s Dashboard</p>
      {switchComponent()}
      <button onClick={() => dispatch(a.changeComponent("QuizMaker"))}>Make a quiz</button>
      <button onClick={() => changeComponent("QuizList")}>See your quizzes</button>
      <button onClick={() => changeComponent("YourQuizzes")}>See Quizzes that you've taken</button>

    </React.Fragment>
  )
}

export default DashBoard;