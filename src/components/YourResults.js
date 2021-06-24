import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector,useDispatch } from 'react-redux';
import React from 'react';
import { useHistory } from "react-router-dom";
import * as a from '../Actions/index'
function YourResults() {


  const loggedIn = useSelector(state => state.security.loggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  useFirestoreConnect([
    { collection: "results", where: [['user', '==', loggedIn]], storeAs: "yourquizzes" }
  ]);
  const yourQuizzes = useSelector(state => state.firestore.data["yourquizzes"])
  const yourItemStyle = {
    border: "1px solid green",
    width: "400px",
    height: "20px",
    textAlign: "center",
    marginTop:"5px",
    marginBottom: "3px"
  }

  function yourQuizLink(tester,correlation){
    history.push(`/${tester}/${correlation}`)
    dispatch(a.changeComponent("Quiz"));
  }

  if (isLoaded(yourQuizzes) && yourQuizzes !== undefined) {
    if (yourQuizzes === null){
      return(
        <div>
          There are no quizzes yet for this user.
        </div>
      )
    }
    else{
      return (
        <React.Fragment>
          {Object.keys(yourQuizzes).map(x => {
            return (<div key={yourQuizzes[x].correlation} title="See which answers you got right." className="quizItem" style={yourItemStyle} onClick={() => yourQuizLink(yourQuizzes[x].tester, yourQuizzes[x].correlation)}>{`${yourQuizzes[x].title} by ${yourQuizzes[x].tester}, Your score: ${yourQuizzes[x].result.toFixed(2) * 100}%`}</div>)
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
export default YourResults;