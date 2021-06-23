import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import YourResults from './YourResults'
import * as a from '../Actions/index'
import {
  useHistory
} from "react-router-dom";


function DashBoard() {
  // const loggedIn = useSelector(state => state.security.loggedIn);
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.security.loggedIn)
  const makeAQuizButtonStyle={
    marginRight:"3px"
  }

  const history = useHistory();

  function clicked() {
    console.log(`/${loggedIn}`)
    history.push(`/${loggedIn}`)
    dispatch(a.changeComponent("QuizList"));
  }

  return (
    <React.Fragment>
      <YourResults />
      <button style={makeAQuizButtonStyle} onClick={() => dispatch(a.changeComponent("QuizMaker"))}>Make a quiz</button>
      <button onClick={clicked}>See Quizzes that you've made</button>
    </React.Fragment>
  )
}

export default DashBoard;