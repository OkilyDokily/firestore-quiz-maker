import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import YourResults from './YourResults'
import * as a from '../Actions/index'



function DashBoard() {
  // const loggedIn = useSelector(state => state.security.loggedIn);

 
  const makeAQuizButtonStyle={
    marginRight:"3px"
  }
  return (
    <React.Fragment>
      <YourResults />
      <button style={makeAQuizButtonStyle} onClick={() => dispatch(a.changeComponent("QuizMaker"))}>Make a quiz</button>
      <button onClick={() => dispatch(a.changeComponent("QuizList"))}>See Quizzes that you've made</button>
    </React.Fragment>
  )
}

export default DashBoard;