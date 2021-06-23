import React, { useEffect } from 'react';
import Security from './Security';
import Dashboard from './Dashboard';
import Quiz from './Quiz';
import QuizMaker from './QuizMaker';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';
import * as a from '../Actions/index';
import {
  useParams
} from "react-router-dom";
import YourQuizzes from './YourQuizzes';


function Controller() {
  let { user, id } = useParams();
  let component = useSelector(state => state.interface.component);
  const dispatch = useDispatch();
  let loggedIn = useSelector(state => state.security.loggedIn);

  useEffect(() => {

    // if (user !== undefined && id !== undefined) {
    //   // dispatch(a.addRoute(user, id));
    // }
    // else if(user !== undefined){

    // }
    if (loggedIn && user !== undefined && id !== undefined) {
      dispatch(a.changeComponent("Quiz"))
    }

    else if (!loggedIn) {
      dispatch(a.changeComponent("Security"))
    }
  });



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
    case "YourQuizzes":
      return (
        <React.Fragment>
          <Header />
          <YourQuizzes />
        </React.Fragment>
      )
    default:
  }
}


export default Controller;