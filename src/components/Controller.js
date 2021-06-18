import React, { useEffect } from 'react';
import Security from './Security';
import Dashboard from './Dashboard';
import Quiz from './Quiz';
import QuizMaker from './QuizMaker';
import Header from './Header';
import { useSelector,useDispatch } from 'react-redux';
import * as a from '../Actions/index';
import {
  useParams
} from "react-router-dom";


function Controller() {
  let { user, id } = useParams();

  const dispatch = useDispatch();
  let loggedIn = useSelector(state => state.security.loggedIn);
  useEffect(() => {
    if(user !== undefined && id !== undefined )
    {
      dispatch(a.addRoute(user,id));
    }
    if (loggedIn && user !== undefined && id !== undefined){
      dispatch(a.changeComponent("Quiz"))
    }
    else if (!loggedIn) {
      dispatch(a.changeComponent("Security"))
    }
   
    
  });


  let component = useSelector(state => state.interface.component);
  switch (component) {

    case "Security":
      return (
        <React.Fragment>
          <Header />
          <Security />
        </React.Fragment>
      );
    case "Dashboard":
      return (
        <React.Fragment>
          <Header />
          <Dashboard />
        </React.Fragment>
      );
    case "Quiz":
      return (
        <React.Fragment>
          <Header />
          <Quiz />
        </React.Fragment>
      )
    case "QuizMaker":
      return (
        <React.Fragment>
          <Header />
          <QuizMaker />
        </React.Fragment>
      )
    default:
  }
}


export default Controller;