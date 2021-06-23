import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import QuizItem from './QuizItem';
import QuizStats from './QuizStats';
import React from 'react';

function QuizList(props) {
  const dispatch = useDispatch();
  let [component, changeComponent] = useState("QuizList");

  //raised state for use by Quizlist and QuizItems
  const [isStats, showStats] = useState(false);

  function changeStats(obj) {
    showStats(obj);
  }

  function reload() {
    changeComponent("Your");
    showStats(false);
  }

  const loggedIn = useSelector(state => state.security.loggedIn);
  useFirestoreConnect([
    { collection: 'quizzes' + loggedIn }
  ]);
  
  const quizzes = useSelector(state => state.firestore.ordered["quizzes" + loggedIn])
  
  if (props.stats.show) {
    return (
      <React.Fragment>
        <QuizStats id={props.stats.id} />
      </React.Fragment>
    )
  }
  else {
    if (quizzes !== undefined && quizzes?.length === 0) {
      const haventMadeQuizzesYetStyle ={
        marginBottom: "4px"
      }
      return(
        <div style={haventMadeQuizzesYetStyle}>
          This user hasn't made any quizzes yet.
        </div>
      )
     
    }
    else {
      if (isLoaded(quizzes)) {
        const quizzesP = {
          marginBottom:"4px"
        }
        return (
          <React.Fragment>
            <p style={quizzesP}>Quizzes you've made.</p>
            {quizzes.map(quiz => {
              return <QuizItem title={quiz.title} key={quiz.id} id={quiz.id} changeStats={props.changeStats} />
            })}
          </React.Fragment>
        )
      }
      else {
        return (
          <React.Fragment>
            <p>...Loading</p>
          </React.Fragment>
        )
      }
    }
  }

}


export default QuizList;