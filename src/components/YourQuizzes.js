import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React from 'react';
import {Link} from "react-router-dom";

function YourQuizzes() {
  const loggedIn = useSelector(state => state.security.loggedIn);

  useFirestoreConnect([
    { collection: "results", where: [['user', '==', loggedIn]], storeAs: "yourquizzes" }
  ]);
  const yourQuizzes = useSelector(state => state.firestore.data["yourquizzes"])


  if (isLoaded(yourQuizzes) && yourQuizzes !== undefined) {
    if (yourQuizzes === null){
      return(
        <div>
          You haven't taken any quizzes yet.
        </div>
      )
    }
    else{
      return (
        <React.Fragment>
          {Object.keys(yourQuizzes).map(x => {
            return (<p><Link to={`/${yourQuizzes[x].tester}/${yourQuizzes[x].correlation}`}>{`${yourQuizzes[x].title} Quiz by ${yourQuizzes[x].tester} Your score: ${yourQuizzes[x].result.toFixed(2) * 100}%`}</Link></p>)
          })}
        </React.Fragment>
      )
    }
    
  }
  else {
    return(
    <React.Fragment>
      is loading...
    </React.Fragment>
    )
  }

}
export default YourQuizzes;