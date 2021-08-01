import { useFirestoreConnect, isLoaded,useFirestore } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import QuizItem from './QuizItem';
import React from 'react';
import * as a from '../Actions/index'
import {
  useParams, useHistory
} from "react-router-dom";

function DeleteQuizzes() {
  const firestore = useFirestore();

  let { user: maker } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useFirestoreConnect([
    { collection: 'users', doc: maker, subcollections: [{ collection: "made" }], storeAs: "quizzes" + maker }
  ]);

  function returnToDashBoard() {
    history.push("/");
    dispatch(a.changeComponent("Dashboard"));
  }

  const quizzes = useSelector(state => state.firestore.ordered["quizzes" + maker]);

  function deleteQuiz(id) {
    firestore.collection("users").doc(maker).collection("made").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

  }


  if (quizzes !== undefined && quizzes?.length === 0) {

    const haventMadeQuizzesYetStyle = {
      marginBottom: "4px"
    }
    return (
      <div style={haventMadeQuizzesYetStyle}>
        <p>This user hasn't made any quizzes yet.</p>
        <button onClick={returnToDashBoard}>Return to Dashboard</button>
      </div>
    )

  }
  else {
    if (isLoaded(quizzes)) {
      const quizzesP = {
        marginBottom: "4px"
      }

      return (
        <React.Fragment>
          <p style={quizzesP}>Quizzes made by {maker}.</p>
          {quizzes.map(quiz => {
            return (
              <div>
                <QuizItem title={quiz.title} key={quiz.id} id={quiz.id} user={maker} />
                <button onClick={()=>deleteQuiz(quiz.id)}>Delete this quiz</button>
              </div>
            )
           
          })}
          <button onClick={returnToDashBoard}>Return to Dashboard</button>
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


export default DeleteQuizzes;