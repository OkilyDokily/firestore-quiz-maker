import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

function Quiz(){
  useFirestoreConnect([
    { collection: 'quizzes' + loggedIn }
  ]);
  const quizzes = useSelector(state => state.firestore.ordered["quizzes" + loggedIn])
  return(
    
  );
}