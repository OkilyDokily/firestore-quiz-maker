import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuizList from './QuizList';
import YourQuizzes from './YourQuizzes'
import * as a from '../Actions/index'



function DashBoard() {
  const loggedIn = useSelector(state => state.security.loggedIn);
  const dispatch = useDispatch();
  let [component, changeComponent] = useState("QuizList");

  //raised state for use by Quizlist and QuizItems
  const [isStats, showStats] = useState(false);

  function changeStats(obj) {
    showStats(obj);
  }

  function reload(){
    changeComponent("QuizList");
    showStats(false);
  }

  function switchComponent() {

    switch (component) {
      case "QuizList":
        return <QuizList stats={isStats} changeStats={changeStats} />;
      case "YourQuizzes":
        return <YourQuizzes />
      default:
        return null;
    }
  }
  const makeAQuizButtonStyle={
    marginRight:"3px"
  }
  return (
    <React.Fragment>
      <p>{loggedIn}'s Dashboard</p>
      {switchComponent()}
      <button style={makeAQuizButtonStyle} onClick={() => dispatch(a.changeComponent("QuizMaker"))}>Make a quiz</button>
      {component === "QuizList" ? <button onClick={() => changeComponent("YourQuizzes")}>See Quizzes that you've taken</button> :<button onClick={reload}>See quizzes that you have made</button> }
    </React.Fragment>
  )
}

export default DashBoard;