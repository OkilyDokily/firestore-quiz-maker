import React from 'react'
import {
useHistory
} from "react-router-dom";


function QuizItem(props){
  const history = useHistory();
  
  function clicked(){
    history.pushed(`/${props.user}/${props.id}`)
  }

  const quizItemStyle ={
    border: "1px solid green",
    width: "200px",
    height: "20px",
    textAlign:"center",
    marginBottom:"3px"
  }

  return(
    <div className="quizItem" style={quizItemStyle}>
      <div onClick={clicked} title="See quiz">{props.title}</div>
    </div>
  )
}

export default QuizItem;