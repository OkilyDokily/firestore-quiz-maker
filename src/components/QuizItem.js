import React from 'react'

function QuizItem(props){
  function clicked(){
    props.changeStats({show:true,id:props.id})
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
      <div onClick={clicked} title="See stats and url for this quiz">{props.title}</div>
    </div>
  )
}

export default QuizItem;