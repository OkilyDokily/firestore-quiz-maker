import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React from 'react';
import { useHistory } from "react-router-dom";
function YourQuizzes() {
  const loggedIn = useSelector(state => state.security.loggedIn);
  const history = useHistory();
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
  }

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
            return (<div style={yourItemStyle} onClick={(yourQuizzes[x].tester, yourQuizzes[x].correlation)=>yourQuizLink(a,b)}><Link to={`/${}/${}`}>{`${yourQuizzes[x].title} Quiz by ${yourQuizzes[x].tester} Your score: ${yourQuizzes[x].result.toFixed(2) * 100}%`}</Link></div>)
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