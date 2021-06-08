import { firestoreReducer } from 'redux-firestore';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  // new line of code below
  firestore: firestoreReducer
});

export default rootReducer;