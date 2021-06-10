import React from 'react'
import {useFirestore} from 'react-redux-firebase';
import {useSelector} from 'react-redux';

function QuizMaker() {
  const firestore = useFirestore();
  const username = useSelector(state => state.security.loggedIn);
  function submitQuiz(e) {
    e.preventDefault();
    const obj = {
      title: e.target.title.value,
      question1:
      {
        question: e.target.Q1.value,
        answers:
        {
          A: e.target.A1.value,
          B: e.target.B1.value,
          C: e.target.C1.value,
          D: e.target.D1.value
        },
        correct: e.target.CA1.value
      },
      question2:
      {
        question: e.target.Q2.value,
        answers:
        {
          A: e.target.A2.value,
          B: e.target.B2.value,
          C: e.target.C2.value,
          D: e.target.D2.value
        },
        correct: e.target.CA2.value
      },
      question3:
      {
        question: e.target.Q3.value,
        answers:
        {
          A: e.target.A3.value,
          B: e.target.B3.value,
          C: e.target.C3.value,
          D: e.target.D3.value
        },
        correct: e.target.CA3.value
      },
      question4:
      {
        question: e.target.Q4.value,
        answers:
        {
          A: e.target.A4.value,
          B: e.target.B4.value,
          C: e.target.C4.value,
          D: e.target.D4.value
        },
        correct: e.target.CA4.value
      },
      question5:
      {
        question: e.target.Q5.value,
        answers:
        {
          A: e.target.A5.value,
          B: e.target.B5.value,
          C: e.target.C5.value,
          D: e.target.D5.value
        },
        correct: e.target.CA5.value
      }
    }
    firestore.collection("quizzes" + username).add(obj);

  }
  return (
    <React.Fragment>
      <form onSubmit={submitQuiz}>
        <div>
          <label>What is the title of you quiz:</label>
          <input name="title" type="text" />
        </div>
        <div>
          <label>What is the first question of your quiz?</label>
          <input name="Q1" type="text" />
          <div>
            <label>A.</label>
            <input name="A1" type="text" />
          </div>
          <div>
            <label>B.</label>
            <input name="B1" type="text" />
          </div>
          <div>
            <label>C.</label>
            <input name="C1" type="text" />
          </div>
          <div>
            <label>D.</label>
            <input name="D1" type="text" />
          </div>
          <div>
            <label>Correct Answer</label>
            <select name="CA1">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>
        <div>
          <label>Question 2.</label>
          <input name="Q2" type="text" />
          <div>
            <label>A.</label>
            <input name="A2" type="text" />
          </div>
          <div>
            <label>B.</label>
            <input name="B2" type="text" />
          </div>
          <div>
            <label>C.</label>
            <input name="C2" type="text" />
          </div>
          <div>
            <label>D.</label>
            <input name="D2" type="text" />
          </div>
          <div>
            <label>Correct Answer</label>
            <select name="CA2">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>
        <div>
          <label>Third Question</label>
          <input name="Q3" type="text" />
          <div>
            <label>A.</label>
            <input name="A3" type="text" />
          </div>
          <div>
            <label>B.</label>
            <input name="B3" type="text" />
          </div>
          <div>
            <label>C.</label>
            <input name="C3" type="text" />
          </div>
          <div>
            <label>D.</label>
            <input name="D3" type="text" />
          </div>
          <div>
            <label>Correct Answer</label>
            <select name="CA3">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>
        <div>
          <label>Fourth Question?</label>
          <input name="Q4" type="text" />
          <div>
            <label>A.</label>
            <input name="A4" type="text" />
          </div>
          <div>
            <label>B.</label>
            <input name="B4" type="text" />
          </div>
          <div>
            <label>C.</label>
            <input name="C4" type="text" />
          </div>
          <div>
            <label>D.</label>
            <input name="D4" type="text" />
          </div>
          <div>
            <label>Correct Answer</label>
            <select name="CA4">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>
        <div>
          <label>Fifth Question</label>
          <input name="Q5" type="text" />
          <div>
            <label>A.</label>
            <input name="A5" type="text" />
          </div>
          <div>
            <label>B.</label>
            <input name="B5" type="text" />
          </div>
          <div>
            <label>C.</label>
            <input name="C5" type="text" />
          </div>
          <div>
            <label>D.</label>
            <input name="D5" type="text" />
          </div>
          <div>
            <label>Correct Answer</label>
            <select name="CA5">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>
        <button>Submit Quiz</button>
      </form>
    </React.Fragment>)
}

export default QuizMaker;