import {useFirestoreConnect,isLoaded} from 'react-redux-firebase';
import {useSelector} from 'react-redux'
import React from 'react';

function  QuizList(){
  const loggedIn = useSelector(state => state.security.loggedIn);
  useFirestoreConnect([
    { collection: 'quizzes' + loggedIn }
  ]);
  console.log("quizzes" + loggedIn)
  const quizzes = useSelector(state => state.firestore.ordered["quizzes"+loggedIn])
  
    if(isLoaded(quizzes))
    {
    return(
    <React.Fragment>
      {quizzes.map(quiz =>{
       return <p>
         {quiz.title}
       </p>
      })}
    </React.Fragment>
    )
    }
    else{
      return(
        <React.Fragment>
          <p>...Loading</p>
        </React.Fragment>
      )
    }
}


export default QuizList;