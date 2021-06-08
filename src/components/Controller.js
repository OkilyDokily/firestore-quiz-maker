import React from 'react';
import Security from './Security';
import Dashboard from './Dashboard';
import Quiz from './Quiz';
import QuizMaker from './QuizMaker';
import Header from './Header';


class Controller extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      component:"Security",
      signedIn:null
    }
  }

  render(){
    switch(this.state.component){

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
  
}


export default Controller;