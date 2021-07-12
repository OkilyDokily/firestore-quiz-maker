import { useFirestoreConnect, isLoaded,useFirestore } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';

import React from 'react';
import { useHistory } from "react-router-dom";
import * as a from '../Actions/index'

function YourResults() {


  const loggedIn = useSelector(state => state.security.loggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  useFirestoreConnect([
    { collectionGroup: "submitted", where: ["user", "==", loggedIn], storeAs: "yourquizzes" }
  ]);


  const yourQuizzes = useSelector(state => state.firestore.ordered["yourquizzes"]);

  const yourItemStyle = {
    border: "1px solid green",
    width: "400px",
    height: "20px",
    textAlign: "center",
    marginTop: "5px",
    marginBottom: "3px"
  }

  function yourQuizLink(tester, testid) {
    history.push(`/${tester}/${testid}`)
    dispatch(a.changeComponent("QuizOrResults"));
  }

  function clicked(x) {
    yourQuizLink(yourQuizzes[x].info.tester, yourQuizzes[x].info.testid);
  }

  if (isLoaded(yourQuizzes) && yourQuizzes !== undefined) {
    console.log(yourQuizzes)
    if (yourQuizzes === null) {
      return (
        <div>
          <p>There are no quizzes yet for this user.</p>
        </div>
      )
    }
    else {
      return (
        <React.Fragment>
          {Object.keys(yourQuizzes).map(x => {
            return (
              <div key={yourQuizzes[x].correlation} title="See which answers you got right." className="quizItem" style={yourItemStyle} onClick={()=> clicked(x)}>{`${yourQuizzes[x].info.title} by ${yourQuizzes[x].info.tester}, Your score: ${yourQuizzes[x].info.result.toFixed(2)}%`}
              </div>)
          })}
        </React.Fragment>
      )
    }

  }
  else {
    return (
      <React.Fragment>
        is loading...
      </React.Fragment>
    )
  }
}


export default YourResults;