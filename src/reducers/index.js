import { firestoreReducer } from 'redux-firestore';
import securityReducer from './security'
import {combineReducers} from 'redux';
import interfaceReducer from './interface';

const rootReducer = combineReducers({
  interface: interfaceReducer,
  security: securityReducer,
  firestore: firestoreReducer
});

export default rootReducer;