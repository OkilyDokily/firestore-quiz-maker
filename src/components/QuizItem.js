import React from 'react'

function QuizItem(props){
  function clicked(){
    props.showStats({show:true,id:props.id})
  }
  return(
    <React.Fragment>
      <div onClick={clicked}>{props.title}</div>
    </React.Fragment>
  )
}

export default QuizItem;