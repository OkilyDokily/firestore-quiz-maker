import { useFirestoreConnect, isLoaded, actionTypes } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { firestore } from 'firebase';


function QuizResults(props) {
  function CalculateResults(){
    let results = Object.keys(props.given).map(x => props.given[x] === props.correct[x]);
    const percentage = results.filter(x => x === true).length/results.length;
    return (percentage * 100)
  }
  return (
    <React.Fragment>
      <p>Percentage correct {CalculateResults()}%</p>
      {Object.keys(props.quiz.questions).map((_, index) => {
        const q = props.quiz.questions[index];
        return (
          <div>
            <p>Question {index + 1}:</p>
            <p>{q.question}</p>
            <ol type="A">
              {Object.keys(q.answers).map((_, index) => {
                const answer = q.answers[index];
                return (
                  <li>
                    {answer}
                  </li>
                )
              })}
            </ol>
            <p>Your Answer: {props.given[index]}</p>
            <p>Correct Answer: {props.given[index]}</p>
          </div>
        )
      })}
    </React.Fragment>
  )
}




export default QuizResults;