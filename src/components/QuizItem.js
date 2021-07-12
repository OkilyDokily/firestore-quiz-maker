import React from 'react'
import {
  useHistory
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as a from '../Actions/index';


function QuizItem(props) {


  const history = useHistory();
  const dispatch = useDispatch()
  function clicked() {
    history.push(`/${props.user}/${props.id}`)
    dispatch(a.changeComponent("QuizOrResults"));
  }


  const quizItemStyle = {
    border: "1px solid green",
    width: "200px",
    height: "20px",
    textAlign: "center",
    marginBottom: "3px"
  }

 
    return (
      <div className="quizItem" style={quizItemStyle}>
        <div onClick={clicked} title="See quiz">{props.title}</div>
      </div>
    )


}

export default QuizItem;