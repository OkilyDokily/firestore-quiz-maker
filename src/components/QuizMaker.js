import React, { useState } from 'react';
import * as a from '../Actions/index'
import { useFirestore } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';


function QuizMaker() {
  const firestore = useFirestore();
  const username = useSelector(state => state.security.loggedIn);

  const [questions, addQuestions] = useState(5);

  const dispatch = useDispatch();

  function submitQuiz(e) {
    e.preventDefault();

    let obj = {
      title: e.target.title.value,
      tester: username,
      questions: {}
    };

    [...Array(questions).keys()].forEach(i => {

      obj.questions[i] = {

        question: e.target["Q" + (i + 1)].value,
        answers:
        {
          0: e.target["A" + (i + 1)].value,
          1: e.target["B" + (i + 1)].value,
          2: e.target["C" + (i + 1)].value,
          3: e.target["D" + (i + 1)].value
        },
      }
    }
    );

    let answers = {
    };

    [...Array(questions).keys()].forEach(i => {
      answers[i] = e.target["CA" + (i + 1)].value
    });

    firestore.collection("quizzes").add(obj).then(doc => {
      firestore.collection("quizzes").doc(doc.id).collection("answers").add({
        answers: answers
      })
    }
    );


    dispatch(a.changeComponent("Dashboard"));
  }

  function addAnotherQuestion(e) {
    e.preventDefault();
    addQuestions(questions + 1);
  }

  return (
    <div id="quizMaker">
      <form onSubmit={submitQuiz}>
        <div>
          <label>Quiz Title</label>
          <input name="title" type="text" required />
        </div>
        {[...Array(questions).keys()].map(i => ++i).map(i => {
          return (
            <div>
              <label>Question {i}.</label>
              <input name={"Q" + i} type="text" value="stuff" required />
              <div>
                <label>A.</label>
                <input name={"A" + i} type="text" value="stuff" required />
              </div>
              <div>
                <label>B.</label>
                <input name={"B" + i} type="text" value="stuff" required />
              </div>
              <div>
                <label>C.</label>
                <input name={"C" + i} type="text" value="stuff" required />
              </div>
              <div>
                <label>D.</label>
                <input name={"D" + i} type="text" value="stuff" required />
              </div>
              <div>
                <label>Correct Answer</label>
                <select name={"CA" + i}>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>
          );
        })}

        <button onClick={addAnotherQuestion}>Add another question</button>
        <button>Submit Quiz</button>
      </form>
      <button onClick={() => dispatch(a.changeComponent("Dashboard"))}>Exit Quiz Maker</button>
    </div >

  )
}

export default QuizMaker;