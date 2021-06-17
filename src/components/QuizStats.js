import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import React from 'react';


function QuizStats(props) {
  const loggedIn = useSelector(state => state.security.loggedIn);

  useFirestoreConnect([
    { collection: 'results', where: [['correlation', '==', props.id]], storeAs: "results" }
  ]);
  const results = useSelector(
    (state) => state.firestore.data["results"]
  )

  function calculateResults() {
    let initialValue = 0;
    const length = Object.keys(results).length;
    Object.keys(results).forEach(x => {
      initialValue = initialValue + results[x].result;
    }
    )
    return ((initialValue / length) * 100).toFixed(2);
  }

  if (isLoaded(results)) {
    return (
      <React.Fragment>
        <p>Copy this link to share quiz:</p>
        <p> /{loggedIn}/{props.id}</p>
        <p>Average score: {calculateResults()}%</p>
      </React.Fragment>
    );
  }
  else {
    return (
      <React.Fragment>
        <p>Copy this link to share quiz /{loggedIn}/{props.id}</p>
        <p>Score is loading...</p>
      </React.Fragment>
    );
  }
}


export default QuizStats;