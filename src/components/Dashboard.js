import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import * as a from '../Actions/index'

function DashBoard(){
  const loggedIn = useSelector(state => state.security.loggedIn);
  const dispatch = useDispatch();
 
  return(
    <React.Fragment>
      <p>{loggedIn}'s Dashboard</p>
      <button onClick={()=> dispatch(a.changeComponent("QuizMaker"))}>Make a quiz</button>
    </React.Fragment>
  )
}

export default DashBoard;