import React, { useEffect } from 'react';
import Security from './Security';
import Dashboard from './Dashboard';
import QuizOrResults from './QuizOrResults';
import QuizMaker from './QuizMaker';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';
import * as a from '../Actions/index';
import QuizList from './QuizList';


function Controller() {

  let component = useSelector(state => state.interface.component);
  const dispatch = useDispatch();
  let loggedIn = useSelector(state => state.security.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
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
    case "QuizOrResults":
      return (
        <React.Fragment>
          <Header />
          <QuizOrResults />
        </React.Fragment>
      )
    case "QuizMaker":
      return (
        <React.Fragment>
          <Header />
          <QuizMaker />
        </React.Fragment>
      )
    case "QuizList":
      return (
        <React.Fragment>
          <Header />
          <QuizList />
        </React.Fragment>
      )
    default:
  }
}


export default Controller;