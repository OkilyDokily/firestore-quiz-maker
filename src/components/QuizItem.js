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

  useFirestoreConnect([
    { collection: "results", where: ["correlation", "==", props.id], storeAs: "getresults" + props.id }
  ]);


  const results = useSelector(state => state.firestore.data["getresults" + props.id]);

  const quizItemStyle = {
    border: "1px solid green",
    width: "200px",
    height: "20px",
    textAlign: "center",
    marginBottom: "3px"
  }

  if (isLoaded(results)) {

    let percent ;

    if (results) {
  
    } else {
    
    }

    return (
      <div className="quizItem" style={quizItemStyle}>
        <div onClick={clicked} title="See quiz">{props.title} - average: <span>{percent ? percent : null}</span></div>
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