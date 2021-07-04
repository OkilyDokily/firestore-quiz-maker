import React from 'react'
import {
  useHistory
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as a from '../Actions/index';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'


function QuizItem(props) {


  const history = useHistory();
  const dispatch = useDispatch()
  function clicked() {
    history.push(`/${props.user}/${props.id}`)
    dispatch(a.changeComponent("Quiz"));
  }
  const loggedIn = useSelector(state => state.security.loggedIn)
  useFirestoreConnect([
    { collection: 'results', where: [["correlation", "==", props.id], ["user", "==", loggedIn]], storeAs: "result" }
  ]);

  const result = useSelector(state => state.firestore.data["result"]);

  const quizItemStyle = {
    border: "1px solid green",
    width: "200px",
    height: "20px",
    textAlign: "center",
    marginBottom: "3px"
  }
  if (isLoaded(result)) {
    let property;
    let percent;

    if (result) {
      property = Object.keys(result)[0];
      percent = result[property].result;

      console.log(result, "result", property, "property", "percent")
    } else {
      console.log(result, "oof")
    }

    return (
      <div className="quizItem" style={quizItemStyle}>
        <div onClick={clicked} title="See quiz">{props.title} <span>{percent ? percent : null}</span></div>
      </div>
    )
  }
  else {
    return (
      <div className="quizItem" style={quizItemStyle}>
        <div title="See quiz">...isLoading</div>
      </div>
    )
  }

}

export default QuizItem;