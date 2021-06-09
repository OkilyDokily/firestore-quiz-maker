import React from 'react'



function QuizMaker() {

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
          D: e.tare
        }
      }
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
            <input name="2Q" type="text" />
            <div>
              <label>A.</label>
              <input name="1A" type="text" />
            </div>
            <div>
              <label>B.</label>
              <input name="1B" type="text" />
            </div>
            <div>
              <label>C.</label>
              <input name="1C" type="text" />
            </div>
            <div>
              <label>D.</label>
              <input name="1D" type="text" />
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
            <input name="3Q" type="text" />
            <div>
              <label>A.</label>
              <input name="1A" type="text" />
            </div>
            <div>
              <label>B.</label>
              <input name="1B" type="text" />
            </div>
            <div>
              <label>C.</label>
              <input name="1C" type="text" />
            </div>
            <div>
              <label>D.</label>
              <input name="1D" type="text" />
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
            <input name="4Q" type="text" />
            <div>
              <label>A.</label>
              <input name="1A" type="text" />
            </div>
            <div>
              <label>B.</label>
              <input name="1B" type="text" />
            </div>
            <div>
              <label>C.</label>
              <input name="1C" type="text" />
            </div>
            <div>
              <label>D.</label>
              <input name="1D" type="text" />
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
            <input name="5Q" type="text" />
            <div>
              <label>A.</label>
              <input name="1A" type="text" />
            </div>
            <div>
              <label>B.</label>
              <input name="1B" type="text" />
            </div>
            <div>
              <label>C.</label>
              <input name="1C" type="text" />
            </div>
            <div>
              <label>D.</label>
              <input name="1D" type="text" />
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