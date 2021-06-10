import { firestoreReducer } from 'redux-firestore';
import securityReducer from './security'
import {combineReducers} from 'redux';
import routingReducer from './routing';
import interfaceReducer from './interface';

const rootReducer = combineReducers({
  interface: interfaceReducer,
  security: securityReducer,
  firestore: firestoreReducer,
  routing: routingReducer
});

export default rootReducer;