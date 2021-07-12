import React from 'react';

function QuizResults(props) {


  const quizResultsStyle = {
    width: "300px",
    border: "1px solid green",
    marginBottom: "4px",
    padding: "5px"
  }

  return (
    <div style={quizResultsStyle}>
      <p>Percentage correct {props.given.info.result.toFixed(2)}%</p>
      {Object.keys(props.quiz.questions).map((_, index) => {
        const q = props.quiz.questions[index];
        return (
          <div key={index} className={props.given.answers[index] === props.quiz.answers[index] ? "green" : "red"}>
            <p>Question {index + 1}:</p>
            <p>{q.question}</p>
            <ol type="A">
              {Object.keys(q.answers).map((_, index) => {
                const answer = q.answers[index];
                return (
                  <li key={index}>
                    {answer}
                  </li>
                )
              })}
            </ol>
            <p>Your Answer: {props.given.answers[index]}</p>
            <p>Correct Answer: {props.quiz.answers[index]}</p>
          </div>
        )
      })}
    </div>
  )
}





const MemoizedQuizResults = React.memo(QuizResults)
export default MemoizedQuizResults;