import React from 'react';
import Security from './Security';
import Dashboard from './Dashboard';
import Quiz from './Quiz';
import QuizMaker from './QuizMaker';
import Header from './Header';
import {useSelector} from 'react-redux';


function Controller()
{
    let component  = useSelector(state => state.interface.component);
    switch(component){

    case "Security":
       return (
          <React.Fragment>
            <Header/>
            <Security/>
          </React.Fragment>
        );
      case "Dashboard":
        return (
          <React.Fragment>
            <Header />
            <Dashboard/>
          </React.Fragment>
        );
      case "Quiz":
        return (
          <React.Fragment>
            <Header />
            <Quiz/>
          </React.Fragment>
        )
      case "QuizMaker":
        return (
          <React.Fragment>
            <Header />
            <QuizMaker/>
          </React.Fragment>
        )
    default:
    }  
}


export default Controller;